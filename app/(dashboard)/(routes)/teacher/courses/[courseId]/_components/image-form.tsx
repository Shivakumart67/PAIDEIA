'use client'

import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'

interface DescriptionFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
})

export const ImageForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      console.log(value)
      await axios.patch(`/api/courses/${courseId}`, value)
      toast.success('Image updated Successfully')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something wents wrong')
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course Image
        <Button variant={'ghost'} onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit Image
            </>
          )}

          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add Image
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData?.imageUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <ImageIcon className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              alt='Upload'
              fill
              className='object-cover rounded-md'
              src={initialData?.imageUrl || ''}
            />
          </div>
        )
      ) : (
        <div >
          <FileUpload
          endpoint='courseImage'
          onChange={(url)=>{
            if(url){
              onSubmit({imageUrl: url})
            }
          }}
          />
        <div className='text-xs text-muted-foreground mt-4'>
            16:9 Aspect ratio recomended
        </div>
        </div>
      )}
    </div>
  )
}
