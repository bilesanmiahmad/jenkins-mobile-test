import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Mode } from "@/app/farmers/new/profile-photo";
import Button from "@/components/core/Button";
import { SelectField } from "@/components/core/Fields";
import { createStore } from "@/context";
import { useCamera } from "@/hooks/useCamera";
import { usePhotos } from "@/hooks/usePhoto";
import { Box, Text } from "@/theme";

const { width } = Dimensions.get("window");

const NationIdentificationBack = () => {
  const router = useRouter();

  const { ...methods } = useForm();

  const mode = "both" as Mode;
  const imageUri = createStore.getState().backID;

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
              backID: null,
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
          createStore.setState({ backID: result.assets[0].uri });
        }
      } else {
        const result = await photos.selectImage({
          quality: 0.5,
        });
        if (result.canceled) {
          onCancel();
        } else {
          createStore.setState({ backID: result.assets[0].uri });
        }
      }
    } catch (error) {
      Alert.alert("Image error", "Error reading image");
      console.log(error);
    }
  };

  return (
    <Box flex={1} backgroundColor="white" justifyContent="space-between">
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
              National ID card (Back)
            </Text>
            <Text className="text-right text-black text-[16px] font-normal leading-normal">
              6/7
            </Text>
          </Box>
          <Box height={211} borderRadius="md">
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
                National ID card (Back)
              </Text>
              <Text className="text-right text-black text-[16px] font-normal leading-normal">
                6/7
              </Text>
            </Box>
          </Box>

          <Box padding="md" justifyContent="center" gap="md">
            <Text variant="header">National ID card photo (Back)</Text>
            <Box
              backgroundColor="blueLight"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              padding="md"
              gap="sm"
              borderRadius="sm"
            >
              <FontAwesome5 name="info-circle" size={24} color="#2463FF" />
              <Text variant="body" color="blueDark">
                Ensure that all the information on the card remains readable
                even after capturing the photograph.
              </Text>
            </Box>
          </Box>
        </Box>
      )}

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
          <FormProvider {...methods}>
            <Box gap="lg">
              <SelectField
                options={[
                  { label: "Ghana Card", value: "ghana card" },
                  {
                    label: "Passport",
                    value: "passport",
                  },
                ]}
                name="idType"
                placeholder="Choose ID card"
                label="ID card"
              />
              <Button
                onPress={() => handlePress()}
                label="Take photo"
                variant="rounded"
                leftIcon={<FontAwesome name="camera" size={20} color="white" />}
              />
            </Box>
          </FormProvider>
        )}
      </Box>

      <StatusBar barStyle="dark-content" />
    </Box>
  );
};

export default NationIdentificationBack;
