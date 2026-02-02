import type { ComponentType, SVGProps } from 'react'
import { HiChartBar, HiHome, HiNewspaper } from 'react-icons/hi2'
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

type NavLinkProps = {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  // Это единственный способ в TypeScript передать структуру данных внутрь другого типа. (то что сверху этого коммента)
}

type SocialLinkProps = {
  href: string
  label: string
  isExternal?: boolean
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const mainNavLinks: NavLinkProps[] = [
  { href: '/', label: 'Home', icon: HiHome },
  { href: '/news', label: 'News', icon: HiNewspaper },
  { href: '/analytics', label: 'Analytics', icon: HiChartBar },
]

export const socialLinks: SocialLinkProps[] = [
  { href: 'https://twitter.com', label: 'Twitter', isExternal: true, icon: FaTwitter },
  { href: 'https://linkedin.com', label: 'LinkedIn', isExternal: true, icon: FaLinkedin },
  { href: 'https://instagram.com', label: 'Instagram', isExternal: true, icon: FaInstagram },
  { href: 'https://facebook.com', label: 'Facebook', isExternal: true, icon: FaFacebook },
]
