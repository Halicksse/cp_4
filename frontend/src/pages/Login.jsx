/* eslint-disable react/jsx-props-no-spreading */
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const { handleSubmit, control } = useForm();
  const { setAuth } = useOutletContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );
      if (response.status === 200) {
        const auth = await response.data;
        setAuth(auth);
        navigate("/");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <label className="" htmlFor="email">
          email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input className="" type="email" id="email" {...field} />
          )}
        />

        <label className="" htmlFor="password">
          password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input className="" type="password" id="password" {...field} />
          )}
        />

        <button className="" type="submit">
          send
        </button>
      </form>
    </div>
  );
}
