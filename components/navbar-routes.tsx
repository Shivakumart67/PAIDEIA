'use client'

import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

const NavbarRoutes = () => {
  const pathname = usePathname()

  const isTeacherMode = pathname?.startsWith('/teacher')
  const isPlayerMode = pathname?.includes('/chapter')

  return (
    <div className='flex ml-auto gap-x-5'>
      {isTeacherMode || isPlayerMode ? (
        <Link href='/'>
          <Button variant={'default'} size={'sm'}>
            <LogOut />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href='/teacher/courses'>
          <Button variant={'default'} size={'sm'}>
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}

export default NavbarRoutes
