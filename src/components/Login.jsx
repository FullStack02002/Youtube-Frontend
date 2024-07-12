import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
import { Logo } from "./Logo";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log(data);
  };
  return (
    <div
      id="container"
      className=" flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20"
    >
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-4 p-2 text-sm sm:w-96 w-full"
      >
        <Input
          placeholder="example@gmail.com"
          label="Username/email"
          className="h-8"
          {...register("username", {
            required: "Username or email is required",
           
          })}
        />
        {errors.username && (
          <div className="text-red-500">{errors.username.message}</div>
        )}

        <Input
          placeholder="1kd074fjw0"
          label="Password:"
          className="h-8"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                "Password must contain at least one letter, one number, and one special character",
            },
          })}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <Button
          type="submit"
          bgColor="bg-purple-700"
          className="w-full hover:scale-110 duration-100 ease-in"
        >
          Login
        </Button>
        <div className="flex items-center justify-center">
          <p className="font-medium">Don't have an account?</p>
          <Link
            to={"/signup"}
            className="text-purple-600 cursor-pointer hover:opacity-70"
          >
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
};
