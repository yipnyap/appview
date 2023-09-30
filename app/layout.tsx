import './globals.scss'
import { Analytics } from '@vercel/analytics/react'
import cx from 'classnames'
import { lexend, inter } from "./fonts"
import {Logo} from '@/components/shared/icons/logo'
import Link from 'next/link'
import Preload from '@/components/onboard/preload'
import {Home} from 'lucide-react'
import {Toaster} from 'sonner'
import colors from 'tailwindcss/colors'

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
        <html lang="en">
        <body className={`${cx(lexend.variable, inter.variable)} font-default font-normal text-body`}>
        <Toaster className="dark:hidden" position="top-center" toastOptions={{
        }}/>
        <Toaster className="hidden dark:block" position="top-center" toastOptions={{
            style: {
                background: colors.neutral['800'],
                color: '#FFF',
                borderColor: colors.neutral['700'],
            }
        }} />

        <div className="flex bg-body">
            <div className="flex flex-col sticky top-0 justify-center items-center gap-y-4 h-[100vh] w-16 border-r border-neutral-100 bg-sidebar">
                <Link href="/">
                    <Logo className="w-8" />
                </Link>
                <Link href="/" className="no-style hover:text-neutral-500/75">
                    <Home className="w-8" />
                </Link>
            </div>

            <div className="flex-shrink-0 w-[calc(100%-64px)]">
                <Preload>
                    {children}
                </Preload>
            </div>
        </div>
        <Analytics />
        </body>
        </html>
    );
}
