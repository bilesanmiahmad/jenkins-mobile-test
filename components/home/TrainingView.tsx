import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import TrainingItemCard from "./TrainingItemCard";

import Button from "@/components/core/Button";
import { CFIcons } from "@/components/core/icons";

// import { ScrollView } from "react-native-gesture-handler";

const TrainingView = () => {
  return (
    <View className="flex-col w-full justify-start items-center">
      <View className="flex-row w-full h-14 justify-between items-center">
        <Text className="text-black text-base font-semibold leading-normal">
          Trainings
        </Text>
        <Button
          rightIcon={
            <CFIcons name="caretRight" width={24} height={24} fill="#2AAB26" />
          }
          label="See All"
          variant="ghost"
          color="greenPrimary"
          onPress={() => {}}
        />
      </View>

      <ScrollView horizontal contentContainerStyle={styles.scrollview}>
        {Array.from({ length: 5 }).map((_, i) => (
          <TrainingItemCard key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TrainingView;

const styles = StyleSheet.create({
  scrollview: {
    gap: 8,
    flexGrow: 1,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
