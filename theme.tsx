import { createBox, createText, createTheme } from "@shopify/restyle";

const buttonStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Poppins_700Bold",
  fontSize: 16,
  lineHeight: 24,
  height: 56,
};

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  blueLight: "#EDF3FF",
  bluePrimary: "#367AFE",
  blueDark: "#2463FF",

  greenLight: "#56DCBA",
  greenPrimary: "#2AAB26",
  greenDark: "#0A906E",

  gray: "#e5e7eb",
  grayLight: "#EFEFEF",
  grayPrimary: "#4F4F4F",

  body: "#343434",
  heading: "#1D1D1F",

  black: "#0B0B0B",
  white: "#FFFFFF",
};

const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 40,
    "3xl": 48,
    "4xl": 56,
    "5xl": 64,
    "6xl": 72,
    "7xl": 80,
  },
  borderRadii: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    "2xl": 32,
    "3xl": 48,
    "4xl": 64,
  },
  textVariants: {
    header: {
      fontWeight: "600",
      fontFamily: "Poppins_500Medium",
      lineHeight: 36,
      fontSize: 24,
      color: "heading",
    },
    subheader: {
      fontWeight: "400",
      fontFamily: "Poppins_400Regular",
      fontSize: 16,
      lineHeight: 24,
      color: "grayPrimary",
    },
    label: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "400",
      fontFamily: "Poppins_600SemiBold",
      color: "grayPrimary",
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "Poppins_600SemiBold",
    },
    body: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: "Poppins_400Regular",
      color: "body",
    },
    defaults: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "400",
      fontFamily: "Poppins_400Regular",
      color: "body",
    },
  },
  buttonVariants: {
    default: {
      backgroundColor: "greenPrimary",
      color: "white",
      padding: "md",
      borderRadius: "md",
      ...buttonStyle,
    },
    outline: {
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "grayPrimary",
      padding: "md",
      borderRadius: "md",
      ...buttonStyle,
    },
    ghost: {
      ...buttonStyle,
      height: "auto",
    },
    rounded: {
      backgroundColor: "greenPrimary",
      padding: "md",
      borderRadius: "2xl",
      ...buttonStyle,
    },
    secondary: {
      backgroundColor: "gray",
      padding: "md",
      borderRadius: "md",
      ...buttonStyle,
    },
  },
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
