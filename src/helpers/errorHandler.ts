import { Error } from "mongoose";

export function mongoErrorHandler(error: any) {
  console.error(error);
  if (error instanceof Error.ValidationError) {
    const messages = Object.values(error.errors).map((err) => err.message);
    return {
      success: false,
      message: "Could not create user due to some invalid fields!",
      error: messages,
    };
  }
  else {
    return { success: false, message: 'Internal server error', error }
  }
}