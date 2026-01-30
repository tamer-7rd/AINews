import AvatarElement from '../ui/AvatarElement'

export default function UserMenuTrigger() {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col text-profile">
        <p>Tamerlan O.</p>
        <p className="text-plan">Pro Plan</p>
      </div>
      <AvatarElement />
    </div>
  )
}
