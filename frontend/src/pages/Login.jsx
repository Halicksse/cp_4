/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LoginForm() {
  const { setAuth } = useOutletContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const auth = await response.data;
        setAuth(auth);
        navigate("/");
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl mb-4">Log in</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <input
              type="email"
              className="border rounded-md p-2"
              {...register("email", {
                required: "Required field",
              })}
              placeholder="Email Address"
            />
            {errors.email?.message && (
              <p role="alert" className="">
                {errors.email.message || "Required field"}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              className="border rounded-md p-2"
              {...register("password", {
                required: "Required field",
              })}
              placeholder="Password"
            />
            {errors.password?.message && (
              <p role="alert" className="">
                {errors.password.message || "Required field"}
              </p>
            )}
          </div>
          <button
            className=" border bg-stone-200 shadow-sm text-grey px-3 py-1 rounded-md ml-20"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
