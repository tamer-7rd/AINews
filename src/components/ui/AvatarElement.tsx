import Image from 'next/image'

export default function AvatarElement() {
  const openUSerMenu = () => console.log('User menu opened')

  return (
    <button
      onClick={openUSerMenu}
      aria-label="Open user menu"
      className="rounded-full overflow-hidden w-10 h-10 flex items-center justify-center"
    >
      <Image
        src="/avatar_test.jpeg"
        alt="User avatar"
        width={40}
        height={40}
        className="w-full h-full object-cover rounded-full"
      />
    </button>
  )
}
