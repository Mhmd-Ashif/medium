export function DeleteBtn({ onClick }: { onClick: (e: any) => void }) {
  return (
    <>
      <button
        className="mt-2 h-12 w-full md:w-40 md:m-0 bg-red-500 text-white rounded-lg text-md font-semibold hover:bg-red-800"
        onClick={onClick}
      >
        Delete
      </button>
    </>
  );
}
