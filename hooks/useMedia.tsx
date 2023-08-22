import { Alert } from "react-native";

import { useCamera } from "@/hooks/useCamera";
import { usePhotos } from "@/hooks/usePhoto";

type Mode = "camera" | "photos" | "both";

const useMedia = (imageUri: string, setState: any) => {
  const mode = "both" as Mode;
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
            setState({
              imageUri: null,
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
          setState();
        }
      } else {
        const result = await photos.selectImage({
          quality: 0.5,
        });
        if (result.canceled) {
          onCancel();
        } else {
          setState({ imageUri: result.assets[0].uri });
        }
      }
    } catch (error) {
      Alert.alert("Image error", "Error reading image");
      console.log(error);
    }
  };

  return { handlePress };
};

export { useMedia };
