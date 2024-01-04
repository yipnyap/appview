'use client'

import {BellIcon, HomeIcon, LucideIcon} from 'lucide-react'
import Link from 'next/link'
import {Text} from '@/components/shared/text'
import {useState} from 'react'

export default function Navigation() {
    const [items, setItems] = useState<{
        name: string;
        href: string;
        icon: LucideIcon;
    }[]>([
        {name: 'Your Home', href: '/', icon: HomeIcon,},
        {name: 'Inbox', href: '/inbox', icon: BellIcon,},
    ])
    return (
        <>
            {items.map((item) => (
                <Link key={item.name} href="/[slug]" as={item.href}
                      className="flex items-center w-full px-6 py-1 mb-0.5 cursor-pointer hover:bg-n-3/50 dark:hover:bg-n-7/50">
                    <div className="flex items-center">
                        <div>
                            <item.icon className="w-[18px] h-[18px] m-[3px]" strokeWidth={1.5}/>
                        </div>
                        <Text size="sm" className="ml-2 text-sm font-normal">{item.name}</Text>
                    </div>
                </Link>
            ))}
        </>
    )
}