import * as yup from "yup";
import { toast } from "react-hot-toast";
import { Authenticate } from "../routes/apiRoute";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;

// Define a reusable schema for username validation
export const usernameSchema = yup
  .string()
  .required("User name is required")
  .trim()
  .min(3, "Minimum 3 characters required")
  .max(25, "Maximum 25 characters allowed");
export const passwordSchema = yup
  .string()
  .required("Password is required")
  .matches(passwordRegex, "Password must be strong");

export const registerSchema = yup.object({
  username: usernameSchema,
  email: yup
    .string()
    .required("Email is required")
    .trim()
    .matches(emailRegex, "Enter a valid email"),
  password:passwordSchema,
  confirm_pwd: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const userSchema = yup.object({
  username: yup
  .string()
  .test(
    "username-existence","",
    async (value) => {
      if (value.trim() === "") {
        toast.error("Please enter a valid username");
        return false;
      } else if (value) {
        try {
          // Show loading toast
          toast.loading("Verifying...");
          const { status } = await Authenticate(value);
          // Hide loading toast after request completes
          toast.dismiss();
          return status === 200;
        } catch (error) {
          // Hide loading toast if there's an error
          toast.dismiss();
          toast.error("User does not exist...!");
          return false;
        }
      }
    }
  )
});

export const passwordValidateSchema = yup.object({
  password:yup
    .string()
    .required("Please enter a password")
    
});
export const recoverySchema = yup.object({
  otp:yup
    .string()
    .required("OTP is required")
});
export const resetSchema = yup.object({
  password:passwordSchema,
  confirm_pwd: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const profileSchema = yup.object({
  email: yup
  .string()
  .required("Email is required")
  .trim()
  .matches(emailRegex, "Enter a valid email")
});

async function validateSchema(schema, values) {
  try {
    await schema.validate(values, { abortEarly: false });
    return { success: true };
  } catch (error) {
    console.error(error);
    const errors = error.errors;

    for (const errorMessage of errors) {
      toast.error(errorMessage); // Display error message using toast
      await new Promise((resolve) => {
        // Wait for the user to acknowledge the error
        const unsubscribe = toast.onChange(() => {
          unsubscribe(); // Unsubscribe from further toast changes
          resolve();
        });
      });
    }

    return { success: false, errors };
  }
}

async function validateUserSchema(schema, values) {
  try {
    await schema.validate(values, { abortEarly: false });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, errors: error.errors };
  }
}

// Export specific validation functions
export const registerValidate = (values) =>validateSchema(registerSchema, values);
export const userValidate = (values) => validateUserSchema(userSchema, values);
export const passwordValidate = (values) => validateSchema(passwordValidateSchema, values);
export const recoveryValidate = (values) => validateSchema(recoverySchema, values);
export const resetValidate = (values) => validateSchema(resetSchema, values);
export const profileValidate = (values) => validateSchema(profileSchema, values);
