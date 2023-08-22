import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import FarmerContainer from "@/components/Container/FarmerContainer";
import { SelectField, TextInput } from "@/components/core/Fields";
import { Box } from "@/theme";

const OtherDetails = () => {
  // const onSubmit = async (values: any) => {
  //   console.log("values:", values);
  // };

  const { ...methods } = useForm();

  return (
    <FarmerContainer
      path="/farmers/new/primary-details"
      title="Other details"
      pageNo={2}
      btnPath="/farmers/new/payment"
      variant="default"
    >
      <FormProvider {...methods}>
        <Box gap="md">
          <SelectField
            options={[
              { label: "Teritary", value: "teritary" },
              { label: "Secondary", value: "secondary" },
              { label: "Basic", value: "basic" },
              { label: "No formal education", value: "no formal education" },
            ]}
            name="educationLevel"
            placeholder="Select level"
            label="Level of education"
          />

          <SelectField
            options={[
              { label: "Smartphone", value: "smartphone" },
              {
                label: "Featured Phone (Yam)",
                value: "featured phone (yam)",
              },
            ]}
            name="modeOfCommunication"
            placeholder="Select mode of communications "
            label="Mode of communication"
          />

          <SelectField
            options={[
              { label: "Smartphone", value: "smartphone" },
              {
                label: "Featured Phone (Yam)",
                value: "featured phone (yam)",
              },
            ]}
            name="phoneType"
            placeholder="Select phone type"
            label="Phone type"
          />

          <TextInput
            placeholder="email@example.com"
            label="Email (optional)"
            name="email"
          />

          <SelectField
            options={[
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
              { label: "Divorced", value: "divorced" },
            ]}
            name="maritalStatus"
            placeholder="Select status"
            label="Marital status"
          />

          <SelectField
            options={[
              {
                label: "0 - 5",
                value: "0 - 5",
              },
              {
                label: "6 - 10",
                value: "6 - 10",
              },
              {
                label: "11 and above",
                value: "11 and above",
              },
            ]}
            name="familySize"
            placeholder="Select family size"
            label="Family size"
          />

          <SelectField
            options={[
              {
                label: "0 - 5",
                value: "0 - 5",
              },
              {
                label: "6 - 10",
                value: "6 - 10",
              },
              {
                label: "11 and above",
                value: "11 and above",
              },
            ]}
            name="dependants"
            placeholder="Select number of dependants"
            label="Number of dependants (Optional)"
          />

          <TextInput
            placeholder="Eg. Nana Akufo Addo"
            label="Next of kin"
            name="nextOfKin"
          />
        </Box>
      </FormProvider>
    </FarmerContainer>
  );
};

export default OtherDetails;
