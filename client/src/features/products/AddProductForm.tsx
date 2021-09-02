import { useFormik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import Button from "components/shared/Button";
import InputGroup from "components/shared/InputGroup";
import SelectGroup from "components/shared/SelectGroup";
import TextAreaGroup from "components/shared/TextAreaGroup";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setSideDrawerState } from "features/layouts/layoutSlice";
import ICategory from "types/Category";
import { addNewProduct } from "./productsSlice";
import axios from "axios";

type AddProductFromProps = React.FormHTMLAttributes<HTMLFormElement>;
interface FormValues {
  name: string;
  note?: string;
  image?: string;
  category: string;
}

const validate = async (values: FormValues) => {
  let errors: any = {};

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

function AddProductFrom({ className }: AddProductFromProps): ReactElement {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const productErrors = useAppSelector((state) => state.products.errors);

  const formik = useFormik({
    initialValues: { ...initialValues },
    validate,
    onSubmit: async (values, actions) => {
       const result = await dispatch(
        addNewProduct({
          name: values.name.trim(),
          description: values.note?.trim(),
          imageUrl: values.image?.trim(),
          categoryName: values.category.trim(),
        })
      );
      
      if (productErrors) {
        actions.setErrors({
          name: productErrors.name ?? "",
          note: productErrors.description ?? "",
          image: productErrors.imageUrl ?? "",
          category: productErrors.category ?? "",
        });
      } else {
        actions.resetForm();
      }

      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/categories");
        let tmp: string[] = [];
        response.data.categories.forEach((category: ICategory) => {
          tmp.push(category.name);
        });
        setSuggestions(tmp);
      } catch (error) {}
    })();
    return () => {};
  }, []);

  return (
    <>
      <form
        className={`${className} bg-white flex flex-col h-full w-full`}
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="flex-1 w-full h-full px-5 pt-4 overflow-auto scrollbar-hidden">
          <div className="mb-8">
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
              inputClassName="py-3 pl-3 border-2 border-gray-400  hover:border-gray-800 focus:ring-0 focus:border-gray-800 resize-y-none min-h-[100px] max-h-80"
              maxLength={300}
              rows={4}
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
            {/* Todo: change select group to input with suggestions */}
            <SelectGroup
              className="my-4"
              id="category"
              label="Category"
              inputClassName="py-3 pl-3 border-2 border-gray-400  hover:border-gray-800 focus:ring-0 focus:border-gray-800"
              placeholder="Enter a category"
              options={suggestions}
              error={
                formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : ""
              }
              {...formik.getFieldProps("category")}
            />
          </div>
          <div className="flex items-center justify-center w-full h-24 px-5 bg-white sm:h-28">
            <Button
              className="px-5 py-3 mr-2 rounded-xl"
              onClick={() =>
                dispatch(
                  setSideDrawerState({
                    isSideDrawerOpen: true,
                    sideDrawerType: "shoppingList",
                  })
                )
              }
              aria-label="cancel button"
              link
            >
              cancel
            </Button>
            <Button
              type="submit"
              className="px-5 py-3 text-white rounded-xl"
              color="orange"
              onClick={() => {}}
              aria-label="save button"
              disabled={!formik.isValid || !formik.dirty}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddProductFrom;
