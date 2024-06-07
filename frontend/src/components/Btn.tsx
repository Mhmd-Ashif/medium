interface value {
  value: string;
  onClick: (e: any) => void;
}
export function Btn({ value, onClick }: value) {
  return (
    <button
      className="h-12 w-96 bg-black text-white rounded-lg text-md font-semibold hover:bg-gray-700"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
