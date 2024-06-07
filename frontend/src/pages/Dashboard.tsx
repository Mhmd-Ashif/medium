import { Link, useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { individualBlogs } from "../hooks/hooks";
import { UpdateBtn } from "../components/UpdateBtn";
import { DeleteBtn } from "../components/DeleteBtn";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Skeleton } from "../components/Skeleton";

interface blog {
  author: { username: string };
  title: string;
  content: string;
  thumbnail: string;
  id: number;
  updatedAt: string;
}

export function Dashboard() {
  const { blogs, loading } = individualBlogs();
  const navigate = useNavigate();
  if (loading) {
    return (
      <>
        <div className="pl-2 pr-2 md:pl-36 md:pr-36 mt-14">
          {[1, 2, 3].map((_) => {
            return (
              <>
                <Skeleton />
              </>
            );
          })}
        </div>
      </>
    );
  }

  console.log(blogs.length);

  return (
    <>
      <AppBar />
      {blogs.length ? (
        <>
          <div className="mt-8 text-center text-4xl font-bold">Your Blog's</div>
          <div className=" pl-2 pr-2 md:pl-36 md:pr-36">
            {blogs.map((blog: blog) => {
              return (
                <>
                  <div className="relative md:flex md:justify-center md:items-center gap-2 ">
                    <Link to={`/blog/${blog.id}`}>
                      <BlogCard
                        key={blog.id}
                        title={blog.title}
                        content={blog.content}
                        author={localStorage.getItem("username") || "You"}
                        thumbnail={blog.thumbnail}
                        createdAt={blog.updatedAt}
                      />
                    </Link>
                    <UpdateBtn
                      key={blog.id}
                      onClick={() => {
                        navigate(`/update/${blog.id}`);
                      }}
                    />
                    <DeleteBtn
                      key={blog.id}
                      onClick={async () => {
                        try {
                          await axios.delete(`${BACKEND_URL}/api/v1/blog/del`, {
                            data: { id: blog.id },
                            headers: {
                              Authorization: localStorage.getItem("token"),
                            },
                          });
                          alert("post Deleted Successfully");
                          window.location.reload();
                        } catch (error) {
                          alert("Sorry Try Another one");
                        }
                      }}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <section className="bg-white ">
          <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-16"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl ">
              No Blogs Found
            </h1>
            <p className="font-light text-gray-500 md:text-lg xl:text-xl">
              Oop's You Haven't Created Any Blogs
            </p>
          </div>
        </section>
      )}
    </>
  );
}
