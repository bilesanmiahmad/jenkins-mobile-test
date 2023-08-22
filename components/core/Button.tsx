import {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  createVariant,
  createRestyleComponent,
  VariantProps,
  ResponsiveValue,
  Breakpoint,
} from "@shopify/restyle";
import { DimensionValue, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";

import { CFIcons, IconProps } from "@/components/core/icons";
import { Box, Text, Theme } from "@/theme";
import { cn } from "@/utils/misc";

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

type Props = RestyleProps & {
  onPress: () => void;
  label: string | React.ReactNode;
  variant: "default" | "outline" | "ghost" | "rounded" | "secondary";
  color?: keyof Theme["colors"];
  name?: IconProps;
  hasRightIcon?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  width?: ResponsiveValue<
    DimensionValue | undefined,
    { [key: string]: Breakpoint } | undefined
  >;
};

const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "buttonVariants" })], Box);

const Button = ({
  variant,
  onPress,
  label,
  color,
  hasRightIcon,
  name,
  leftIcon,
  rightIcon,
  className,
  width,
  isLoading,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ButtonContainer
        gap="sm"
        variant={variant}
        className={cn(className, `${isLoading ? "opacity-50" : "opacity-100"}`)}
        width={width}
        {...rest}
      >
        {leftIcon ? leftIcon : null}

        {isLoading ? (
          <Box height={110}>
            <LottieView
              style={{ width: 110, height: 110 }}
              source={require("../../assets/lottie/spinner.json")}
              autoPlay
              loop
            />
          </Box>
        ) : (
          <Text
            variant="button"
            color={
              color ?? (variant === "default" || variant === "rounded")
                ? "white"
                : variant === "ghost"
                ? "greenPrimary"
                : "grayPrimary"
            }
          >
            {label}
          </Text>
        )}

        {rightIcon ? rightIcon : null}
        {hasRightIcon && !isLoading ? (
          <CFIcons
            name={name ?? "arrowRight"}
            width={24}
            height={24}
            fill="white"
          />
        ) : null}
      </ButtonContainer>
    </TouchableOpacity>
  );
};

export default Button;
