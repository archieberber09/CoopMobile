import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
export default function Scan() {
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
        'Content-Type': 'application/json'
      }
    }).then(function(res){
      alert(res.response.data);
    }).catch(function(error){
      alert(error.response.data.data);
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

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

    </View>
  );
}