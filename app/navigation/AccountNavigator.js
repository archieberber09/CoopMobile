import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import CashoutScreen from "../screens/CashoutScreen";
import CashoutHistoryScreen from "../screens/CashoutHistoryScreen";
import PointsHistoryScreen from "../screens/PointsHistoryScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Cashout" component={CashoutScreen} />
    <Stack.Screen name="CashoutHistory" component={CashoutHistoryScreen} />
    <Stack.Screen name="PointsHistory" component={PointsHistoryScreen} />
    <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
