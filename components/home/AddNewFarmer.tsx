import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";

import Button from "@/components/core/Button";
import { CFIcons } from "@/components/core/icons";
import { Box } from "@/theme";

const AddNewFarmer = () => {
  const router = useRouter();

  return (
    <Box
      gap="md"
      justifyContent="center"
      alignItems="center"
      className="w-full h-[260px] mt-4 rounded-2xl bg-white border border-dashed border-neutral-300"
    >
      <Box
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        className="p-2.5 bg-emerald-900 rounded-2xl"
      >
        <Box className="w-10 h-10">
          <CFIcons name="farmer" fill="#00FFE0" />
        </Box>
      </Box>
      <Box alignItems="center">
        <Text className="text-neutral-600 text-base font-normal leading-normal">
          There are no farmers added yet,
        </Text>
        <Text className=" text-neutral-600 text-base font-normal leading-normal">
          add your first farmer.
        </Text>
      </Box>
      <Button
        width={209}
        leftIcon={
          <CFIcons name="farmerAdd" fill="#ffffff" width={24} height={24} />
        }
        variant="rounded"
        label="Add first farmer"
        onPress={() => router.push("/farmers/new")}
      />
    </Box>
  );
};

export default AddNewFarmer;
