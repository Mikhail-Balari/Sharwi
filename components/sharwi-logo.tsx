export function SharwiLogoIcon({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src="/logo.svg"
      alt="Sharwi"
      width={size}
      height={size}
      className={className}
    />
  )
}

export function SharwiWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold text-xl tracking-tight text-foreground ${className}`}>
      SHARWI
    </span>
  )
}

export function SharwiLogoCombined({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SharwiLogoIcon size={32} />
      <SharwiWordmark />
    </div>
  )
}
