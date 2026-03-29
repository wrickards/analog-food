import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let body: { name?: string; address?: string; website?: string; zip?: string; notes?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, address, website, zip, notes } = body

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Vendor name is required' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Insert into Supabase
  if (supabaseUrl && supabaseServiceKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      await supabase.from('vendor_suggestions').insert({
        name: name.trim(),
        address: address?.trim() || null,
        website: website?.trim() || null,
        zip: zip?.trim() || null,
        notes: notes?.trim() || null,
      })
    } catch (err) {
      console.error('Suggest insert error:', err)
    }
  }

  // Send email notification
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Analog Food <hello@analogfood.co>',
        to: 'hello@analogfood.co',
        subject: `New source suggestion: ${name.trim()}`,
        html: `
          <div style="font-family:system-ui;max-width:500px;">
            <h2 style="color:#1E3A2F;">New Vendor Suggestion</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#666;font-size:14px;width:80px;"><strong>Name</strong></td><td style="padding:6px 0;font-size:14px;">${name.trim()}</td></tr>
              <tr><td style="padding:6px 0;color:#666;font-size:14px;"><strong>Address</strong></td><td style="padding:6px 0;font-size:14px;">${address?.trim() || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#666;font-size:14px;"><strong>Website</strong></td><td style="padding:6px 0;font-size:14px;">${website?.trim() || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#666;font-size:14px;"><strong>Zip</strong></td><td style="padding:6px 0;font-size:14px;">${zip?.trim() || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#666;font-size:14px;"><strong>Notes</strong></td><td style="padding:6px 0;font-size:14px;">${notes?.trim() || '—'}</td></tr>
            </table>
          </div>
        `,
      })
    } catch (err) {
      console.error('Suggest email error:', err)
    }
  }

  return NextResponse.json({ success: true })
}
