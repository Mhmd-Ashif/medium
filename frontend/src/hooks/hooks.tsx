import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface blog {
  title: string;
  content: string;
  thumbnail: string | undefined;
  updatedAt: string;
  id: number;
  author: { username: string };
}

export function useBlog({ id }: { id: number }) {
  const [blog, setBlog] = useState<blog | undefined>();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    async function getBlog() {
      try {
        const blog = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const post = await blog.data.post;
        setBlog(post);
        isLoading(false);
      } catch (error) {
        alert("Post Doesn't exist");
      }
    }
    getBlog();
  }, []);
  return { blog, loading };
}

export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, isLoading] = useState(true);
  // use effect to get the blog
  useEffect(() => {
    async function getBlogs() {
      try {
        const result = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        let blogs = await result.data.allPost;
        blogs = blogs.reverse();
        setBlogs(() => {
          return blogs.map((blog: any) => blog);
        });
        isLoading(false);
      } catch (error) {
        alert("Unauthorized User");
      }
    }
    getBlogs();
  }, []);
  return { blogs, loading };
}

export function useDate(createdAt: string) {
  const date = new Date(createdAt);
  const day = date.getDate();
  const year = date.getFullYear();
  const month: string = date.toLocaleString("default", { month: "short" });
  return { day, month, year };
}

export function individualBlogs() {
  const [loading, isLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function IndividualBlog() {
      try {
        const result = await axios.get(`${BACKEND_URL}/api/v1/blog/userblog`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlogs(result.data.posts.reverse());
        isLoading(false);
      } catch (error) {
        alert("UnAuthorized User");
      }
    }
    IndividualBlog();
  }, []);
  return { blogs, loading };
}

export function useMe() {
  const navigate = useNavigate();
  useEffect(() => {
    async function me() {
      try {
        const result = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        navigate("/blogs");
      } catch (error) {
        navigate("/signup");
      }
    }
    me();
  }, []);
}
