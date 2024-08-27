import React, { useEffect } from "react";
import { Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountDetails } from "../store/Slices/authSlice";
import Input2 from "../components/Input2";

const EditPersonalInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    setValue("fullName", auth?.fullName);
    setValue("username", auth?.username);
    setValue("email", auth?.email);
  }, [auth, setValue]);

  const saveChanges = (data) => {
    dispatch(updateAccountDetails(data));
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset({
      fullName: auth?.fullName,
      username: auth?.username,
      email: auth?.email,
    });
  };

  return (
    <div className="w-full text-white flex justify-center items-center mt-5">
      <div className="bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          Personal Information
          <p className="font-light text-xs">
            Update your personal details here.
          </p>
        </h2>
        <form onSubmit={handleSubmit(saveChanges)} className="space-y-4">
          <div className="flex flex-col">
            <Input2
              label="Full Name"
              type="text"
              className="rounded"
              {...register("fullName", {
                required: "Full Name is required",
              })}
            />
            {errors.fullName && (
              <span className="text-sm text-red-500">
                {errors.fullName?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="Username"
              type="text"
              className="rounded"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <span className="text-sm text-red-500">
                {errors.username?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="Email"
              type="email"
              className="rounded"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <div onClick={handleReset}>
              <Button className="bg-gray-500 text-white px-4 py-2 rounded">
                Reset
              </Button>
            </div>
            <Button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
