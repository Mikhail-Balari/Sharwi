export function SharwiLogoIcon({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 152 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      aria-label="Sharwi"
    >
      <path d="M48 138.326C55.6368 149.317 105.149 126.317 117.5 136.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
      <path d="M48 154.326C55.6368 165.317 105.149 142.317 117.5 152.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
      <path d="M48 170.326C55.6368 181.317 105.149 158.317 117.5 168.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
      <path d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z" stroke="#FF6A00" strokeWidth="18"/>
    </svg>
  )
}

export function SharwiWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold text-xl tracking-tight text-white ${className}`}>
      SHARWI
    </span>
  )
}

export function SharwiLogoCombined({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SharwiLogoIcon size={28} />
      <SharwiWordmark />
    </div>
  )
}
