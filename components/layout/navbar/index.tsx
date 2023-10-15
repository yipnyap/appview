import {PartyPopper} from 'lucide-react'
import Banner from '@/components/layout/banner'
import UserNavbar from '@/components/layout/navbar/user-navbar'
import {LoadingDots} from '@/components/shared/icons'
import {Suspense} from 'react'

export default function Navbar() {
    return (
        <div className="flex items-center">
            {/*<Banner branded*/}
            {/*        icon={PartyPopper}*/}
            {/*        title="This is a banner. Woahhh!"*/}
            {/*        description="Banners related to you show up here. Public notices will show with the feral branding - like this one!"*/}
            {/*/>*/}

            <div className="flex-grow" />

            <Suspense fallback={<LoadingDots className="w-6 h-6 dark:invert" />}>
                <UserNavbar />
            </Suspense>
        </div>
    )
}
