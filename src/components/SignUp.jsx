import React from "react";
import { Logo } from "./Logo.jsx";
import { useForm } from "react-hook-form";
import { GetImagePreview } from "./GetImagePreview.jsx";
import { Input } from "./Input.jsx";
import { Button } from "./Button.jsx";
import { Link } from "react-router-dom";
export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const submit = (data) => {
    console.log(data);
  };
  return (
    <div
      id="container"
      className=" border border-slate-600 p-3 flex flex-col  items-center space-y-2"
    >
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-4 p-2 text-sm sm:w-96 w-full"
      >
        <div className="w-full relative h-28 bg-[#222222]">
          <div className="w-full h-full">
            <GetImagePreview
              name="coverImage"
              control={control}
              className="w-full h-28 object-cover border-none border-slate-900"
              cameraIcon
            />
            <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
              Cover Image
            </div>
          </div>
          <div className="absolute left-2 bottom-2 rounded-full border-2">
            <GetImagePreview
              name="avatar"
              control={control}
              className="object-cover rounded-full h-20 w-20 outline-none"
              cameraIcon={true}
              cameraSize={20}
            />
          </div>
        </div>
        {errors.avatar && (
          <span className="text-red-500">{errors.avatar.message}</span>
        )}
        {errors.coverImage && (
          <span className="text-red-500 ml-3">{errors.coverImage.message}</span>
        )}
        <Input
          placeholder="Enter username"
          label="Username:"
          className="h-8"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must not exceed 20 characters",
            },
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message:
                "Username can only contain letters, numbers, and underscores",
            },
          })}
        />
        {errors.username && (
          <div className="text-red-500">{errors.username.message}</div>
        )}

        <Input
          placeholder="Enter email"
          label="Email:"
          className="h-8"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <Input
          placeholder="Enter fullname"
          label="Full Name:"
          className="h-8"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters long",
            },
            maxLength: {
              value: 50,
              message: "Full name must not exceed 50 characters",
            },
          })}
        />
        {errors.fullName && (
          <div className="text-red-500">{errors.fullName.message}</div>
        )}

        <Input
          placeholder="Enter password"
          label="Password:"
          className="h-8"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 20,
              message: "Password must not exceed 20 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                "Password must contain at least one letter and one number",
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
          Signup
        </Button>
        <div className="flex items-center justify-center">
          <p className="font-medium">Already have an account?</p>
          <Link
            to={"/login"}
            className="text-purple-600 cursor-pointer hover:opacity-70"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
