const textSize = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
}

export function Heading({ children, size = 'base', ...props }: {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
    [key: string]: any;
}): JSX.Element {
    props.className = `${props.className || ''} ${textSize[size]} text-neutral-900 dark:text-white`
    return (
        <h3 {...props}>
            {children}
        </h3>
    )
}

export function Text({ children, size = 'sm', ...props }: {
    children: React.ReactNode;
    size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
    [key: string]: any;
}): JSX.Element {
    return (
        <p className={`${textSize[size]} text-body`} {...props}>
            {children}
        </p>
    )
}