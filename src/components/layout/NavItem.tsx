'use client'

import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import { usePathname } from 'next/navigation'

type NavItemProps = {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export default function NavItem({ href, label, icon }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const Icon = icon

  return (
    <Link
      href={href}
      className={`
                flex flex-col items-center justify-center gap-2 py-6
                hover:bg-gray-800 transition-colors
                ${isActive ? 'text-white' : 'text-gray-400'}
            `}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs uppercase font-medium">{label}</span>
    </Link>
  )
}
