export function UpdateBtn({ onClick }: { onClick: (e: any) => void }) {
  return (
    <>
      <button
        className="w-full md:w-40 h-12  bg-green-500 text-white rounded-lg text-md font-semibold hover:bg-green-800"
        onClick={onClick}
      >
        Update
      </button>
    </>
  );
}
