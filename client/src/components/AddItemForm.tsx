import { useFormik } from "formik";
import React, { ReactElement } from "react";
import Button from "./shared/Button";
import InputGroup from "./shared/InputGroup";
import SelectGroup from "./shared/SelectGroup";
import TextAreaGroup from "./shared/TextAreaGroup";

type AddItemFormProps = React.FormHTMLAttributes<HTMLFormElement>;
interface FormValues {
  name: string;
  note?: string;
  image?: string;
  category: string;
}

const validate = async (values: FormValues) => {
  let errors: FormValues = { name: "", category: "" };

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 30) {
    errors.name = "Must be 30 characters or less";
  }
  if (!values.category) {
    errors.category = "Required";
  }
  if (values.note && values.note.length > 500) {
    errors.note = "Must be 500 characters or less";
  }

  return errors;
};

const initialValues: FormValues = {
  name: "",
  note: "",
  image: "",
  category: "",
};

function AddItemForm({ className }: AddItemFormProps): ReactElement {
  const formik = useFormik({
    initialValues: { ...initialValues },
    validate,
    onSubmit: (values, actions) => {
      console.log({ values, actions });
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col justify-between">
      <form
        className={`${className} flex-1 w-full p-5 overflow-auto sidedrawer-scrollbar`}
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div>
          <h1 className="mb-5 text-2xl font-semibold">Add a new item</h1>
          <InputGroup
            parentClassName="my-4"
            className="border-2 border-gray-400 hover:border-gray-800 focus-within:border-gray-800"
            type="text"
            id="name"
            label="Name"
            placeholder="Enter a name"
            inputClassName="py-3 pl-3"
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            {...formik.getFieldProps("name")}
          />
          <TextAreaGroup
            className="my-4"
            id="note"
            label="Note (optional) "
            placeholder="Enter a note"
            inputClassName="py-3 pl-3 border-2 border-gray-400  hover:border-gray-800 focus:ring-0 focus:border-gray-800"
            maxLength={500}
            rows={8}
            error={
              formik.touched.note && formik.errors.note
                ? formik.errors.note
                : ""
            }
            {...formik.getFieldProps("note")}
          />

          <InputGroup
            parentClassName="my-4"
            className="border-2 border-gray-400 hover:border-gray-800 focus-within:border-gray-800"
            type="text"
            id="image"
            label="Image (optional)"
            placeholder="Enter a url"
            inputClassName="py-3 pl-3"
            error={
              formik.touched.image && formik.errors.image
                ? formik.errors.image
                : ""
            }
            {...formik.getFieldProps("image")}
          />

          <SelectGroup
            className="my-4"
            id="category"
            label="Category"
            inputClassName="py-3 pl-3 border-2 border-gray-400  hover:border-gray-800 focus:ring-0 focus:border-gray-800"
            placeholder="Enter a category"
            options={["Enter a category", "Fruits and vegetables", "Beverages"]}
            error={
              formik.touched.category && formik.errors.category
                ? formik.errors.category
                : ""
            }
            {...formik.getFieldProps("category")}
          />
          <div className="flex items-center justify-center w-full h-24 px-5 bg-white sm:h-28">
            <Button
              className="px-5 py-3 mr-2 rounded-xl"
              onClick={() => {}}
              aria-label="modal cancel button"
              link
            >
              cancel
            </Button>
            <Button
              className="px-5 py-3 text-white rounded-xl"
              color="blue"
              onClick={() => {}}
              aria-label="modal confirm button"
            >
              Complete
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddItemForm;
