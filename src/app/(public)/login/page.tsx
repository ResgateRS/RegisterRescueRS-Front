'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import data from './data.json'
import LoginForm from './form'
import './styles.css'

export default function LoginPage() {
  return (
    <section className="Login-container">
      <div className="Login-register-container">
        <h1 className="Login-title">{data.title}</h1>
        <h2 className="Login-subtitle">{data.subtitle}</h2>
        <Link
          href="https://wa.me/55XXXXXXXXXXX?text=Olá!%20Gostaria%20de%20solicitar%20um%20cadastro!"
          className={cn(buttonVariants({ variant: 'outline' }), 'text-lg')}
        >
          solicitar cadastro
        </Link>
      </div>
      <div className="Login-form-container">
        <LoginForm />
      </div>
    </section>
  )
}
