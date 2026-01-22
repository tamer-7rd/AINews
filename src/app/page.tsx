import NewsCard from '@/features/news/components/NewsCard'

export default function Home() {
  return (
    <main className="main-container">
      <div className="flex flex-col sm:flex-row flex-nowrap py-5 px-4 gap-5">
        <NewsCard variant="secondary"></NewsCard>
        <NewsCard variant="secondary"></NewsCard>
        <NewsCard variant="secondary"></NewsCard>
        <NewsCard variant="secondary"></NewsCard>
      </div>
    </main>
  )
}
