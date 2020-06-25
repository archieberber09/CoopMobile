import React, { useState } from "react";
import { StyleSheet, Image,Alert,ActivityIndicator } from "react-native";
import * as Yup from "yup";
import axios from 'axios'
import GLOBALS from "../../globals";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  gcash_number: Yup.number().required().label("GCash Number"),
  amount: Yup.number().required().label("Amount"),
});

function Cashout() {
  
  const [loading,setLoading] = useState(false)

  const handleCashOut = (value) => {
    setLoading(true)

    try{

      let data = {
        amount:value.amount,
        gcash_number:value.gcash_number

    }
    axios.post( GLOBALS.BASE_URL + 'api/auth/cashouts',data).then(res=>{
      Alert.alert(
        "",
        "Succesful!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      setLoading(false)
    }).catch(
      e=>{
        Alert.alert(
          "Error",
          "Something went Wrong",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        setLoading(false)

      }
    )

    }catch(e){
      console.log(e)
      Alert.alert(
        "Error",
        "Something went Wrong",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      setLoading(false)
    }
}

  if(loading===true){
    return(
      <Screen style={styles.loader}>
        <ActivityIndicator/>
      </Screen>
    )
  }


  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <Form
        initialValues={{ gcash_number: "", amount: "" }}
        onSubmit={(values) => handleCashOut(values)}
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
  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:30
  }
});

export default Cashout;
