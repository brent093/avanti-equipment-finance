import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getAdminClient()
    const body = await req.json()
    const { action, ...params } = body
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    if (!profile || !['admin', 'manager'].includes(profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    if (action === 'create_user') {
      const { email, password, full_name, role, dealer_id, account_id } = params
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, role }
      })
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      if (data.user) {
        await supabaseAdmin.from('profiles').update({
          full_name,
          role,
          dealer_id: dealer_id || null,
          account_id: account_id || null
        }).eq('id', data.user.id)
      }
      return NextResponse.json({ user: data.user })
    }
    if (action === 'list_users') {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      return NextResponse.json({ users: data })
    }
    if (action === 'delete_user') {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(params.user_id)
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
