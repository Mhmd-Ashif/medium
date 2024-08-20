import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/hooks";
import { BlogFull } from "../components/BlogFull";
import { AppBar } from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Btn } from "../components/Btn";
import { useRecoilValue } from "recoil";

interface Blog {
  title: string;
  content: string;
  updatedAt: Date;
  author: { username: string };
}

export function Blog() {
  const navigate = useNavigate();
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
  }
  if (blog == undefined) {
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
            title={blog.title}
            content={blog.content}
            updatedAt={blog.updatedAt.toString()}
            author={blog.author}
          />
        </div>
      </>
    );
  }
}
