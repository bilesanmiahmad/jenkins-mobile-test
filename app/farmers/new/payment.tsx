import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import FarmerContainer from "@/components/Container/FarmerContainer";
import BankTransferView from "@/components/farmers/BankTransferView";
import MomoView from "@/components/farmers/MomoView";
import { Box, Text } from "@/theme";

const { width } = Dimensions.get("window");

const Payment = () => {
  const [tabItems, setTabItems] = useState([
    {
      id: 1,
      title: "Mobile Money",
      active: true,
    },
    {
      id: 2,
      title: "Bank Transfer",
      active: false,
    },
  ]);

  const handleTabChange = (index: number) => {
    setTabItems((prev) => {
      return prev.map((tab) => {
        if (tab.id === index) {
          return {
            ...tab,
            active: true,
          };
        }
        return {
          ...tab,
          active: false,
        };
      });
    });
  };

  const isActive = (index: number) => {
    return tabItems.find((tab) => tab.id === index)?.active;
  };

  //animation to slide the tab indicator
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(translateX.value, [0, 100 / 2], [0, 100 / 2]),
        },
      ],
    };
  });

  const { ...methods } = useForm();

  const renderTabContent = () => {
    const activeTab = tabItems.find((tab) => tab.active);
    switch (activeTab?.id) {
      case 1:
        return <MomoView />;
      case 2:
        return <BankTransferView />;
      default:
        return <Text>Mobile Money</Text>;
    }
  };

  return (
    <FarmerContainer
      path="/farmers/new/other-details"
      title="Payment details"
      pageNo={3}
      btnPath="/farmers/new/profile-photo"
      variant="default"
      btnTitle="Proceed"
      isLayoutShift
    >
      <Box gap="md">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="grayLight"
          width={width - 30}
          height={50}
          borderRadius="md"
          padding="xs"
        >
          {tabItems.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.8}
              className="w-1/2"
              onPress={() => handleTabChange(tab.id)}
            >
              <Animated.View
                className={`flex-row items-center justify-center h-full rounded-md ${
                  isActive(tab.id) ? "bg-white" : ""
                }
                    `}
                style={[animatedStyle]}
              >
                <Text
                  variant="body"
                  textAlign="center"
                  fontFamily="Poppins_600SemiBold"
                >
                  {tab.title}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </Box>

        <FormProvider {...methods}>{renderTabContent()}</FormProvider>
      </Box>
    </FarmerContainer>
  );
};

export default Payment;
