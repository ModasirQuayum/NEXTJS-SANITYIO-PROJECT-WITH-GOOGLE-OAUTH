import { auth } from "@/auth";
import ContentCard,{ContentType} from "@/components/ContentCard";

import { sanityFetch } from "@/sanity/lib/live";
import { CONTENT_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

export default async function Home() {


   const {data:contents} = await sanityFetch({query: CONTENT_QUERY})
    console.log(contents[0])
  return (
    <>
    <section>
        <div>


            <div className="grid sm:grid-cols-2  xl:grid-cols-4 gap-2">
            {contents?.map((content:ContentType)=>(
                <ContentCard key={content?._id} content={content} />
            ))}
            </div>
        </div>
        
    </section>
    </>
  );
}
