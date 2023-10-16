import FeedList from '@/components/data-display/feed-list'
import Navbar from '@/components/layout/navbar'
import Image from 'next/image'
import {Heading, Text} from '@/components/shared/text'
import {TrashIcon} from '@heroicons/react/20/solid'
export default async function Home() {
  return (
      <div className="relative h-full w-full">
          <div className="absolute px-6 pb-6 md:p-10 overflow-y-auto h-full w-[calc(100%-24rem)]">
              <FeedList feedID="Guest" />
          </div>

          {/* Right content bar */}
          <div className="hidden top-0 right-0 w-96 h-full flex-col border-l md:flex md:absolute">
              <div className="flex justify-end items-center h-20 px-6 border-b gap-8 md:gap-6 md:p-10">
                  <Navbar />
              </div>

              <div className="flex flex-col items-center w-full gap-4 px-6 md:p-10">
                  <div className="flex w-full justify-between items-center gap-4">
                      <Text size="sm" className="text-alt">
                          Activity
                      </Text>
                      <TrashIcon className="w-5 h-5 text-alt" />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                      <Image src="/img/welcome.png" alt="Welcome to Yipnyap!" width={256} height={256} quality={100} />
                      <Heading className="text-center">
                            Stay above the chaos
                      </Heading>
                      <Text size="sm" className="text-center text-alt unicorn:text-on-surface-variant">
                          Your friends and following activity appear here, as well as chat messages.
                      </Text>
                  </div>
              </div>
          </div>
      </div>
  );
}
