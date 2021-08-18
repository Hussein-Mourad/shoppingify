import Card from "components/shared/Card";
import { useFormik } from "formik";
import { ReactElement } from "react";
import InputGroup from "components/shared/InputGroup";
import Button from "components/shared/Button";
import Link from "next/link";
import AuthCard from "components/AuthCard";

export default function login(): ReactElement {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <AuthCard authType="Login" />
    </main>
  );
}
