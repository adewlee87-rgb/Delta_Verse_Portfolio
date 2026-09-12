const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testInsert() {
  const { data, error } = await supabase.from('orders').insert({
    client_name: 'Test Client',
    project_name: 'Test Project',
    platform: 'Direct',
    status: 'Pending',
    deadline: '2027-01-01',
    price: 1500
  }).select();
  
  console.log("Data:", data);
  console.log("Error:", error);
}

testInsert();
