'use client'

import data from './data.json'
import LoginForm from './form'
import './styles.css'

export default function LoginPage() {
  return (
    <section className="Login-container">
      <div className="Login-register-container">
        <h1 className="Login-title">{data.title}</h1>
        <span className="Login-subtitle">{data.subtitle}</span>
      </div>
      <div className="Login-form-container">
        <LoginForm />
      </div>
    </section>
  )
}
