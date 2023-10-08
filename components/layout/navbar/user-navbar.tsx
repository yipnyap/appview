'use client'
import {useEffect, useState} from 'react'
import {Cog6ToothIcon, ExclamationTriangleIcon, EyeSlashIcon} from '@heroicons/react/24/solid'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Button from '@/components/shared/button'
import {useUserAccountStore} from '@/lib/states'
import UserAvatar from '@/components/shared/user/avatar'
import LogoutIcon from '@/components/shared/icons/logout'
import {toast} from '@/lib/toast'

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
            username: 'rek',
        })
    }

    return (
        <>
            {domLoaded && (
                <div className="inline-flex justify-between gap-8 px-10 py-4">
                    {/* end */}
                    <div className="justify-end">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {!user ? (
                                    <Button onClick={handleLogin}>
                                        Login
                                    </Button>
                                ) : (
                                    <UserAvatar user={user} size="lg" />
                                )}
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                {user && <UserDropdown />}
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </div>
                </div>
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

    return (
        <DropdownMenu.Content className="flex flex-col w-96 p-4 gap-3 bg-n-1 dark:bg-n-6 rounded-xl shadow-xl border will-change-[opacity,transform] animate-slide-up-fade" sideOffset={5} align="end">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <div className="w-16 h-16 relative">
                    <UserAvatar user={user} size="xl" />
                    <div className="w-3 h-3 p-0.5 left-[45px] top-[45px] absolute justify-center items-center gap-2 inline-flex">
                        <div className="w-2.5 h-2.5 p-2 bg-green-400 rounded-full border-4 border-n-1 dark:border-n-6" />
                    </div>
                </div>
                <div className="flex-col inline-flex items-center">
                    <div className="self-stretch text-lg font-semibold">{user.name || user.username}</div>
                    <div className="self-stretch text-alt text-xs font-medium leading-tight">@{user.username}</div>
                </div>
            </div>

            {/* notice banner */}
            <div className="inline-flex justify-start items-center gap-4 w-full px-4 py-2 border border-accent-1/25 bg-card-alt bg-opacity-50 rounded-xl">
                <ExclamationTriangleIcon className="w-6 h-6 text-accent-1" />
                <div className="px-4 py-3 text-alt text-opacity-75 text-sm">
                    Feral is still WIP. This is not a real account.
                </div>
            </div>

            <div className="w-full bg-n-3 dark:bg-n-7 bg-opacity-95 rounded-xl flex-col inline-flex">
                <div className="px-4 py-3 bg-card-alt bg-opacity-50 rounded-tl-xl rounded-tr-xl justify-between items-start inline-flex">
                    <div className="justify-center items-center gap-4 flex">
                        <div className="w-6 h-6 p-1 justify-center items-center">
                            <div className="w-full h-full bg-green-400 rounded-full" />
                        </div>
                        <div className="text-alt text-opacity-75 text-sm">Online</div>
                    </div>
                    <div className="w-6 h-6 relative" />
                </div>

                {UserOptions.map((option, i) => (
                    <div key={i} className="group px-4 py-3 justify-start items-center gap-4 inline-flex cursor-pointer" onClick={option.onClick || (() => {})}>
                        <option.icon className={`${option.className || 'group-hover:fill-primary-1'} w-6 h-6 fill-alt transition-colors`} />
                        <div className={`${option.className || 'group-hover:text-primary-1'} text-alt text-opacity-75 text-sm transition-colors`}>{option.name}</div>
                    </div>
                ))}

            </div>
        </DropdownMenu.Content>
    )
}