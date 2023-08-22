import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Button from "@/components/core/Button";
import { createStore } from "@/context";
import { useCamera } from "@/hooks/useCamera";
import { usePhotos } from "@/hooks/usePhoto";
import { Box, Text } from "@/theme";

const { width } = Dimensions.get("window");

export type Mode = "camera" | "photos" | "both";

const ProfilePhoto = () => {
  const router = useRouter();

  const mode = "both" as Mode;
  const imageUri = createStore.getState().imageUri;

  const camera = useCamera();
  const photos = usePhotos();

  function onCancel() {
    console.log("Cancel");
  }

  const handlePress = async () => {
    if (!imageUri) {
      switch (mode) {
        case "camera":
          await selectImage("camera");
          break;
        case "photos":
          await selectImage("photos");
          break;
        case "both":
        default:
          Alert.alert("Please choose", "", [
            { text: "Photos", onPress: () => selectImage("photos") },
            { text: "Camera", onPress: () => selectImage("camera") },
            { text: "Cancel", style: "cancel" },
          ]);
      }
    } else {
      Alert.alert("Remove", "are you sure you want to remove this image?", [
        {
          text: "Yes",
          onPress: () =>
            createStore.setState({
              imageUri: "",
            }),
        },
        { text: "No" },
      ]);
    }
  };

  const selectImage = async (pickerType: Mode) => {
    try {
      if (pickerType === "camera") {
        const result = await camera.takePhoto({
          allowsEditing: true,
          quality: 0.5,
        });
        if (result.canceled) {
          onCancel();
        } else {
          createStore.setState({ imageUri: result.assets[0].uri });
        }
      } else {
        const result = await photos.selectImage({
          quality: 0.5,
        });
        if (result.canceled) {
          onCancel();
        } else {
          createStore.setState({ imageUri: result.assets[0].uri });
        }
      }
    } catch (error) {
      Alert.alert("Image error", "Error reading image");
      console.log(error);
    }
  };

  return (
    <Box flex={1} backgroundColor="white" justifyContent="space-between">
      <StatusBar barStyle="dark-content" />
      <Box>
        {imageUri ? (
          <Box paddingHorizontal="md" paddingVertical="6xl">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              className="h-14"
            >
              <Box className="w-6 h-6">
                <TouchableOpacity
                  onPress={() => router.push("/farmers/new/payment")}
                >
                  <AntDesign name="arrowleft" size={20} color="#2AAB26" />
                </TouchableOpacity>
              </Box>
              <Text variant="subheader" fontFamily="Poppins_600SemiBold">
                Profile Photo
              </Text>
              <Text className="text-right text-black text-[16px] font-normal leading-normal">
                4/7
              </Text>
            </Box>
            <Box height={360} borderRadius="md">
              <Image
                width={width}
                className="h-full w-full rounded-xl"
                source={{ uri: imageUri }}
              />
            </Box>
          </Box>
        ) : (
          <Box>
            <Box
              backgroundColor="grayLight"
              width={width}
              height={300}
              paddingVertical="7xl"
              paddingHorizontal="md"
            >
              <Box
                flexDirection="row"
                justifyContent="space-between"
                className="h-14"
              >
                <Box className="w-6 h-6">
                  <TouchableOpacity
                    onPress={() => router.push("/farmers/new/payment")}
                  >
                    <AntDesign name="arrowleft" size={20} color="#2AAB26" />
                  </TouchableOpacity>
                </Box>
                <Text variant="subheader" fontFamily="Poppins_600SemiBold">
                  Profile Photo
                </Text>
                <Text className="text-right text-black text-[16px] font-normal leading-normal">
                  4/7
                </Text>
              </Box>
            </Box>
            <Box padding="xl" justifyContent="center" gap="md">
              <Text variant="header">Take farmer profile photo</Text>
              <Text variant="body">
                Note: Profile photo submitted can be updated again with tangible
                reasons. Please make sure it is an accurate representation of
                the farmer.
              </Text>

              <Box backgroundColor="grayLight" padding="sm" borderRadius="md">
                <Text>Show whole face & tops of shoulders</Text>
                <Text>Take sunglasses and hats off.</Text>
                <Text>Take photo in a well-lit place.</Text>
                <Text>The photo's background should not be cluttered.</Text>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box paddingVertical="xl" paddingHorizontal="md">
        {imageUri ? (
          <Box gap="md">
            <Button
              onPress={() => handlePress()}
              label="Retake photo"
              variant="secondary"
              color="greenPrimary"
              leftIcon={<FontAwesome name="camera" size={20} color="#2AAB26" />}
            />
            <Button
              onPress={() => handlePress()}
              label="Save and Continue"
              variant="default"
              hasRightIcon
            />
          </Box>
        ) : (
          <Button
            onPress={() => handlePress()}
            label="Take photo"
            variant="rounded"
            leftIcon={<FontAwesome name="camera" size={20} color="white" />}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
