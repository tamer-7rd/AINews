'use client'

import cn from '@/lib/utils/cn'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const defaultClasses = 'border button-border rounded-4xl text-button sm:font-base min-w-40 p-2'

  const variantClasses = {
    primary: 'btn-primary decoration-1 duration-300',
    secondary: 'btn-secondary',
  }

  return (
    <button onClick={onClick} className={cn(defaultClasses, variantClasses[variant], className)}>
      {children}
    </button>
  )
}
