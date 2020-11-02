import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Alert,Image } from 'react-native';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import {Container, Content, Header ,Form, Input, Item, Button, Label,Icon} from 'native-base' 
import { firebaseConfig } from '../config/firebaseConfig.js';
import 'firebase/firestore';
require("firebase/firestore");

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  
var db = firebase.firestore();



export default function Loginscreen (props) {

  const { navigation } = props
  const [Emails, setEmails] = useState("");
  const [Passwords, setPasswords] = useState("");
  //const [UserN, setUserN] = useState("");


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null){
        console.log(user)
        console.log(user.uid)
        // setUserN(user.uid)
        // addData(UserN)
        db.collection("users").doc(user.uid).set({
          name: 'test',
        })
        navigation.navigate('SelectMods')
      }
    })
  
  }, [])

  /*ฟังก์ชันเข้าสู่ระบบด้วย email*/
  const loginUser = (email,password) =>{


    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(user){
          console.log(user)
    }, (error) => {
        Alert.alert(error.message);
    });
 
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
      <View style={{alignItems: 'center'}}><Text style={{fontSize:18}}>เข้าสู่ระบบ</Text></View>
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
      <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
        <Button style={{marginTop :40 ,width: 250}}
          full
          rounded
          success
          onPress ={()=>loginUser(Emails,Passwords)}
        >
          <Text style={{color: 'white'}}>เข้าสู่ระบบ</Text>
        </Button>
      </View>  
        {/*  */}

      <View style ={{marginTop :40,flex: 1, flexDirection: 'row',justifyContent: 'space-around'}}>
        <Button style={{backgroundColor: "#C0392B",width: 190,height: 45}}
          full
          rounded
          onPress ={()=> navigation.navigate('Signup')}
        >
          <Text style={{color: 'white'}}>สมัคร</Text>
        </Button>
          

        <Button style={{backgroundColor: "#9A7D0A",width: 190,height: 45}}
          full
          rounded
          onPress ={()=> navigation.navigate('Forgot')}
        >
          <Text style={{color: 'white'}}>ลืมรหัสผ่าน</Text>
        </Button>
      </View>
          



          {/*  */}
    


      <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
      <Button style={{marginTop :150 ,width: 250 }}
          full
          rounded
          primary
          onPress ={()=>login()}
        >
            <Text style={{color: 'white'}}>เข้าระบบด้วย facebook</Text>
        </Button>
      </View>

    </Form>
  </Container>
    );
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'space-around',
  },


});
