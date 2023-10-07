import {Sunset} from 'lucide-react'

export default function Banner({ title, description, icon, branded = false }: {
    title: string;
    description: string;
    icon?: React.ComponentType<any>;
    branded?: boolean;
}) {
    const DummyElement = () => <></>;
    const Icon = icon || DummyElement;
    return (
        <div className="relative flex items-center gap-3 w-fit h-24 px-10">
            {branded && (
                <>
                    <img src="/tiger-paw-up.svg" className="absolute hidden -right-4 -bottom-20 w-32 h-32 -mt-16 -mr-16 md:block" />
                    <img src="/tiger-paw-down.svg" className="absolute hidden -top-3 right-24 rotate-[24deg] w-32 h-32 -mt-16 -mr-16 md:block" />
                </>
            )}

            <Icon className="text-white h-6 w-6" />
            <div className="flex flex-col self-center justify-center">
                <span className="text-white">{title}</span>
                <span className="text-neutral-400">{description}</span>
            </div>
        </div>
    )
}