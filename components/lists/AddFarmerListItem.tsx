import { Entypo } from "@expo/vector-icons";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";

import { Box, Text } from "@/theme";

type AddFarmerListItemProps = {
  onPress: () => void;
  title: string;
  subtitle: string;
  Icon: any;
  isFirstStep?: boolean;
};

const AddFarmerListItem = ({
  onPress,
  title,
  subtitle,
  Icon,
  isFirstStep,
}: AddFarmerListItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className="px-4 h-[84px]"
      >
        <Box flexDirection="row" alignItems="center" gap="md">
          <Box className="w-6 h-6">{Icon}</Box>
          <Box className="justify-start items-center gap-4 flex-row">
            <Box className="flex-col justify-start items-start gap-0.5">
              <Text variant="subheader">{title}</Text>
              <Text
                className={`${isFirstStep && "text-blue-500"}`}
                fontFamily="Poppins_600SemiBold"
              >
                {subtitle}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box className="w-6 h-6">
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default AddFarmerListItem;
