import type { ComponentType, SVGProps } from 'react'
import { HiChartBar, HiHome, HiNewspaper } from 'react-icons/hi2'
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

type NavLink = {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  // Это единственный способ в TypeScript передать структуру данных внутрь другого типа. (то что сверху этого коммента)
}

type FooterLink = {
  href: string
  label: string
  isExternal?: boolean
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const mainNavLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: HiHome },
  { href: '/news', label: 'AI News', icon: HiNewspaper },
  { href: '/analytics', label: 'Analytics', icon: HiChartBar },
]

export const exploreLinks: FooterLink[] = [
  { href: '/news', label: 'AI News' },
  { href: '/agi-progress', label: 'AGI Progress' },
  { href: '/business-impact', label: 'Business Impact' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/for-companies', label: 'For Companies' },
]

export const companyLinks: FooterLink[] = [
  { href: '/about', label: 'About Us' },
  { href: '/subscribe', label: 'Subscription Plans' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
]

export const socialLinks: FooterLink[] = [
  { href: 'https://twitter.com', label: 'Twitter', isExternal: true, icon: FaTwitter },
  { href: 'https://linkedin.com', label: 'LinkedIn', isExternal: true, icon: FaLinkedin },
  { href: 'https://instagram.com', label: 'Instagram', isExternal: true, icon: FaInstagram },
  { href: 'https://facebook.com', label: 'Facebook', isExternal: true, icon: FaFacebook },
]
