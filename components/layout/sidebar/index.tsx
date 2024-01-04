import {Text} from '@/components/shared/text'
import {BellIcon, HomeIcon, PenSquareIcon} from 'lucide-react'
import Link from 'next/link'
import ResourceSwitcher from '@/components/data-display/resource-switcher'
import Navigation from '@/components/layout/sidebar/navigation'

export default function Sidebar() {
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
                <Navigation/>
            </div>
        </div>
    )
}