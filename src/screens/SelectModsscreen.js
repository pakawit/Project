import React,{ useState} from 'react';
import { StyleSheet, Text, View ,Alert } from 'react-native';
import {Container, Content, Header ,Form, Input, Item, Button, Label,Icon} from 'native-base' 
import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseConfig.js';
//import TechnicianStackNavigator from './src/navigation/TechnicianStackNavigator'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}  


export default function SelectMods (props) {
  const { navigation } = props
  return (
    <Container style={styles.container}>
      <Form>
        {/*ช่างผู้ให้บริการ*/ }
        <Button style={{marginTop :20 , backgroundColor: "#85037F"}}  
          onPress ={()=> navigation.navigate('History')}
          full
          rounded 
        >
        <Text style={{color: 'white'}}>ช่างผู้ให้บริการ</Text>
        </Button>



        {/*ลูกค้า*/ }
        <Button style={{marginTop :20 , backgroundColor: "#85037F"}}  
          full
          rounded 
        >
          <Text style={{color: 'white'}}>ลูกค้าผู้รับบริการ</Text>
        </Button>
      </Form>
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
