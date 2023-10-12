/**
 * Forgive me, this is fucking horrible.
 */

import {useEffect, useRef, useState} from 'react';
import ms from 'ms';
import {
    EllipsisHorizontalIcon,
    ArrowUpOnSquareIcon,
    ChatBubbleLeftIcon,
    PaperAirplaneIcon,
    UserGroupIcon,
    HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import Link from 'next/link';
import Image from 'next/image';
import UserAvatar from '@/components/shared/user/avatar'
import UserInfoCol from '@/components/shared/user/info-col'
import {Drawer} from 'vaul'

export declare interface NGFeedPostDataType {
    id: string;
    likes?: number;
    user: {
        id: number,
        display_name: string,
        username: string,
        avatar: string,
        header: string,
        followers: number,
        following: number,
        posts: number,
        online: boolean,
    };
    content?: object | string;
    timestamp: number;
    likedParent?: boolean;
    replies?: NGFeedPostDataType[];
    tags?: string[];
    objects?: {
        id: string,
        url: string,
    }[];
    subcontent?: NGFeedPostDataType;

    group?: any;

    // only appears here, not API
    isShare?: boolean;
    sharingUser?: {
        id: number,
        display_name: string,
        username: string,
        avatar: string,
        header: string,
        followers: number,
        following: number,
        posts: number,
        online: boolean,
    };
}

export declare interface NGFeedPostType {
    post: NGFeedPostDataType;
    onDelete?: Function;
    noDrawer?: boolean;
    inDrawer?: boolean;

    theme?: any;
    children?: React.ReactNode;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function FeedPost({...props}: NGFeedPostType) {
    const [postContent, setPostContent] = useState(props.post);
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

    const DrawerRoot = props.inDrawer ? Drawer.NestedRoot : Drawer.Root;

    useEffect(() => {
        if (postContent?.subcontent) {
            const newContent = postContent.subcontent;
            newContent.isShare = true;
            newContent.sharingUser = postContent.user;
            setPostContent(postContent.subcontent);
        }
    }, []);

    return (
        <>
            <div className={`text-start h-fit bg-card flex flex-col border rounded-default`}>
                <div className="relative">
                    <div className="px-4 py-5">
                        {/* "___ Rehowled" */}
                        {postContent?.isShare && (
                            <div className="flex items-center text-sm mb-6">
                                <ArrowUpOnSquareIcon className="w-4 h-4 mr-2" />
                                <Link href={`/@${postContent?.sharingUser?.username}/`} className="flex gap-2 items-center text-default-alt">
                                    <UserAvatar user={postContent.sharingUser} />
                                    {postContent?.sharingUser?.username} rehowled
                                </Link>
                            </div>
                        )}
                        {postContent.group && (
                            <div className="flex items-center text-sm mb-6">
                                <UserGroupIcon className="w-4 h-4 mr-2" />
                                <Link href={`/pack/@${postContent?.group.GroupMeta?.slug}/`} className="flex gap-2 items-center text-default-alt">
                                    <UserAvatar user={postContent?.group.GroupMeta} />
                                    {postContent?.group.GroupMeta?.name}
                                </Link>
                            </div>
                        )}
                        <UserInfoCol user={postContent.user} inDrawer />
                    </div>

                    {/* @todo: this doesn't scale. make it scale :) */}
                    {!props.noDrawer ? (
                        <DrawerRoot shouldScaleBackground>
                            <Drawer.Trigger>
                                {/* Post Objects (Images) */}
                                {postContent?.objects && postContent.objects.length > 0 && (
                                    <MediaGrid objects={postContent.objects} selectState={[selectedMedia, setSelectedMedia]} post={postContent} truncate />
                                )}

                                <div
                                    className="min-h-fit w-full pb-3 px-4 cursor-pointer">
                                    <div
                                        className="text-sm text-start text-body space-y-4"
                                        style={{
                                            overflowWrap: 'anywhere'
                                        }}
                                    >
                                        {props.children}
                                    </div>
                                </div>
                            </Drawer.Trigger>
                            <Drawer.Portal>
                                <Drawer.Content className="drawer">
                                    <div className="overflow-y-auto">
                                        <FeedPost noDrawer {...props} />
                                    </div>
                                </Drawer.Content>
                            </Drawer.Portal>
                        </DrawerRoot>
                    ) : (
                        <>
                            {postContent?.objects && postContent.objects.length > 0 && (
                                <MediaGrid objects={postContent.objects} selectState={[selectedMedia, setSelectedMedia]} post={postContent} truncate />
                            )}

                            <div
                                className="min-h-fit w-full pb-3 px-4 cursor-pointer">
                                <div
                                    className="break-normal	text-sm text-start text-body space-y-4">
                                    {props.children}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Floating "User is typing..." card */}
                    {/*<div className="absolute bottom-0 left-0 ml-4 sm:ml-6 bg-box-alt border-x border-t border-b-0 border-solid border-neutral-300 dark:border-neutral-700 rounded-tl-xl rounded-tr-xl">*/}
                    {/*    <div className="flex items-center space-x-2 px-4 py-2">*/}
                    {/*        <div className="flex-shrink-0">*/}
                    {/*            <img className="h-4 w-4 rounded-full"*/}
                    {/*                    src={postContent.user.avatar || `/img/avatar/default-avatar.png`}*/}
                    {/*                    alt=""/>*/}
                    {/*        </div>*/}
                    {/*        <div className="min-w-0 flex-1">*/}
                    {/*            <p className="text-sm font-medium text-default cursor-pointer hover:underline">*/}
                    {/*                {postContent.user.username} is typing...*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/* Footer - Like & Share on left, rest of space taken up by a reply textbox with send icon on right */}
                <div className="px-4 py-4 sm:px-6 flex justify-between space-x-8 bg-box-alt border-t border-x-0 border-b-0 border-solid">
                    <div className="flex space-x-6">
                        <span
                            className="inline-flex items-center text-sm cursor-pointer hover:underline"
                        >
                                <HandThumbUpIcon className="h-5 w-5 text-neutral-400"
                                                 aria-hidden="true"/>
                            <span className="ml-2">{postContent.likes || 'Like'}</span>
                        </span>
                    </div>

                    {/* Textbox */}
                    <CommentBox className="flex-1" truncate post={[postContent, setPostContent]} />
                </div>
            </div>
        </>
    );
}

function CommentBox({...props}: any) {
    const [commentSubmitting, setCommentSubmitting] = useState(false);
    const commentRef = useRef<HTMLInputElement>(null);

    const createComment = (e?: { preventDefault: () => void; }) => {
        if (e) e.preventDefault();
        setCommentSubmitting(true);

        const commentBody = {
            content: commentRef.current?.value,
            ...(props.parent && { parent: props.parent })
        };
    }

    return (
        <div className={props.className}>
            <div className={classNames(
                commentSubmitting ? 'isolate relative overflow-hidden before:absolute before:inset-0 before:border before:border-solid before:border-x-0 before:border-b-0 before:border-t before:border-neutral-100/10 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-500/5 before:to-transparent' : '',
                "relative flex items-center rounded-default"
            )}>
                <input
                    type="text"
                    name="comment"
                    id="comment"
                    className="block w-full bg-body rounded-lg border placeholder:text-neutral-400 sm:text-sm dark:bg-body-dark focus:ring-primary"
                    placeholder="Comment"
                    ref={commentRef}
                />
                <div className="absolute items-center inset-y-0 right-0 flex py-2 pr-2 cursor-pointer">
                    {commentSubmitting ? (
                        <Image width={20}
                               height={20}
                               className="h-5 w-5 animate-spin dark:invert"
                               src="/symbolic/process-working.symbolic.png"
                               alt="Process working spinner"
                        />
                    ) : (
                        <PaperAirplaneIcon className="h-5 w-5 text-default" onClick={createComment} />
                    )}
                </div>
            </div>
        </div>
    )
}

function FeedListItem({...props}: any) {
    const {reply, showLine, post} = props;
    const [likes,] = useState(reply.likes || 0);
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [, setPostContent] = post;

    if (reply.id.indexOf(':') > -1) {
        reply.id = reply.id.split(':')[1]
    }

    const handleReplySubmit = (commentBody: any, newPostContent: any, commentID: string) => {
        setShowReplyBox(false);

        // we need to append the comment to the replies to the reply
        newPostContent.replies.forEach((reply: any) => {
            // if we're replying to a reply, we need to find the reply we're replying to inside the replies of the reply
            if (reply.replies) {
                reply.replies.forEach((replyReply: any) => {
                    // just one more
                    if (replyReply.replies && replyReply.id === commentBody.parent) {
                        replyReply.replies.forEach((replyReplyReply: any) => {
                            console.log(replyReplyReply.id, commentID);
                            if (replyReplyReply.id === commentID) {
                                // we just need to change forceRender to true.
                                replyReplyReply.forceRender = true;
                                replyReply.forceRender = true;
                            }
                        });
                    }
                });
            }
        });

        setPostContent(newPostContent);
    }

    return (
        <li>
            <div className="relative pb-8">
                {showLine ? (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
                ) : null}
                <div className="group relative flex flex-col items-start space-x-3 rounded-default cursor-pointer hover:bg-box">
                    {reply.id.startsWith('03I4') ? (
                        <>
                            <div className="relative flex flex-row items-start space-x-3">
                                <div className="relative">
                                    {/*<NGAvatar image={reply.user.avatar} online={reply.user.online} className="bg-box-alt flex items-center justify-center rounded-full ring-8 ring-[#fafafa] dark:ring-[#2d2d2d]" />*/}

                                    {reply.likedParent && (
                                        <span className="absolute -bottom-0.5 -right-1 bg-box-alt rounded-default px-0.5 py-px">
                                            <HandThumbUpIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                                        </span>
                                    )}
                                </div>
                                <div className="relative min-w-0 flex-1">
                                    <div>
                                        <div className="text-sm">
                                            <a href={`/@${reply.user.username}/`} className="font-medium text-default">
                                                {reply.user.display_name || reply.user.username}
                                            </a>
                                        </div>
                                        <p className="text-sm text-default-alt">
                                            {reply.timestamp ? (
                                                <time
                                                    dateTime={(reply.timestamp * 1000).toString()}>
                                                    {ms(reply.timestamp * 1000, { long: true })}
                                                </time>
                                            ) : (
                                                reply.user.username
                                            )}
                                        </p>
                                    </div>

                                    <div
                                        className="mt-2 text-sm text-default break-words"
                                        style={{wordBreak: 'break-word'}} // fix for long links
                                        onClick={props.onClick}
                                    >
                                        {reply.content}
                                    </div>
                                </div>
                            </div>

                            {/* Settings on hover */}
                            <div className="hidden group-hover:block absolute top-0 right-0 -mr-2 -mt-2">
                                <div className="flex relative z-10 space-x-4 items-center">
                                    {/* Reply & Like */}
                                    <div className="flex flex-row items-center justify-between bg-box-alt rounded-default">
                                        <div className="flex flex-row items-center">
                                            <div
                                                className="flex flex-row items-center space-x-2 p-2 rounded-default hover:bg-box"
                                            >
                                                <HandThumbUpIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                                                {likes > 0 && (
                                                    <span className="text-sm text-default-alt">{likes}</span>
                                                )}
                                            </div>
                                            <div
                                                className="flex flex-row items-center space-x-2 p-2 rounded-default hover:bg-box"
                                                onClick={() => setShowReplyBox(!showReplyBox)}
                                            >
                                                <ChatBubbleLeftIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="flex items-center justify-center h-8 w-8 rounded-full bg-box-alt text-default hover:bg-box"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        <span className="sr-only">Open options</span>
                                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            {/* Comment box to reply */}
                            {showReplyBox && (
                                <div className="flex flex-row items-center mt-2">
                                    <CommentBox post={post} parent={reply.id} onSubmit={handleReplySubmit} />
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
            </div>
        </li>
    )
}

// Goes through replies, and calls itself again with padding if there are replies within replies.
function RecursiveCommentThread({...props}: any) {
    const {reply, showLine, post} = props;

    return (
        <>
            <FeedListItem reply={reply} showLine={showLine || false} post={post} />
            {reply.replies && reply.replies.length > 0 && reply.replies.map((replyInside: any, replyInsideIdx: any) => (
                <>
                    <div className="pl-12">
                        <RecursiveCommentThread key={replyInsideIdx} reply={replyInside} showLine={replyInsideIdx !== reply.replies.length - 1} post={post} />
                    </div>
                </>
            ))}
        </>
    )
}

function MediaGrid({...props}: any) {
    const {objects} = props;

    return (
        <div className="pb-5">
            {objects[0]?.id?.split(':')[1].substring(2, 4) === 'C2' && (
                <video
                    src={objects[0].url}
                    className="aspect-w-10 aspect-h-7 object-cover"
                    controls
                />
            )}

            {objects.map((object: { url: string; id: string; }, objectIndex: number) => {
                // Check E2 for object variant
                switch (object.id?.split(':')[1].substring(2, 4)) {
                    case 'C1':
                        return (
                            <>
                                <Image
                                    key={objectIndex}
                                    src={object.url} alt="" width={512} height={512}
                                    style={{
                                        width: '100%',
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                    }}
                                />
                            </>
                        )
                }
            })}
        </div>
    )
}
