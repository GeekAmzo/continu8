'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const SignupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Please enter your full name'),
})

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate
  const result = LoginSchema.safeParse(data)
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  // Sign in
  const { error, data: authData } = await supabase.auth.signInWithPassword(result.data)

  if (error) {
    return { error: error.message }
  }

  // Get user profile to determine redirect
  if (authData.user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !profile) {
      return { error: 'Profile not found. Please contact support.' }
    }

    if (profile.role === 'client') {
      redirect('/portal')
    } else if (['admin', 'sales', 'support'].includes(profile.role)) {
      redirect('/dashboard')
    } else {
      return { error: 'Invalid user role. Please contact support.' }
    }
  }

  return { error: 'Login failed. Please try again.' }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
  }

  // Validate
  const result = SignupSchema.safeParse(data)
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  // Sign up
  const { data: authData, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  if (authData.user) {
    // Create profile (default role: client for self-signup)
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email: result.data.email,
      full_name: result.data.fullName,
      role: 'client',
    })

    if (profileError) {
      return { error: 'Failed to create profile' }
    }
  }

  redirect('/portal')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
