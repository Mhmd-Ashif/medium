import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/hooks";
import { BlogFull } from "../components/BlogFull";
import { AppBar } from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";

export function Blog() {
  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: Number(id),
  });
  if (loading == true) {
    return (
      <>
        <BlogSkeleton />
      </>
    );
  } else {
    return (
      <>
        <AppBar />
        <div className="mt-8 md:mt-12 w-11/12 container mx-auto">
          <BlogFull
            title={blog.title}
            content={blog.content}
            thumbnail={blog.thumbnail}
            updatedAt={blog.updatedAt}
            author={blog.author}
          />
        </div>
      </>
    );
  }
}
