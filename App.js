import React , {useState} from "react";
import {} from "react-native";


import * as Font from "expo-font";
// import { AppLoading } from "expo";
// import { StatusBar } from 'expo-status-bar';


import { NavigationContainer } from "@react-navigation/native";

import router from "./Screens/router";

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),

//   });
// };

export default function App () {
  const [iasReady, setIasReady] = useState(false);

  const routing = router(false);
  // if (!iasReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIasReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  return <NavigationContainer>{routing}</NavigationContainer>;
};





