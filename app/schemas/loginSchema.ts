import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Only letters and numbers are acceptable"
    )
    .min(
      3,
      "Username must be at least 3 characters"
    ),

  password: yup
    .string()
    .required("Password is required"),
});