import './globals.scss'
import { Analytics } from '@vercel/analytics/react'
import cx from 'classnames'
import { lexend, inter } from "./fonts"
import {Logo} from '@/components/shared/icons/logo'
import Link from 'next/link'
import Preload from '@/components/onboard/preload'
import {Newspaper} from 'lucide-react'
import {Toaster} from 'sonner'
import colors from 'tailwindcss/colors'
import {Providers} from '@/app/providers'
import SidebarItem from '@/components/layout/sidebar/item'

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
        <body className={`${cx(lexend.variable, inter.variable)} font-default font-normal text-body`}>
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
            <div vaul-drawer-wrapper="" id="BodyScroll" className="flex bg-neutral-900 p-0 md:overflow-hidden pl-0 md:pl-24 md:pr-6">
                <div className="fixed z-20 top-0 left-0 bottom-0 hidden flex-col items-center gap-14 px-4 py-12 w-24 md:flex">
                    <Link href="/" className="animate-hue">
                        <Logo className="w-8" />
                    </Link>

                    <div className="flex flex-col flex-grow">
                        <SidebarItem href="/">
                            <Newspaper className="w-6" />
                        </SidebarItem>
                    </div>
                </div>

                <div className="flex flex-shrink-0 py-0 md:py-6 min-h-screen w-full">
                    <div className="relative flex grow max-w-full bg-body rounded-none md:rounded-default">
                        {/* The parent is already growing, however children need to be forced the same in a separate flexbox */}
                        <div className="relative flex flex-col grow max-w-full">
                            <Preload>
                                {children}
                            </Preload>
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    )
}
