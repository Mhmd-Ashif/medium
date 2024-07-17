import { Quote } from "../components/Quote";
import { SignUpSide } from "../components/SignUp";

export function Signup() {
  return (
    <>
      <div className="block md:flex md:flex-row ">
        <div className="h-0 w-fit md:w-screen block ">
          <SignUpSide value={"Sign Up"}></SignUpSide>
        </div>
        <div className="invisible md:w-screen  md:visible">
          <Quote
            content={`The Customer Service That I Received was Exceptional. The Support
          team Went above and Beyond to address my concerns.`}
            name={"Mohamed Ashif"}
            profession={"Student, PITS Thanjavur"}
          />
        </div>
      </div>
    </>
  );
}
