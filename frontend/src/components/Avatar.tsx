export function Avatar({ author }: { author: string }) {
  return (
    <>
      <div
        className={`bg-gray-700 text-white size-6 text-xs place-content-center text-center rounded-full `}
      >
        {author
          .toUpperCase()
          .split(" ")
          .map((name) => name[0])
          .slice(0, 2)}
      </div>
    </>
  );
}
