type ErrorType = { code: string; message: string };

export default function HandleError(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  ) {
    const typedError = error as ErrorType;
    return { error: { status: "FETCH_ERROR", error: typedError } };
  }
  if (typeof error == "string") {
    return {
      error: {
        status: "FETCH_ERROR",
        error: {
          code: "unknown_error",
          message: error,
        },
      },
    };
  }
  return {
    error: {
      status: "FETCH_ERROR",
      error: {
        code: "unknown_error",
        message: "An unknown error occurred.",
      },
    },
  };
}
