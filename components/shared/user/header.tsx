import {ChatBubbleLeftIcon, CheckBadgeIcon, UserGroupIcon} from '@heroicons/react/24/solid'
import Markdown from "react-markdown";
import {Heading} from '@/components/shared/text'

export default function ProfileHeader({...props}: any) {
    const profile = props.user;
    const header = profile.header || props.defaults?.header;

    return (
        <div className={`${!header ? 'mt-12' : ''} relative z-10 pb-8 border border-default rounded-default bg-card`}>
            <div className={!header ? 'h-0' : ''}>
                {header ? <img className="rounded-default aspect-banner object-cover w-full pointer-events-none" src={header}
                               alt="Profile cover"/> : <div className="h-4"></div>}
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex">
                        <img
                            className="bg-default h-24 w-24 rounded-full ring-4 ring-white pointer-events-none dark:ring-neutral-800 sm:h-32 sm:w-32"
                            src={profile.avatar || props.defaults?.profile || '/img/avatar/default-avatar.png'} alt=""/>
                    </div>
                    <div
                        className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                            <Heading>
                                {profile.display_name || profile.username}
                                {profile.verified && <CheckBadgeIcon className="h-5 inline ml-1 text-primary" style={(
                                    profile.ui_skin?.primary
                                ) ? {
                                    color: profile.ui_skin.primary,
                                } : {}}/>}
                            </Heading>
                            {/* Small @username */}
                            <div className="flex items-center">
                                <p className="text-sm font-medium text-alt-2 truncate">
                                    @{profile.username}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                    <Heading>
                        {profile.username}
                    </Heading>
                </div>
                <div className="block min-w-0 flex-1 text-default">
                    {/* Bio */}
                    {profile.bio && (
                        <div className="mt-6 text-sm whitespace-pre-line">
                            <Markdown>{profile.bio}</Markdown>
                        </div>
                    )}

                    <div className="mt-2 flex flex-col text-sm text-alt-2">
                        <div className="flex">
                            {/* Follower count */}
                            {profile.followers !== undefined && (
                                <>
                                    <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5" aria-hidden="true"/>
                                    <span>
                                        {profile.followers} followers
                                    </span>
                                </>
                            )}

                            {/* Following count */}
                            {profile.following !== undefined && (
                                <>
                                    <span className="mx-2"> | </span>
                                    <span>
                                        {profile.following} following
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="flex">
                            {/* Post count */}
                            {profile.posts !== undefined && (
                                <>
                                    <ChatBubbleLeftIcon className="flex-shrink-0 mr-1.5 h-5 w-5" aria-hidden="true"/>
                                    <span>
                                        {profile.posts} posts
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
