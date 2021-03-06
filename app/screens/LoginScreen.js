import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Yup from "yup";
import GLOBALS from "../../globals";

import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      let apiOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      };
      const fetchData = await fetch(
        GLOBALS.BASE_URL + "api/auth/login",
        apiOptions
      );
      var data = await fetchData.json();
      console.log(data);
      if (data.status === "success") {
        console.log("successful Login");
        let id = data.data.user.id;
        let stringId = id.toString();
        navigation.navigate("Home");
        AsyncStorage.multiSet([
          ["id", stringId],
          ["name", data.data.user.name],
          ["token", data.data.token],
          ["isLoggedIn", "1"],
        ]);
      } else {
        Alert.alert(
          "",
          "Wrong Credentials",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (e) {
      Alert.alert(
        "Error",
        "Something went wrong, please try again",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
    setLoading(false);
  };

  if (loading === true)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  forgotContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
  forgot: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: "bold",
  },
  logo: {
    width: 122,
    height: 110,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});

export default LoginScreen;
