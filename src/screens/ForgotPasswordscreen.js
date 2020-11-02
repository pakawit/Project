import React,{ useState} from 'react';
import { StyleSheet, Text, View ,Alert } from 'react-native';
import {Container, Content, Header ,Form, Input, Item, Button, Label,Icon} from 'native-base' 
import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseConfig.js';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}  





export default function ForgotPasswordscreen (props) {

    const { navigation } = props
    const [Email, setEmail] = useState("")

    const ResetPasswordPress = (email) => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }


        return (
          <Container style={styles.container}>

            <View style = {{alignItems: 'center'}}><Text style = {{fontSize: 18}}>ลืมรหัสผ่าน</Text></View>
          <Form>
           
              {/*ลืมรหัสผ่าน*/ }
              <Item floatingLabel>
                <Label>อีเมล</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize={"none"}
                  onChangeText={(email)=>setEmail(email)}
                />
              </Item>
    

           

          </Form>   


          {/*ปุ่มสมัคร*/ }
          <Button style={{marginTop :20 , backgroundColor: "#85037F",marginLeft:20 , marginRight:20}}  
            full
            rounded 
            onPress ={() => ResetPasswordPress(Email)}
          >
              <Text style={{color: 'white', fontSize: 16}}>ยืนยัน</Text>
          </Button>
      </Container>
        );
      
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
