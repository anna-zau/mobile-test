import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from '../nestedScreens/CommentsScreen';
import DefaultScreen from "../nestedScreens/DefaultScreen";

import HeaderLogoutButton from '../../components/LogoutBtn'


const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
       options={{
        // headerShown: false,
        headerTitleAlign: 'center',
        headerRight: () => (<HeaderLogoutButton  />),
        tabBarIcon: ({ focused, size, color }) => {
          return (<View style={{
            width: 70,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          
          }}><Feather name="grid" size={24} color="#212121" /></View>)
        },
      }}
        name="Publications"
        component={DefaultScreen}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;