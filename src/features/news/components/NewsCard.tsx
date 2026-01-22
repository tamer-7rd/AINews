import cn from '@/lib/utils/cn'

type Props = {
  variant?: 'primary' | 'secondary'
  className?: string
  imageUrl?: string
}

const placeholderUrl = 'https://placeholder.pics/svg/340x160'

export default function NewsCard({
  variant = 'secondary',
  imageUrl = placeholderUrl,
  className,
}: Props) {
  const defaultClasses = 'flex w-full'

  const variantClasses = {
    primary: '',
    secondary: 'flex-col',
  }
  return (
    <div className={cn(className, variantClasses[variant], defaultClasses)}>
      <div className="pb-4">
        <img src={imageUrl} alt="News article image" className="w-full h-auto object-cover" />
      </div>
      <div className="text-body flex flex-row justify-between">
        <a className="link-body">AI IN ACTION</a>
        <p className="news-date">December 20, 2025</p>
      </div>
      <div>
        <p className="text-body-bold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
          tortor, dignissim sit amet.
        </p>
      </div>
    </div>
  )
}
