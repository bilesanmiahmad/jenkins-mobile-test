import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Svg, Path, Rect, G, Defs, ClipPath } from "react-native-svg";

import Button from "@/components/core/Button";
import { useLocationStore, createLocationStore } from "@/context/location";
import { Box, Text } from "@/theme";

const Welcome = () => {
  const router = useRouter();

  const { error, location } = useLocationStore();

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        createLocationStore.setState({
          error: "Permission to access location was denied",
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      createLocationStore.setState({
        location,
      });
    };
    getPermission();
  }, []);

  let text = "Waiting..";
  if (error) {
    text = error;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log("text", text);

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="space-between"
      padding="xl"
    >
      <Box />
      <Box gap="xl">
        <Box justifyContent="center" alignItems="center" padding="md">
          <Svg width={195} height={32} fill="none">
            <Path
              fill="#E58C00"
              d="M27.068 25.64a6.891 6.891 0 0 0-7.7-1.4 9.707 9.707 0 0 1-5.414.719V9.629a4.53 4.53 0 0 0-4.532 4.533v8.788a9.629 9.629 0 0 1-3.07-10.701 9.627 9.627 0 0 1 9.074-6.445 9.511 9.511 0 0 1 3.918.835 6.899 6.899 0 0 0 7.7-1.4l-.705-.706A15.396 15.396 0 0 0 5.806 3.386 15.407 15.407 0 0 0 0 15.413a15.351 15.351 0 0 0 4.517 10.946c.407.404.833.787 1.28 1.147a15.432 15.432 0 0 0 20.533-1.143l.738-.723ZM47.654 15.406c-.127 5.979 4.998 10.945 11.103 10.819 4.018 0 7.434-1.93 9.238-5.188l-3.227-2.278c-1.487 2.341-3.48 3.512-5.98 3.512-3.89 0-6.737-2.848-6.737-6.833 0-3.986 2.847-6.897 6.738-6.897 2.499 0 4.492 1.17 5.979 3.512l3.227-2.278c-1.867-3.258-5.252-5.188-9.206-5.188-6.074-.127-11.23 4.84-11.135 10.819ZM71.529 25.845h4.27v-7.94h7.75v-3.86H75.8V8.827h9.46v-3.86h-13.73v20.88ZM108.078 25.845h4.587l-9.301-21.258h-1.423l-9.333 21.258h4.587l1.17-2.72h8.542l1.171 2.72Zm-2.658-6.232h-5.567l2.783-7.054 2.784 7.054ZM126.38 10.186v1.962c-1.107-1.487-2.879-2.31-5.125-2.31-4.271 0-7.497 3.1-7.497 7.75 0 4.588 3.163 7.783 7.497 7.783 1.993 0 3.638-.633 4.777-1.867v.854c0 2.436-1.645 3.702-4.176 3.702-1.898 0-3.353-.728-5.093-2.025l-2.246 2.974c2.183 1.93 4.745 2.91 7.687 2.91 4.903 0 8.098-2.72 8.098-7.814V10.186h-3.922Zm-.285 7.34c0 2.688-1.803 4.239-3.954 4.239-2.278 0-4.049-1.677-4.049-4.208 0-2.53 1.739-4.08 4.049-4.08 2.183 0 3.954 1.36 3.954 4.049ZM148.836 19.455c.189-.79.284-1.582.284-2.34 0-4.082-3.037-7.277-7.37-7.277-4.524-.095-8.289 3.67-8.194 8.194-.095 4.523 3.733 8.288 8.573 8.193 2.31 0 4.397-.791 6.264-2.341l-1.772-2.91c-1.36 1.043-2.815 1.581-4.365 1.581-2.278 0-3.891-1.107-4.397-3.1h10.977Zm-10.977-3.005c.474-1.93 1.929-3.163 3.732-3.163 1.867 0 3.354 1.233 3.385 3.163h-7.117ZM166.751 16.134c0-3.797-2.246-6.296-5.884-6.296-1.866 0-3.479.665-4.587 1.772v-1.424h-3.922v15.66h4.27v-9.143c0-1.803 1.234-3.037 2.974-3.037 1.74 0 2.91 1.234 2.91 3.037v9.142h4.239v-9.711ZM180.827 22.27c-1.107.096-1.771.127-2.024.127-2.025 0-2.911-.664-2.911-2.436v-6.168h4.429v-3.607h-4.429V6.232h-4.27v3.954h-2.468v3.607h2.468v6.548c0 3.923 2.309 5.884 6.263 5.884.949 0 1.93-.127 2.942-.38v-3.574ZM182.41 23.188c1.423 1.898 3.732 3.037 6.485 3.037 1.771 0 3.226-.443 4.365-1.329 1.171-.886 1.74-2.12 1.74-3.67 0-2.309-1.36-3.542-4.397-4.776l-1.519-.633c-1.233-.506-1.645-.79-1.645-1.392 0-.727.633-1.107 1.677-1.107 1.297 0 2.468.506 3.511 1.487l2.152-2.626c-1.424-1.55-3.29-2.34-5.631-2.34-3.417 0-5.758 1.74-5.758 4.681 0 2.31 1.392 3.607 4.271 4.777l1.676.696c1.171.506 1.614.76 1.614 1.424 0 .854-.854 1.296-1.993 1.296-1.55 0-3.037-.696-4.397-2.119l-2.151 2.594Z"
            />
            <Path
              fill="#E58C00"
              d="M15.321 17.893h2.082a4.53 4.53 0 0 0 4.53-4.525h-2.08a4.523 4.523 0 0 0-4.185 2.792 4.53 4.53 0 0 0-.347 1.733ZM37.488 0h-.933v30.874h.933V0Z"
            />
          </Svg>
        </Box>
        <Box marginTop="xl">
          <Svg width={327} height={200} fill="none">
            <G clipPath="url(#a)">
              <Rect width={327} height={200} fill="#004C46" rx={32} />
              <Path
                fill="#022D2B"
                fillRule="evenodd"
                d="M-57 172V98h55.02a1010 1010 0 0 1 319.049 51.716L384 172H-57Z"
                clipRule="evenodd"
              />
              <Path
                fill="#EDF3FF"
                fillRule="evenodd"
                d="M-57 183v-74h55.02a1010 1010 0 0 1 319.049 51.716L384 183H-57Z"
                clipRule="evenodd"
              />
              <Path
                fill="#E0CB09"
                fillRule="evenodd"
                d="M-57 200v-74h55.02a1010 1010 0 0 1 319.049 51.716L384 200H-57Z"
                clipRule="evenodd"
              />
            </G>
            <Defs>
              <ClipPath id="a">
                <Rect width={327} height={200} fill="#fff" rx={32} />
              </ClipPath>
            </Defs>
          </Svg>
        </Box>
        <Text
          variant="header"
          textAlign="center"
          paddingHorizontal="xl"
          marginTop="xl"
        >
          Welcome to Complete Farmer Agents
        </Text>
      </Box>

      <Button
        onPress={() => router.push("/login")}
        label="Get Started"
        variant="default"
      />
    </Box>
  );
};

export default Welcome;
