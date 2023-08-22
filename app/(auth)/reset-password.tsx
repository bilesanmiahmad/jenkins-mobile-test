import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import AuthContainer from "@/components/Container/AuthContainer";
import { TextInput } from "@/components/core/Fields";
import { Box, Text } from "@/theme";
import { resetPasswordMutation } from "@/app/(auth)/api";
import { useRouter } from "expo-router";
import { authStore } from "@/context/auth";
import { formatErrorMsgs } from "@/utils/misc";

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");

  const [mutate, { isLoading }] = resetPasswordMutation({
    onSuccess: async ({ message }) => {
      setError(message);
      router.push("/(auth)/login");
    },
    onError: ({ message }) => {
      setError(message);
    },
  });

  const onSubmit = async (values: any) => {
    console.log("values:", values);
    await mutate(values);
  };

  const { ...methods } = useForm();

  return (
    <AuthContainer
      title="Reset your password?"
      subtitle="Reset password by entering new password and confirming it"
      btnTitle="Continue"
      handleSubmit={methods.handleSubmit(onSubmit)}
      hasIcon
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
        <Box
          backgroundColor="grayLight"
          padding="sm"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          mt="md"
          className="w-[265px] flex-row items-center justify-center rounded-full"
        >
          <Text variant="label">{authStore()?.user?.email}</Text>
        </Box>

        <Box gap="md" mt="md">
          <TextInput
            placeholder="Enter password"
            label="Old Password"
            name="oldPassword"
            secureTextEntry={true}
            rules={{ required: "Password is required!" }}
            icon={<Ionicons name="md-eye-off" size={24} color="black" />}
          />
          <TextInput
            placeholder="Enter password"
            label="New Password"
            name="newPassword"
            secureTextEntry={true}
            rules={{ required: "Password is required!" }}
            icon={<Ionicons name="md-eye-off" size={24} color="black" />}
          />
        </Box>
      </FormProvider>
    </AuthContainer>
  );
};

export default ResetPassword;
