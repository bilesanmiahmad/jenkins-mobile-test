import React from "react";

import AuthContainer from "@/components/Container/AuthContainer";
import { Text } from "@/theme";

const AcceptTerms = () => {
  return (
    <AuthContainer
      title="Accept Complete Farmer’s Terms of use & Policies"
      subtitle={
        <Text>
          By selecting “I agree” below, I have reviewed and agreed to the{" "}
          <Text className="text-default">Terms of Use</Text> and acknowledge the{" "}
          <Text className="text-default">Policies</Text>. I am 18 years of age
        </Text>
      }
      btnTitle="Continue"
      hasIcon
      hasArrowBtn={false}
      hasIllustration
      handleSubmit={() => {}}
      isTerms
    />
  );
};

export default AcceptTerms;
