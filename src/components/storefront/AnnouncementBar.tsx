export function AnnouncementBar() {
  return (
    <div className="bg-[--color-wws-indigo] text-white text-center text-sm py-2 px-4">
      <p>
        Free Shipping on All Orders &bull; Made in the USA &bull;{' '}
        <a href="/builder" className="underline font-semibold">
          Design Your Shades →
        </a>
      </p>
    </div>
  );
}
