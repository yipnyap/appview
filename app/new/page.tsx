import {Heading} from '@/components/shared/text'
import {PenSquareIcon} from 'lucide-react'
import Link from 'next/link'

const availableAggregations = [
    {
        name: 'Post',
        description: 'Write a new post in your feed, or to another resource.',
        href: '/new/post',
        icon: PenSquareIcon,
    }
]

export default function NewAggregation() {
    // buttons to different subpages
    return(
        <>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="flex flex-col w-full max-w-xl">
                    <Heading size="3xl" className="font-semibold">
                        New what?
                    </Heading>
                    <div className="flex flex-col space-y-4 mt-4">
                        {availableAggregations.map((item) => (
                            <Link key={item.href} href={item.href} className="flex w-full p-6 border bg-n-7 rounded hover:bg-n-7/75 hover:shadow-lg">
                                <item.icon className="w-7 h-7"/>
                                <div className="flex flex-col ml-4">
                                    <Heading size="lg">
                                        {item.name}
                                    </Heading>
                                    <p className="text-alt">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}