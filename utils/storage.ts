import { CartItem, Fabric, EmailSettings, Order, Message, OrderStatus, BlogPost } from '../types';
import { ALL_FABRICS, PRICE_TABLES, SPECIALTY_PRICE_TABLE_1, SIZE_BREAKPOINTS } from '../constants';
import { createClient } from '@supabase/supabase-js';

// Use env vars for the unified project; fall back to hardcoded for dev safety
const supabaseUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL)
  || 'https://rgfoznvbjcjtajikpspu.supabase.co';
const supabaseAnonKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZm96bnZiamNqdGFqaWtwc3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTQ0NTUsImV4cCI6MjA4NzUzMDQ1NX0.RCaRu3d2dXCPbWRWJ3Oy5pFwgJZ9Kgb6EFvdBOlsows';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EMAIL_SETTINGS_KEY = 'wws_email_settings';
const CART_STORAGE_KEY = 'wws_cart_v1';
const SWATCHES_STORAGE_KEY = 'wws_swatches_v1';

// --- HELPERS ---
const mapOrderFromDb = (o: any): Order => ({
  ...o,
  paymentMethod: o.payment_method,
  deliveryNotes: o.delivery_notes,
  referralSource: o.referral_source,
  isCommercial: o.is_commercial,
  appointmentSlots: o.appointment_slots,
});

const mapOrderToDb = (o: Order) => ({
  id: o.id,
  customer: o.customer,
  items: o.items,
  swatches: o.swatches,
  customizations: o.customizations,
  total: o.total,
  status: o.status,
  date: o.date,
  payment_method: o.paymentMethod,
  delivery_notes: o.deliveryNotes,
  referral_source: o.referralSource,
  is_commercial: o.isCommercial,
  appointment_slots: o.appointmentSlots,
});

const sanitizeForJsonb = (obj: any) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return obj;
  }
};

// --- MESSAGES ---
export const getMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase.from('messages').select('*').order('timestamp', { ascending: false });
  return error ? [] : data;
};

export const saveMessage = async (msg: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
  const newMessage = { ...msg, id: `msg_${Date.now()}`, timestamp: Date.now(), status: 'unread' };
  await supabase.from('messages').insert([newMessage]);
  return newMessage;
};

export const updateMessageStatus = async (id: string, status: Message['status']) => {
  await supabase.from('messages').update({ status }).eq('id', id);
};

export const deleteMessage = async (id: string) => {
  await supabase.from('messages').delete().eq('id', id);
};

// --- ORDERS ---
export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase.from('orders').select('*').order('date', { ascending: false });
  return error ? [] : data.map(mapOrderFromDb);
};

export const saveOrder = async (order: Order) => {
  await supabase.from('orders').insert([mapOrderToDb(order)]);
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  await supabase.from('orders').update({ status }).eq('id', orderId);
  return getOrders();
};

// --- FABRICS (from wws_fabrics table) ---
export const getDynamicFabrics = async (): Promise<Fabric[]> => {
  try {
    const { data, error } = await supabase
      .from('wws_fabrics')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fabric fetch failed, using hardcoded fallback:', error?.message);
      return ALL_FABRICS;
    }

    console.log(`✅ Loaded ${data.length} fabrics from Supabase`);

    return data.map((f: any) => ({
      id: f.legacy_id || f.id,
      name: f.name,
      description: `Premium ${f.category.toLowerCase()} shade material. Crafted for architectural precision and interior elegance.`,
      category: f.category as 'Blackout' | 'Light Filtering',
      tone: f.tone as 'light' | 'dark' | 'neutral',
      cloudinaryId: f.cloudinary_url,
      priceGroup: f.price_group,
      features: f.features || ['UV Protection', 'Fade Resistant'],
      rgb: { r: f.rgb_r || 200, g: f.rgb_g || 200, b: f.rgb_b || 200 },
      sku: f.sku || `WWS-${f.legacy_id?.toUpperCase() || f.id}`,
      shopifyId: `VARIANT-${500000 + (f.sort_order || 0)}`,
      shopifyProductId: `PROD-${Math.floor((f.sort_order || 0) / 10) + 1000}`,
    }));
  } catch (err) {
    console.error('getDynamicFabrics error:', err);
    return ALL_FABRICS;
  }
};

// --- PRICE GRIDS (from wws_price_grids table, cached in memory) ---
let _priceGridCache: Record<string, number[][]> | null = null;

export const loadPriceGrids = async (): Promise<Record<string, number[][]>> => {
  if (_priceGridCache) return _priceGridCache;

  try {
    const { data, error } = await supabase.from('wws_price_grids').select('group_code, grid');
    if (error || !data || data.length === 0) {
      console.warn('Price grid fetch failed, using hardcoded fallback:', error?.message);
      _priceGridCache = { ...PRICE_TABLES, SPECIALTY_1: SPECIALTY_PRICE_TABLE_1 };
      return _priceGridCache;
    }

    const grids: Record<string, number[][]> = {};
    for (const row of data) {
      grids[row.group_code] = typeof row.grid === 'string' ? JSON.parse(row.grid) : row.grid;
    }
    console.log(`✅ Loaded ${data.length} price grids from Supabase`);
    _priceGridCache = grids;
    return grids;
  } catch (err) {
    console.error('loadPriceGrids error:', err);
    _priceGridCache = { ...PRICE_TABLES, SPECIALTY_1: SPECIALTY_PRICE_TABLE_1 };
    return _priceGridCache;
  }
};

export const getSupabasePriceFromTable = async (
  priceGroup: string,
  widthInches: number,
  heightInches: number,
  isSpecialty: boolean = false
): Promise<number> => {
  const grids = await loadPriceGrids();
  const table = isSpecialty ? grids['SPECIALTY_1'] : grids[priceGroup];
  if (!table) return 0;

  const widthIdx = SIZE_BREAKPOINTS.findIndex(s => widthInches <= s);
  const heightIdx = SIZE_BREAKPOINTS.findIndex(s => heightInches <= s);
  const w = widthIdx === -1 ? 9 : Math.max(0, Math.min(widthIdx, 9));
  const h = heightIdx === -1 ? 9 : Math.max(0, Math.min(heightIdx, 9));

  return table[h][w];
};

// --- CONSULTATION REQUESTS ---
export const saveConsultationRequest = async (request: {
  phone: string;
  preferred_time: string;
}): Promise<boolean> => {
  const payload = {
    id: `CONSULT-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    phone: request.phone,
    preferred_time: request.preferred_time,
    status: 'pending',
    created_at: new Date().toISOString()
  };
  
  const { error } = await supabase.from('consultation_requests').insert([payload]);
  if (error) {
    console.error('Consultation request save error:', error.message);
    try {
      const existing = JSON.parse(localStorage.getItem('wws_pending_consultations') || '[]');
      existing.push(payload);
      localStorage.setItem('wws_pending_consultations', JSON.stringify(existing));
    } catch (e) {}
    return false;
  }
  return true;
};

// --- SWATCH REQUESTS ---
export const saveSwatchRequest = async (request: {
  name: string;
  email: string;
  address: string;
  city_state_zip: string;
  fabrics: { id: string; name: string; category: string }[];
}): Promise<boolean> => {
  const payload = {
    id: `SWATCH-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: request.name,
    email: request.email,
    address: request.address,
    city_state_zip: request.city_state_zip,
    fabrics: sanitizeForJsonb(request.fabrics),
    status: 'pending',
    created_at: new Date().toISOString()
  };
  
  const { error } = await supabase.from('swatch_requests').insert([payload]);
  if (error) {
    console.error('Swatch request save error:', error.message);
    // Fallback: save to localStorage so we don't lose the lead
    try {
      const existing = JSON.parse(localStorage.getItem('wws_pending_swatch_requests') || '[]');
      existing.push(payload);
      localStorage.setItem('wws_pending_swatch_requests', JSON.stringify(existing));
    } catch (e) {}
    return false;
  }
  return true;
};

// --- SHARED CARTS ---
export const saveSharedCart = async (cart: CartItem[], swatches: Fabric[]): Promise<string | null> => {
  const shareId = `CART-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const payload = {
    id: shareId,
    cart: sanitizeForJsonb(cart),
    swatches: sanitizeForJsonb(swatches),
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
  const { error } = await supabase.from('shared_carts').insert([payload]);
  if (error) {
    console.error('Supabase Save Error:', error.message);
    if (error.message.includes('shared_carts') || error.message.includes('schema cache')) {
      alert("DATABASE ERROR: The 'shared_carts' table does not exist in your Supabase project. \n\nPlease run the SQL setup script in your Supabase SQL Editor.");
    }
    return null;
  }
  return shareId;
};

export const loadSharedCart = async (shareId: string): Promise<{ cart: CartItem[], swatches: Fabric[] } | null> => {
  const { data, error } = await supabase.from('shared_carts').select('cart, swatches').eq('id', shareId).single();
  if (error || !data) return null;
  return { cart: data.cart as CartItem[], swatches: data.swatches as Fabric[] };
};

// --- SAVED QUOTES (Precision Email Modal) ---
export const saveQuoteConfig = async (email: string, config: any, price: number): Promise<{ quoteId: string; discountCode: string } | null> => {
  const quoteId = `QUOTE-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const discountCode = `PRECISION${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const payload = {
    id: quoteId,
    email,
    config: sanitizeForJsonb(config),
    price,
    discount_code: discountCode,
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    recovered: false,
  };
  const { error } = await supabase.from('saved_quotes').insert([payload]);
  if (error) {
    console.error('Save quote error:', error.message);
    // Fallback to localStorage so we can still generate a recovery link
    try {
      localStorage.setItem('wws_precision_quote_' + quoteId, JSON.stringify(payload));
    } catch (e) {}
  }
  // Always return the quoteId + discountCode so the email can be sent regardless
  return { quoteId, discountCode };
};

export const loadQuoteConfig = async (quoteId: string): Promise<{ config: any; email: string; price: number; discount_code: string } | null> => {
  // Try Supabase first
  const { data, error } = await supabase.from('saved_quotes').select('*').eq('id', quoteId).single();
  if (!error && data) {
    // Mark as recovered only when customer clicks the link
    await supabase.from('saved_quotes').update({ recovered: true, recovered_at: new Date().toISOString() }).eq('id', quoteId);
    return { config: data.config, email: data.email, price: data.price, discount_code: data.discount_code };
  }
  // Fallback: check localStorage
  try {
    const local = localStorage.getItem('wws_precision_quote_' + quoteId);
    if (local) {
      const parsed = JSON.parse(local);
      return { config: parsed.config, email: parsed.email, price: parsed.price, discount_code: parsed.discount_code };
    }
  } catch (e) {}
  return null;
};

// --- SETTINGS ---
export const getEmailSettings = (): EmailSettings => {
  const raw = localStorage.getItem(EMAIL_SETTINGS_KEY);
  const defaults = { 
    serviceId: 'service_m9n45oo', 
    publicKey: '8b2s8hObjmNngJm9Y', 
    adminTemplateId: 'template_cdbbdvw', 
    customerTemplateId: 'template_9ciknab', 
    adminEmail: '' 
  };

  if (!raw) return defaults;

  try {
    const settings = JSON.parse(raw);
    // Migration: Force all emails through WWS Outlook service
    if (settings.serviceId === 'service_8ivbdhg') {
      const migrated = { ...settings, serviceId: 'service_m9n45oo' };
      localStorage.setItem(EMAIL_SETTINGS_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return settings;
  } catch (e) {
    return defaults;
  }
};

export const saveEmailSettings = (settings: EmailSettings) => {
  localStorage.setItem(EMAIL_SETTINGS_KEY, JSON.stringify(settings));
};

// --- BASE PERSISTENCE ---
export const getSavedCart = (): CartItem[] => JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
export const persistCart = (cart: CartItem[]) => localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
export const getSavedSwatches = (): Fabric[] => JSON.parse(localStorage.getItem(SWATCHES_STORAGE_KEY) || '[]');
export const persistSwatches = (swatches: Fabric[]) => localStorage.setItem(SWATCHES_STORAGE_KEY, JSON.stringify(swatches));

// --- BLOG POSTS ---
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });
  return error || !data ? [] : data;
};