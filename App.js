import React,{useEffect,useState} from "react";
import { ActivityIndicator,View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import {NotLoggedInNavigator,LoggedInNavigator} from "./app/navigation/AppNavigator";
// import AuthNavigator from "./app/navigation/AuthNavigator";
import AsyncStorage from "@react-native-community/async-storage";

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
