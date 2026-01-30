import IconButton from './IconButton'
import { HiBell } from 'react-icons/hi2'

export default function NotificationButton() {
  const openNotificationMenu = () => console.log('Menu opened')
  return (
    <IconButton
      icon={<HiBell size={23} />}
      ariaLabel="Notification menu"
      onClick={openNotificationMenu}
    />
  )
}
