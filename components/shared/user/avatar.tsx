import BoringAvatar from 'boring-avatars'
import Image from 'next/image'
import {cn} from '@/components/novel/lib/utils'
import {clsx} from 'clsx'

export default function UserAvatar({ user, size, avatar, ...props }: {
    user?: any; // object - @todo: type this
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
    icon?: string;
    [x: string]: any;
}) {
    const sizes = {
        xs: 'h-4 w-4',
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12',
        '2xl': 'h-14 w-14',
    }

    props.className = `${props.className || ''} ${size && typeof size !== 'number' ? sizes[size] : ''}`

    if ((!user || !user.avatar) && !avatar) {
        return (
            <div className={props.className} style={props.style}>
                <BoringAvatar variant="beam" square size={typeof size === 'number' ? size : 32} {...props} />
            </div>
        )
    } else {
        return (
            <Image width={1024}
                   height={1024}
                   src={user?.avatar || avatar}
                   alt={`${user?.username || props.name}'s avatar`}
                   {...props}
                   className={cn(clsx(props.className, `inline-flex ${size && typeof size !== 'number' ? sizes[size] : ''} justify-center rounded items-center bg-n-5 text-white overflow-hidden`))}
            />
        )
    }
}