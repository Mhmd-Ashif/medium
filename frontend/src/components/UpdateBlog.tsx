import { useParams } from "react-router-dom";
import { PostBlog } from "../pages/PostBlog";
import { useBlog } from "../hooks/hooks";
import { Spinner } from "./Spinner";

export function UpdateBlog() {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: Number(id) });
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <PostBlog
          id={Number(id)}
          blog={blog}
          clickVal={true}
          value={"update"}
        />
      </>
    );
  }
}
