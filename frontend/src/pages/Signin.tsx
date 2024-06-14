import { Quote } from "../components/Quote";
import { SignInSide } from "../components/SignIn";

export function Signin() {
  return (
    <>
      <div className="block md:flex md:flex-row">
        <div className="h-0 w-fit md:w-screen block">
          <SignInSide></SignInSide>
        </div>
        <div className="invisible md:w-screen  md:visible">
          <Quote
            content={`Creating Blog and Reading Random Blog was So good and I Personally Like the Minimalism Here!!`}
            name={"Mohamed Ashiq"}
            profession={"Entrepreneur, Trichy"}
          />
        </div>
      </div>
    </>
  );
}
