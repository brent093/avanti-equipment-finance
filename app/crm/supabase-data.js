"use client";
import { supabase } from '../../lib/supabase';

// ── AUTH ─────────────────────────────────────────────────────
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return data;
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}

// ── DEALS ────────────────────────────────────────────────────
export async function fetchDeals() {
  const { data, error } = await supabase.from('deals').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchDeals:', error); return []; }
  // Fetch related data for each deal
  const dealIds = data.map(d => d.id);
  const [history, activities, docs, stips, fundingItems] = await Promise.all([
    supabase.from('deal_history').select('*').in('deal_id', dealIds).order('created_at'),
    supabase.from('deal_activities').select('*').in('deal_id', dealIds).order('created_at'),
    supabase.from('deal_documents').select('*').in('deal_id', dealIds),
    supabase.from('deal_stips').select('*').in('deal_id', dealIds),
    supabase.from('deal_funding_items').select('*').in('deal_id', dealIds),
  ]);
  
  // Map camelCase for app compatibility
  return data.map(d => ({
    id: d.id, accountId: d.account_id, code: d.code, biz: d.biz, contact: d.contact,
    email: d.email, phone: d.phone, custPassword: d.cust_password,
    eqType: d.eq_type, eqDetail: d.eq_detail, eqYear: d.eq_year, eqMake: d.eq_make,
    eqModel: d.eq_model, eqVin: d.eq_vin, eqMileage: d.eq_mileage, eqNewUsed: d.eq_new_used, eqSerial: d.eq_serial,
    amount: Number(d.amount) || 0,
    dealerId: d.dealer_id, dealerName: d.dealer_name, lenderId: d.lender_id,
    stage: d.stage, source: d.source, notes: d.notes,
    terms: d.terms, disposition: d.disposition,
    accepted: d.accepted, taxChoice: d.tax_choice, showTaxChoice: d.show_tax_choice,
    approvalLetter: d.approval_letter,
    emailConfSent: d.email_conf_sent, emailCodeSent: d.email_code_sent,
    creditApp: d.credit_app,
    createdAt: d.created_at, updatedAt: d.updated_at,
    // Attached arrays
    history: (history.data || []).filter(h => h.deal_id === d.id).map(h => ({ s: h.stage, d: h.created_at, n: h.note })),
    activities: (activities.data || []).filter(a => a.deal_id === d.id).map(a => ({ id: a.id, type: a.type, who: a.who, detail: a.detail, at: a.created_at })),
    docs: (docs.data || []).filter(x => x.deal_id === d.id).map(x => ({ docId: x.doc_id, name: x.name, at: x.created_at, by: x.uploaded_by, fileUrl: x.file_url })),
    stips: (stips.data || []).filter(x => x.deal_id === d.id).map(x => ({ id: x.id, text: x.text, done: x.done, file: x.file_url, resolvedBy: x.resolved_by, addedAt: x.added_at, visibility: x.visibility, category: x.category, auto: x.auto })),
    fundingItems: (fundingItems.data || []).filter(x => x.deal_id === d.id).map(x => ({ id: x.id, text: x.text, done: x.done, file: x.file_url, category: x.category, auto: x.auto, addedAt: x.added_at })),
  }));
}

export async function saveDealToDb(deal) {
  const row = {
    id: deal.id, account_id: deal.accountId, code: deal.code, biz: deal.biz, contact: deal.contact,
    email: deal.email, phone: deal.phone, cust_password: deal.custPassword,
    eq_type: deal.eqType, eq_detail: deal.eqDetail, eq_year: deal.eqYear, eq_make: deal.eqMake,
    eq_model: deal.eqModel, eq_vin: deal.eqVin, eq_mileage: deal.eqMileage, eq_new_used: deal.eqNewUsed, eq_serial: deal.eqSerial,
    amount: deal.amount || 0,
    dealer_id: deal.dealerId || null, dealer_name: deal.dealerName || '', lender_id: deal.lenderId || null,
    stage: deal.stage, source: deal.source, notes: deal.notes,
    terms: deal.terms || null, disposition: deal.disposition || null,
    accepted: deal.accepted ?? null, tax_choice: deal.taxChoice || null, show_tax_choice: deal.showTaxChoice || false,
    approval_letter: deal.approvalLetter || null,
    email_conf_sent: deal.emailConfSent || null, email_code_sent: deal.emailCodeSent || null,
    credit_app: deal.creditApp || null,
  };
  const { error } = await supabase.from('deals').upsert(row);
  if (error) console.error('saveDeal:', error);
  return !error;
}

export async function deleteDealFromDb(id) {
  const { error } = await supabase.from('deals').delete().eq('id', id);
  if (error) console.error('deleteDeal:', error);
}

// ── DEAL HISTORY ─────────────────────────────────────────────
export async function addDealHistory(dealId, stage, note) {
  const { error } = await supabase.from('deal_history').insert({
    deal_id: dealId, stage, note
  });
  if (error) console.error('addDealHistory:', error);
}

// ── DEAL ACTIVITIES ──────────────────────────────────────────
export async function addDealActivity(dealId, type, who, detail) {
  const { error } = await supabase.from('deal_activities').insert({
    deal_id: dealId, type, who, detail
  });
  if (error) console.error('addDealActivity:', error);
}

// ── DEAL DOCUMENTS ──────────────────────────────────────────
export async function addDealDoc(dealId, docId, name, uploadedBy, fileUrl) {
  const { error } = await supabase.from('deal_documents').insert({
    deal_id: dealId, doc_id: docId, name, uploaded_by: uploadedBy, file_url: fileUrl || null
  });
  if (error) console.error('addDealDoc:', error);
}

export async function removeDealDoc(dealId, docId) {
  const { error } = await supabase.from('deal_documents').delete().eq('deal_id', dealId).eq('doc_id', docId);
  if (error) console.error('removeDealDoc:', error);
}

// ── DEAL STIPS ──────────────────────────────────────────────
export async function addDealStip(dealId, stip) {
  const { error } = await supabase.from('deal_stips').insert({
    id: stip.id, deal_id: dealId, text: stip.text, done: stip.done || false,
    visibility: stip.visibility || 'all', category: stip.category || null, auto: stip.auto || false
  });
  if (error) console.error('addDealStip:', error);
}

export async function updateDealStip(id, updates) {
  const { error } = await supabase.from('deal_stips').update(updates).eq('id', id);
  if (error) console.error('updateDealStip:', error);
}

export async function removeDealStip(id) {
  const { error } = await supabase.from('deal_stips').delete().eq('id', id);
  if (error) console.error('removeDealStip:', error);
}

// ── DEAL FUNDING ITEMS ──────────────────────────────────────
export async function addDealFundingItem(dealId, item) {
  const { error } = await supabase.from('deal_funding_items').insert({
    id: item.id, deal_id: dealId, text: item.text, done: item.done || false,
    category: item.category || null, auto: item.auto || false
  });
  if (error) console.error('addDealFundingItem:', error);
}

export async function updateDealFundingItem(id, updates) {
  const { error } = await supabase.from('deal_funding_items').update(updates).eq('id', id);
  if (error) console.error('updateDealFundingItem:', error);
}

export async function removeDealFundingItem(id) {
  const { error } = await supabase.from('deal_funding_items').delete().eq('id', id);
  if (error) console.error('removeDealFundingItem:', error);
}

// ── DEAL NOTES ──────────────────────────────────────────────
export async function fetchDealNotes() {
  const { data, error } = await supabase.from('deal_notes').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchDealNotes:', error); return {}; }
  // Group by deal_id
  const grouped = {};
  (data || []).forEach(n => {
    if (!grouped[n.deal_id]) grouped[n.deal_id] = [];
    grouped[n.deal_id].push({ id: n.id, text: n.text, author: n.author, pinned: n.pinned, at: n.created_at });
  });
  return grouped;
}

export async function addDealNote(dealId, text, author) {
  const { data, error } = await supabase.from('deal_notes').insert({
    deal_id: dealId, text, author: author || 'admin'
  }).select().single();
  if (error) console.error('addDealNote:', error);
  return data;
}

// ── DEALERS ─────────────────────────────────────────────────
export async function fetchDealers() {
  const { data, error } = await supabase.from('dealers').select('*').order('name');
  if (error) { console.error('fetchDealers:', error); return []; }
  return data.map(d => ({
    id: d.id, name: d.name, contact: d.contact, email: d.email, phone: d.phone,
    address: d.address, password: d.password, commissionRate: d.commission_rate,
    notes: d.notes, active: d.active, createdAt: d.created_at
  }));
}

export async function saveDealer(dealer) {
  const row = {
    id: dealer.id, name: dealer.name, contact: dealer.contact, email: dealer.email,
    phone: dealer.phone, address: dealer.address, password: dealer.password,
    commission_rate: dealer.commissionRate || null, notes: dealer.notes, active: dealer.active ?? true
  };
  const { error } = await supabase.from('dealers').upsert(row);
  if (error) console.error('saveDealer:', error);
}

// ── ACCOUNTS ────────────────────────────────────────────────
export async function fetchAccounts() {
  const { data, error } = await supabase.from('accounts').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchAccounts:', error); return []; }
  // Fetch activities
  const accIds = data.map(a => a.id);
  const { data: acts } = await supabase.from('account_activities').select('*').in('account_id', accIds).order('created_at');
  return data.map(a => ({
    id: a.id, biz: a.biz, contact: a.contact, email: a.email, phone: a.phone,
    address: a.address, industry: a.industry, dateStarted: a.date_started, notes: a.notes,
    custPassword: a.cust_password, createdAt: a.created_at,
    activities: (acts?.data || acts || []).filter(x => x.account_id === a.id).map(x => ({
      id: x.id, type: x.type, who: x.who, detail: x.detail, at: x.created_at
    }))
  }));
}

export async function saveAccount(account) {
  const row = {
    id: account.id, biz: account.biz, contact: account.contact, email: account.email,
    phone: account.phone, address: account.address, industry: account.industry,
    date_started: account.dateStarted, notes: account.notes, cust_password: account.custPassword
  };
  const { error } = await supabase.from('accounts').upsert(row);
  if (error) console.error('saveAccount:', error);
}

export async function addAccountActivity(accountId, type, who, detail) {
  const { error } = await supabase.from('account_activities').insert({
    account_id: accountId, type, who, detail
  });
  if (error) console.error('addAccountActivity:', error);
}

// ── LENDERS ─────────────────────────────────────────────────
export async function fetchLenders() {
  const { data, error } = await supabase.from('lenders').select('*').order('name');
  if (error) { console.error('fetchLenders:', error); return []; }
  return data.map(l => ({
    id: l.id, name: l.name, code: l.code, contact: l.contact, email: l.email,
    phone: l.phone, address: l.address, taxRule: l.tax_rule, lienholder: l.lienholder,
    insListYMM: l.ins_list_ymm, insListVin: l.ins_list_vin, insPropertyCov: l.ins_property_cov,
    insMaxDeductible: l.ins_max_deductible, insCompCollision: l.ins_comp_collision,
    insACV: l.ins_acv, insAddlNotes: l.ins_addl_notes, active: l.active
  }));
}

export async function saveLender(lender) {
  const row = {
    id: lender.id, name: lender.name, code: lender.code, contact: lender.contact,
    email: lender.email, phone: lender.phone, address: lender.address,
    tax_rule: lender.taxRule, lienholder: lender.lienholder,
    ins_list_ymm: lender.insListYMM, ins_list_vin: lender.insListVin,
    ins_property_cov: lender.insPropertyCov, ins_max_deductible: lender.insMaxDeductible,
    ins_comp_collision: lender.insCompCollision, ins_acv: lender.insACV,
    ins_addl_notes: lender.insAddlNotes, active: lender.active ?? true
  };
  const { error } = await supabase.from('lenders').upsert(row);
  if (error) console.error('saveLender:', error);
}

// ── DEALER NOTES ────────────────────────────────────────────
export async function fetchDealerNotes() {
  const { data, error } = await supabase.from('dealer_notes').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchDealerNotes:', error); return []; }
  return data.map(n => ({
    id: n.id, dealId: n.deal_id, dealerId: n.dealer_id, dealerName: n.dealer_name,
    text: n.text, read: n.read, at: n.created_at
  }));
}

export async function addDealerNote(note) {
  const { error } = await supabase.from('dealer_notes').insert({
    deal_id: note.dealId, dealer_id: note.dealerId, dealer_name: note.dealerName,
    text: note.text, read: false
  });
  if (error) console.error('addDealerNote:', error);
}

export async function dismissDealerNoteDb(id) {
  const { error } = await supabase.from('dealer_notes').update({ read: true }).eq('id', id);
  if (error) console.error('dismissDealerNote:', error);
}

export async function dismissAllDealerNotesDb() {
  const { error } = await supabase.from('dealer_notes').update({ read: true }).eq('read', false);
  if (error) console.error('dismissAllDealerNotes:', error);
}

// ── REMINDERS ───────────────────────────────────────────────
export async function fetchReminders() {
  const { data, error } = await supabase.from('reminders').select('*').order('due_at');
  if (error) { console.error('fetchReminders:', error); return []; }
  return data.map(r => ({
    id: r.id, text: r.text, dueAt: r.due_at, dealId: r.deal_id, dealBiz: r.deal_biz,
    fired: r.fired, dismissed: r.dismissed, createdAt: r.created_at
  }));
}

export async function addReminderDb(reminder) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from('reminders').insert({
    user_id: user?.id, text: reminder.text, due_at: reminder.dueAt,
    deal_id: reminder.dealId || null, deal_biz: reminder.dealBiz || ''
  });
  if (error) console.error('addReminder:', error);
}

export async function updateReminderDb(id, updates) {
  const dbUpdates = {};
  if (updates.fired !== undefined) dbUpdates.fired = updates.fired;
  if (updates.dismissed !== undefined) dbUpdates.dismissed = updates.dismissed;
  if (updates.dueAt !== undefined) dbUpdates.due_at = updates.dueAt;
  const { error } = await supabase.from('reminders').update(dbUpdates).eq('id', id);
  if (error) console.error('updateReminder:', error);
}

export async function removeReminderDb(id) {
  const { error } = await supabase.from('reminders').delete().eq('id', id);
  if (error) console.error('removeReminder:', error);
}

// ── USER MANAGEMENT (calls API route) ───────────────────────
export async function adminCreateUser(params) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session?.access_token}` },
    body: JSON.stringify({ action: 'create_user', ...params })
  });
  return res.json();
}

export async function adminListUsers() {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session?.access_token}` },
    body: JSON.stringify({ action: 'list_users' })
  });
  return res.json();
}

export async function adminDeleteUser(userId) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session?.access_token}` },
    body: JSON.stringify({ action: 'delete_user', user_id: userId })
  });
  return res.json();
}
