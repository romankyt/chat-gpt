"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChatBotIcon } from "../icons/chat-bot-icon";
import { Button } from "../button";

import loginImage from "../../assets/images/login-image.png";
import { useEffect, useState } from "react";
import { LoginFormData, SignUpData } from "@/types/types";
import { login, signUp } from "@/requests/requests";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { createUser } from "@/redux/slices/slice";
import { useRouter } from "next/navigation";

export const AuthComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData | SignUpData> = async (data) => {
    try {
      let authToken: string;
      if (isLogin) {
        const response = await login(data as LoginFormData);
        authToken = response.data.authToken;
      } else {
        const response = await signUp(data as SignUpData);
        authToken = response.data.authToken;
      }

      localStorage.setItem("authToken", authToken);

      if (authToken) {
        dispatch(createUser(authToken));
      }
    } catch (error) {
      console.error(isLogin ? "Login failed:" : "Sign Up failed:", error);
    }
  };

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const handleLoginState = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (user && authToken) {
      router.push("/content");
    }
  }, [user, router]);

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must have at least 6 characters",
    },
    validate: {
      hasUpperCase: (value: string) =>
        /[A-Z]/.test(value) ||
        "Password must have at least one uppercase letter",
      hasNumber: (value: string) =>
        /\d/.test(value) || "Password must have at least one number",
    },
  };

  const nameValidation = {
    required: "Name is required",
    pattern: {
      value: /^[a-zA-Z\s]*$/,
      message: "Name must not contain any special characters",
    },
  };

  const confirmPasswordValidation = {
    required: "Confirm password is required",
    validate: (value: string) =>
      value === watch("password") || "It  does not match password",
  };

  return (
    <main className="w-full h-full flex flex-col lg:flex-row ">
      <div className="w-full lg:w-[32%] h-full px-4 lg:px-[22px] flex flex-col items-center justify-center">
        <section className="w-full flex flex-col items-center gap-3">
          <div>
            <ChatBotIcon />
          </div>
          <span className="loginText text-lg lg:text-xl">
            {isLogin ? "Log In" : "Sign Up"}
          </span>
          {isLogin ? (
            <form
              className="w-full flex flex-col gap-3 mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1">
                <label className="formLabel">Email</label>
                <input
                  type="email"
                  className="p-2 border border-#EFEFF0 rounded"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email must follow the pattern user@example.com",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label className="formLabel">Password</label>
                <input
                  type="password"
                  className="p-2 border border-#EFEFF0 rounded"
                  {...register("password", passwordValidation)}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password?.message?.toString()}
                  </span>
                )}
              </div>
              <Button
                type="primary"
                text="Log in"
                rounded="base"
                width="100%"
                height="44px"
              />
            </form>
          ) : (
            <form
              className="w-full flex flex-col gap-4 mt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1">
                <label className="formLabel">Email</label>
                <input
                  type="email"
                  className="p-2 border border-#EFEFF0 rounded"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email must follow the pattern user@example.com",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="formLabel">Name</label>
                <input
                  type="text"
                  className="p-2 border border-#EFEFF0 rounded"
                  {...register("name", nameValidation)}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label className="formLabel">Password</label>
                <input
                  type="password"
                  className="p-2 border border-#EFEFF0 rounded"
                  {...register("password", passwordValidation)}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label className="formLabel">Confirm Password</label>
                <input
                  type="password"
                  className="p-2 border border-#EFEFF0 rounded"
                  {...register("password", passwordValidation)}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword?.message?.toString()}
                  </span>
                )}
              </div>
              <Button
                type="primary"
                text="Sign Up"
                rounded="base"
                width="100%"
                height="44px"
              />
            </form>
          )}

          <button className=" self-start mt-6" onClick={handleLoginState}>
            <span className="linkText">
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Log In"}
            </span>
          </button>
        </section>
      </div>
      <main
        className="w-full lg:w-[68%] h-full hidden lg:block"
        style={{
          backgroundImage: `url(${loginImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></main>
    </main>
  );
};
