import React from "react";
import { View} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather, AntDesign  } from '@expo/vector-icons'; 

import PostsScreen from './PostsScreen';
import CreatePostScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import HeaderBackButton from '../../components/BackBtn'



const MainTab = createBottomTabNavigator();


const Home = ({navigation}) => {
    return (
      <MainTab.Navigator  initialRouteName="Posts" screenOptions={{ tabBarShowLabel: false , 
        tabBarStyle: {
  justifyContent: 'space-between',
  
  paddingHorizontal: 81,
  height: 80,
},
    }}
      >
        <MainTab.Screen
          options={{
            headerShown: false,
            
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
          name="Posts"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{
            title: 'Create a post',
            headerTitleAlign: 'center',
                        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()}/>,

            tabBarIcon: ({ focused, size, color }) => {
              return <View style={{
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:  "#FF6C00",
              }}><AntDesign name="plus" size={24} color={focused ? "#fff" : "#212121"} /></View>
          },
          }}
          name="Create"
          component={CreatePostScreen}
        />
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <Feather name="user" size={24} color="#212121" />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    );

};



export default Home;