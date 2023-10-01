'use client';

import {Fragment, useEffect, useState} from 'react'
import Image from 'next/image';
import InfiniteScroll from "react-infinite-scroll-component";
import Blocks from "editorjs-blocks-react-renderer";
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import {fetcher} from '@/lib/utils'
import FeedPost from './feed-post';
import {Heading, Text} from '@/components/shared/text'
import GridBody from '@/components/layout/grid-body'
import {LayoutDashboard} from 'lucide-react'
import WireframeGrid from '@/components/shared/icons/wireframe-grid'
import WireframeList from '@/components/shared/icons/wireframe-list'
import Card from '@/components/shared/card'
import Popover from '@/components/shared/popover'
import {useUIStore} from '@/lib/states'

export default function FeedList({...props}: {
    feedID: string;
    feedType?: 'feed' | 'user' | 'pack';
    onlyParent?: boolean;
}) {
    const [feedID, setFeedID] = useState<string>(props.feedID || 'Guest');
    const [postsReady, setPostsReady] = useState<boolean>(false);
    const [postsHasMore, setPostsHasMore] = useState<boolean>(false);
    const [postsCurrentPage, setPostsCurrentPage] = useState<number>(1);
    const [posts, setPosts] = useState<any>([]);
    const [masonryColumns, setMasonryColumns] = useState<{
        [key: number]: number;
    }>({350: 1, 750: 2, 900: 3, 1200: 4});

    const FeedViewConfig = useUIStore(state => state.feedView);

    useEffect(() => {
        if (props.feedID !== feedID) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setPosts([]);
            setFeedID(props.feedID || 'Guest');
            setPostsReady(false);
            setPostsHasMore(false);
            setPostsCurrentPage(1);
        }
    }, [props]);

    // Fire once
    useEffect(() => {
        fetchPosts();
    }, [feedID]);

    useEffect(() => {
        switch (FeedViewConfig) {
            default:
            case 1:
                setMasonryColumns({350: 1, 750: 2, 900: 3, 1200: 4});
                break;
            case 2:
                setMasonryColumns({350: 1});
                break;
        }
    }, [FeedViewConfig]);

    const fetchPosts = () => {
        const feed = props.feedID === 'Guest' ? '' : props.feedID;
        fetcher(`${process.env.NEXT_PUBLIC_YIPNYAP_CORE_URL}/v2/feed/?${props.feedType || 'feed'}=${feed}&page=${postsCurrentPage}${props.onlyParent ? '&onlyParent' : ''}`).then((res: any) => {
            setPosts([...posts, ...res.posts]);
            setPostsReady(true);
            setPostsHasMore(res.hasMore);
            setPostsCurrentPage(postsCurrentPage + 1);
        })
    }

    const LoadingCard = () => {
        return (
            <GridBody className="justify-center items-center h-full">
                <Card>
                    <Image src="/dog-on-ship.gif"
                           alt="Animated pixel dog in box panting before falling over, then looping."
                           height={128}
                           width={168}
                           style={{
                               imageRendering: 'pixelated',
                               display: 'inline-block',
                               marginTop: '-1px',
                               marginRight: '4px',
                           }}
                    />
                    <Text size="sm">
                        Loading posts for @<span className="font-bold">{feedID}</span>
                    </Text>
                </Card>
            </GridBody>
        )
    }

    return (
        <div className="p-12 h-full">
            {!postsReady && <LoadingCard />}

            {postsReady && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        feed {feedID} &mdash; {posts.length} posts &mdash; {postsHasMore ? 'has more' : 'no more'}
                        <FeedViewListbox />
                    </div>

                    {/* Center feed */}
                    <div className={FeedViewConfig !== 1 ? 'sm:flex sm:justify-center' : ''}>
                        {posts.length !== 0 && (
                            <InfiniteScroll
                                key={feedID}
                                className={FeedViewConfig !== 1 ? 'sm:max-w-md sm:w-screen' : ''}
                                dataLength={posts.length}
                                next={fetchPosts}
                                hasMore={postsHasMore}
                                loader={<LoadingCard />}
                                endMessage={
                                    <p className="text-sm text-neutral-500 text-center">
                                        And just like that, you{'\''}ve reached the end of it all.<br/>
                                        <span className="font-bold">No more posts to show.</span>
                                    </p>
                                }
                            >
                                {/* @ts-ignore */}
                                <ResponsiveMasonry
                                    columnsCountBreakPoints={masonryColumns}>
                                    {/* @ts-ignore */}
                                    <Masonry className="list-stagger" gutter="24px">
                                        <div className="max-w-md h-fit bg-card flex flex-col px-3 py-4 border rounded-default">
                                            <Heading>Welcome to Yipnyap!</Heading>
                                            <Text size="sm">
                                                This is your feed. It{'\''}s a collection of posts from people you follow.<br/>
                                                <span className="font-bold">Try following someone!</span>
                                            </Text>
                                        </div>
                                        <></>
                                        <></>
                                        <div className="max-w-md h-fit bg-card flex flex-col px-3 py-4 border rounded-default">
                                            <Heading size="xs">Active Groups</Heading>
                                            <Text size="sm">
                                                blah, blah.
                                            </Text>
                                        </div>

                                        {posts.map((post: any) => (
                                            <FeedListItem key={post.id} post={post} />
                                        ))}
                                    </Masonry>
                                </ResponsiveMasonry>
                            </InfiniteScroll>
                        )}
                    </div>

                    {posts.length === 0 && (
                        <p className="text-sm text-neutral-500 text-center">
                            Oddly enough, there{'\''}s nothing to show you here.<br/>
                            <span className="font-bold">Try following someone!</span>
                        </p>
                    )}
                </>
            )}
        </div>
    )
}

const views = [
    { id: 1, name: 'Grid', icon: WireframeGrid, unavailable: false },
    { id: 2, name: 'List', icon: WireframeList, unavailable: false },
]

function FeedViewListbox() {
    const [open, setOpen] = useState(false)

    const FeedViewConfig = useUIStore(state => state.feedView);
    const setFeedViewConfig = useUIStore(state => state.setFeedView);

    return (
        <div className="relative">
            <Popover
                content={
                    <div className="flex gap-4 bg-card px-3 py-4">
                        {views.map((view) => (
                            <div key={view.id}
                                 className={`flex flex-col items-center gap-2 p-2 cursor-pointer`}
                                 onClick={() => {
                                     setFeedViewConfig(view.id);
                                     setOpen(false);
                                 }}
                            >
                                <view.icon className="w-24 border rounded-default" />
                                <span>{view.name}</span>
                            </div>
                        ))}
                    </div>
                }
                align="end"
                openPopover={open}
                setOpenPopover={setOpen}
            >
                <LayoutDashboard className="w-8 h-8 cursor-pointer" />
            </Popover>
        </div>
    )
}

function FeedListItem({ post }: {
    post: any;
}) {
    return (
        <FeedPost
            key={post.id}
            post={post}
            // onDelete={() => posts = posts.filter((p: any) => p.id !== post.id)}
        >
            {typeof post?.content === 'object' ? (
                <article className="prose dark:prose-invert">
                    <Blocks data={post.content} config={{
                        code: {
                            className: "language-js block whitespace-pre overflow-x-scroll bg-box-alt"
                        },
                        delimiter: {
                            className: "border border-2 w-16 mx-auto"
                        },
                        embed: {
                            className: "border-0"
                        },
                        header: {
                            // className: "font-bold"
                        },
                        marker: {
                            className: "bg-yellow-200"
                        },
                        image: {
                            className: "w-full max-w-screen-md",
                            actionsClassNames: {
                                stretched: "w-full h-80 object-cover",
                                withBorder: "border border-2",
                                withBackground: "p-2",
                            }
                        },
                        list: {
                            className: "list-inside"
                        },
                        paragraph: {
                            className: "text-sm mb-2",
                            actionsClassNames: {
                                alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                            }
                        },
                        quote: {
                            className: "py-3 px-5 italic font-serif"
                        },
                        table: {
                            className: "table-auto"
                        }
                    }}/>
                </article>
            ) : post.content}
        </FeedPost>
    )
}
