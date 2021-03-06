import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Scan from "../screens/Scan";
import ForgotPassword from "../screens/ForgotPassword";
import CashoutScreen from "../screens/CashoutScreen";
import PointsHistoryScreen from "../screens/PointsHistoryScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import CashoutHistoryScreen from "../screens/CashoutHistoryScreen";
import LocationsScreens from "../screens/LocationsScreen";

// UrlApi

const urlApi = "http://192.168.56.1:8000/";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = (props) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Scan"
      component={Scan}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton onPress={() => navigation.navigate("Scan")} />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AuthNavigator = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Locations"
      component={LocationsScreens}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="Cashout"
      component={CashoutScreen}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="CashoutHistory"
      component={CashoutHistoryScreen}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="PointsHistory"
      component={PointsHistoryScreen}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="UpdateProfile"
      component={UpdateProfileScreen}
      initialParams={{ urlApi: urlApi }}
    />
    <Stack.Screen
      name="Home"
      component={AppNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Is Logged In

const LoggedInNavigator = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={AppNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Auth"
      component={AuthNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Not Logged In

const NotLoggedInNavigator = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Auth"
      component={AuthNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={AppNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export { NotLoggedInNavigator, LoggedInNavigator };
