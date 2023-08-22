import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions } from "react-native";

import Button from "@/components/core/Button";
import { PhoneField, SelectField, TextInput } from "@/components/core/Fields";
import { Box, Text } from "@/theme";

const { width } = Dimensions.get("window");
const MomoView = () => {
  return (
    <Box gap="md">
      <Box
        backgroundColor="blueLight"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="md"
        borderRadius="sm"
      >
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="sm"
          width={width - 100}
        >
          <FontAwesome5 name="info-circle" size={22} color="#2463FF" />
          <Text variant="body" color="blueDark">
            It’s compulsory to take Mobile Money details from all farmers
          </Text>
        </Box>
        <Button
          onPress={() => {}}
          label={<AntDesign name="closecircle" size={22} color="#2463FF" />}
          variant="ghost"
        />
      </Box>

      <Box gap="md">
        <PhoneField
          label="Account Number"
          name="phoneNumber"
          placeholder={"e.g. 1234567890"}
        />
        <TextInput
          label="Account Name"
          name="accountName"
          placeholder={"e.g. John Doe"}
        />
        <SelectField
          options={[
            { label: "MTN", value: "mtn" },
            {
              label: "Vodafone",
              value: "vodafone",
            },
            {
              label: "AirtelTigo",
              value: "airteltigo",
            },
          ]}
          name="provider"
          placeholder="Select provider"
          label="Provider"
        />
      </Box>
    </Box>
  );
};

export default MomoView;
