'use client'

import { Layout, Compass } from 'lucide-react'
import SidebarItem from './sidebar-item'

const routes = [
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

const SidebarRoutes = () => {
  const listRoutes = routes
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
