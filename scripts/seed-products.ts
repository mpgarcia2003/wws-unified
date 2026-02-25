/**
 * Seed script — migrates hardcoded fabric data from constants.ts into Supabase
 * 
 * Usage:
 *   1. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local
 *   2. Run: npx tsx scripts/seed-products.ts
 * 
 * IMPORTANT: Uses SERVICE_ROLE key (not anon) because RLS requires it for writes.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || SUPABASE_URL === 'your_supabase_url') {
  console.error('❌ Set NEXT_PUBLIC_SUPABASE_URL in .env.local');
  process.exit(1);
}
if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Set SUPABASE_SERVICE_ROLE_KEY in .env.local (not the anon key)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ============================================================
// DATA — copied from constants.ts to avoid import complexity
// ============================================================

const SEO_COLLECTION_MAP: Record<string, { company: string; fabric: string; wwsFabricName: string; type: string }> = {
  'breezeguard': { company: 'Phifer', fabric: '7500', wwsFabricName: 'BreezeGuard', type: 'Blackout Shades' },
  'ecotherm': { company: 'Phifer', fabric: '7400', wwsFabricName: 'EcoTherm', type: 'Blackout Shades' },
  'urbanview': { company: 'Phifer', fabric: '7000', wwsFabricName: 'UrbanView', type: 'Blackout Shades' },
  'skyshade-1p': { company: 'Phifer', fabric: '5000', wwsFabricName: 'SkyShade 1P', type: 'Light Filtering Shades' },
  'urbanshade': { company: 'Mermet', fabric: 'Zora', wwsFabricName: 'UrbanShade', type: 'Blackout Shades' },
  'breezeflex': { company: 'Mermet', fabric: 'Vizela', wwsFabricName: 'BreezeFlex', type: 'Blackout Shades' },
  'earthblock-1p': { company: 'Copaco', fabric: 'Visi Natte-420P', wwsFabricName: 'EarthBlock 1P', type: 'Light Filtering Shades' },
  'solarblock-1': { company: 'Copaco', fabric: 'Visi Natte-420', wwsFabricName: 'SolarBlock 1', type: 'Light Filtering Shades' },
  'naturescreen-3p': { company: 'Copaco', fabric: 'Visi Natte-390P', wwsFabricName: 'NatureScreen 3P', type: 'Light Filtering Shades' },
  'lumiscreen-3': { company: 'Copaco', fabric: 'Visi Natte-390', wwsFabricName: 'LumiScreen 3', type: 'Light Filtering Shades' },
  'greenshade-5p': { company: 'Copaco', fabric: 'Visi Natte-380P', wwsFabricName: 'GreenShade 5P', type: 'Light Filtering Shades' },
  'vistashade-5': { company: 'Copaco', fabric: 'Visi Natte-380', wwsFabricName: 'VistaShade 5', type: 'Light Filtering Shades' },
  'ecoview-10p': { company: 'Copaco', fabric: 'Visi Natte-300P', wwsFabricName: 'EcoView 10P', type: 'Light Filtering Shades' },
  'clearview-10': { company: 'Copaco', fabric: 'Visi Natte-300', wwsFabricName: 'ClearView 10', type: 'Light Filtering Shades' },
  'luxe-verona-5p': { company: 'Texstyle', fabric: 'Verona', wwsFabricName: 'Luxe Verona 5P', type: 'Light Filtering Shades' },
  'desertfade': { company: 'Texstyle', fabric: 'Tempe', wwsFabricName: 'DesertFade', type: 'Blackout Shades' },
  'thermoshield-1': { company: 'Mermet', fabric: 'T Screen', wwsFabricName: 'ThermoShield 1', type: 'Light Filtering Shades' },
  'armorweave': { company: 'Mermet', fabric: 'Sparta', wwsFabricName: 'ArmorWeave', type: 'Blackout Shades' },
  'zipguard-5': { company: 'Ferarri', fabric: 'Soltis Veozip', wwsFabricName: 'ZipGuard 5', type: 'Light Filtering Shades' },
  'softweave-3': { company: 'Ferarri', fabric: 'Soltis Touch', wwsFabricName: 'SoftWeave 3', type: 'Light Filtering Shades' },
  'loopmesh-3p': { company: 'Ferarri', fabric: 'Soltis Loop', wwsFabricName: 'LoopMesh 3P', type: 'Light Filtering Shades' },
  'totalblock-0p': { company: 'Ferarri', fabric: 'Soltis 99', wwsFabricName: 'TotalBlock 0P', type: 'Light Filtering Shades' },
  'dayglow-3': { company: 'Ferarri', fabric: 'Soltis 96', wwsFabricName: 'DayGlow 3', type: 'Light Filtering Shades' },
  'ultrashield-4': { company: 'Ferarri', fabric: 'Soltis 92', wwsFabricName: 'UltraShield 4', type: 'Light Filtering Shades' },
  'vistaview-5p': { company: 'Ferarri', fabric: 'Soltis 88', wwsFabricName: 'VistaView 5P', type: 'Light Filtering Shades' },
  'solarlite-4p': { company: 'Ferarri', fabric: 'Soltis 86', wwsFabricName: 'SolarLite 4P', type: 'Light Filtering Shades' },
  'silklight': { company: 'Mermet', fabric: 'Sofia', wwsFabricName: 'SilkLight', type: 'Blackout Shades' },
  'silent-haven': { company: 'Texstyle', fabric: 'Sanctuary Blackout', wwsFabricName: 'Silent Haven', type: 'Blackout Shades' },
  'tranquil-haven-3p': { company: 'Texstyle', fabric: 'Sanctuary', wwsFabricName: 'Tranquil Haven 3P', type: 'Light Filtering Shades' },
  'solarsoft-3': { company: 'Mermet', fabric: 'S Screen', wwsFabricName: 'SolarSoft 3', type: 'Light Filtering Shades' },
  'coastal-luxe-5': { company: 'Senbesta', fabric: 'Palm Beach', wwsFabricName: 'Coastal Luxe 5', type: 'Light Filtering Shades' },
  'stoneview': { company: 'Texstyle', fabric: 'Mesa', wwsFabricName: 'StoneView', type: 'Blackout Shades' },
  'microview-4': { company: 'Mermet', fabric: 'M Screen', wwsFabricName: 'Microview 4', type: 'Light Filtering Shades' },
  'nightshade': { company: 'Texstyle', fabric: 'Kleenscreen Blackout', wwsFabricName: 'NightShade', type: 'Blackout Shades' },
  'pureshade-5p': { company: 'Texstyle', fabric: 'Kleenscreen', wwsFabricName: 'PureShade 5P', type: 'Light Filtering Shades' },
  'infinity-veil-3p': { company: 'Phifer', fabric: 'Infinity', wwsFabricName: 'Infinity Veil 3P', type: 'Light Filtering Shades' },
  'feathermesh': { company: 'Mermet', fabric: 'Flocke', wwsFabricName: 'FeatherMesh', type: 'Blackout Shades' },
  'luxetone': { company: 'Mermet', fabric: 'Elba', wwsFabricName: 'LuxeTone', type: 'Blackout Shades' },
  'ecoweave-3p': { company: 'Mermet', fabric: 'E Screen', wwsFabricName: 'EcoWeave 3P', type: 'Light Filtering Shades' },
  'designmesh-6': { company: 'Mermet', fabric: 'Deco Screen', wwsFabricName: 'DesignMesh 6', type: 'Light Filtering Shades' },
  'renewweave-3p': { company: 'Texstyle', fabric: 'Ambient Renew', wwsFabricName: 'RenewWeave 3P', type: 'Light Filtering Shades' },
  'vistaweave-3p': { company: 'Texstyle', fabric: '4000 Net', wwsFabricName: 'VistaWeave 3P', type: 'Light Filtering Shades' },
  'airlite-mesh-1p': { company: 'Texstyle', fabric: '3000 Net', wwsFabricName: 'AirLite Mesh 1P', type: 'Light Filtering Shades' },
  'toughshade-1p': { company: 'Texstyle', fabric: '3000 HT', wwsFabricName: 'ToughShade 1P', type: 'Light Filtering Shades' },
  'ultrablock-0p': { company: 'Phifer', fabric: '8000', wwsFabricName: 'UltraBlock 0P', type: 'Light Filtering Shades' },
  'daylite-max': { company: 'Phifer', fabric: '7800', wwsFabricName: 'DayLite Max', type: 'Blackout Shades' },
  'blackoutx-0p': { company: 'Phifer', fabric: '4800', wwsFabricName: 'BlackoutX 0P', type: 'Light Filtering Shades' },
};

const FABRIC_PRICE_GROUPS: Record<string, string> = {
  'SheerGuard 5P': 'B', 'PrivacyLite 3P': 'B', 'EcoShield 1P': 'E', 'ClearView 1P': 'C',
  'SolarArmor 3': 'C', 'ThermaView 5': 'C', 'BlackoutX 0P': 'C', 'SkyShade 1P': 'C',
  'UrbanView': 'E', 'EcoTherm': 'D', 'BreezeGuard': 'B', 'DayLite Max': 'B',
  'UltraBlock 0P': 'D', 'Infinity Veil 3P': 'C', 'ToughShade 1P': 'C',
  'AirLite Mesh 1P': 'C', 'VistaWeave 3P': 'C', 'RenewWeave 3P': 'B',
  'PureShade 5P': 'B', 'NightShade': 'C', 'StoneView': 'D',
  'Tranquil Haven 3P': 'B', 'Silent Haven': 'C', 'DesertFade': 'C',
  'Luxe Verona 5P': 'D', 'DesignMesh 6': 'E', 'EcoWeave 3P': 'B',
  'LuxeTone': 'C', 'FeatherMesh': 'I', 'Microview 4': 'D', 'SolarSoft 3': 'E',
  'SilkLight': 'C', 'ArmorWeave': 'B', 'ThermoShield 1': 'E', 'BreezeFlex': 'G',
  'UrbanShade': 'C', 'SolarLite 4P': 'D', 'VistaView 5P': 'D', 'UltraShield 4': 'D',
  'DayGlow 3': 'D', 'TotalBlock 0P': 'D', 'LoopMesh 3P': 'F', 'Status': 'D',
  'SoftWeave 3': 'D', 'ZipGuard 5': 'F', 'Coastal Luxe 5': 'B',
  'ClearView 10': 'G', 'EcoView 10P': 'G', 'VistaShade 5': 'G',
  'GreenShade 5P': 'G', 'LumiScreen 3': 'G', 'NatureScreen 3P': 'G',
  'SolarBlock 1': 'G', 'EarthBlock 1P': 'G',
};

const PRICE_TABLES: Record<string, number[][]> = {
  A: [[153,175,202,238,319,387,477,503,824,872],[163,190,219,262,347,419,525,553,882,932],[174,207,237,284,377,450,573,604,935,990],[188,220,254,309,430,475,667,704,1047,1112],[198,237,273,332,458,508,714,755,1102,1173],[212,252,290,355,489,539,755,805,1158,1234],[222,265,308,380,513,572,809,855,1212,1294],[234,280,325,403,540,602,857,905,1269,1355],[245,295,345,482,569,632,904,957,1324,1414],[258,312,363,504,595,697,999,1057,1435,1537]],
  B: [[154,184,200,238,249,333,465,508,700,745],[177,213,235,282,300,393,532,577,779,828],[199,242,269,324,349,449,600,647,854,910],[220,272,313,370,399,507,663,717,930,995],[242,299,352,414,448,565,728,785,1007,1078],[263,328,387,458,502,622,827,822,1062,1158],[287,357,430,502,588,684,858,924,1158,1244],[308,387,473,545,640,738,922,993,1234,1327],[329,415,503,589,745,798,988,1063,1310,1409],[350,444,537,634,795,860,1052,1132,1387,1493]],
  C: [[169,202,218,259,272,364,508,554,763,813],[193,233,257,307,328,428,580,629,846,903],[217,264,294,354,380,490,654,704,932,993],[240,297,340,404,435,553,723,782,1014,1085],[264,327,384,452,489,618,794,857,1098,1175],[287,358,422,499,548,679,903,895,1158,1263],[313,389,469,548,642,745,935,1008,1263,1357],[335,422,517,594,699,805,1005,1083,1347,1448],[359,454,549,643,813,872,1078,1159,1429,1538],[383,485,587,692,868,938,1148,1234,1513,1629]],
  D: [[199,242,292,334,385,464,584,618,880,939],[232,284,347,397,458,535,677,718,989,1055],[263,324,397,459,533,633,770,818,1098,1174],[294,369,448,522,605,714,865,917,1207,1293],[324,409,502,584,675,798,959,1014,1317,1412],[357,449,552,645,749,883,1052,1113,1424,1530],[387,490,607,708,823,964,1147,1212,1535,1649],[417,534,659,770,895,1049,1239,1312,1644,1768],[449,575,708,833,968,1132,1333,1408,1753,1885],[479,615,762,897,1039,1213,1428,1507,1863,2003]],
  E: [[234,279,307,362,380,509,710,778,1067,1138],[270,325,359,430,460,600,814,882,1187,1263],[304,369,410,494,533,688,917,987,1303,1389],[337,417,478,564,608,775,1012,1094,1420,1520],[369,457,537,632,687,865,1110,1200,1538,1645],[402,500,592,698,768,953,1214,1254,1622,1768],[438,544,655,768,899,1043,1309,1413,1768,1900],[472,592,724,833,977,1129,1407,1517,1884,2027],[504,635,770,900,1137,1220,1507,1624,2000,2153],[534,680,822,968,1214,1309,1608,1728,2117,2280]],
  F: [[284,347,404,479,547,539,708,724,894,975],[332,404,464,572,634,755,855,897,1065,1159],[382,459,528,637,707,838,983,1052,1235,1330],[430,513,588,705,784,918,1095,1208,1407,1533],[478,562,644,772,855,1005,1185,1363,1578,1719],[525,615,707,893,992,1033,1275,1519,1749,1907],[575,708,802,903,1064,1162,1364,1673,1920,2092],[625,757,862,974,1147,1257,1457,1829,2090,2279],[674,825,944,1068,1217,1334,1547,1985,2260,2467],[723,892,1023,1168,1290,1415,1637,2140,2432,2652]],
  G: [[304,372,433,513,730,867,903,975,1124,1210],[355,433,497,609,824,954,1060,1169,1307,1408],[408,492,564,682,902,1042,1197,1335,1489,1592],[460,548,628,754,985,1128,1318,1502,1673,1808],[512,600,688,825,1060,1222,1414,1668,1855,2007],[562,658,755,897,1207,1250,1510,1834,2039,2207],[615,757,858,965,1284,1388,1605,1999,2222,2405],[669,809,922,1042,1372,1490,1703,2167,2404,2605],[720,883,1009,1143,1448,1573,1800,2333,2585,2805],[773,954,1094,1249,1527,1659,1897,2499,2769,3004]],
  H: [[322,393,458,542,773,915,954,1040,1188,1279],[375,458,525,644,872,1008,1122,1235,1382,1488],[432,519,597,720,953,1102,1264,1412,1574,1682],[487,579,664,797,1040,1192,1393,1587,1768,1910],[540,635,728,873,1122,1290,1494,1763,1962,2120],[593,695,798,948,1275,1322,1597,1939,2155,2333],[650,800,907,1020,1358,1467,1697,2114,2349,2543],[708,855,974,1102,1450,1575,1800,2289,2540,2754],[762,933,1067,1208,1530,1663,1903,2465,2733,2965],[817,1008,1157,1320,1614,1754,2004,2640,2927,3175]],
  I: [[399,487,568,672,958,1135,1183,1290,1473,1586],[465,568,651,799,1081,1250,1391,1532,1713,1845],[535,644,740,893,1182,1366,1568,1750,1952,2085],[603,718,824,988,1290,1478,1727,1967,2192,2369],[670,788,903,1082,1391,1600,1853,2186,2432,2629],[735,862,989,1175,1581,1639,1980,2405,2673,2893],[806,992,1124,1265,1684,1819,2104,2622,2913,3153],[878,1061,1208,1366,1798,1953,2232,2839,3150,3415],[944,1157,1323,1498,1898,2062,2360,3057,3389,3677],[1013,1250,1434,1637,2002,2175,2485,3276,3629,3937]],
};

const SPECIALTY_PRICE_TABLE_1: number[][] = [
  [2885,2934,3424,3481,3562,3630,3698,3759,3961,4493],[2922,2988,3496,3568,3661,3741,3819,3887,4094,4647],[2958,3041,3565,3649,3763,3842,3924,3998,4216,4790],[3003,3102,3636,3734,3842,3935,4025,4112,4339,4939],[3045,3157,3703,3803,3918,4019,4124,4218,4457,5084],[3091,3215,3769,3874,4001,4113,4228,4333,4581,5233],[3133,3268,3827,3941,4076,4201,4324,4442,4701,5376],[3179,3323,3886,4012,4159,4293,4429,4555,4826,5528],[3226,3378,3942,4131,4236,4381,4527,4665,4945,5672],[3284,3436,4004,4149,4318,4475,4629,4777,5068,5818],
];

// ============================================================
// FABRIC URL PARSER — matches the logic in constants.ts
// ============================================================
function parseFabricUrl(url: string): { name: string; color: string; category: 'Blackout' | 'Light Filtering'; collectionSlug: string; tone: string } {
  const parts = url.split('/');
  const filename = parts[parts.length - 1].replace(/\.(jpg|png|webp)/, '');
  const folder = parts[parts.length - 2] || '';

  let raw = folder.includes('shades') ? `${folder}-${filename}` : filename;
  raw = raw.replace('test-wws-fabrics-', '').toLowerCase();

  const isBlackout = raw.includes('blackout');
  const category: 'Blackout' | 'Light Filtering' = isBlackout ? 'Blackout' : 'Light Filtering';

  let foundKey = '';
  for (const key of Object.keys(SEO_COLLECTION_MAP)) {
    if (raw.includes(key)) {
      foundKey = key;
      break;
    }
  }

  const mapData = SEO_COLLECTION_MAP[foundKey] || { company: 'WWS', fabric: 'Designer', wwsFabricName: 'Custom Designer', type: 'Light Filtering Shades' };

  let colorRaw = raw
    .replace(foundKey, '')
    .replace('blackout-shades', '')
    .replace('light-filtering-shades', '')
    .replace('blackout', '')
    .replace('light-filtering', '')
    .replace(/^-+|-+$/g, '');

  const colorParts = colorRaw.split('-').filter(p => p.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));

  const color = colorParts.join(' | ') || 'Premium';
  const name = `${mapData.company} ${mapData.fabric} | ${color}`.trim();
  const tone = category === 'Blackout' ? 'dark' : 'neutral';

  return { name, color, category, collectionSlug: foundKey || 'custom', tone };
}

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function seed() {
  console.log('🌱 Starting product seed...\n');

  // --- 1. Seed collections ---
  console.log('📦 Seeding collections...');
  const collectionRows = Object.entries(SEO_COLLECTION_MAP).map(([slug, data], idx) => ({
    slug,
    company: data.company,
    fabric_code: data.fabric,
    wws_name: data.wwsFabricName,
    category: data.type,
    price_group: FABRIC_PRICE_GROUPS[data.wwsFabricName] || 'C',
    sort_order: idx,
    is_active: true,
  }));

  const { data: insertedCollections, error: collErr } = await supabase
    .from('wws_collections')
    .upsert(collectionRows, { onConflict: 'slug' })
    .select('id, slug');

  if (collErr) {
    console.error('❌ Collection insert error:', collErr.message);
    process.exit(1);
  }
  console.log(`   ✅ ${insertedCollections!.length} collections inserted\n`);

  // Build slug → id lookup
  const collectionMap = new Map<string, string>();
  for (const c of insertedCollections!) {
    collectionMap.set(c.slug, c.id);
  }

  // --- 2. Seed fabrics ---
  console.log('🎨 Seeding fabrics...');

  // Read fabric URLs from constants file
  const fs = await import('fs');
  const constantsPath = path.resolve(__dirname, '../constants.ts');
  const constantsContent = fs.readFileSync(constantsPath, 'utf-8');

  // Extract URLs from ALL_FABRIC_URLS array
  const urlRegex = /https:\/\/res\.cloudinary\.com\/[^"'\s]+/g;
  const allUrls: string[] = [];

  // Find the ALL_FABRIC_URLS section
  const startMarker = 'const ALL_FABRIC_URLS';
  const endMarker = '];';
  const startIdx = constantsContent.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('❌ Could not find ALL_FABRIC_URLS in constants.ts');
    process.exit(1);
  }
  const section = constantsContent.substring(startIdx, constantsContent.indexOf(endMarker, startIdx) + 2);
  let match;
  while ((match = urlRegex.exec(section)) !== null) {
    const url = match[0].replace(/[",]/g, '');
    if (!url.includes('placeholder')) {
      allUrls.push(url);
    }
  }

  console.log(`   Found ${allUrls.length} fabric URLs`);

  const fabricRows = allUrls.map((url, idx) => {
    const parsed = parseFabricUrl(url);
    const collectionId = collectionMap.get(parsed.collectionSlug);
    const collectionData = SEO_COLLECTION_MAP[parsed.collectionSlug];
    const priceGroup = collectionData
      ? FABRIC_PRICE_GROUPS[collectionData.wwsFabricName] || 'C'
      : 'C';

    return {
      collection_id: collectionId || null,
      legacy_id: `fab_${idx}`,
      name: parsed.name,
      color: parsed.color,
      category: parsed.category,
      tone: parsed.tone,
      cloudinary_url: url,
      price_group: priceGroup,
      sku: `WWS-FAB_${idx}`,
      features: ['UV Protection', 'Fade Resistant'],
      rgb_r: 200,
      rgb_g: 200,
      rgb_b: 200,
      is_active: true,
      sort_order: idx,
    };
  });

  // Insert in batches of 100
  const BATCH_SIZE = 100;
  let totalInserted = 0;
  for (let i = 0; i < fabricRows.length; i += BATCH_SIZE) {
    const batch = fabricRows.slice(i, i + BATCH_SIZE);
    const { error: fabErr, count } = await supabase
      .from('wws_fabrics')
      .upsert(batch, { onConflict: 'legacy_id', count: 'exact' });

    if (fabErr) {
      console.error(`❌ Fabric batch ${i}-${i + batch.length} error:`, fabErr.message);
      // Add legacy_id unique constraint if it doesn't exist — fall back to insert
      const { error: insertErr } = await supabase.from('wws_fabrics').insert(batch);
      if (insertErr) {
        console.error(`   ❌ Insert fallback also failed:`, insertErr.message);
        continue;
      }
    }
    totalInserted += batch.length;
    process.stdout.write(`   Inserted ${totalInserted}/${fabricRows.length}\r`);
  }
  console.log(`\n   ✅ ${totalInserted} fabrics inserted\n`);

  // --- 3. Seed price grids ---
  console.log('💰 Seeding price grids...');
  const priceGridRows = [
    ...Object.entries(PRICE_TABLES).map(([code, grid]) => ({
      group_code: code,
      grid: JSON.stringify(grid),
      size_breakpoints: JSON.stringify([36, 48, 60, 72, 84, 96, 108, 120, 132, 144]),
    })),
    {
      group_code: 'SPECIALTY_1',
      grid: JSON.stringify(SPECIALTY_PRICE_TABLE_1),
      size_breakpoints: JSON.stringify([36, 48, 60, 72, 84, 96, 108, 120, 132, 144]),
    },
  ];

  const { error: priceErr } = await supabase
    .from('wws_price_grids')
    .upsert(priceGridRows, { onConflict: 'group_code' });

  if (priceErr) {
    console.error('❌ Price grid error:', priceErr.message);
    // Fallback to insert
    const { error: insertErr } = await supabase.from('wws_price_grids').insert(priceGridRows);
    if (insertErr) console.error('   ❌ Insert fallback failed:', insertErr.message);
    else console.log(`   ✅ ${priceGridRows.length} price grids inserted\n`);
  } else {
    console.log(`   ✅ ${priceGridRows.length} price grids inserted (A-I + Specialty)\n`);
  }

  console.log('🎉 Seed complete!');
  console.log(`   Collections: ${collectionRows.length}`);
  console.log(`   Fabrics: ${totalInserted}`);
  console.log(`   Price Grids: ${priceGridRows.length}`);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
