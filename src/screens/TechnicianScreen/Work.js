import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Alert } from 'react-native';
import {Container,Left, Body,Right,Content, Title, Header , Subtitle,Input, Item, Button,Icon,Textarea} from 'native-base' 
import {  Image,Modal, TouchableHighlight,} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import 'firebase/firestore';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  
var db = firebase.firestore();

export default function History (props) {
  const { navigation } = props
  var docRef = firebase.firestore().collection("users").doc("LA").collection("HistoryWork");
  const uid = docRef.doc().id
  //const uid = firebase.firestore().collection("users").doc().id
  const [NameCom, setNameCom] = useState("");
  const [AddressCom, setAddressCom] = useState("");
  const [YearCom, setYearCom] = useState("");
  const [Position, setPosition] = useState("");


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  const SaveData = ()=>{
    docRef.doc(uid).set({
      CompanyName: NameCom,
      CompanyAddress: AddressCom,
      YearsWorked: YearCom,
      WorkingPosition: Position,
      Key: uid
    },{ merge: true }).then(() => {
      navigation.navigate('WorkShow')
    })
    .catch((error) => {
      Alert.alert(error);
    });
  }

  return (
    // <Container style={styles.container}>
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name='menu'  />
          </Button>
        </Left>
        <Body>
          <Title>ประวัติ</Title>
          <Subtitle>ประวัติการทำงาน</Subtitle>
        </Body>
        <Right>
        <Button transparent onPress={() => navigation.navigate('Work')}>
            < AntDesign name="edit" size={24} color="#FFFFFF" />
          </Button>
        </Right>
      </Header>

      <Content padder>
        {/* ชื่อ */}
        <Item regular style ={{marginBottom: 5}}>
            <Input placeholder='ชื่อบริษัท/ร้าน' 
            onChangeText={(e)=>setNameCom(e)}/>
        </Item>
        <Item regular style ={{marginBottom: 5}}>
            <Input placeholder='ตำแหน่ง' 
            onChangeText={(e)=>setPosition(e)}/>
        </Item>
        <Item regular >
            <Input placeholder='ปีที่ทำ' 
            onChangeText={(e)=>setYearCom(e)}/>
        </Item >
        <Textarea rowSpan={5} bordered placeholder="ที่อยู่บริษัท/ร้าน" style ={{marginBottom: 10,fontSize:18}}
        onChangeText={(g)=>setAddressCom(g)}/>

        <Button full rounded  style ={{marginTop: 10, margin:20}}
        // onPress ={()=>SaveData(Name,Contact,Address)}>
        onPress ={SaveData}>
          <Text style= {{ color:'#FFFFFF'}}>       บันทึก       </Text>
        </Button>
      </Content>
    </Container>
  );
      
}


