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
  const Delete = document.getElementById("deletemodal");
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
                          Delete?.classList.remove("hidden");
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
              x="0px"
              y="0px"
              width="60"
              height="60"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1"
                x1="9.858"
                x2="38.142"
                y1="9.858"
                y2="38.142"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f44f5a"></stop>
                <stop offset=".443" stop-color="#ee3d4a"></stop>
                <stop offset="1" stop-color="#e52030"></stop>
              </linearGradient>
              <path
                fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)"
                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
              ></path>
              <path
                d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z"
                opacity=".05"
              ></path>
              <path
                d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z"
                opacity=".07"
              ></path>
              <path
                fill="#fff"
                d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"
              ></path>
              <path
                fill="#fff"
                d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"
              ></path>
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
