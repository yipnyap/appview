'use client'
import {useEffect, useState} from 'react'
import {
    Cog6ToothIcon,
    ExclamationTriangleIcon,
    EyeSlashIcon, MinusCircleIcon, MoonIcon
} from '@heroicons/react/24/solid'
import * as Accordion from '@radix-ui/react-accordion'
import Button from '@/components/shared/button'
import {useUserAccountStore} from '@/lib/states'
import UserAvatar from '@/components/shared/user/avatar'
import LogoutIcon from '@/components/shared/icons/logout'
import {toast} from '@/lib/toast'
import Popover from '@/components/shared/popover'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import Link from 'next/link'
import Image from 'next/image'
import ResourceSwitcher from '@/components/data-display/resource-switcher'

export default function UserNavbar() {
    const {user, setUser} = useUserAccountStore()
    // nextjs makes me want to die
    const [domLoaded, setDomLoaded] = useState(false)

    useEffect(() => {
        setDomLoaded(true)
    }, [])

    const handleLogin = () => {
        toast('This feature is not yet implemented.')
        // dummy
        setUser({
            id: '1',
            username: 'rek.yipnyap.me',
            nickname: 'Rekkisomo Harley',
            status: 1,
            banner: '/dummy/rek/banner.jpg',
            avatar: 'https://cdn.discordapp.com/avatars/96876194712018944/cc2e74005ac5b978e62da06200049385.webp?size=4096'
        })
    }

    return (
        <>
            {domLoaded && (
                <>
                    {!user && (
                        <Button onClick={handleLogin}>
                            Login
                        </Button>
                    )}

                    {user && (
                        <Popover
                            content={<>
                                {user && <UserDropdown />}
                            </>}
                            align="end"
                        >
                            <div>
                                <UserAvatar user={user} className="inline-flex items-center justify-center h-8 w-8 bg-n-1 dark:bg-n-7 cursor-pointer rounded overflow-hidden hover:opacity-70 hover:inner-border hover:inner-border-[#e5e5e5] hover:dark:inner-border-[#2e2e2e] hover:unicorn:inner-border-outline/25" />
                            </div>
                        </Popover>
                    )}
                </>
            )}
        </>
    )
}

function UserDropdown() {
    const {user, setUser} = useUserAccountStore()

    const UserOptions = [
        {
            name: 'Settings',
            icon: Cog6ToothIcon,
        },
        {
            name: 'Quit Feral',
            icon: EyeSlashIcon,
            className: 'group-hover:text-accent-1 group-hover:fill-accent-1',
            onClick: () => {
                window.location.replace('https://yipnyap.me')
            }
        },
        {
            name: 'Log out',
            icon: LogoutIcon,
            className: 'group-hover:text-accent-1 group-hover:fill-accent-1',
            onClick: () => setUser(null),
        }
    ]

    const StatusOptions = [
        {
            id: 1,
            name: 'Online',
            className: 'bg-green-400',
        },
        {
            id: 2,
            name: 'Do not disturb',
            icon: MinusCircleIcon,
            className: 'text-accent-1',
        },
        {
            id: 3,
            name: 'Idle',
            icon: MoonIcon,
            className: 'text-accent-5',
        },
        {
            id: 0,
            name: 'Invisible',
            className: 'bg-n-5',
        },
    ]

    const currentStatus = StatusOptions.find((option) => option.id === user.status) || StatusOptions[0]

    return (
        <div className="flex flex-col w-80 self-center gap-2 bg-n-1 border rounded dark:bg-n-7">
            <div className="w-full justify-start items-center p-4 gap-4 inline-flex">
                <span className="flex items-center justify-between space-x-3">
                    <UserAvatar user={user} className="inline-flex items-center justify-center h-10 w-10 bg-n-1 cursor-pointer rounded overflow-hidden dark:bg-n-7" />
                    <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">{user.nickname || '⚠️ Please login again!'}</span>
                        <span className="text-alt text-sm truncate">{user.username}</span>
                    </span>
                </span>
            </div>

            <div className="inline-flex flex-col w-full">
                <Accordion.Root
                    className="w-full"
                    type="single"
                    collapsible
                >
                    <Accordion.Item value="status">
                        <Accordion.Header asChild>
                            <Accordion.Trigger
                                className="AccordionTrigger inline-flex justify-between items-start w-full px-4 py-2">
                                <div className="justify-center items-center gap-2 flex">
                                {currentStatus.icon && (
                                        <div className="w-5 h-5 p-0.5 justify-center items-center">
                                            <currentStatus.icon className={`${currentStatus.className || 'fill-alt'} w-full h-full transition-colors`} />
                                        </div>
                                    )}

                                    {!currentStatus.icon && (
                                        <div className="w-5 h-5 p-1 justify-center items-center">
                                            <div className={`w-full h-full ${currentStatus.className || 'bg-n-5'} rounded-full`} />
                                        </div>
                                    )}
                                    <div className="text-body text-sm">{currentStatus.name}</div>
                                </div>
                                <ChevronDownIcon className="AccordionChevron w-5 h-5 self-center text-body" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="AccordionContent flex flex-col overflow-hidden">
                            {/* status options, except current one */}
                            {StatusOptions.filter((option) => option.id !== user.status).map((option, i) => (
                                <div
                                    key={i}
                                    className="group px-4 py-2 justify-start items-center gap-2 inline-flex cursor-pointer"
                                    onClick={() => {
                                        setUser({
                                            ...user,
                                            status: option.id,
                                        })
                                    }}
                                >
                                    {option.icon && (
                                        <div className="w-5 h-5 p-0.5 justify-center items-center">
                                            <option.icon className={`${option.className || 'fill-alt'} w-full h-full transition-colors`} />
                                        </div>
                                    )}

                                    {!option.icon && (
                                        <div className="w-5 h-5 p-1 justify-center items-center">
                                            <div className={`w-full h-full ${option.className || 'bg-n-5'} rounded-full`} />
                                        </div>
                                    )}
                                    <div className="text-alt text-opacity-75 text-sm transition-colors group-hover:text-primary-feral">{option.name}</div>
                                </div>
                            ))}
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>

                <div className="inline-flex flex-col w-full">
                    {UserOptions.map((option, i) => (
                        <div key={i} className="group px-4 py-2 justify-start items-center gap-2 inline-flex cursor-pointer" onClick={option.onClick || (() => {})}>
                            <option.icon className={`${option.className || 'group-hover:fill-primary-feral'} w-5 h-5 fill-alt transition-colors`} />
                            <div className={`${option.className || 'group-hover:text-primary-feral'} text-alt text-opacity-75 text-sm transition-colors`}>{option.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}