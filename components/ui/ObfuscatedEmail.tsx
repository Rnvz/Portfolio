'use client'
import { useEffect, useState, ReactNode } from 'react'

interface ObfuscatedEmailProps {
  className?: string
  children?: (email: string) => ReactNode
}

export function ObfuscatedEmail({ className, children }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Split into parts — full address never exists as a string in source
    const user   = 'yohaneswenanta2410'
    const domain = 'gmail'
    const tld    = 'com'
    setEmail(`${user}@${domain}.${tld}`)
  }, [])

  if (!email) {
    return <noscript>Enable JavaScript to view email address</noscript>
  }

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      rel="noopener noreferrer"
      aria-label={`Send email to ${email}`}
    >
      {children ? children(email) : email}
    </a>
  )
}
