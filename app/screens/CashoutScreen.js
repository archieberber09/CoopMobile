import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  gcash_number: Yup.number().required().label("GCash Number"),
  amount: Yup.number().required().label("Amount"),
});

function Cashout() {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <Form
        initialValues={{ gcash_number: "", amount: "" }}
        // onSubmit={(values) => handleLogin(values)} need handleCashout
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="cellphone"
          keyboardType="number-pad"
          name="gcash_number"
          placeholder="GCash Number"
          textContentType="telephoneNumber"
        />
        <FormField
          autoCorrect={false}
          icon="numeric"
          keyboardType="number-pad"
          name="amount"
          placeholder="Amount"
        />
        <SubmitButton title="Claim" />
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
    marginTop: 50,
    marginBottom: 20,
  },
});

export default Cashout;
