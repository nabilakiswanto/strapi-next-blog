import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { BlogCard } from "@/components/BlogCard"


async function loader(slug: string) {
    const response = await getPageBySlug("blog");
    // console.log("API Response:", response); // Debugging
  
    if (!response || !response.data || response.data.length === 0) {
      notFound();
    }
  
    return { blocks: response.data[0]?.blocks };
  }
interface PageProps {
  params: Promise<{ slug: string }>
}




export default async function BlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
  return <div className="blog-page">
    <BlockRenderer blocks={blocks} />
    <ContentList
        headline="Latest Articles"
        path="/api/articles"
        component={BlogCard}
    />
  </div>;
}