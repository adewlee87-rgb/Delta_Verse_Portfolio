import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-border shadow-xl">
        <h1 className="font-heading text-3xl font-bold text-center mb-2">Login</h1>
        <p className="text-secondary text-center mb-8 text-sm">Access your secure dashboard</p>
        <LoginForm />
      </div>
    </div>
  )
}
