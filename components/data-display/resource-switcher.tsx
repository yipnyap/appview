'use client'

import {useEffect, useState} from 'react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Logo} from '@/components/shared/icons/logo'
import {Text} from '@/components/shared/text'
import UserAvatar from '@/components/shared/user/avatar'
import useComponentVisible from '@/lib/hooks/use-component-visible'
import useSound from 'use-sound'
import {PlayFunction} from 'use-sound/dist/types'

export default function ResourceSwitcher() {
    // sound refs
    const [initialSound] = useSound('/sounds/switcher.ogg')
    const [switchedSound] = useSound('/sounds/switched.ogg')

    const resourceDefault = {
        did: '_universe.yipnyap.me',
        name: `Pre-Alpha ${process.env.NEXT_PUBLIC_COMMIT_HASH}`,
        standalone: true,
    }

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
    const [currentResource, setCurrentResource] = useState<{
        did: string;
        name: string;
        standalone?: boolean;
        icon?: string;
    }>(resourceDefault)

    const availableResources: {
        did: string;
        name: string;
        standalone?: boolean;
        icon?: string;
    }[] = [
        resourceDefault,
        {
            did: 'localhost:3000',
            name: 'Yipnyap Feedback',
        },
        {
            did: 'floodchat.pack.yipnyap.me',
            name: 'The Flood Chat',
            icon: 'https://cdn.discordapp.com/icons/333623134152294401/4352917374ecb07503ef9022a75de44d.webp?size=96',
        },
        {
            did: 'rjojw.pack.yipnyap.me',
            name: 'Rek\'s... slay\'s',
            icon: 'https://cdn.discordapp.com/icons/1116547738629320774/e9d8187dba27013aece701d6a43b16a4.webp?size=96'
        },
        {
            did: 'sozlol.pack.yipnyap.me',
            name: 'These aren\'t real',
        },
    ]

    const playSound = (sound: PlayFunction) => {
        sound()
    }

    useEffect(() => {
        // shimmer on change using ref
        if (ref.current) {
            ref.current.classList.add('before:animate-shimmer-fast')
            setTimeout(() => {
                ref.current.classList.remove('before:animate-shimmer-fast')
            }, 500)
        }
    }, [currentResource])

    return (
        <div ref={ref} className="flex flex-row items-center justify-between shimmer-template">
            <span className="flex z-10 w-full justify-between items-center cursor-pointer" onClick={() => {
                if (!isComponentVisible) playSound(initialSound)
                setIsComponentVisible(!isComponentVisible)
            }}>
                {!currentResource || currentResource.standalone ? (
                    <div className="flex h-10 items-center space-x-2">
                        <Logo className="w-8 h-8"/>
                        <Text className="font-bold">{currentResource.name}</Text>
                    </div>
                ) : (
                    <Resource name={currentResource.name} did={currentResource.did} icon={currentResource.icon} />
                )}
                <ChevronDownIcon className="w-6 h-6 text-neutral-500 dark:text-white"/>
            </span>

            {/* switcher */}
            <div>
                {isComponentVisible && (
                    <div
                        className="absolute animate-fade-in top-0 left-0 bg-white border-b w-full rounded rounded-tr-none rounded-tl-none shadow-sm pt-[64px] dark:bg-n-7">
                        <div className="relative max-h-80 overflow-y-auto">
                            <div className="flex flex-col">
                                {/* loop excluding current */}
                                {availableResources.map((resource) => {
                                    if (resource.did === currentResource.did) return null
                                    return (
                                        <div key={resource.did} className="flex flex-col"
                                             onClick={() => {
                                                 playSound(switchedSound)
                                                 setCurrentResource(resource)
                                                 setIsComponentVisible(false)
                                             }}>
                                            {resource.standalone && (
                                                <div
                                                    className="flex items-center py-3 px-5 space-x-2 hover:bg-hover cursor-pointer">
                                                    <Logo className="w-8 h-8"/>
                                                    <Text className="font-bold">{resource.name}</Text>
                                                </div>
                                            )}

                                            {!resource.standalone && (
                                                <div className="py-3 px-5 hover:bg-hover cursor-pointer">
                                                    <Resource name={resource.name} did={resource.did} icon={resource.icon} />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function Resource({name, did, icon}: {
    name: string;
    did: string;
    icon?: string;
}) {
    return (
        <span className="flex min-w-0 items-center justify-between space-x-3">
            <UserAvatar name={name} size={40} avatar={icon}
                        className="inline-flex h-10 w-10 rounded overflow-hidden"/>
            <span className="flex-1 flex flex-col min-w-0">
                <span className="truncate">{name}</span>
                <span className="text-alt truncate">{did}</span>
            </span>
        </span>
    )
}