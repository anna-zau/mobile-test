import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { View} from "react-native";



import RegistrationScreen from "./auth/RegistrationScreen";
import Login from "./auth/LoginScreen";
import Home from './main/Home'



const AuthStack = createStackNavigator();



export default function router(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Registration">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  } else {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }

}