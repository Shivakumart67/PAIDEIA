import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react'
import { IconBadge } from '@/components/icon-badge'
import { ChapterTitleForm } from './_components/chapter-title-form'
import { ChapterDescriptionForm } from './_components/chapter-description-form'
import { ChapterAccessForm } from './_components/chapter-access-form copy'
import { ChapterVideoForm } from './_components/chapter-video-form'
import { Banner } from '@/components/banner'
import { ChapterActions } from './_components/chapter-actions'

const chapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }
  const chapter = await db.chapter.findUnique({
    where: {
      courseId: params.courseId,
      id: params.chapterId,
    },
    include: {
      muxData: true,
    },
  })

  if (!chapter) {
    return redirect('/')
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

  const totalFileds = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFileds})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant={'warning'}
          label='This chapter is Un-Published this will not show in course list'
        />
      )}
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
            <Link
              className='flex items-center text-sm hover:opacity-75 transition mb-6'
              href={`/teacher/courses/${params.courseId}`}
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Course Setup
            </Link>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>Chapter Creation</h1>
                <span className='text-sm text-slate-700'>
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard} />
                <h2 className='text-xl'>Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                courseId={params.courseId}
                chapterId={params.chapterId}
                initialData={chapter}
              />
              <ChapterDescriptionForm
                courseId={params.courseId}
                chapterId={params.chapterId}
                initialData={chapter}
              />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={Eye} />
                <h2 className='text-xl'>Access Settings</h2>
              </div>
              <ChapterAccessForm
                courseId={params.courseId}
                chapterId={params.chapterId}
                initialData={chapter}
              />
            </div>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Video} />
              <h2 className='text-xl'>Add a Video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default chapterIdPage
