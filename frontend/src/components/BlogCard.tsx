import { useDate } from "../hooks/hooks";
import { Avatar } from "./Avatar";

interface blogcard {
  author: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

export function BlogCard({ author, title, thumbnail, createdAt }: blogcard) {
  const { day, month, year } = useDate(createdAt);
  return (
    <>
      <div className="flex h-fit p-5 pb-0 items-center grow space-x-2 ">
        <Avatar author={author} />
        <div className="space-x-2 text-black font-normal	">{author}</div>
        <div className="space-x-2 place-content-top h-8 text-gray-500">.</div>
        <div className="text-gray-500">{`${month} ${day} , ${year}`}</div>
      </div>
      <div className="flex flex-col md:flex-row h-fit p-5 pt-0 gap-8 items-center justify-between border-b border-slate-200">
        <div className="order-2 md:order-1">
          <div className="text-black text-2xl mb-2 font-bold ">{title}</div>
          <div className="text-gray-700 text-md font-serif">
            {title.slice(0, 40) + " ... See more ..."}
          </div>
          <div className="mt-1 text-sm text-gray-500">{`${Math.ceil(
            title.length / 100
          )} min read`}</div>
        </div>
        <div className="w-full md:w-48 place-content-center order-1 md:order-2 mt-4 md:mt-0">
          <img
            src={`${thumbnail}`}
            alt="Not Found"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://imgs.search.brave.com/K3qeJtm_up-upl3RLJWUvn5gAAdCoNqMoXs5Gox95xU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVibGljZG9tYWlu/cGljdHVyZXMubmV0/L3BpY3R1cmVzLzI4/MDAwMC92ZWxrYS9u/b3QtZm91bmQtaW1h/Z2UtMTUzODM4NjQ3/ODdsdS5qcGc";
            }}
          />
        </div>
      </div>
    </>
  );
}
