import { Redirect, useRootNavigationState } from "expo-router";
import React from "react";

import { createLocationStore } from "@/context/location";

const Home = () => {
  const rootNavigationState = useRootNavigationState();

  const location = createLocationStore.getState().location;

  console.log("location", location);

  if (!rootNavigationState?.key) return null;

  return <Redirect href={location ? "/login" : "/welcome"} />;
};

export default Home;
