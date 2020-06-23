import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Linking,Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
export default function Scan({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);



  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);



  const handleBarCodeScanned = ({ _, data }) => {
    setScanned(true);
    console.log(data);
    axios.get(data,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function(res){
      console.log(res)
      Alert.alert(
        "",
        res.data.data,
        [{ text: "Ok", onPress: () => setScanned(false) }],
        { cancelable: false }
      );
    }).catch(function(error){
      try{
        Alert.alert(
          "",
          error.response.data.data,
          [{ text: "Ok", onPress: () => setScanned(false) }],
          { cancelable: false }
        );
      }catch{
        Alert.alert(
          "Something went wrong",
          "You might be scanning an invalid Qr Code or you have no network connection",
          [{ text: "Ok", onPress: () => setScanned(false) }],
          { cancelable: false }
        );
      }
     
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
      }}>
      <View style={{height:500, width:500,
        alignItems:"center",justifyContent: 'center',}}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      </View>
      {scanned && <View><ActivityIndicator/></View>}

    </View>
  );
}