'use client'

import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Logo} from '@/components/shared/icons/logo'
import {Text} from '@/components/shared/text'
import UserAvatar from '@/components/shared/user/avatar'
import useComponentVisible from '@/lib/hooks/use-component-visible'
import useSound from 'use-sound'
import {PlayFunction} from 'use-sound/dist/types'
import {toast} from '@/lib/toast'
import {useCurrentEditor} from '@tiptap/react'
import {useResourceStore, useResourceUIStore} from '@/lib/states'
import {useEffect, useState} from 'react'
import {LoadingCircle, LoadingSpinner} from '@/components/shared/icons'
import {fetcher} from '@/lib/utils'

export default function ResourceSwitcher() {
    // sound refs
    const [initialSound] = useSound('/sounds/switcher.ogg')
    const [switchedSound] = useSound('/sounds/switched.ogg')
    const [cancelSound] = useSound('/sounds/switchcancel.ogg')
    const [hoverSound] = useSound('/sounds/switch-hover-s.ogg', {
        volume: 0.25,
        interrupt: true,
    })
    const [heavyHoverSound] = useSound('/sounds/switch-hover.ogg')
    const [failedSound] = useSound('/sounds/switch-failed.ogg')

    const {currentResource, resourceDefault, setCurrentResource} = useResourceStore()
    const {loading, setLoading} = useResourceUIStore()
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
    // fuck you nextjs
    const [domReady, setDomReady] = useState(false)

    const availableResources: {
        id: string | number;
        name: string;
        standalone?: boolean;
        icon?: string;
    }[] = [
        resourceDefault,
        {
            id: 'floodchat',
            name: 'The Flood Chat',
            icon: 'https://cdn.discordapp.com/icons/333623134152294401/4352917374ecb07503ef9022a75de44d.webp?size=96',
        },
        {
            id: 'rjojw',
            name: 'Rek\'s... slay\'s',
            icon: 'https://cdn.discordapp.com/icons/1116547738629320774/e9d8187dba27013aece701d6a43b16a4.webp?size=96'
        },
        {
            id: 'sozlol',
            name: 'These aren\'t real',
        },

        // taken from https://api.yipnyap.me/api/v2/member/1/groups
        {
            name: "my lil kittens",
            id: "kittycentral",
            icon: "https://api.yipnyap.me/vault/@server/themes/hb-theme/img/avatar/default-avatar.png",
        },
        {
            name: "bra hate group",
            id: 'bra-hate-group',
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/27/avatars/1668762746-bpfull.png",
        },
        {
            name: "Therian/Otherkin",
            id: "therian-otherkin",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/62/avatars/1689289531-bpfull.png",
        },
        {
            name: "mariah carey support group",
            id: "mariah-carey-support-group",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/31/avatars/1671430179-bpfull.png",
        },
        {
            name: "OC Lore",
            id: "oc-lore-discussion",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/17/avatars/1667917892-bpfull.png",
        },
        {
            id: "oc-reference-share",
            name: "OC Reference Share",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/10/avatars/1667840041-bpfull.png",
        },
        {
            id: "sfw-art-commissions",
            name: "SFW Art Commissions",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/7/avatars/1667776775-bpfull.png",
        },
        {
            id: "foxes-every-day",
            name: "Foxes Every Day",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/19/avatars/1667929898-bpfull.jpg",
        },
        {
            name: "Car Furs",
            id: "car-furs",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/18/cover-image/636a8b9646a9d-yp-cover-image.jpg",
        },
        {
            name: "Rhythm Game Furs",
            id: "rhythm-game-furs",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/16/avatars/1667916953-bpfull.jpg",
        },
        {
            name: "The Critique Place",
            id: "the-critique-place",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/13/avatars/1667857287-bpfull.png",
        },
        {
            name: "A Goofy Silly Little Place",
            id: "a-goofy-silly-little-place",
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/5/avatars/1667762903-bpfull.jpg",
        },
        {
            name: "Yipnyap Feedback",
            id: 'yipnyap-feedback',
            icon: "https://api.yipnyap.me/vault/@server/uploads/groups/2/avatars/1668149891-bpfull.png",
        }
    ]

    const playSound = (sound: PlayFunction) => {
        sound()
    }

    const switchResource = (resource: any) => {
        playSound(resource.id === resourceDefault.id ? cancelSound : switchedSound)
        setLoading(true)
        setCurrentResource(resource)

        if (ref.current) {
            ref.current.classList.add('before:animate-shimmer-fast')
            setTimeout(() => {
                if (resource.standalone) {
                    setLoading(false)
                    playSound(heavyHoverSound)
                    ref.current.classList.remove('before:animate-shimmer-fast')
                    return
                }

                fetcher(`${process.env.NEXT_PUBLIC_YIPNYAP_CORE_URL}/v2/groups/${resource.id}`).then((res) => {
                    if (res.E2ID) {
                        playSound(heavyHoverSound)
                    } else {
                        toast.error('The resource is experiencing an outage.', {
                            description: `"${resource!.name}" is not available. You have been switched back to the Universe.`,
                        })
                        playSound(failedSound)
                    }

                    setLoading(false)
                    ref.current.classList.remove('before:animate-shimmer-fast')
                }).catch((err) => {
                    toast.error('The resource is experiencing an outage.', {
                        description: `"${resource!.name}" is not available. You have been switched back to the Universe.`,
                    })
                    playSound(failedSound)
                    setLoading(false)
                    ref.current.classList.remove('before:animate-shimmer-fast')
                })
            }, 1000)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDomReady(true)
        }
    }, [])

    return (
        <>
            {domReady ? (
                <div ref={ref}
                     className="group flex flex-row items-center justify-between cursor-pointer shimmer-template select-none"
                     onClick={() => {
                         if (loading) return
                         if (!isComponentVisible) playSound(initialSound)
                         setIsComponentVisible(!isComponentVisible)
                     }}>
                    <span className="flex z-10 w-full justify-between items-center">
                        {!currentResource || currentResource.standalone ? (
                            <div className="flex h-10 items-center space-x-2">
                                <Logo className="w-8 h-8"/>
                                <Text className="font-bold">{currentResource.name}</Text>
                            </div>
                        ) : (
                            <Resource name={currentResource.name} id={currentResource.id} icon={currentResource.icon}/>
                        )}
                        <ChevronDownIcon className="w-6 h-6 text-neutral-500 dark:text-white"/>
                    </span>

                    {/* switcher */}
                    <div>
                        <div
                            className={`absolute top-0 left-0 ${isComponentVisible ? 'h-screen' : 'h-full opacity-0 group-hover:opacity-100'} transition-all bg-white border-b w-full rounded rounded-tr-none rounded-tl-none shadow-sm pt-[64px] dark:bg-n-7`}>
                            {isComponentVisible && (
                                <div className="relative h-full switcher-list-stagger overflow-y-auto">
                                    <div className="flex flex-col">
                                        {availableResources.map((resource) => {
                                            if (resource.id === currentResource.id) return null
                                            return (
                                                <div key={resource.id} className="flex flex-col"
                                                     onClick={() => {
                                                         switchResource(resource)
                                                         setIsComponentVisible(false)
                                                     }}
                                                     onMouseEnter={() => {
                                                         playSound(hoverSound)
                                                     }}
                                                >
                                                    {resource.standalone && (
                                                        <div
                                                            className="flex items-center py-3 px-5 space-x-2 hover:bg-hover cursor-pointer">
                                                            <Logo className="w-8 h-8"/>
                                                            <Text className="font-bold">{resource.name}</Text>
                                                        </div>
                                                    )}

                                                    {!resource.standalone && (
                                                        <div className="py-3 px-5 hover:bg-hover cursor-pointer">
                                                            <Resource name={resource.name} id={resource.id}
                                                                      icon={resource.icon}/>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ): (
                <div className="flex flex-row items-center justify-between cursor-pointer shimmer-template select-none">
                    <span className="flex z-10 w-full justify-between items-center">
                        <div className="flex h-10 items-center space-x-2">
                            <LoadingCircle />
                            <Text className="font-bold">Connecting</Text>
                        </div>
                    </span>
                </div>
            )}
        </>
    )
}

function Resource({name, id, icon}: {
    name: string;
    id: string | number;
    icon?: string;
}) {
    return (
        <span className="flex min-w-0 items-center justify-between space-x-3">
            <UserAvatar name={name} size={40} avatar={icon}
                        className="inline-flex h-10 w-10 rounded overflow-hidden"/>
            <span className="flex-1 flex flex-col min-w-0">
                <span className="truncate">{name}</span>
                <span className="text-alt truncate">{id}</span>
            </span>
        </span>
    )
}