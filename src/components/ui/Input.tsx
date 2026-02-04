// src/components/ui/Input.tsx
import cn from '@/lib/utils/cn'
import type { InputHTMLAttributes } from 'react'

type Props = {} & InputHTMLAttributes<HTMLInputElement> // extend with all native <input> attributes so this wrapper stays drop-in compatible

export default function Input({
  className = '', // comes from native input props via InputHTMLAttributes
  ...rest
}: Props) {
  const baseInputClasses =
    'searchbar-container w-full rounded-md border pl-4 pr-10 py-2 text-search sm:placeholder:font-light focus:outline-none'

  return (
    <div className="relative">
      <input className={cn(baseInputClasses, className)} {...rest} />
    </div>
  )
}
