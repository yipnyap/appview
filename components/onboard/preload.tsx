'use client'

import Image from 'next/image'
import {LoadingDots} from '@/components/shared/icons'
import {useEffect, useState} from 'react'
import {fetcher} from '@/lib/utils'

export default function Preload() {
    const [serviceLoading, setServiceLoading] = useState('waiting for client')

    useEffect(() => {
        setServiceLoading('core')
        fetcher(`${process.env.NEXT_PUBLIC_YIPNYAP_CORE_URL}`).then(async (res) => {
            if (res.health.status !== 'ok') {
                setServiceLoading('halted at core')
            } else {
                setServiceLoading('auth')
            }
        }).catch((err) => {
            setServiceLoading('halted at core')
            console.error(err)
        })
    }, [])

    return (
        <div className="flex flex-col max-w-md">
            <h2 className="flex text-base font-semibold leading-7 text-default items-center">
                <Image src="/ghost-dog-in-box.gif"
                       alt="Animated pixel dog in box panting before falling over, then looping."
                       height={32}
                       width={38}
                       style={{
                           imageRendering: 'pixelated',
                           display: 'inline-block',
                           marginTop: '-1px',
                           marginRight: '4px',
                       }}
                />
                Yipnyap is preparing...
            </h2>
            <p className="mt-1 text-sm leading-6 text-default-alt">
                Yipnyap is asking the server for information about you &amp; the service. This
                will get saved in your browser{'\''}s <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage" target="_blank" rel="noopener noreferrer">session storage</a>.
            </p>
            <div className="flex mt-4 space-x-1">
                <LoadingDots className="mt-1" />
                <span>{serviceLoading}</span>
            </div>
        </div>
    )
}