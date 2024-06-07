interface inputConstrains {
  value: string;
  type: string;
  placeholder: string;
  onChange: (e: any) => void;
}

export function Input({ value, type, placeholder, onChange }: inputConstrains) {
  return (
    <>
      <div className="mb-5">
        <p className="text-xl font-bold mb-2">{value}</p>
        <input
          type={type}
          placeholder={placeholder}
          className="rounded-md text-md h-12 w-96 border-solid border-2 pl-4"
          onChange={onChange}
        ></input>
      </div>
    </>
  );
}
