import { useDate } from "../hooks/hooks";
import { Avatar } from "./Avatar";

interface blogFull {
  title: string;
  content: string;
  thumbnail: string;
  updatedAt: string;
  id?: number;
  author: { username: string };
}

export function BlogFull({
  title,
  content,
  thumbnail,
  updatedAt,
  author,
}: blogFull) {
  const { day, month, year } = useDate(updatedAt);
  return (
    <>
      <div className="pl-4 pr-4 md:pr-28 md:pl-28 break-words">
        <h1 className="text-5xl font-bold ">{title}</h1>
        <div className="flex w-full mt-6 pb-5 items-center space-x-2 border-b ">
          <Avatar author={author.username} />
          <div className="space-x-2 text-black font-normal text-lg	">
            {author.username}
          </div>
          <div className="space-x-2 place-content-top h-8 text-gray-500 text-lg">
            .
          </div>
          <div className="text-gray-500 text-lg">{`${month} ${day} , ${year}`}</div>
        </div>
        <div className="jodit font-serif text-xl font-light text-gray-800 text-start mt-10">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </>
  );
}
