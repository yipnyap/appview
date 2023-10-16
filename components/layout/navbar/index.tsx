import {PartyPopper} from 'lucide-react'
import Banner from '@/components/layout/banner'
import UserNavbar from '@/components/layout/navbar/user-navbar'
import {LoadingDots} from '@/components/shared/icons'
import {Suspense} from 'react'

export default function Navbar() {
    return (
        <>
            <Suspense fallback={<LoadingDots className="w-6 h-6 dark:invert" />}>
                <UserNavbar />
            </Suspense>
        </>
    )
}
