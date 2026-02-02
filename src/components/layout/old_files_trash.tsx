'use client'

import { useCallback, useEffect, useState } from 'react'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import Button from '../ui/Button'
import Logo from '../common/Logo'
import SearchBar from './SearchBar'
import Navigation from './Navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [closeMenu, isMobileMenuOpen])

  return (
    <header className="header-container px-4">
      {/* Desktop version  */}
      <div className="hidden items-center sm:flex sm:flex-nowrap py-1">
        <Logo className="flex-shrink-0 mb-0.5" />
        <SearchBar className="sm:flex-1 sm:px-4" />
        <Button variant="primary">Sign in</Button>
      </div>

      {/* Mobile version  */}
      <div className="sm:hidden items-center flex justify-between py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <SearchBar />
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label="Open navigation menu"
            onClick={toggleMenu}
          >
            <HiBars3 className="size-7" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile opened menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="z-40 inset-0  backdrop-blur-sm bg-[#181a1b]/75 sm:hidden fixed"
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="z-50 sm:hidden fixed inset-0 flex flex-col m-5 overflow-y-auto"
          >
            <div className="flex justify-between items-center">
              <Logo />
              <button type="button" aria-label="Close navigation menu" onClick={closeMenu}>
                <HiXMark className="size-7" />
              </button>
            </div>

            <div className="flex flex-col py-7 gap-3">
              <Button variant="primary">Subscribe</Button>
              <Button variant="primary">Sign in</Button>
            </div>

            <Navigation
              className="w-1/3"
              onItemClick={closeMenu}
              ariaLabel="Mobile Primary Navigation"
              orientation="vertical"
              withLabels
              withIcons
              linkKey="mainNavLinks" // keys variants defined in Navigation.tsx
              iconClassName="size-6"
              linkClassName="flex gap-3 py-3 text-lg tracking-wide"
            />
          </div>
        </>
      )}
    </header>
  )
}

import CustomLink from '../ui/Link'
import { mainNavLinks, exploreLinks, companyLinks, socialLinks } from '@/lib/constants/routes'
import cn from '@/lib/utils/cn'

const linkArrays = {
  mainNavLinks: mainNavLinks,
  exploreLinks: exploreLinks,
  companyLinks: companyLinks,
  socialLinks: socialLinks,
}

type Props = {
  ariaLabel?: string
  className?: string
  orientation?: 'horizontal' | 'vertical'
  linkClassName?: string
  listClassName?: string
  iconClassName?: string
  withIcons?: boolean
  withLabels?: boolean
  linkKey: keyof typeof linkArrays // Union Type (|) of String Literal Types ("mainNavLinks" | "exploreLinks" | "companyLinks" | "socialLinks")
  onItemClick?: () => void
}

export default function Navigation({
  className,
  ariaLabel = 'Primary',
  orientation = 'horizontal',
  linkClassName = '',
  listClassName = '',
  iconClassName = '',
  withIcons = false,
  withLabels = false,
  linkKey,
  onItemClick,
}: Props) {
  const baseListClasses = orientation === 'vertical' ? 'flex flex-col' : 'flex'

  const links = linkArrays[linkKey]

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className={cn(baseListClasses, listClassName)}>
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <CustomLink href={href} className={linkClassName} onClick={onItemClick}>
              {withIcons && Icon && <Icon className={iconClassName} aria-hidden="true" />}
              <span>{withLabels && label}</span>
            </CustomLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
