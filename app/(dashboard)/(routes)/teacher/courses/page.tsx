import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Courses = () => {
  return (
    <div className='p-4'>
      <Link href={'/teacher/create'}>
        <Button>New Course</Button>
      </Link>
    </div>
  )
}

export default Courses
