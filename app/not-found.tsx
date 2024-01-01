import Image from 'next/image'
import {Heading} from '@/components/shared/text'
import GridBody from '@/components/layout/grid-body'

export default function NotFound() {
    return (
        <GridBody className="justify-center items-center h-full">
            <div className="flex flex-col max-w-md">
                <Image src="/cat-chasing-laser-nl.gif"
                       alt="Animated pixel cat chasing a laser, before being beamed up disappearing."
                       className="mx-auto justify-center items-center w-80 h-auto mb-8"
                       height={1024}
                       width={1024}
                       style={{
                           imageRendering: 'pixelated'
                       }}
                />
                <Heading className="items-center">
                    Wherever you are, you{"'"}re not supposed to be here.
                </Heading>
                <p className="mt-1 text-sm leading-6 text-default-alt unicorn:text-on-surface-variant">
                    This resource doesn{"'"}t exist, or you don{"'"}t have permission to view it.
                </p>
            </div>
        </GridBody>
    )
}