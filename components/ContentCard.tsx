import { formatDate } from "@/lib/utils";
import { Publisher, Content } from "@/sanity/types";
import { Calendar, CommandIcon } from "lucide-react";

export type ContentType = Omit<Content,"publisher"> & {publisher?: Publisher}

const ContentCard = ({content}: {content:ContentType}) => {
    const {
        _createdAt,
        publisher,
        title,
        _id,
        image,
        context,
    } = content

  return (
    <div className="mb-3 flex flex-col gap-2 px-2">
        <div className="mb-1">
            <img src={image} alt={title} className="w-full h-[280px] object-cover rounded-md"/>
        </div>
        <div>
        <div className="flex items-center gap-5">

            <div className="flex items-center gap-1.5">
                <img className="rounded-2xl" src={publisher?.image} alt={publisher?.email} width={20}/>
                <h5 className="text-sm text-neutral-400">{publisher?.username}</h5> 
            </div>
            <div className="flex items-center text-xs text-neutral-400">
                <Calendar className="w-[15px]"/>
                <h5>{formatDate(_createdAt)}</h5>
            </div>
        </div>

        </div>
        <h2 className="text-blue-primary text-xl font-semibold">{title}</h2>
        <p className="text-neutral-500 text-sm w-full">{context}</p>
        <a href={`/content/${_id}`} className="bg-blue-primary text-left my-3 w-24 px-2 py-2 text-stone-100 rounded-sm hover:bg-blue-primary/85">Read More</a>
    </div>

  )
}

export default ContentCard