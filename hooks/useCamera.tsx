import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useCamera = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    Alert.alert(
      "Device settings alert",
      "You need to allow camera permissions for this to work",
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  const takePhoto = async (options: any) => {
    options = { mediaTypes: ImagePicker.MediaTypeOptions.Images, ...options };

    return await ImagePicker.launchCameraAsync(options);
  };

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return { takePhoto, toggleCameraType, type };
};

export { useCamera };
