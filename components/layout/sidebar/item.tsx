import Link from 'next/link'

export default function SidebarItem({ href, children, ...props }: {
    href: string
    children: React.ReactNode
    [key: string]: any
}) {
  return (
      <Link href={href}
          className="no-style flex justify-center items-center h-12 w-12 font-semibold rounded-default text-white highlight-white/5 transition-colors bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] hover:text-white/75"
          {...props}
      >
          {children}
      </Link>
  )
}