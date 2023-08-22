import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";

import AuthContainer from "@/components/Container/AuthContainer";
import Button from "@/components/core/Button";
import { TextInput } from "@/components/core/Fields";
import { Box, Text } from "@/theme";
import { loginMutation } from "@/app/(auth)/api";
import { VerifyOtpStatus } from "@/types/index.ds";
import { authStore, LOGIN_KEY } from "@/context/auth";
import { formatErrorMsgs } from "@/utils/misc";

const Login = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");

  const token = authStore((state) => state.auth_token);

  useEffect(() => {
    if (token) {
      router.push("/(tabs)/home");
    }
  }, [token]);

  const [mutation, { isLoading }] = loginMutation({
    onSuccess: async ({ data }: { data: VerifyOtpStatus }) => {
      if (data?.user?.loginCount === 1) {
        router.push("/(auth)/reset-password");
        authStore.setState({ user: data?.user, auth_token: data.authToken });
        await SecureStore.setItemAsync(LOGIN_KEY, data?.authToken as string);
      } else {
        router.push("/(tabs)/home");
        authStore.setState({ user: data?.user, auth_token: data.authToken });
        await SecureStore.setItemAsync(LOGIN_KEY, data?.authToken as string);
      }
    },
    onError: ({ message }) => {
      setError(message);
    },
  });
  const onSubmit = async (values: any) => {
    await mutation(values);
  };

  const { ...methods } = useForm();

  return (
    <AuthContainer
      title="Login"
      subtitle="Login to Complete Farmer Agents with your email and password"
      btnTitle="Login"
      hasArrowBtn={false}
      handleSubmit={methods.handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      {error ? (
        <Box className="bg-red-500 text-sm rounded-sm p-2 mb-4">
          <Text variant="label" className="text-white">
            {formatErrorMsgs(error)}
          </Text>
        </Box>
      ) : null}
      <FormProvider {...methods}>
        <Box gap="md" marginBottom="lg">
          <TextInput
            label="Email"
            name="email"
            placeholder="example@company.com"
            className="lowercase"
            rules={{ required: "Email is required!" }}
          />
          <TextInput
            label="Password"
            name="password"
            placeholder="Enter password"
            secureTextEntry={true}
            rules={{ required: "Password is required!" }}
            icon={<Ionicons name="md-eye-off" size={24} color="black" />}
          />
        </Box>

        <Button
          onPress={() => router.push("/forgot-password")}
          label="Forgot password?"
          variant="ghost"
          className="mx-auto py-0"
        />
      </FormProvider>
    </AuthContainer>
  );
};

export default Login;
