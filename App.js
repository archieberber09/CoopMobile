import React,{useEffect,useState} from "react";
import { View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import {NotLoggedInNavigator,LoggedInNavigator} from "./app/navigation/AppNavigator";
// import AuthNavigator from "./app/navigation/AuthNavigator";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios'

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = "Bearer "+token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);


export default App = () => {

  useEffect( ()=>{

     const checkingUser = async() =>{
      await AsyncStorage.getItem('isLoggedIn').then(setLoggedIn)
      await setLoading(false)
    }
    
    checkingUser()
    
  },[])
  
  const [loading,setLoading] = useState(true)
  const [loggedIn,setLoggedIn] = useState('')
  


  if (loading == true){
    return(
      <View>
      </View>
    )
  }

  if(loggedIn == 1){
    return (
      <NavigationContainer theme={navigationTheme}>
        <LoggedInNavigator 
        />
      </NavigationContainer>
    );

  }else{
    return (
      <NavigationContainer theme={navigationTheme}>
        <NotLoggedInNavigator 
        />
      </NavigationContainer>
    );
  }

}
