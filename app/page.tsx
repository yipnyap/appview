import FeedList from '@/components/data-display/feed-list'
import {Heading} from '@/components/shared/text'

export default async function Home() {
    // 2 column layout with w-80 sidebar, flex-grow main content
  return (
      <>
          <div className="flex flex-row items-center justify-between">
              <Heading>Feed</Heading>
          </div>
          <FeedList feedID="Guest"/>
      </>
  );
}
