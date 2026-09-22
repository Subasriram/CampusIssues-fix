import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
    

  className: yup
    .string()
    .trim()
    .required("Class is required"),

  section: yup
    .string()
    .trim()
    .required("Section is required"),

  dob: yup
    .string()
    .required("Date of birth is required"),

  registrationNumber: yup
    .string()
    .trim()
    .required("Registration number is required"),

  username: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
    phone: yup
  .string()
  .required("Phone number is required")
  .matches(
    /^\+91[6-9]\d{9}$/,
    "Enter a valid Indian phone number"
  ),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Passwords do not match"
    )
    .required("Please confirm your password"),
});