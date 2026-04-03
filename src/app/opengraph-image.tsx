import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Analog Food — The signal before the noise'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const wave =
  'M4,28 C10,28 10,8 17,8 C24,8 24,48 31,48 C38,48 38,8 45,8 C52,8 52,48 59,48 C66,48 66,8 73,8 C80,8 80,48 87,48'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1E3A2F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Faded background sine wave — large, spanning image */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          viewBox="0 0 90 56"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d={wave}
            stroke="#8FAF85"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.15"
          />
        </svg>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Logo mark + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <svg width="64" height="40" viewBox="0 0 90 56">
              <path
                d={wave}
                stroke="#8FAF85"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', fontSize: '30px', letterSpacing: '3px' }}>
              <span style={{ color: 'white', fontWeight: 300 }}>analog</span>
              <span style={{ color: '#C8883A', fontWeight: 600 }}>food</span>
            </div>
          </div>

          {/* Headline + subtext */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                color: 'white',
                fontSize: '60px',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                margin: '0 0 28px 0',
                lineHeight: 1.15,
                maxWidth: '900px',
              }}
            >
              The signal before the noise.
            </p>
            <p
              style={{
                color: '#8FAF85',
                fontSize: '22px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 400,
                margin: 0,
                lineHeight: 1.55,
                maxWidth: '720px',
              }}
            >
              Find clean food near you — farms, markets, and sources free from harmful additives.
            </p>
          </div>

          {/* Domain */}
          <div style={{ display: 'flex' }}>
            <span
              style={{
                color: '#4A8C5C',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 400,
                letterSpacing: '3px',
              }}
            >
              analogfood.co
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
