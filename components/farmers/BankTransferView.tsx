import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions } from "react-native";

import Button from "@/components/core/Button";
import { SelectField, TextInput } from "@/components/core/Fields";
import { Box, Text } from "@/theme";

const { width } = Dimensions.get("window");

const BankTransferView = () => {
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
        <TextInput
          label="Account Number"
          name="accountNumber"
          placeholder={"e.g. 1234567890"}
        />
        <TextInput
          label="Account Name"
          name="accountName"
          placeholder={"e.g. John Doe"}
        />
        <SelectField
          options={[
            {
              label: "Access Bank",
              value: "Access Bank",
            },
            {
              label: "Agricultural Development Bank",
              value: "Agricultural Development Bank",
            },
            {
              label: "Bank of Africa",
              value: "Bank of Africa",
            },
            {
              label: "Barclays Bank",
              value: "Barclays Bank",
            },
            {
              label: "Cal Bank",
              value: "Cal Bank",
            },
            {
              label: "Consolidated Bank",
              value: "Consolidated Bank",
            },
            {
              label: "Ecobank",
              value: "Ecobank",
            },
            {
              label: "FBN Bank",
              value: "FBN Bank",
            },
            {
              label: "Fidelity Bank",
              value: "Fidelity Bank",
            },
            {
              label: "First Atlantic Bank",
              value: "First Atlantic Bank",
            },
            {
              label: "First National Bank",
              value: "First National Bank",
            },
            {
              label: "GCB Bank",
              value: "GCB Bank",
            },
            {
              label: "Guaranty Trust Bank",
              value: "Guaranty Trust Bank",
            },
            {
              label: "National Investment Bank",
              value: "National Investment Bank",
            },
            {
              label: "Prudential Bank",
              value: "Prudential Bank",
            },
            {
              label: "Republic Bank",
              value: "Republic Bank",
            },
            {
              label: "Societe Generale",
              value: "Societe Generale",
            },
            {
              label: "Stanbic Bank",
              value: "stanbic",
            },
            {
              label: "Standard Chartered Bank",
              value: "standard",
            },
            {
              label: "UMB Bank",
              value: "UMB Bank",
            },
            {
              label: "Universal Merchant Bank",
              value: "Universal Merchant Bank",
            },
            {
              label: "Zenith Bank",
              value: "Zenith Bank",
            },
          ]}
          name="bankName"
          placeholder="Select bank"
          label="Bank Name"
        />
        <TextInput
          label="Bank Branch"
          name="bankBranch"
          placeholder={"e.g. Accra"}
        />
      </Box>
    </Box>
  );
};

export default BankTransferView;
