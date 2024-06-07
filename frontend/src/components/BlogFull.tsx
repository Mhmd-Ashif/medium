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
      <div className="pl-4 pr-4 md:pr-28 md:pl-28 ">
        <h1 className="text-5xl font-bold">{title}</h1>
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
        <div className="mt-8 flex justify-center">
          <img
            src={thumbnail}
            alt="Thumbnail image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://imgs.search.brave.com/MTrlyxOZcV85Hrk0UvoAzjkfOI9Sp8bsSmV-gRiwQPw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMud29uZGVyc2hh/cmUuY29tL3JlcGFp/cml0L2F0aWNsZS8y/MDIxLzA3L3Jlc29s/dmUtaW1hZ2VzLW5v/dC1zaG93aW5nLXBy/b2JsZW0tMS5qcGc";
            }}
          />
        </div>
        <div className="font-serif text-xl font-light text-gray-800 text-start mt-10  ">
          {content.split(/\r?\n|\r|\n/g).map((con) => (
            <>
              <div>{con}</div>
              <br></br>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
