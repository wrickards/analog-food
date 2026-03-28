import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, zip } = await req.json()

    if (!email || !zip) {
      return NextResponse.json({ error: 'Email and zip code are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (!/^\d{5}$/.test(zip)) {
      return NextResponse.json({ error: 'Invalid zip code.' }, { status: 400 })
    }

    // Store in Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { error } = await supabase
        .from('subscribers')
        .upsert({ email, zip }, { onConflict: 'email' })
      if (error && error.code !== '23505') {
        console.error('Supabase subscriber error:', error)
      }
    }

    // Send welcome email via Resend if configured
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && !resendKey.includes('placeholder')) {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Analog Food <hello@analogfood.co>',
        to: email,
        subject: "You're in. The Signal starts now.",
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin:0;padding:0;background:#F5F0E4;font-family:Georgia,serif;">
            <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;">
              <div style="background:#1E3A2F;padding:32px 40px;">
                <p style="margin:0;color:#8FAF85;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;">THE SIGNAL BEFORE THE NOISE</p>
                <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;font-weight:400;">
                  analog<span style="color:#C8883A;font-weight:500;">food</span>
                </h1>
              </div>
              <div style="padding:40px;">
                <h2 style="color:#1E3A2F;font-size:22px;margin:0 0 16px;">Welcome to The Signal.</h2>
                <p style="color:#4A5040;line-height:1.7;margin:0 0 20px;">
                  Every week you'll get:
                </p>
                <ul style="color:#4A5040;line-height:2;padding-left:20px;margin:0 0 24px;">
                  <li>New farms and markets opening near <strong>${zip}</strong></li>
                  <li>Ingredient alerts — what to avoid and why</li>
                  <li>Seasonal picks from local sources</li>
                  <li>What's quietly entering (and leaving) US shelves</li>
                </ul>
                <p style="color:#C8883A;font-style:italic;margin:0 0 32px;font-size:17px;">
                  This is the signal before the noise.
                </p>
                <hr style="border:none;border-top:1px solid #D3C9B0;margin:0 0 24px;" />
                <p style="color:#7A8070;font-size:12px;margin:0;font-family:system-ui,sans-serif;">
                  — The Analog Food team<br/>
                  <a href="https://analogfood.co" style="color:#C8883A;text-decoration:none;">analogfood.co</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      })
    }

    return NextResponse.json({ success: true, zip })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
