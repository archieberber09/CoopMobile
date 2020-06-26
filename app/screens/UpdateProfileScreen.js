import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import * as Yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";
import GLOBALS from "../../globals";
import axios from "axios";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  mobile_number: Yup.number().required().label("Mobile Number"),
  password: Yup.string().required().min(8).label("Password"),
});

function UpdateProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const checkingUser = async () => {
        await AsyncStorage.getItem("id").then((value) => {
          axios
            .get(GLOBALS.BASE_URL + "api/auth/users/" + value)
            .then(function (res) {
              setUser(res.data.data);
            })
            .catch((e) => {
              console.log(e);
              setUser("Error");
            });
        });
      };
      checkingUser();
    } catch {
      setUser("Error");
    }
  }, []);

  const handleUpdateUser = (values) => {
    let data = {
      name: values.name,
      email: values.email,
      mobile_number: values.mobile_number,
      password: values.password,
    };

    axios
      .patch(GLOBALS.BASE_URL + "api/auth/users/" + user[0].id, data)
      .then((res) => {
        if (res.data.status === "success") {
          Alert.alert(
            "",
            "Account successfully updated",
            [{ text: "OK", onPress: () => navigation.push("Home") }],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "",
            "Email is already taken",
            [{ text: "OK", onPress: () => console.log("ok") }],
            { cancelable: false }
          );
        }
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "Error",
          "Something went Wrong",
          [{ text: "OK", onPress: () => console.log("ok") }],
          { cancelable: false }
        );
      });
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <Form
        initialValues={{
          name: "",
          email: "",
          mobile_number: "",
          password: "",
        }}
        onSubmit={(values) => handleUpdateUser(values)}
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
        <SubmitButton title="Update" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 122,
    height: 110,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default UpdateProfileScreen;
