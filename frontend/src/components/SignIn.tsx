import { useState } from "react";
import { Btn } from "./Btn";
import { Input } from "./Input";
import { SignHead } from "./SignHead";
import { SignIn } from "@ashif18/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function SignInSide({ value }: { value: string }) {
  const navigate = useNavigate();

  const [signin, setSignIn] = useState<SignIn>({
    username: "",
    password: "",
  });
  const [popup, setpopup] = useState<boolean>(true);
  const Button = document.getElementsByTagName("button")[0];

  async function signInUser() {
    try {
      Button.innerHTML = `Logging in ... `;
      document
        .getElementsByTagName("button")[0]
        .classList.add("cursor-progress");
      const result = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signin
      );
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      localStorage.setItem("email", result.data.email);
      setTimeout(() => {
        navigate("/blogs");
      }, 100);
    } catch (error: any) {
      document
        .getElementsByTagName("button")[0]
        .classList.remove("cursor-progress");
      setpopup(false);
      document.getElementsByTagName("button")[0].innerText = `${value}`;

      document.getElementsByTagName("span")[0].innerText = `${
        (await error.response.data.msg) ||
        (await error.response.data.prismaError)
      }`;
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
        <Btn onClick={signInUser}>{value}</Btn>
        {popup ? (
          ""
        ) : (
          <div
            className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            <span className="font-medium">Enter Valid Details</span>
            <span> -- Error Occured</span>
          </div>
        )}
      </div>
    </>
  );
}
