import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View , } from 'react-native';

import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import {Container, Content, Header ,Form, Input, Item, Button, Label,Icon} from 'native-base' 



const firebaseConfig = {
  apiKey: "AIzaSyCkKsCgiDiLl8DlJid5RcG_x5CVZ19o4AI",
  authDomain: "ftynaja.firebaseapp.com",
  databaseURL: "https://ftynaja.firebaseio.com",
  projectId: "ftynaja",
  storageBucket: "ftynaja.appspot.com",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}  



export default function App () {


  const [Emails, setEmails] = useState();
  const [Passwords, setPasswords] = useState();


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null){
        console.log(user)
      }
    })
  
  }, [])

  /*ฟังก์ชันเข้าสู่ระบบด้วย email*/
  const loginUser = (email,password) =>{
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log(user)
      })
    }

    catch(erroe){
      
      console.log(error.toString())
    }
  }


  /*ฟังก์ชันเข้าสู่ระบบ facebook*/
  const login=async ()=>{

    await Facebook.initializeAsync('338955613739410');
    
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
          { permissions:['public_profile', 'email'] },
        );
  
  
        if(type == 'success'){
          const credential = firebase.auth.FacebookAuthProvider.credential(token)
    
          firebase.auth().signInWithCredential(credential).catch((error) => {
            console.log(error)
          })
        }
    }


    return (
      <Container style={styles.container}>
      <Form>

          {/*กรอกอีเมลเข้าสู่ระบบ*/ }
          <Item floatingLabel>
            <Label>อีเมล</Label>
            <Input
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={(e)=>setEmails(e)}
            />
          </Item>

          <Item floatingLabel>  
            <Label>รหัสผ่าน</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={(p)=>setPasswords(p)}
            />
          </Item>

          <Button style={{marginTop :40}}
            full
            rounded
            success
            onPress ={()=>loginUser(Emails,Passwords)}
          >
              <Text style={{color: 'white'}}>เข้าสู่ระบบ</Text>
          </Button>


          <Button style={{marginTop :20}}
            full
            rounded
            primary
            onPress ={()=>login()}
          >
              <Text style={{color: 'white'}}>เข้าระบบด้วย facebook</Text>
          </Button>

      </Form>
  </Container>
    );
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});
