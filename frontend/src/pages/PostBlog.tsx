import { useEffect, useRef, useState } from "react";
import { AppBar } from "../components/AppBar";
import { CreatePostSchema } from "@ashif18/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Jodit } from "jodit-react";
import "../unreset.css";

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
  const JoditRef = useRef<any>();
  const Alert = document.getElementById("alert");
  const Success = document.getElementById("successmod");
  const [post, setPost] = useState<CreatePostSchema>({
    title: blog.title,
    content: blog.content,
    thumbnail: blog.thumbnail,
  });

  useEffect(() => {
    const joditInstance = Jodit.make("#editor", {
      uploader: {
        insertImageAsBase64URI: true,
      },
      height: 800,
      toolbarButtonSize: "middle",
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      style: {
        fontSize: "18px",
      },
    });
    const editorElement = document.querySelector(".jodit-wysiwyg");
    editorElement?.classList.add("all", "unset");
    joditInstance.setEditorValue(blog.content);
    JoditRef.current = joditInstance;
    joditInstance.events.on("change", (newContent) => {
      setPost((c) => ({
        ...c,
        content: newContent,
      }));
    });

    return () => {
      if (JoditRef.current) {
        JoditRef.current.events.off("change");
      }
    };
  }, []);

  async function putBlog() {
    try {
      document.getElementById("postBtn")?.setAttribute("disabled", "");
      document.getElementById("postBtn")?.classList.add("cursor-wait");
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { id: id, ...post },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      Success?.classList.remove("hidden");
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (error: any) {
      document.getElementById("postBtn")?.removeAttribute("disabled");
      document.getElementById("postBtn")?.classList.remove("cursor-wait");
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      Alert?.classList.remove("hidden");
    }
  }

  async function uploadBlog() {
    try {
      document.getElementById("postBtn")?.setAttribute("disabled", "");
      document.getElementById("postBtn")?.classList.add("cursor-wait");
      await axios.post(`${BACKEND_URL}/api/v1/blog`, post, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      Success?.classList.remove("hidden");
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (error) {
      document.getElementById("postBtn")?.removeAttribute("disabled");
      document.getElementById("postBtn")?.classList.remove("cursor-wait");
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      document.getElementById("alert")?.classList.remove("hidden");
    }
  }
  return (
    <>
      <SuccessModal />
      <AppBar />
      <AlertComponent />
      <div className="md:m-24 md:mt-10 md:mb-10">
        <div className="mt-10 ml mr  container mx-auto font-serif ">
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
              placeholder="https://google.com/sekiro.png"
              className=" text-xl font-medium focus:outline-none md:ml-4 w-4/5 mb-10"
              onChange={(e) => {
                setPost((val) => ({ ...val, thumbnail: e.target.value }));
              }}
            />{" "}
          </div>
          <div
            id="editor"
            className="mt-10 text-lg font-normal w-full focus:outline-none h-96 md:h-96 text-gray-700"
          ></div>
        </div>
        <button
          className="disabled:opacity-75 mt-10 flex mx-auto items-center justify-center gap-2 pl-24 pr-24 pt-4 pb-4 text-lg bg-green-500 rounded-xl text-white font-bold place-content-center"
          onClick={clickVal ? putBlog : uploadBlog}
          id="postBtn"
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

export function AlertComponent() {
  return (
    <>
      <div id="alert" className="hidden m-8">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 ">
          Oops!! Error Occured
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>
            Tip : Please sent the Correct Inputs
            <ul className="list-disc ml-4">
              <li>Blog Title should have minimum 50 Characters</li>
              <li>Thumbnail image is optional</li>
              <li>Blog Title must have 128 Characters or more</li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
}

export function SuccessModal() {
  return (
    <div
      id="successmod"
      className="hidden fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto"
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="my-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 shrink-0 fill-green-500 inline"
            viewBox="0 0 512 512"
          >
            <path
              d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
              data-original="#000000"
            />
            <path
              d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
              data-original="#000000"
            />
          </svg>
          <h4 className="text-xl text-gray-800 mt-4 font-semibold">
            Successfully accepted
          </h4>
        </div>
      </div>
    </div>
  );
}
