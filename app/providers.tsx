'use client'

import posthog from 'posthog-js'
import { ThemeProvider } from 'next-themes'
import {PostHogProvider} from 'posthog-js/react'
import {useEffect} from 'react'
import {useUserAccountStore} from '@/lib/states'
import {themeFromImage} from '@/app/unicorn'
import {applyTheme} from '@material/material-color-utilities'

if (typeof window !== 'undefined') {
    posthog.init('phc_UcQULOF33BsHGTqO0I3TxA6RACZ3t0HjBMmDppCbnXJ', { api_host: 'https://app.posthog.com' })
}

export function Providers({ children }: {
    children: React.ReactNode
}) {
    const {user, setUser} = useUserAccountStore()

    useEffect(() => {
        // todo: move this into a provider
        // Create hidden <img> to load image
        // if (user && !user.theme) {
        //     // create an HTMLImageElement
        //     const img = document.createElement('img')
        //     img?.setAttribute('src', '/api/proxy/ecwxmakixjrsklydfmtl.supabase.co/storage/v1/object/public/users/01A164575a5c4fa08b49d0eefad7da/posts/03A1be14b24551996e38a30f8b0f3559c66c0abe02975511/03A1be14b24551996e38a30f8b0f3559c66c0abe02975511:03S10716f9fa3b5e313ae7e095a55db6f4997c9145f4317b.png')
        //     img?.addEventListener('load', () => {
        //         themeFromImage(img).then((theme) => {
        //             console.log(theme)
        //             applyTheme(theme, {
        //                 dark: document.documentElement.classList.contains('dark'),
        //                 target: document.body,
        //             })
        //
        //             // save to user
        //             setUser({
        //                 ...user,
        //                 theme: theme,
        //             })
        //         }).catch((e) => {
        //             console.error(e)
        //         })
        //     })
        //
        //     // append it to the body
        //     document.body.appendChild(img)
        // } else if (user) {
        //     user.theme.schemes.__proto__.toJSON = function() {
        //         return this;
        //     }
        //     applyTheme(user.theme, {
        //         dark: document.documentElement.classList.contains('dark'),
        //         target: document.body,
        //     })
        // }

        if (user) document.getElementById('UnicornBackground')?.style.setProperty('background', `url('${user.banner}') center center / cover no-repeat fixed`)
    })

    return (
        <div id="UnicornBackground">
            <PostHogProvider client={posthog}>
                <ThemeProvider attribute="class">
                    {children}
                </ThemeProvider>
            </PostHogProvider>
        </div>
    )
}
