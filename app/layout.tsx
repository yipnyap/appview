import './globals.scss'
import { Analytics } from '@vercel/analytics/react'
import cx from 'classnames'
import { inter } from "./fonts"
import {Logo} from '@/components/shared/icons/logo'
import Link from 'next/link'
import Preload from '@/components/onboard/preload'
import {AlertOctagon, Newspaper} from 'lucide-react'
import {Toaster} from 'sonner'
import colors from 'tailwindcss/colors'
import {Providers} from '@/app/providers'
import SidebarItem from '@/components/layout/sidebar/item'
import Sidebar from '@/components/layout/sidebar'
import ContextBar from '@/components/layout/context-bar'
import Banner from '@/components/layout/banner'

export const metadata = {
  title: "Yipnyap",
  description:
    "A place for furries that isn't stuck in 2005.",
  twitter: {
    card: "summary_large_image",
    title: "Yipnyap",
    description:
      "A place for furries that isn't stuck in 2005.",
    creator: "Wolfbite Labs",
  },
  metadataBase: new URL("https://yipnyap.me"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${cx(inter.variable)} font-default font-normal text-body`}>
        <Layout>
            {children}
        </Layout>
        <Analytics />
        </body>
        </html>
    );
}

function Layout({children}: {children: React.ReactNode}) {
    return (
        <Providers>
            <Toaster className="dark:hidden" position="top-center" />
            <Toaster className="hidden dark:block" position="top-center" toastOptions={{
                style: {
                    background: colors.neutral['800'],
                    color: '#FFF',
                    borderColor: colors.neutral['700'],
                }
            }} />

            {/* @todo: something should be done with the sidebar, vaul uses translate3d() which breaks fixed/sticky anchors */}
            <div vaul-drawer-wrapper="" id="BodyScroll" className="flex p-0 bg-n-2 text-sm unicorn:bg-surface-container-low md:overflow-hidden dark:bg-n-8">
                <div className="flex flex-col flex-shrink-0 min-h-screen w-full">
                    <div className="flex flex-row grow max-w-full unicorn:bg-surface-container rounded-none md:rounded-default">
                        {/* The parent is already growing, however children need to be forced the same in a separate flexbox */}
                        <div className="flex flex-col grow max-w-full">
                            <div className="flex flex-row flex-grow divide-x">
                                {/* Sidebar */}
                                <Sidebar />

                                {/* Main content */}
                                <div className="flex flex-col flex-grow px-4 pb-0 h-screen overflow-y-auto">
                                    <div className="mb-4">
                                        <Banner branded title="Feral is WIP" description="This version should only be used by those developing Yipnyap, or for those curious. Don't report bugs, we most likely know already." icon={AlertOctagon} />
                                    </div>
                                    <Preload>
                                        {children}
                                    </Preload>
                                </div>

                                <ContextBar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    )
}
