'use client'

import { useConfettiStore } from '@/app/hooks/use-confetti'
import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ActionProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

export const Actions = ({ disabled, courseId, isPublished }: ActionProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const confetti = useConfettiStore()
  const router = useRouter()
  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}`)
      toast.success('Course Deleted')
      router.refresh()
      router.push(`/teacher/courses`)
    } catch (error) {
      toast.error('Something wents wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success('Course UnPublished')
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success('Course Published')
        confetti.onOpen()
      }
      router.refresh()
    } catch (error) {
      toast.error('Something wents wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={'outline'}
        size={'sm'}
      >
        {isPublished ? 'Un-Publish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading} size='sm'>
          <Trash className='h-4 w-4' />
        </Button>
      </ConfirmModal>
    </div>
  )
}
