import { auth } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

const handleAuth = (req?: any) => {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Un Authorized User')
  }

  return { userId }
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware((req) => handleAuth(req))
    .onUploadComplete(() => {}),
  courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: '512GB' } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
