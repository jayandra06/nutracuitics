'use client';

export default function FlashSaleBadge() {
  return (
    <div className="absolute -top-2 -right-2 z-10">
      <div className="relative">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
          ⚡ FLASH SALE
        </div>
        <div className="absolute -inset-1 bg-red-400 rounded-full blur opacity-30 animate-ping"></div>
      </div>
    </div>
  );
}

