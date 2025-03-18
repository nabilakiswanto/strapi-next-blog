import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";


async function loader(slug: string) {
    const response = await getPageBySlug(slug);
    // console.log("API Response:", response); // Debugging
  
    if (!response || !response.data || response.data.length === 0) {
      notFound();
    }
  
    return { blocks: response.data[0]?.blocks };
  }
interface PageProps {
  params: Promise<{ slug: string }>
}


export default async function DynamicPageRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
  return <BlockRenderer blocks={blocks} />;
}