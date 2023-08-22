import React from "react";
import { View } from "react-native";

import Button from "@/components/core/Button";
import { CFIcons } from "@/components/core/icons";

const HomeButtonGroups = () => {
  const buttons = [
    [
      {
        name: "search",
        label: "Search farmer",
        colorScheme: "default",
        onPress: () => {},
        iconColor: "white",
      },
      {
        name: "biometric",
        label: "Scan farmer",
        colorScheme: "default",
        onPress: () => {},
        iconColor: "white",
      },
    ],
    [
      {
        name: "training",
        label: "Start training",
        colorScheme: "secondary",
        onPress: () => {},
        iconColor: "#4F4F4F",
      },
      {
        name: "chat",
        label: "Talk to admin",
        colorScheme: "secondary",
        onPress: () => {},
        iconColor: "#4F4F4F",
      },
    ],
  ] as const;

  return (
    <View className="space-y-1.5">
      {buttons.map((btnGroup, i) => (
        <View
          key={i}
          className="justify-start items-start space-x-1.5 flex-row"
        >
          {btnGroup.map((btn, index) => (
            <View key={index} className="grow basis-0">
              <Button
                variant={btn.colorScheme}
                {...btn}
                leftIcon={
                  <CFIcons
                    name={btn.name}
                    width={24}
                    height={24}
                    fill={btn.iconColor}
                  />
                }
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default HomeButtonGroups;
