import Checkbox from "expo-checkbox";
import { useRouter, LinkProps } from "expo-router";
import React, { ReactNode } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/core/Button";
import { CFIcons } from "@/components/core/icons";
import { Box, Text } from "@/theme";

type IAuthContainer = {
  children?: ReactNode;
  handleSubmit: (onsubmit: any) => void;
  title?: string;
  subtitle?: string | ReactNode;
  btnTitle: string;
  hasIcon?: boolean;
  hasArrowBtn?: boolean;
  hasIllustration?: boolean;
  isTerms?: boolean;
  path?: LinkProps<string>["href"];
  isLoading?: boolean;
};

const AuthContainer = ({
  children,
  handleSubmit,
  title,
  subtitle,
  btnTitle,
  hasIcon,
  hasArrowBtn = true,
  hasIllustration,
  isTerms = false,
  path = "/",
  isLoading,
}: IAuthContainer) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <SafeAreaView
      className={`flex-1 justify-between px-[16px] space-y-[40px]
      android:mb-6 ios:mb-1`}
    >
      <Box className="space-y-8">
        <Box>
          {hasIllustration ? (
            <Box className="flex-row items-center h-[70px]" />
          ) : null}
          {hasArrowBtn ? (
            <Box className="flex-row items-center h-[70px]">
              <TouchableOpacity onPress={() => router.push(path)}>
                <CFIcons
                  name="arrowLeft"
                  width={30}
                  height={30}
                  fill="#2AAB26"
                />
              </TouchableOpacity>
            </Box>
          ) : null}

          <Box
            className={`space-y-[8px] ${
              !hasArrowBtn && !hasIllustration ? "mt-8" : ""
            }`}
          >
            <Box gap="sm">
              <Text variant="header">{title}</Text>
              <Text variant="subheader">{subtitle}</Text>
            </Box>
          </Box>
        </Box>

        <Box className="space-y-6">{children ? children : null}</Box>
      </Box>

      <Box className="space-y-6">
        {isTerms ? (
          <Box className="flex-row items-center justify-between border-t pt-4 border-[#E2E2E2]">
            <Text className="text-[16px] text-center text-muted">I agree</Text>

            <Checkbox
              className="border-[#E2E2E2] w-[24px] h-[24px] rounded-[4px]"
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? "#2AAB26" : "#E2E2E2"}
            />
          </Box>
        ) : null}
        <Button
          label={btnTitle}
          hasRightIcon={hasIcon}
          name="arrowRight"
          onPress={() => handleSubmit(() => {})}
          variant="default"
          isLoading={isLoading}
        />
      </Box>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default AuthContainer;
