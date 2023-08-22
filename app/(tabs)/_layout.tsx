import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import { CFIcons } from "@/components/core/icons";
import Header from "@/components/home/Header";
import Colors from "@/constants/Colors";
import { Text } from "@/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarLabelStyle: {
          fontFamily: "Poppins_400Regular",
          fontSize: 12,
          lineHeight: 14,
          letterSpacing: 0.4,
          textTransform: "capitalize",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          tabBarLabel: ({ focused }) => (
            <Text color={focused ? "greenPrimary" : "heading"}>Home</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <CFIcons
              name="home"
              width={24}
              height={24}
              fill={focused ? "#2AAB26" : "#000000"}
            />
          ),
          title: "",
          headerShown: true,
          headerShadowVisible: false,
          headerTransparent: true,
          header: () => <Header />,
        }}
      />
      <Tabs.Screen
        name="farmers"
        options={{
          href: "/farmers",
          tabBarLabel: ({ focused }) => (
            <Text color={focused ? "greenPrimary" : "heading"}>Farmers</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <CFIcons
              name="farmer"
              width={24}
              height={24}
              fill={focused ? "#2AAB26" : "#000000"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="farms"
        options={{
          href: "/farms",
          tabBarLabel: ({ focused }) => (
            <Text color={focused ? "greenPrimary" : "heading"}>Farms</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <CFIcons
              name="stack"
              width={24}
              height={24}
              fill={focused ? "#2AAB26" : "#000000"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          href: "/training",
          tabBarLabel: ({ focused }) => (
            <Text color={focused ? "greenPrimary" : "heading"}>Training</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <CFIcons
              name="training"
              width={24}
              height={24}
              fill={focused ? "#2AAB26" : "#000000"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: "/account",
          tabBarLabel: ({ focused }) => (
            <Text color={focused ? "greenPrimary" : "heading"}>Account</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <CFIcons
              name="account"
              width={24}
              height={24}
              fill={focused ? "#2AAB26" : "#000000"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
