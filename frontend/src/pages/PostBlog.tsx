import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { CreatePostSchema } from "@ashif18/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function PostBlog({
  id,
  blog,
  clickVal,
  value,
}: {
  blog: any;
  value: string;
  id?: number;
  clickVal?: boolean;
}) {
  const navigate = useNavigate();
  const [post, setPost] = useState<CreatePostSchema>({
    title: blog.title,
    content: blog.content,
    thumbnail: blog.thumbnail,
  });

  async function putBlog() {
    try {
      const result = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { id: id, ...post },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      alert(result.data.msg);
      navigate("/blogs");
    } catch (error) {
      alert("Wrong Inputs");
    }
  }

  async function uploadBlog() {
    try {
      const result = await axios.post(`${BACKEND_URL}/api/v1/blog`, post, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert(result.data.msg);
      navigate("/blogs");
    } catch (error) {
      alert("Wrong Inputs");
    }
  }

  return (
    <>
      <AppBar />
      <div className="md:m-24 md:mt-10 md:mb-10">
        <div className="mt-10 ml-4 mr-4  container mx-auto font-serif ">
          <div className="flex gap-3">
            <div className="place-content-center border-r-2 pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div className="grow">
              <input
                defaultValue={blog.title}
                type="text"
                placeholder="Title"
                className=" text-4xl font-medium w-full focus:outline-none"
                onChange={(e) => {
                  setPost((val) => ({ ...val, title: e.target.value }));
                }}
              />
            </div>
          </div>
          <div className="container mx-auto mt-10 md:flex">
            <div className="text-xl text-left  mb-2 md:mb-0">
              Thumbnail Image Link :
            </div>
            <input
              defaultValue={"" || blog.thumbnail}
              type="text"
              placeholder="https://google.com/sekio.png"
              className=" text-xl font-medium focus:outline-none md:ml-4 w-4/5"
              onChange={(e) => {
                setPost((val) => ({ ...val, thumbnail: e.target.value }));
              }}
            />{" "}
          </div>
          <textarea
            defaultValue={"" || blog.content}
            placeholder="Your Blog Content"
            className="mt-10 text-lg font-normal w-full focus:outline-none h-96 md:h-96 text-gray-700"
            onChange={(e) => {
              setPost((val) => ({ ...val, content: e.target.value }));
            }}
          />
        </div>
        <button
          className="flex mx-auto items-center justify-center gap-2 pl-24 pr-24 pt-4 pb-4 text-lg bg-green-500 rounded-xl text-white font-bold place-content-center"
          onClick={clickVal ? putBlog : uploadBlog}
        >
          {`${value}`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
