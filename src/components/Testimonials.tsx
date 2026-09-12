import { createClient } from '@/utils/supabase/server'
import TestimonialsClient from './TestimonialsClient'

export default async function Testimonials() {
  const supabase = await createClient()
  
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (!testimonials || testimonials.length === 0) return null

  return <TestimonialsClient testimonials={testimonials} />
}
