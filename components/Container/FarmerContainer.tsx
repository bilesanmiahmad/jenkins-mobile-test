import { AntDesign } from "@expo/vector-icons";
import { LinkProps, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/core/Button";
import { Box, Text } from "@/theme";

type FarmerContainerProps = {
  path: LinkProps<string>["href"];
  title: string;
  pageNo: number;
  children: React.ReactNode;
  btnPath: LinkProps<string>["href"];
  btnTitle?: string;
  variant: "default" | "outline" | "ghost" | "rounded";
  isLayoutShift?: boolean;
  onPress?: () => void;
};

const { height } = Dimensions.get("window");

const FarmerContainer = ({
  btnPath,
  btnTitle,
  children,
  path,
  title,
  pageNo,
  variant,
  onPress,
  isLayoutShift = false,
}: FarmerContainerProps) => {
  const router = useRouter();

  return (
    <ScrollView className="bg-white">
      <SafeAreaView />
      <Box paddingHorizontal="md">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          className="h-14"
        >
          <Box className="w-6 h-6">
            <TouchableOpacity onPress={() => router.push(path)}>
              <AntDesign name="arrowleft" size={20} color="#2AAB26" />
            </TouchableOpacity>
          </Box>
          <Text variant="subheader" fontFamily="Poppins_600SemiBold">
            {title}
          </Text>
          <Text className="text-right text-black text-[16px] font-normal leading-normal">
            {pageNo}/7
          </Text>
        </Box>

        <Box
          gap="md"
          justifyContent={isLayoutShift ? "space-between" : "flex-start"}
          height={height - 170}
          paddingBottom="lg"
        >
          <Box>{children}</Box>
          <Button
            onPress={() => (onPress ? onPress : router.push(btnPath))}
            label={btnTitle ?? "Save and continue"}
            hasRightIcon
            variant={variant ?? "rounded"}
            marginTop="md"
          />
        </Box>
      </Box>
      <StatusBar barStyle="dark-content" />
    </ScrollView>
  );
};

export default FarmerContainer;
