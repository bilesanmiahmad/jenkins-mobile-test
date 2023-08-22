import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { CFIcons } from "@/components/core/icons";

const StatsView = () => {
  const stats = {
    status: [
      {
        value: 0,
        title: "Upcoming",
        className: "justify-start items-start",
      },
      {
        value: 0,
        title: "In-progress",
        className: "justify-center items-center",
      },
      {
        value: 0,
        title: "Completed",
        className: "justify-end items-end pr-2",
      },
    ],
    others: [
      [
        {
          value: 0,
          title: "Total Farmers",
        },
        {
          value: 0,
          title: "Trainings Done",
        },
      ],
      [
        {
          value: 0,
          title: "Tasks Completed",
        },
        {
          value: "GH¢ 0.00",
          title: "Commissions",
        },
      ],
    ],
  };

  return (
    <View className="h-[520px] w-full">
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        resizeMode="cover"
        className="h-full w-full"
      >
        <View className="px-4 mt-24 space-y-1.5">
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.20) 0%",
                "rgba(255, 255, 255, 0.50) 46%",
                "rgba(255, 255, 255, 0.50) 54%",
                "rgba(255, 255, 255, 0.20) 100%)",
              ]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-lg w-full h-[130px] backdrop-blur-[14px] relative"
            >
              <Image
                className="w-full h-full left-0 top-0 absolute"
                source={{ uri: "https://i.imgur.com/9PiMK42.png" }}
              />
              <View className="py-4 pl-4 pr-2 h-full justify-between">
                <View className="flex-row w-full justify-between items-center">
                  <Text className="text-white text-sm font-semibold leading-snug">
                    Farms Statistics
                  </Text>
                  <CFIcons name="caretRight" fill="#ffffff" />
                </View>
                <View className="flex-row justify-between">
                  {stats.status.map((s) => (
                    <View key={s.title} className={`${s.className} gap-1`}>
                      <Text className="text-white text-2xl font-normal leading-9">
                        {s.value}
                      </Text>
                      <Text className="text-white text-xs font-semibold leading-none">
                        {s.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {stats.others.map((o, i) => (
            <View key={i} className="flex-row w-full space-x-1.5 h-[100px]">
              {o.map((s) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={s.title}
                  className="rounded-lg flex-1 relative backdrop-blur-[14px] h-full"
                >
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.20) 0%",
                      "rgba(255, 255, 255, 0.50) 46%",
                      "rgba(255, 255, 255, 0.50) 54%",
                      "rgba(255, 255, 255, 0.20) 100%)",
                    ]}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="rounded-lg w-full h-full relative"
                  >
                    <Image
                      className="w-full h-full left-0 top-0 absolute"
                      source={{ uri: "https://i.imgur.com/9PiMK42.png" }}
                    />
                    <View className="h-full py-4 pl-4 pr-2 justify-between">
                      <View className="flex-row w-full justify-between items-center">
                        <Text className="text-white text-sm font-semibold leading-snug">
                          {s.title}
                        </Text>
                        <CFIcons name="caretRight" fill="#ffffff" />
                      </View>
                      <Text className="text-white text-xl font-normal leading-7">
                        {s.value}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

export default StatsView;
