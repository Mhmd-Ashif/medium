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

  return (
    <>
      <DeleteModal />
      <AppBar />
      {blogs.length ? (
        <>
          <div className="mt-8 text-center text-4xl font-bold">Your Blog's</div>
          <div className=" pl-2 pr-2 md:pl-36 md:pr-36">
            {blogs.map((blog: blog) => {
              return (
                <>
                  <div className="relative md:flex md md:items-center gap-2 ">
                    <div className="w-full">
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
                    </div>
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
                          const result = await axios.delete(
                            `${BACKEND_URL}/api/v1/blog/del`,
                            {
                              data: { id: blog.id },
                              headers: {
                                Authorization: localStorage.getItem("token"),
                              },
                            }
                          );
                          console.log(result.data);
                          document
                            .getElementById("deletemodal")
                            ?.classList.remove("hidden");
                          setTimeout(() => {
                            navigate("/blogs");
                          }, 2000);
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
                className="size-8"
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

export function DeleteModal() {
  return (
    <div
      id="deletemodal"
      className=" hidden fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto"
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="my-8 text-center">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
          <h4 className="text-xl text-gray-800 mt-4 font-semibold">
            Post Deleted Successfully
          </h4>
        </div>
      </div>
    </div>
  );
}
