import cn from '@/lib/utils/cn'

type IconButtonProps = {
  //  обертка для иконки внутри кнопок
  icon: React.ReactNode
  isPressed?: boolean // для toggle (bookmark, menu open)
  hasNotification?: boolean // для notification dot
  onClick?: () => void
  ariaLabel: string
  className?: string
}

export default function IconButton({
  icon,
  isPressed = false,
  onClick,
  ariaLabel,
  className,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      // aria-pressed сообщает скринридерам, что кнопка нажата (как toggle)
      aria-pressed={isPressed}
      aria-label={ariaLabel}
      className={cn('items-center justify-center', className)}
    >
      {icon}
    </button>
  )
}
