/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => setChecked(!checked);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");
  const onSubmit = (data) => {
    if (checked) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user`, data)
        .then(navigate("/user/login"));
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-4 ">Sign up</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              className="border rounded-md p-2 mb-1 ml-20"
              {...register("firstname", {
                required: "Required field",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },
              })}
              placeholder="firstname"
            />
            {errors.firstname && (
              <p role="alert" className="">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              className="border rounded-md p-2 mb-1 ml-20"
              {...register("lastname", {
                required: "Required field",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },
              })}
              placeholder="lastname"
            />
            {errors.lastname && (
              <p role="alert" className="">
                {errors.lastname.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              className="border rounded-md p-2 mb-1 ml-20"
              {...register("email", {
                required: "required field",
                pattern: {
                  value: /\./,
                  message: "must contain a dot",
                },
              })}
              placeholder="plannit@email.com"
            />
            {errors.email?.message && (
              <p role="alert" className="">
                {" "}
                {errors.email.message || "required field"}{" "}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              className="border rounded-md p-2 mb-1 ml-20"
              {...register("password", {
                required: "required field",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                  message:
                    "must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              placeholder="password"
            />
            {errors.password && (
              <p role="alert" className="">
                {" "}
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              className="border rounded-md p-2 mb-1 ml-20"
              {...register("confirmpassword", {
                required: "required field",
                validate: (value) =>
                  value === passwordRef.current || "passwords are not the same",
              })}
              placeholder="password verification"
            />
            {errors.confirmpassword && (
              <p role="alert" className="">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>

          <div className="">
            <p className="">I accept the Terms of service and Privacy policy</p>
            <input type="checkbox" onChange={handleCheck} className="" />
          </div>

          <div>
            <button
              className=" border bg-stone-200 shadow-sm text-grey px-3 py-1 rounded-md  "
              type="submit"
              onClick={!checked}
            >
              Accept
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
