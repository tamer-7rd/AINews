'use client'

import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import { usePathname } from 'next/navigation'

type NavItemProps = {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  activeIcon: ComponentType<SVGProps<SVGSVGElement>>
}

export default function NavItem({ href, label, icon, activeIcon }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const Icon = isActive ? activeIcon : icon

  return (
    <Link
      href={href}
      className=" 
                flex flex-col items-center justify-center gap-2 py-6
                transition-colors navitem-container
              "
    >
      <Icon className="w-6 h-6" />
      <span className="text-body">{label}</span>
    </Link>
  )
}
