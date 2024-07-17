interface value {
  children: any;
  onClick: (e: any) => void;
  disabled?: boolean;
}
export function Btn({ children, onClick, disabled }: value) {
  return (
    <button
      className="h-12 w-96 bg-black text-white rounded-lg text-md font-semibold hover:bg-gray-700"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
