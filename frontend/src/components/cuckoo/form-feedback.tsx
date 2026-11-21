import { useState } from "react";
import type { ApiError, Result } from "@/mock/types";
import { Notice } from "./ui";

export function useFeedback() {
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState("");
  function accept<T>(result: Result<T>, message = "") {
    setError(result.ok ? null : result.error);
    setSuccess(result.ok ? message : "");
    return result.ok;
  }
  function clear() {
    setError(null);
    setSuccess("");
  }
  return { error, success, accept, clear };
}
export function Feedback({
  error,
  success,
}: {
  error: ApiError | null;
  success: string;
}) {
  return error ? (
    <Notice tone="error" title={error.message} />
  ) : success ? (
    <Notice tone="success" title={success} />
  ) : null;
}
