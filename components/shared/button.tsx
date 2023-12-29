export default function Button({ color, variant, children, className, ...props }: {
    color?: 'primary' | 'secondary' | 'tertiary';
    variant?: 'solid' | 'outline' | 'ghost';
    children: React.ReactNode;
    className?: string;
    [x: string]: any;
}): JSX.Element {
    return (
        <div className={`${className} w-fit h-fit px-6 py-3 text-white font-semibold bg-primary-feral rounded-xl justify-center items-center gap-2 inline-flex cursor-pointer transition-colors hover:bg-primary-500/90 active:shadow-inner active:shadow-black/10 active:inner-border-2 active:inner-border-sky-700 `} {...props}>
            {children}
        </div>
    )
}