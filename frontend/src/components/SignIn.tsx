import { useState } from "react";
import { Btn } from "./Btn";
import { Input } from "./Input";
import { SignHead } from "./SignHead";
import { SignIn } from "@ashif18/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function SignInSide() {
  const navigate = useNavigate();

  const [signin, setSignIn] = useState<SignIn>({
    username: "",
    password: "",
  });

  async function signInUser() {
    try {
      const result = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signin
      );
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      localStorage.setItem("email", result.data.email);

      navigate("/blogs");
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  }

  return (
    <>
      <div className="p-10 h-screen w-auto flex items-center justify-center flex-col">
        <SignHead
          title={"Login Into Your Account"}
          description={"Didn't Have an Account"}
          link={"/signup"}
          type="Signup"
        ></SignHead>
        <Input
          value={"Username"}
          type={"text"}
          placeholder={"Enter Your Username"}
          onChange={(e) => {
            setSignIn((val) => ({
              ...val,
              username: e.target.value,
            }));
          }}
        ></Input>
        <Input
          value={"Password"}
          type={"password"}
          placeholder={"yourpass007"}
          onChange={(e) => {
            setSignIn((val) => ({
              ...val,
              password: e.target.value,
            }));
          }}
        ></Input>
        <Btn value={"Sign In"} onClick={signInUser}></Btn>
      </div>
    </>
  );
}
