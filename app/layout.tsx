import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { lexend, inter } from "./fonts";
import {Logo} from '@/components/shared/icons/logo'
import Link from 'next/link'
import Preload from '@/components/onboard/preload'

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
      <body className={`${cx(lexend.variable, inter.variable)} text-body`}>
        <div className="flex bg-body">
          <div className="flex flex-col sticky top-0 justify-center items-center h-[100vh] w-16 border-r border-grey-100 bg-sidebar">
            <Link href="/">
              <Logo className="w-8" />
            </Link>
          </div>
          <div className="flex-shrink-0 w-[calc(100%-64px)] grid items-center justify-center py-32">
            <Preload />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
