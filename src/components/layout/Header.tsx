'use client'
import Logo from '../common/Logo'
import SearchBar from './SearchBar'
import MenuButton from '../ui/MenuButton'
import HeaderActions from './HeaderActions'

export default function Header() {
  return (
    <header className="header-container px-6 fixed top-0 left-0 right-0 z-20">
      {/* Desktop version  */}
      <div className="hidden items-center sm:flex sm:flex-nowrap py-2 justify-between">
        <div className="flex flex-row gap-7">
          <MenuButton />
          <div className="-mt-1">
            <Logo />
          </div>
        </div>
        <SearchBar />
        <HeaderActions />
      </div>
    </header>
  )
}
