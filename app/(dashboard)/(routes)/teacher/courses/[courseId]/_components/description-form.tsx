'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Pencil } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Course } from '@prisma/client'

interface DescriptionFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Description is required',
  }),
})

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData?.description || '' },
  })
  const { isSubmitting, isValid } = form.formState

  const router = useRouter()
  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, value)
      toast.success('Description updated Successfully')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something wents wrong')
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course description
        <Button variant={'ghost'} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            'text-sm mt-2',
            !initialData.description && 'text-slate-500 italic'
          )}
        >
          {initialData.description || 'No Description'}
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder='e.g. This course about...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting}>Save</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
