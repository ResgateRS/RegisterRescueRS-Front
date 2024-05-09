'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import data from './data.json'
import LoginForm from './form'
import './styles.css'

export default function LoginPage() {
  return (
    <section className="Login-container">
      <div className="Login-register-container">
        <h1 className="Login-title">{data.title}</h1>
        <h2 className="Login-subtitle">{data.subtitle}</h2>
        <Button
          className={cn(buttonVariants({ variant: 'outline' }), 'text-lg')}
        >
          solicitar cadastro
        </Button>
      </div>
      <div className="Login-form-container">
        <LoginForm />
      </div>
    </section>
  )
}
