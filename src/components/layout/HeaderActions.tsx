import NotificationButton from '../ui/NotificationButton'
import UserMenuTrigger from './UserMenuTrigger'

export default function HeaderActions() {
  return (
    <div className="flex flex-row items-center gap-7">
      <NotificationButton />
      <div className="h-8 w-px bg-gray-500 opacity-50"></div>
      <UserMenuTrigger />
    </div>
  )
}
