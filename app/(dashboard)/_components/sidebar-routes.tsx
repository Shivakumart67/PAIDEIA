'use client'

import { Layout, Compass, ListIcon, BarChart } from 'lucide-react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'

const Homeroutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
]

const teacherRoutes = [
  {
    icon: ListIcon,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
]

const SidebarRoutes = () => {
  const pathname = usePathname()
  const isTeacherMode = pathname?.includes('/teacher')
  const listRoutes = isTeacherMode ? teacherRoutes : Homeroutes
  return (
    <div className='flex flex-col w-full'>
      {listRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes
