import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/hooks";
import { Skeleton } from "../components/Skeleton";

interface blog {
  author: { username: string };
  title: string;
  content: string;
  thumbnail: string;
  id: number;
  updatedAt: string;
}

export function Blogs() {
  const { blogs, loading } = useBlogs();
  if (loading == true) {
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
  } else {
    return (
      <>
        <AppBar />
        <div className="pl-2 pr-2 md:pl-36 md:pr-36">
          {blogs.map((blog: blog) => (
            <Link to={`/blog/${blog.id}`}>
              <BlogCard
                author={blog.author.username || "anonymous"}
                title={blog.title}
                content={blog.content}
                thumbnail={blog.thumbnail}
                createdAt={blog.updatedAt}
              />
            </Link>
          ))}
          <BlogCard
            author={"anonymous"}
            title={"testing"}
            content={"testing"}
            thumbnail={
              "https://ashifmedium.s3.amazonaws.com/fullmetal-alchemist.png"
            }
            createdAt={"2024-04-02"}
          />
        </div>
      </>
    );
  }
}
