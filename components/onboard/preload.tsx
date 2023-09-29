'use client'

import Image from 'next/image'
import {LoadingDots} from '@/components/shared/icons'
import {useEffect, useState} from 'react'
import {fetcher} from '@/lib/utils'
import GridBody from '@/components/layout/grid-body'
import {Heading} from '@/components/shared/text'

export default function Preload({ children }: {
    children: React.ReactNode
}) {
    const [serviceLoading, setServiceLoading] = useState<string>('waiting for client')

    useEffect(() => {
        setServiceLoading('core')
        fetcher(`${process.env.NEXT_PUBLIC_YIPNYAP_CORE_URL}`).then(async (res) => {
            if (res.health.status !== 'ok') {
                setServiceLoading('halted at core')
            } else {
                setServiceLoading('auth')
                // Auth through proxy /api/id/login
                const auth = await fetcher('/api/id/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        token: 'something',
                    })
                }).then((res) => {
                    setServiceLoading('cum!')
                    proceed()
                }).catch((err) => {
                    if ([400, 401, 403].includes(err.status)) {
                        return proceed()
                    }

                    setServiceLoading(`halted at auth: ${err.status}`)
                    console.error(err)
                })
            }
    }).catch((err) => {
            setServiceLoading('halted at core')
            console.error(err)
        })
    }, [])

    const proceed = () => {
        setServiceLoading('proceeding')
    }

    return (
        <>
            {serviceLoading === 'proceeding' ? children : (
                <GridBody className="justify-center items-center h-full">
                    <div className="flex flex-col max-w-md">
                        <Heading className="items-center">
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
                        </Heading>
                        <p className="mt-1 text-sm leading-6 text-default-alt">
                            Yipnyap is asking the server for information about you &amp; the service. This
                            will get saved in your browser{'\''}s <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage" target="_blank" rel="noopener noreferrer">session storage</a>.
                        </p>
                        <div className="flex mt-4 space-x-1">
                            <LoadingDots className="mt-1" />
                            <span>{serviceLoading}</span>
                        </div>
                    </div>
                </GridBody>
            )}
        </>
    )
}