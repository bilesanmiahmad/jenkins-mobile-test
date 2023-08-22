import React from "react";
import { useForm } from "react-hook-form";

import AuthContainer from "@/components/Container/AuthContainer";
import { TextInput } from "@/components/core/Fields";
import { Box } from "@/theme";

const ForgotPassword = () => {
  const onSubmit = async (values: any) => {
    console.log("values:", values);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <AuthContainer
      title="Forgot your password?"
      subtitle="Enter your account email and a verification link will be sent  you to reset your password"
      btnTitle="Send link"
      handleSubmit={handleSubmit(onSubmit)}
      path="/login"
      hasIcon
    >
      <Box>
        <TextInput
          placeholder="example@company.com"
          label="Email address"
          name="email"
          control={control}
        />
      </Box>
    </AuthContainer>
  );
};

export default ForgotPassword;
