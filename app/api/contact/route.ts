import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // This endpoint can be extended to send email notifications,
    // integrate with CRM, etc.
    return NextResponse.json({ success: true, data: body })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
