import { Spinner } from "../components/Spinner";
import { useMe } from "../hooks/hooks";

export function Me() {
  useMe();
  return (
    <>
      <Spinner />
    </>
  );
}
