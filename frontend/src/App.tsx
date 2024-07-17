import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Signup } from "./pages/Signup.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Blog } from "./pages/Blog.tsx";
import { Blogs } from "./pages/Blogs.tsx";
import { PostBlog } from "./pages/PostBlog.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { UpdateBlog } from "./components/UpdateBlog.tsx";
import { Me } from "./pages/Me.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Me />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
          <Route path="/blog/:id" element={<Blog></Blog>} />
          <Route
            path="/post"
            element={
              <PostBlog
                blog={{ title: "", thumbnail: "", content: "" }}
                value="Post"
              ></PostBlog>
            }
          ></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route
            path="*"
            element={
              <section className="bg-white ">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                  <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
                      404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                      Something's missing.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500">
                      Sorry, we can't find that page. You'll find lots to
                      explore on the home page.{" "}
                    </p>
                    <Link
                      to={"/"}
                      className="inline-flex text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
                    >
                      Back to Homepage
                    </Link>
                  </div>
                </div>
              </section>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
