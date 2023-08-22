import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CFIcons } from "@/components/core/icons";
import AddFarmerListItem from "@/components/lists/AddFarmerListItem";
import { Box } from "@/theme";

const New = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box padding="md" gap="md">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className="w-6 h-6">
              <Pressable onPress={() => router.push("/(tabs)/")}>
                <AntDesign name="arrowleft" size={20} color="#2AAB26" />
              </Pressable>
            </Box>
            <Text className="text-right text-green-600 text-[14px] font-semibold leading-snug">
              Don’t show again
            </Text>
          </Box>

          <Box className="h-[92px] flex-col justify-start items-start gap-3 inline-flex">
            <Text className="self-stretch text-black text-[24px] font-semibold leading-9">
              Add a new farmer
            </Text>
            <Text className="self-stretch text-neutral-600 text-[14px] font-normal leading-snug">
              Complete all the necessary information needed to onboard this
              farmer
            </Text>
          </Box>

          <Box className="space-y-4 divide-y divide-gray-200 mt-4">
            <AddFarmerListItem
              onPress={() => router.push("/farmers/new/primary-details")}
              title="Primary details"
              subtitle="Recommended next step"
              isFirstStep
              Icon={<Ionicons name="document-text" size={24} color="black" />}
            />
            <AddFarmerListItem
              onPress={() => router.push("/farmers/new/other-details")}
              title="Other details"
              subtitle="Ready to begin"
              Icon={<Ionicons name="document-text" size={24} color="black" />}
            />
            <AddFarmerListItem
              onPress={() => router.push("/farmers/new/payment")}
              title="Payment details"
              subtitle="Ready to begin"
              Icon={
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color="black"
                />
              }
            />
            <AddFarmerListItem
              onPress={() => router.push("/farmers/new/profile-photo")}
              title="Profile photo"
              subtitle="Ready to begin"
              Icon={<FontAwesome5 name="user-alt" size={20} color="black" />}
            />
            <AddFarmerListItem
              onPress={() =>
                router.push("/farmers/new/nation-identification-front")
              }
              title="National ID Card (Front)"
              subtitle="Ready to begin"
              Icon={<CFIcons name="nationalId" fill="#4F4F4F" />}
            />
            <AddFarmerListItem
              onPress={() =>
                router.push("/farmers/new/nation-identification-back")
              }
              title="National ID Card (Back)"
              subtitle="Ready to begin"
              Icon={
                <MaterialCommunityIcons
                  name="card-text"
                  size={24}
                  color="black"
                />
              }
            />
            <AddFarmerListItem
              onPress={() => router.push("/farmers/new/biometric")}
              title="Biometric detail"
              subtitle="Ready to begin"
              Icon={<CFIcons name="biometric" fill="#4F4F4F" />}
            />
          </Box>
        </Box>

        <StatusBar barStyle="dark-content" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default New;
