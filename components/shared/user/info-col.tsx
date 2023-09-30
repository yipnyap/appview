import UserAvatar from '@/components/shared/user/avatar'
// @ts-ignore
import * as HoverCard from '@radix-ui/react-hover-card';
import Card from '@/components/shared/card'
import {Heading} from '@/components/shared/text'
import {LoadingSpinner} from '@/components/shared/icons'
import Markdown from 'react-markdown'

export default function UserInfoCol({ user, size }: {
    user: any; // object
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}) {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>
                <div className="flex flex-row gap-2">
                    <UserAvatar user={user} size={size} />
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">{user.username || user.avatar}</span>
                        <span className="text-xs text-neutral-500/50">{user.tag || 'piss'}</span>
                    </div>
                </div>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content side="bottom" align="start" sideOffset={5}>
                    <Card className="shadow w-fit">
                        {/* @todo: load from api? */}
                        {/*<LoadingSpinner />*/}
                        <div className="flex flex-col justify-center gap-2">
                            <div className="flex flex-row gap-2">
                                <UserAvatar user={user} size="lg" />
                                <div className="flex flex-col">
                                    <Heading>{user.username || user.avatar}</Heading>
                                    <span className="text-neutral-500/50">{user.tag || 'piss'}</span>
                                </div>
                            </div>

                            <div className="flex flex-row gap-2">
                                <p className="text-sm">
                                    <Markdown>
                                        {user.bio || 'They haven\'t written anything yet, but they\'re probably pretty cool.'}
                                    </Markdown>
                                </p>
                            </div>
                        </div>
                    </Card>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}