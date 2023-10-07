import FeedList from '@/components/data-display/feed-list'

export default async function Home() {
  return (
      <div className="px-6 pb-6 md:p-10">
          <FeedList feedID="Guest" />
      </div>
  );
}
