import { HiMagnifyingGlass } from 'react-icons/hi2'
import Input from '../ui/Input'

export default function SearchBar() {
  return (
    <div className="relative w-1/2">
      <Input
        type="text"
        placeholder="Search AI trends, models, or companies..."
        aria-label="Search website"
        className="hidden sm:block rounded-4xl"
      />
      <HiMagnifyingGlass
        // Hide on mobile, show on desktop (block)
        className="searchbar-icon block sm:absolute sm:right-7 sm:top-1/2 sm:-translate-y-1/2 size-7 sm:size-5 sm:pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
