import { Link } from "react-router-dom";

interface Constrains {
  title: string;
  description: string;
  link: string;
  type: string;
}

export function SignHead({ title, description, link, type }: Constrains) {
  return (
    <>
      <h1
        className="text-4xl font-bold mb-3 text-center
      "
      >
        {title}
      </h1>
      <p className="text-gray-500 text-lg mb-7">
        {description}?{" "}
        <Link to={link} className="underline">
          {type}
        </Link>
      </p>
    </>
  );
}
