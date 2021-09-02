import Button from "components/shared/Button";
import Card from "components/shared/Card";
import InputGroup from "components/shared/InputGroup";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { CircularProgress } from "@material-ui/core";
import {useEffect, useState} from "react"
import axios from "axios";

interface Props {
  authType: "Login" | "Signup";
  url: string;
}

export interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
};

function validate(values: FormValues) {
  let errors: any = {};

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

export default function AuthCard({ authType, url }: Props): ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await axios.post("/api/auth");
        router.push("/");
      } catch (err) {
        setIsLoading(false);
      }
    })();

    return () => {};
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: { ...initialValues },
    validate,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(false);
      try {
        const response = await axios.post(url, values);
        router.push("/");
      } catch (err) {
        if (err?.response?.data) {
          const data  = err.response.data;
          actions.setErrors({
            username: data.errors.username,
            password:
              data.errors.password ||
              data.errors.message,
          });
        } else {
          actions.setErrors({
            password: "Unexpected error please try again.",
          });
        }
      }
    },
  });

  if (isLoading)
    return (
      <div>
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );

  return (
    <Card
      className="w-full xs:w-auto xs:min-w-[400px]"
      leftElements={
        <form
          className="w-full h-full px-2 py-3 sm:px-5"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="mb-4 text-2xl font-medium text-center">{authType}</h1>
          <InputGroup
            parentClassName={
              formik.touched.username && formik.errors.username
                ? "pb-1"
                : "pb-4"
            }
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
            parentClassName={
              formik.touched.password && formik.errors.password
                ? "pb-1"
                : "pb-4"
            }
            className="border border-gray-600 hover:ring-1 hover:ring-yellow-primary hover:border-yellow-primary focus-within:ring-1 focus-within:ring-yellow-primary focus-within:border-yellow-primary"
            type="password"
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
              Don&apos;t have an account?{" "}
              <Link href="/signup" passHref>
                <a className="text-blue-500" tabIndex={0}>
                  Register
                </a>
              </Link>
            </small>
          ) : (
            <small className="block mb-3">
              Already have an account?{" "}
              <Link href="/login" passHref>
                <a className="text-blue-500" tabIndex={0}>
                  Login
                </a>
              </Link>
            </small>
          )}

          <Button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-md"
            color="orange"
            onClick={() => {}}
            block
          >
            {authType}
          </Button>
        </form>
      }
    />
  );
}
