import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Analog Food — The signal before the noise'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadGoogleFont(
  family: string,
  weight: number,
  italic = false
): Promise<ArrayBuffer> {
  const style = italic ? `ital,wght@1,${weight}` : `wght@${weight}`
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${style}&display=swap`
  const css = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  }).then((r) => r.text())
  const match = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)
  if (!match?.[1]) throw new Error(`Font not found: ${family} ${weight}`)
  return fetch(match[1]).then((r) => r.arrayBuffer())
}

export default async function Image() {
  const [playfairItalic, dmSansLight, dmSansMedium] = await Promise.all([
    loadGoogleFont('Playfair Display', 400, true),
    loadGoogleFont('DM Sans', 300),
    loadGoogleFont('DM Sans', 500),
  ])

  const wave =
    'M4,28 C10,28 10,8 17,8 C24,8 24,48 31,48 C38,48 38,8 45,8 C52,8 52,48 59,48 C66,48 66,8 73,8 C80,8 80,48 87,48'

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
        }}
      >
        {/* Large faded background sine wave */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          viewBox="0 0 90 56"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d={wave}
            stroke="#8FAF85"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.15"
          />
        </svg>

        {/* Content layer */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Logo mark + wordmark — top left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="60" height="38" viewBox="0 0 90 56">
              <path
                d={wave}
                stroke="#8FAF85"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px' }}>
              <span
                style={{
                  color: 'white',
                  fontSize: '32px',
                  fontFamily: 'DM Sans Light',
                  fontWeight: 300,
                  letterSpacing: '3px',
                }}
              >
                analog
              </span>
              <span
                style={{
                  color: '#C8883A',
                  fontSize: '32px',
                  fontFamily: 'DM Sans Medium',
                  fontWeight: 500,
                  letterSpacing: '3px',
                }}
              >
                food
              </span>
            </div>
          </div>

          {/* Center headline + subtext */}
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
                fontSize: '56px',
                fontFamily: 'Playfair Display',
                fontStyle: 'italic',
                fontWeight: 400,
                margin: '0 0 28px 0',
                lineHeight: 1.15,
                maxWidth: '860px',
              }}
            >
              The signal before the noise.
            </p>
            <p
              style={{
                color: '#8FAF85',
                fontSize: '22px',
                fontFamily: 'DM Sans Light',
                fontWeight: 300,
                margin: 0,
                lineHeight: 1.5,
                maxWidth: '700px',
              }}
            >
              Find clean food near you — farms, markets, and sources free from harmful additives.
            </p>
          </div>

          {/* Bottom: domain */}
          <div style={{ display: 'flex' }}>
            <span
              style={{
                color: '#4A8C5C',
                fontSize: '16px',
                fontFamily: 'DM Sans Medium',
                fontWeight: 500,
                letterSpacing: '3px',
              }}
            >
              analogfood.co
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Playfair Display', data: playfairItalic, style: 'italic', weight: 400 },
        { name: 'DM Sans Light', data: dmSansLight, style: 'normal', weight: 300 },
        { name: 'DM Sans Medium', data: dmSansMedium, style: 'normal', weight: 500 },
      ],
    }
  )
}
