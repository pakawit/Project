import React,{ useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {createDrawerNavigator,
        DrawerContentScrollView,
        DrawerItemList,
        DrawerItem,} from '@react-navigation/drawer';
import { AppLoading } from 'expo';
import * as Font from "expo-font";




import ListTechnicians from '../screens/Customer/ListTechnicians'




const Drawer = createDrawerNavigator(); //Drawerหลักช่าง
const Stack = createStackNavigator() 


const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto": require('native-base/Fonts/Roboto.ttf'),
    "Roboto_medium": require('native-base/Fonts/Roboto_medium.ttf'),
  });
};




export default function TechicianNavigator(props) {
  const { navigation } = props

  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }





  // function EducationStack() {
  //   return (  
  //     <Stack.Navigator
  //       initialRouteName='EducationShow'
  //       headerMode = "none"
      
  //     >
  //       <Stack.Screen
  //         name='EducationShow'
  //         component={EducationShow}
  //       />

  //       <Stack.Screen
  //         name='Education'
  //         component={Education}
  //       />
  //     </Stack.Navigator>
  
  //   );
  // }





  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ListTechnicians">
        <Drawer.Screen name="รายชื่อช่าง" component={ListTechnicians} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}



