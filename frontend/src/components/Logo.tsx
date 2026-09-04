const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield background */}
      <path
        d="M50 5 L90 20 L90 50 C90 75 70 90 50 95 C30 90 10 75 10 50 L10 20 Z"
        fill="#1e3a5f"
        stroke="#e8a33c"
        strokeWidth="2"
      />
      
      {/* Lotus petals - traditional knowledge symbol */}
      <path
        d="M50 25 C35 35 30 45 30 55 C30 65 40 70 50 70 C60 70 70 65 70 55 C70 45 65 35 50 25"
        fill="#e8a33c"
        opacity="0.9"
      />
      
      {/* Center lotus detail */}
      <path
        d="M50 35 C45 40 42 48 42 55 C42 62 46 65 50 65 C54 65 58 62 58 55 C58 48 55 40 50 35"
        fill="#1e3a5f"
      />
      
      {/* Book/knowledge symbol */}
      <rect x="35" y="72" width="30" height="15" rx="2" fill="#ffffff" stroke="#e8a33c" strokeWidth="1.5" />
      <line x1="50" y1="72" x2="50" y2="87" stroke="#e8a33c" strokeWidth="1.5" />
      
      {/* IP protection lock symbol */}
      <circle cx="50" cy="50" r="8" fill="#ffffff" stroke="#1e3a5f" strokeWidth="2" />
      <path
        d="M46 48 L46 45 C46 42 48 40 50 40 C52 40 54 42 54 45 L54 48"
        stroke="#1e3a5f"
        strokeWidth="2"
        fill="none"
      />
      <rect x="46" y="48" width="8" height="6" rx="1" fill="#1e3a5f" />
    </svg>
  )
}

export default Logo
