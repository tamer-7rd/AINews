import type { ComponentType, SVGProps } from 'react'
import {
  HiChartBar,
  HiHome,
  HiNewspaper,
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineNewspaper,
} from 'react-icons/hi2'
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

type NavLinkProps = {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  activeIcon: ComponentType<SVGProps<SVGSVGElement>>
}

type SocialLinkProps = {
  href: string
  label: string
  isExternal?: boolean
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const mainNavLinks: NavLinkProps[] = [
  { href: '/', label: 'Home', icon: HiOutlineHome, activeIcon: HiHome },
  { href: '/news', label: 'News', icon: HiOutlineNewspaper, activeIcon: HiNewspaper },
  { href: '/analytics', label: 'Analytics', icon: HiOutlineChartBar, activeIcon: HiChartBar },
]

export const socialLinks: SocialLinkProps[] = [
  { href: 'https://twitter.com', label: 'Twitter', isExternal: true, icon: FaTwitter },
  { href: 'https://linkedin.com', label: 'LinkedIn', isExternal: true, icon: FaLinkedin },
  { href: 'https://instagram.com', label: 'Instagram', isExternal: true, icon: FaInstagram },
  { href: 'https://facebook.com', label: 'Facebook', isExternal: true, icon: FaFacebook },
]
