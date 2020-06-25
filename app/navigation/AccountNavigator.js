import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import Cashout from "../screens/CashoutScreen";
import TransactionHistory from "../screens/TransactionHistoryScreen";
import UpdateProfile from "../screens/UpdateProfileScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Cashout" component={Cashout} />
    <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
    <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
  </Stack.Navigator>
);

export default AccountNavigator;
