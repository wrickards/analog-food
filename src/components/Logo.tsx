interface LogoProps {
  variant?: 'dark' | 'light'
  showTagline?: boolean
  className?: string
}

export default function Logo({ variant = 'dark', showTagline = false, className = '' }: LogoProps) {
  const waveColor = variant === 'dark' ? '#8FAF85' : '#2D5A3D'
  const analogColor = variant === 'dark' ? '#FFFFFF' : '#1E3A2F'

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Sine wave SVG mark */}
        <svg
          viewBox="0 0 90 56"
          className="h-7 w-auto flex-shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4,28 C10,28 10,8 17,8 C24,8 24,48 31,48 C38,48 38,8 45,8 C52,8 52,48 59,48 C66,48 66,28 73,28 C80,28 80,8 87,8"
            stroke={waveColor}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Wordmark */}
        <div className="flex items-baseline gap-0">
          <span
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '3px',
              color: analogColor,
              fontSize: '1.1rem',
              lineHeight: 1,
            }}
          >
            analog
          </span>
          <span
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontWeight: 500,
              letterSpacing: '3px',
              color: '#C8883A',
              fontSize: '1.1rem',
              lineHeight: 1,
            }}
          >
            food
          </span>
        </div>
      </div>

      {showTagline && (
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '10px',
            letterSpacing: '4px',
            color: '#4A8C5C',
            marginTop: '4px',
            paddingLeft: '42px',
          }}
        >
          THE SIGNAL BEFORE THE NOISE
        </span>
      )}
    </div>
  )
}
