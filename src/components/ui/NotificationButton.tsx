import IconButton from './IconButton'
import { HiOutlineBell } from 'react-icons/hi2'

export default function NotificationButton() {
  const openNotificationMenu = () => console.log('Menu opened')
  return (
    <IconButton
      icon={<HiOutlineBell size={23} />}
      ariaLabel="Notification menu"
      onClick={openNotificationMenu}
    />
  )
}
