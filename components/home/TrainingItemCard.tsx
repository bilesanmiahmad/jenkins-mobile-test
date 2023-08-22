import React from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";

import { CFIcons, IconProps } from "@/components/core/icons";

const TrainingImage = require("../../assets/images/training.png");

type TrainingDetails = {
  title: string;
  icon: Partial<IconProps>;
};

const TrainingItemCard = () => {
  const { width } = useWindowDimensions();

  const getCardWidth = () => {
    if (width < 414) {
      return width - 60;
    } else {
      return 335;
    }
  };

  const details: TrainingDetails[] = [
    {
      title: "Monday 1st May, 2023",
      icon: "calendar",
    },
    {
      title: "10:00am",
      icon: "clock",
    },
    {
      title: "Onsite • Havannah Hall, Accra",
      icon: "location",
    },
  ];

  return (
    <View
      style={{ width: getCardWidth() }}
      className="bg-white h-max rounded-lg overflow-hidden border border-neutral-200 justify-start items-start"
    >
      <View className="h-[200px] relative">
        <Image
          className="w-full h-full left-0 top-0 absolute"
          source={TrainingImage}
        />
        <View className="px-1 py-0.5 left-4 top-4 absolute bg-white rounded justify-start items-center">
          <Text className="text-black text-xs font-normal leading-none">
            Created by Admin
          </Text>
        </View>
      </View>
      <View className="px-5 pt-4 pb-5 justify-start items-start gap-1 flex">
        <Text className="text-black text-base font-semibold leading-normal">
          This is where the Title of the Training will be (Max. two lines)
        </Text>
        {details.map((detail, i) => (
          <View
            key={i}
            className="flex-row self-stretch justify-start items-center space-x-2"
          >
            <View className="w-4 h-4 relative">
              <CFIcons name={detail.icon} fill="#4F4F4F" />
            </View>
            <Text className="grow shrink basis-0 text-neutral-600 text-[13px] font-normal leading-none">
              {detail.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TrainingItemCard;
