import { Link } from "react-router-dom";

export function AppBar() {
  return (
    <>
      <div className="flex justify-between pt-4 pb-4 pl-8 pr-8  border-b border-slate-300">
        <Link to="/blogs">
          <div className="text-2xl font-semibold place-content-center">
            Medium
          </div>
        </Link>
        <AvatarBUG />
      </div>
    </>
  );
}

export function AvatarBUG() {
  const username: string | null = localStorage.getItem("username");
  const email: string | null = localStorage.getItem("email");
  return (
    <>
      <div>
        <button
          id="dropdownInformationButton"
          onClick={() => {
            const drop = document.getElementById("dropdownInformation");
            drop?.classList.toggle("hidden");
          }}
          type="button"
          className={`bg-gray-700 text-white size-10 text-md place-content-center text-center rounded-full `}
        >
          {username
            ? username
                .toUpperCase()
                .split(" ")
                .map((name) => name[0])
                .slice(0, 2)
            : ""}
        </button>

        <div
          id="dropdownInformation"
          className="z-10 hidden mt-4 absolute right-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-2 py-3 text-sm text-gray-900 ">
            <div>{username}</div>
            <div className="font-medium truncate">{email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <Link
                to="/post"
                className="flex justify-between px-4 py-2 hover:bg-gray-100 "
              >
                Create
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="flex justify-between px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <Link
              to="/signin"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
              }}
              className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
