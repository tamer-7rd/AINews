'use client'

import NavItem from './NavItem'
import { mainNavLinks } from '@/lib/constants/routes'

export default function SidebarNav() {
  return (
    <div className="w-18 fixed top-14 bottom-0 left-0 z-10">
      <nav className="hidden sm:flex sm:flex-col">
        {mainNavLinks.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </nav>
    </div>
  )
}
