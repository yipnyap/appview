'use client'

import posthog from 'posthog-js'
import {ThemeProvider} from 'next-themes'
import {PostHogProvider} from 'posthog-js/react'
import UnicornEngine from '@/app/unicorn/provider'

if (typeof window !== 'undefined') {
    posthog.init('phc_UcQULOF33BsHGTqO0I3TxA6RACZ3t0HjBMmDppCbnXJ', { api_host: 'https://app.posthog.com' })
}

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <PostHogProvider client={posthog}>
            <ThemeProvider attribute="class">
                <UnicornEngine>
                    {children}
                </UnicornEngine>
            </ThemeProvider>
        </PostHogProvider>
    )
}
