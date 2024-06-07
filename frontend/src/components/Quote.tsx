interface quoteContent {
  content: string;
  name: string;
  profession: string;
}

export function Quote({ content, name, profession }: quoteContent) {
  return (
    <div className=" p-10 bg-gray-200 h-screen w-auto flex items-center justify-center">
      <div>
        <h1 className=" text-3xl font-bold leading-snug ">{content}</h1>
        <h3 className="mt-4 text-xl font-bold">{name}</h3>
        <h3 className="text-md text-gray-500">{profession}</h3>
      </div>
    </div>
  );
}
