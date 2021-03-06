import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import * as Yup from "yup";
import GLOBALS from "../../globals";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  mobile_number: Yup.number().required().label("Mobile Number"),
  password: Yup.string().required().min(8).label("Password"),
  confirm_password: Yup.string().required().min(8).label("Confirm Password"),
});

const RegisterScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = (values) => {
    if (values.password !== values.confirm_password) {
      Alert.alert(
        "",
        "Password does not match",
        [{ text: "OK", onPress: () => console.log("Ok") }],
        { cancelable: false }
      );
    } else {
      setLoading(true);
      let apiOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          mobile_number: values.mobile_number,
          password: values.password,
          password_confirmation: values.confirm_password,
          role: "customer",
        }),
      };

      fetch(GLOBALS.BASE_URL + "api/auth/signup", apiOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            Alert.alert(
              "",
              res.errors.email[0],
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            setLoading(false);
          } else {
            Alert.alert(
              "",
              res.message,
              [{ text: "OK", onPress: () => navigation.navigate("Login") }],
              { cancelable: false }
            );
            setLoading(false);
          }
        })
        .catch((e) => {
          Alert.alert(
            "Error",
            "Something went wrong, please try again",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          console.log(e);
          setLoading(false);
        });
    }
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
        initialValues={{
          name: "",
          email: "",
          mobile_number: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
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
          autoCorrect={false}
          icon="cellphone"
          keyboardType="number-pad"
          name="mobile_number"
          placeholder="Mobile Number"
          textContentType="telephoneNumber"
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
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirm_password"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 63,
    height: 57,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default RegisterScreen;
