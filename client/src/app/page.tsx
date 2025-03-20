import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { BlogCard } from "@/components/BlogCard"
import { block } from "sharp";
async function loader(){
 const data = await getHomePage();
 if(!data) notFound();
//  console.log(data);
 return {...data.data};
}
export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];

  return <div>
        <BlockRenderer blocks={blocks} />
        <div className="container">
          <ContentList
                  headline="Latest Articles"
                  path="/api/articles"
                  component={BlogCard}
              />
        </div>
  </div>
}
