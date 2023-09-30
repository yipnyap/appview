import * as Avatar from '@radix-ui/react-avatar'

export default function UserAvatar({ user, size = 'md' }: {
    user: any; // object - @todo: type this
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}) {
    const sizes = {
        xs: 'h-4 w-4',
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-24 w-24',
    }
    return (
        <Avatar.Root className={`inline-flex ${sizes[size]} justify-center items-center rounded-full overflow-hidden`}>
            <Avatar.Image src={user.avatar} alt={user.username || user.name} className="w-full h-full" />
            <Avatar.Fallback className="bg-neutral-100/50 text-neutral-500/50">
                {(user.username || user.name).slice(0, 2).toUpperCase()}
            </Avatar.Fallback>
        </Avatar.Root>
    )
}