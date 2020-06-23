import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet,Button,BackHandler,Alert,ActivityIndicator,Text } from "react-native";


import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-community/async-storage";
import GLOBALS from '../../globals'; 
import axios from "axios";



const ListingsScreen = ({ navigation }) => {

  const [announcements,setAnnouncements] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)

  useEffect(() => {
    axios.get(GLOBALS.BASE_URL + 'api/auth/announcements')
    .then(function(res){
      // console.log(res.data.data);
      setAnnouncements(res.data.data)
      setLoading(false)
    }).catch(e=>{
      console.log(e)
      setError(true)
      setLoading(false)
    })
    console.log(error)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("", "Are you sure you want to Exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    
    }, []));

  if(loading===true){
    return (
      <Screen style={styles.loader}>
        <ActivityIndicator/>
      </Screen>
    );
  }

  if(error===true){
    return(
      <Screen style={styles.loader}>
        <Text>Something went wrong please check your connections and reload the app</Text>
      </Screen>
    )
  }


  return (
    <Screen style={styles.screen}>
      <FlatList
        data={announcements}
        keyExtractor={(announcement) => announcement.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.body}
            // image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:30
  }
});

export default ListingsScreen;
