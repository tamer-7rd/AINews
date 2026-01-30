import { HiBars3 } from 'react-icons/hi2'
import IconButton from './IconButton'

export default function MenuButton() {
  const openMenu = () => console.log('Menu opened')
  return <IconButton icon={<HiBars3 size={25} />} ariaLabel="Open menu" onClick={openMenu} />
}
