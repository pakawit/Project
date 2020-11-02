
import React ,{useState} from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import {Container, Content, Header ,Form, Input, Item, Button, Label,Icon} from 'native-base' 
import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseConfig.js';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}  


export default function Signupscreen (props) {
  
    const { navigation } = props
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordConfirm, setPasswordConfirm] = useState("")

    signUpUser = (email,password,passwordConfirm) =>{

        if (password !== passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

        return (
          <Container style={styles.container}>
            <View style = {styles.centerText}><Text style={styles.sign}> สมัครใช้งาน </Text></View>
            <Form>
              {/*กรอกอีเมลเข้าสู่ระบบ*/ }
              <Item floatingLabel>
                <Label>อีเมล</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize={"none"}
                  onChangeText={(e)=>setEmail(e)}
                />
              </Item>
    
              <Item floatingLabel>  
                <Label>รหัสผ่าน</Label>
                <Input
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize={"none"}
                  onChangeText={(p)=>setPassword(p)}
                />
              </Item>

              <Item floatingLabel>  
                <Label>ยินยันรหัสผ่าน</Label>
                <Input
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize={"none"}
                  onChangeText={(pC)=>setPasswordConfirm(pC)}
                />
              </Item>
    
                {/*ปุ่มสมัคร*/ }
                
              
    
    
            </Form>
            <Button style={{marginTop :20 , backgroundColor: "#85037F",marginRight:20,marginLeft:20}}  
              full
              rounded 
              onPress ={()=>signUpUser(Email,Password,PasswordConfirm)}
            >
                <Text style={{color: 'white',fontSize: 16}}>สมัคร</Text>
            </Button>

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
  sign:{
    fontSize: 18
  },
  centerText:{
    alignItems: 'center'
  }
});