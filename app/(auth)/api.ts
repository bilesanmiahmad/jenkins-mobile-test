import { createMutation } from "@/api";
import { KeyFn } from "@/api/common";

export const keyFetchSourcing: KeyFn = ({ queryParams }) => [
  "/auth",
  queryParams ?? {},
];
export const loginMutation = createMutation({
  keysToRefetch: [keyFetchSourcing],
  api: {
    method: "POST",
    baseUrl: "auth",
    url: "/login",
    params: { onError: { message: "Failed to login" } },
  },
});

export const resetPasswordMutation = createMutation({
  keysToRefetch: [keyFetchSourcing],
  api: {
    method: "PATCH",
    baseUrl: "auth",
    url: "/change-password",
    params: { onError: { message: "Failed to reset password" } },
  },
});
