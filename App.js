import React  from "react";
import {} from "react-native";


// import * as Font from "expo-font";


import { NavigationContainer } from "@react-navigation/native";

import router from "./Screens/router";



export default function App () {
  // const [iasReady, setIasReady] = useState(false);

  const routing = router(true);
 
  return <NavigationContainer>{routing}</NavigationContainer>;
};





