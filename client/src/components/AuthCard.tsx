import Card from "components/shared/Card";
import { useFormik } from "formik";
import { ReactElement, useRef } from "react";
import InputGroup from "components/shared/InputGroup";
import Button from "components/shared/Button";
import Link from "next/link";

interface Props {
  authType: "Login" | "Signup";
}

interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
};

function validate(values: FormValues) {
  let errors: FormValues = { username: "", password: "" };

  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  } else {
    if (values.password.toLowerCase() === values.password) {
      errors.password = "At least one uppercase character is required";
    }
    if (!/[a-z]/.test(values.password)) {
      errors.password = "At least one lowercase character is required";
    }
    if (!/\d/.test(values.password)) {
      errors.password = "At least one digit is required";
    }
  }
  return errors;
}

export default function AuthCard({ authType }: Props): ReactElement {
  const formik = useFormik({
    initialValues: { ...initialValues },
    validate,
    onSubmit: (values, actions) => {
      console.log("hi");
      console.log({ values, actions });
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    },
  });

  return (
    <Card
      className="w-full xs:w-auto"
      leftElements={
        <form
          className="w-full h-full px-2 py-3 sm:px-5"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-2xl font-medium text-center">{authType}</h1>
          <InputGroup
            parentClassName="my-4"
            className="border border-gray-600 hover:ring-1 hover:ring-yellow-primary hover:border-yellow-primary focus-within:ring-1 focus-within:ring-yellow-primary focus-within:border-yellow-primary"
            type="text"
            id="username"
            label="Username"
            placeholder="Enter your username"
            inputClassName="py-2 pl-3"
            rounded="md"
            error={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : " "
            }
            {...formik.getFieldProps("username")}
          />
          <InputGroup
            parentClassName="my-4"
            className="border border-gray-600 hover:ring-1 hover:ring-yellow-primary hover:border-yellow-primary focus-within:ring-1 focus-within:ring-yellow-primary focus-within:border-yellow-primary"
            type="text"
            id="password"
            label="Passwod"
            placeholder="Enter your password"
            inputClassName="py-2 pl-3"
            rounded="md"
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : " "
            }
            {...formik.getFieldProps("password")}
          />
          {authType === "Login" ? (
            <small className="block mb-3">
              Don't have an account?{" "}
              <Link href="/signup" passHref>
                <a className="text-blue-600">Register</a>
              </Link>
            </small>
          ) : (
            <small className="block mb-3">
              Already have an account?{" "}
              <Link href="/login" passHref>
                <a className="text-blue-600">Login</a>
              </Link>
            </small>
          )}
          <input
            type="submit"
            className="block w-full px-4 py-2 font-semibold text-white transition-all duration-200 ease-in-out rounded-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 bg-yellow-primary hover:bg-yellow-primary/90 active:bg-yellow-600/80 active:text-opacity-90 focus:ring focus:ring-yellow-100"
            value={authType}
          />
        </form>
      }
    />
  );
}
