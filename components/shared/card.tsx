export default function Card({ children, className, ...props }: {
    children: React.ReactNode;
    className?: string;
    props?: any;
}) {
    return (
        <div className={`${className} max-w-md h-fit bg-card flex flex-col px-3 py-4 gap-2 border rounded-default`} {...props}>
            {children}
        </div>
    )
}