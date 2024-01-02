import {Text} from '@/components/shared/text'
import {BellIcon, HomeIcon, PenSquareIcon} from 'lucide-react'
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
        { name: 'Inbox', href: '/inbox', icon: BellIcon,  },
    ]
    return (
        <div className="hidden flex-col w-80 min-w-[20rem] bg-n-2 overflow-hidden dark:bg-n-8 unicorn:bg-surface-container-low md:flex">
            <div className="relative py-3 px-5 mb-2">
                <ResourceSwitcher />
            </div>

            {/* "Compose" button with icon */}
            <div className="mb-4 px-5">
                <Link href="/new/post">
                    <button
                        className="flex justify-start items-center w-full px-2 py-1.5 cursor-pointer bg-primary-feral text-white unicorn:text-on-primary rounded-md">
                        <PenSquareIcon className="w-4 h-4"/>
                        <span className="ml-2 mr-1">Howl</span>
                    </button>
                </Link>
            </div>

            <div>
                {navigation.map((item) => (
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
            </div>
        </div>
    )
}