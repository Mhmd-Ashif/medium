import { useState } from "react";
import { Btn } from "./Btn";
import { Input } from "./Input";
import { SignHead } from "./SignHead";
import { SignUp } from "@ashif18/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function SignUpSide() {
  const navigate = useNavigate();

  const [signup, setSignUp] = useState<SignUp>({
    username: "",
    email: "",
    password: "",
  });

  async function signUpUser() {
    try {
      const result = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signup
      );
      console.log(result);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      localStorage.setItem("email", result.data.email);
      navigate("/blogs");
    } catch (error: any) {
      alert(error.response.data.msg || error.response.data.prismaError);
    }
  }

  return (
    <>
      <div className="p-10 h-screen flex items-center justify-center flex-col">
        <SignHead
          title={"Create an account"}
          description={"Already have an account"}
          link={"/signin"}
          type="Signin"
        ></SignHead>
        <Input
          value={"Username"}
          type={"text"}
          placeholder={"Enter Your Username"}
          onChange={(e) => {
            setSignUp((val) => ({
              ...val,
              username: e.target.value,
            }));
          }}
        ></Input>
        <Input
          value={"Email"}
          type={"text"}
          placeholder={"youremail@gmail.com"}
          onChange={(e) => {
            setSignUp((val) => ({
              ...val,
              email: e.target.value,
            }));
          }}
        ></Input>
        <Input
          value={"Password"}
          type={"password"}
          placeholder={"yourpass007"}
          onChange={(e) => {
            setSignUp((val) => ({
              ...val,
              password: e.target.value,
            }));
          }}
        ></Input>
        <Btn value={"Sign Up"} onClick={signUpUser}></Btn>
      </div>
    </>
  );
}
