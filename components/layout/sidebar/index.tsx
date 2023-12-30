import {Logo} from '@/components/shared/icons/logo'
import {Text} from '@/components/shared/text'
import {ClockIcon, HomeIcon, InboxIcon, PenSquareIcon} from 'lucide-react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import Link from 'next/link'
import ResourceSwitcher from '@/components/data-display/resource-switcher'

export default function Sidebar({navigation}: {
    navigation?: {
        name: string;
        href: string;
        icon: any;
    }[];
}) {
    navigation = navigation || [
        { name: 'Your Home', href: '/', icon: HomeIcon, },
        { name: 'Inbox', href: '/inbox', icon: InboxIcon,  },
    ]
    return (
        <div className="flex flex-col w-80 bg-n-2 dark:bg-n-8 unicorn:bg-surface-container-low">
            <div className="flex flex-row items-center justify-between py-3 px-5 mb-2">
                <ResourceSwitcher />
            </div>

            {/* "Compose" button with icon */}
            <div className="mb-4 px-5">
                <Link href="/new/post">
                    <button
                        className="flex justify-start items-center w-full px-2 py-1.5 cursor-pointer bg-primary-feral text-white unicorn:text-on-primary rounded-md">
                        <PenSquareIcon className="w-4 h-4"/>
                        <span className="ml-2 mr-1">Write</span>
                    </button>
                </Link>
            </div>

            <div>
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href}
                          className="flex items-center w-full px-6 py-2 cursor-pointer hover:bg-n-3/50 dark:hover:bg-n-7/50">
                        <item.icon className="w-5 h-5"/>
                        <Text size="sm" className="ml-2">{item.name}</Text>
                    </Link>
                ))}
            </div>
        </div>
    )
}