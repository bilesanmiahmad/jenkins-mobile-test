import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const CFLogoWhite = require("../../assets/images/cf-logo-white.png");

const Header = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/Background.png")}
      resizeMode="cover"
      className="h-full w-full"
    >
      <View className="pt-11 pb-4 px-4 flex-row items-center justify-between">
        <Image
          source={CFLogoWhite}
          className="h-6 w-[110.13px]"
          resizeMode="cover"
        />

        <TouchableOpacity className="relative" onPress={() => {}}>
          <Ionicons name="notifications" size={24} color="#2AAB26" />
          <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EB2F2F]">
            <Text className="text-white text-xs text-center">2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Header;
