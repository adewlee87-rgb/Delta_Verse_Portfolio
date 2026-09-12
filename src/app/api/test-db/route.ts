import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from('orders').insert({
    client_name: 'Server Test',
    project_name: 'Test',
    platform: 'Direct',
    status: 'Pending',
    price: 1000
  }).select();

  return NextResponse.json({ data, error });
}
