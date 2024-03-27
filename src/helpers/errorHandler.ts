import { Error } from "mongoose";

export function mongoErrorHandler(error: any):
  | {
      success: boolean;
      message: string;
      error: string[] | any;
    }
  | {
      success: boolean;
      message: string;
      error: any;
    } {
  if (error instanceof Error.ValidationError) {
    const messages = Object.values(error.errors).map((err) => err.message);
    return {
      success: false,
      message:
        "Não foi possível processar a requisição devido a erros de validação",
      error: messages,
    };
  } else {
    return { success: false, message: "Internal server error", error };
  }
}
