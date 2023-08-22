import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import FarmerContainer from "@/components/Container/FarmerContainer";
import { TextInput, PhoneField, SelectField } from "@/components/core/Fields";
import { CFIcons } from "@/components/core/icons";
import { Box } from "@/theme";

const PrimaryDetails = () => {
  // const onSubmit = async (values: any) => {
  //   console.log("values:", values);
  // };

  const { ...methods } = useForm();

  return (
    <FarmerContainer
      path="/farmers/new/"
      title="Primary details"
      pageNo={1}
      btnPath="/farmers/new/other-details"
      variant="rounded"
    >
      <FormProvider {...methods}>
        <Box gap="md">
          <TextInput
            placeholder="Eg. Nana Akufo Addo"
            label="Full Name"
            name="fullName"
          />
          <PhoneField
            placeholder="23 456 7890"
            label="Phone Number"
            name="phoneNumber"
          />

          <SelectField
            options={[
              { label: "Male", value: "male" },
              {
                label: "Female",
                value: "female",
              },
            ]}
            name="gender"
            placeholder="Select Gender"
            label="Gender"
          />

          <SelectField
            options={[
              { label: "English", value: "english" },
              {
                label: "French",
                value: "french",
              },
            ]}
            name="language"
            placeholder="Select preferred language"
            label="Preferred language"
          />

          <SelectField
            options={[
              {
                label: "Twi",
                value: "twi",
              },
              {
                label: "Ewe",
                value: "ewe",
              },
              {
                label: "Ga",
                value: "ga",
              },
              {
                label: "Hausa",
                value: "hausa",
              },
            ]}
            name="otherLanguage"
            placeholder="Select other languages"
            label="Other languages (Optional)"
          />

          <SelectField
            options={[
              { label: "Ghana", value: "ghana" },
              {
                label: "Nigeria",
                value: "nigeria",
              },
              {
                label: "Togo",
                value: "togo",
              },
            ]}
            name="country"
            placeholder="Select country"
            label="Country"
          />

          <TextInput
            placeholder="Select location on map"
            label="Home GPS coordinates (Optional)"
            name="coordinates"
            icon={
              <CFIcons
                name="coordinate"
                width={24}
                height={24}
                fill="#4F4F4F"
              />
            }
          />

          <TextInput
            placeholder="Enter village name"
            label="Village"
            name="village"
          />

          <TextInput
            placeholder="Enter street name"
            label="Street name"
            name="streetName"
          />

          <TextInput
            placeholder="House number (Optional)"
            label="Enter house number"
            name="houseNumber"
          />
        </Box>
      </FormProvider>
    </FarmerContainer>
  );
};

export default PrimaryDetails;
