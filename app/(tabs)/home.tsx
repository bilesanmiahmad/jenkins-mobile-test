import { ScrollView, StatusBar } from "react-native";

import AddNewFarmer from "@/components/home/AddNewFarmer";
import HomeButtonGroups from "@/components/home/HomeButtonGroups";
import StatsView from "@/components/home/StatsView";
import TrainingView from "@/components/home/TrainingView";
import { Box } from "@/theme";

export default function TabOneScreen() {
  return (
    <ScrollView className="bg-white flex-1">
      <StatusBar barStyle="light-content" />
      <StatsView />
      <Box className="px-4 -mt-12 pb-10">
        <HomeButtonGroups />
        <TrainingView />
        <AddNewFarmer />
      </Box>
    </ScrollView>
  );
}
