'use client'

import {useState} from 'react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Logo} from '@/components/shared/icons/logo'
import {Text} from '@/components/shared/text'
import UserAvatar from '@/components/shared/user/avatar'

export default function ResourceSwitcher() {
    const [currentResource, setCurrentResource] = useState({
        did: 'did:web:_universe.yipnyap.me',
        name: `Pre-Alpha ${process.env.NEXT_PUBLIC_COMMIT_HASH}`,
    })

    return (
        <span className="flex w-full justify-between items-center cursor-pointer">
            {!currentResource || currentResource.did === 'did:web:_universe.yipnyap.me' ? (
                <div className="flex items-center space-x-2">
                    <Logo className="w-8 h-8"/>
                    <Text className="font-bold">{currentResource.name}</Text>
                </div>
            ) : (
                <span className="flex min-w-0 items-center justify-between space-x-3">
                    <UserAvatar name={currentResource.name} size={40} className="inline-flex h-10 w-10 rounded overflow-hidden"/>
                    <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-slate-900 dark:text-white text-sm font-medium truncate">{currentResource.name}</span>
                        <span className="text-slate-500 dark:text-grey-400 text-sm truncate">{currentResource.did}</span>
                    </span>
                </span>
            )}
            <ChevronDownIcon className="w-6 h-6 text-neutral-500 dark:text-white"/>
        </span>
    )
}