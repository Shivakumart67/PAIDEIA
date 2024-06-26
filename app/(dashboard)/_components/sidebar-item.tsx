'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname()
  const route = useRouter()
  const isActive =
    pathname === href ||
    (href === '/' && pathname === '/') ||
    pathname?.startsWith(`${href}/`)

  const onClick = () => {
    route.push(href)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all  hover:text-slate-600 hover:bg-slate-300/20',
        isActive &&
          'text-sky-700 bg-sky-200/20 hover:bg-sky-200/10 hover:text-sky-800 transition-all'
      )}
    >
      <div className='flex items-center gap-x-2 py-4 transition-all'>
        <Icon
          size={22}
          className={cn('text-slate-500 ', isActive && 'text-sky-700')}
        />
        {label}
      </div>
      <div
        className={cn(
          'opacity-0 border-2 ml-auto border-sky-700 h-full transition-all',
          isActive && 'opacity-100'
        )}
      />
    </button>
  )
}

export default SidebarItem
