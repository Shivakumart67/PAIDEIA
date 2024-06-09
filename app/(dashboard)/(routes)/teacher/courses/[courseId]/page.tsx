import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";

const courseIdPage = async ({
    params
}: {params: {courseId: string}}) => {

    const {userId} = auth();
    if(!userId){
        toast.error('User is not Authenticated')
        redirect('/')
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    })

    if(!course){
        toast.error('Invalid Course')
        redirect('/')
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
    ]

    const totalFileds = requiredFields.length
    const completedFields= requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFileds})`

    return (
        <div className="p-6">
            <div className="flex item-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                <span className="text-sm text-slate-700" >
                    Complete All fields {completionText}
                </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center  gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                           <h2 className="text-xl">
                           Customize your course
                           </h2>
                        </div>
                           <TitleForm initialData={course} courseId={course.id} /> 
                           <DescriptionForm initialData={course} courseId={course.id} /> 

            </div>
        </div>
    )



}

export default courseIdPage