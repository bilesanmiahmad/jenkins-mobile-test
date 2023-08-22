import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/core/Button";
import { Box, Text } from "@/theme";

const Review = () => {
  return (
    <SafeAreaView>
      <Box>
        <Text>Review</Text>
        <Button onPress={() => {}} label="Edit" variant="ghost" />
      </Box>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Review;
