import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      console.log('userId')
      return new NextResponse('UnAuthorized', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    })

    if (!courseOwner) {
      console.log('CourseOwner')

      return new NextResponse('UnAuthorized', { status: 401 })
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    })

    const muxData = await db.muxData.findFirst({
      where: {
        chapterId: params.chapterId,
      },
    })

    if (!chapter || !muxData || !chapter.title || !chapter.videoUrl) {
      return new NextResponse('Missing Data', { status: 401 })
    }

    const publishChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(publishChapter)
  } catch (error) {
    console.log('[CHAPTER_PUBLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
