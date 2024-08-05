import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/hooks";
import { BlogFull } from "../components/BlogFull";
import { AppBar } from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Btn } from "../components/Btn";
import { useRecoilValue } from "recoil";
import { allBlogs } from "../store";

export function Blog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: Number(id),
  });
  const Blog = useRecoilValue(allBlogs);
  const indBlog = Blog.filter((blog: any) => blog.id == id);

  if (!Blog.length && loading == true) {
    return (
      <>
        <BlogSkeleton />
      </>
    );
  }
  if (!indBlog[0]) {
    return (
      <>
        <AppBar />
        <div className="mt-8 md:mt-12 w-11/12 container mx-auto">
          <p className="text-5xl font-bold text-center">Blog didn't exist.</p>
          <div className="text-center mt-8">
            <Btn onClick={() => navigate("/blogs")}>
              <div className="flex place-content-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                Go Back To Homepage
              </div>
            </Btn>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <AppBar />
        <div className="mt-8 md:mt-12 w-11/12 container mx-auto">
          <BlogFull
            title={indBlog[0].title}
            content={indBlog[0].content}
            updatedAt={indBlog[0].updatedAt}
            author={indBlog[0].author}
          />
        </div>
      </>
    );
  }
}
