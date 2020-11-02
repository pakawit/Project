import { AntDesign } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'firebase/firestore';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  
import {Container,Left, Body,Right,Content, Title, Header ,Input, Item, Button,Icon,Textarea} from 'native-base' 
import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View ,  Platform} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyApp (props){
  const { navigation } = props

  var docRef = firebase.firestore().collection("users").doc("LA").collection("Schedule");

  const [onoff, setonoff] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  //เวลาเปิดปิด
  const [Timeon, setTimeon] = useState(null);
  const [Timeoff, setTimeoff] = useState(null);
  const [DateS, setDateS] = useState(null);
  
  const uid = docRef.doc().id



  //รายละเอียดการทำงาน
  const [Work, setWork] = useState(null);
  const [Des, setDes] = useState(null);


 

  const SaveData = () =>{
    docRef.doc(uid).set({
      DayStart : Timeon,
      DayEnd: Timeoff,
      DDMMYYYY: DateS,
      Work:Work,
      Des:Des,
      Key : uid
    },{ merge: true })

  }


  const onChange = (event, selectedDate) => {

    let offtime
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    if(onoff == 1){
      let ontime = currentDate.toLocaleTimeString()
      setTimeon(ontime);
      console.log(ontime)
    }

    if(onoff == 2){
      let offtime = currentDate.toLocaleTimeString()
      setTimeoff(offtime); 
      console.log(offtime)
    }

    if(onoff == 3){
      let date = currentDate.toDateString()
      setDateS(date); 
      console.log(date)
    }

 


  };



  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepickeron = () => {
    showMode('time');
    setonoff(1);
  };

  const showTimepickeroff = () => {
    showMode('time');
    setonoff(2);
  };

  const showDatepicker = () => {
    showMode('date');
    setonoff(3);
  };
  

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name='menu'  />
          </Button>
        </Left>
        <Body>
          <Title>งานบริการ</Title>
        </Body>
        <Right>
        <Button transparent onPress={() => navigation.navigate('Work')}>
            < AntDesign name="edit" size={24} color="#FFFFFF" />
          </Button>
        </Right>
      </Header>

      <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'center',margin:15}}>
          <View>
            <View>
              <Button full rounded style={{width:100,marginRight:10}}
              onPress={showTimepickeron}  >
                <Text style={{color:'#ffffff'}}>
                  เริ่ม
                </Text>
              </Button>
            </View>
          </View>
          <View>
            <View>
              <Button full rounded  style={{width:100,marginRight:10}}
                onPress={showTimepickeroff}  >
                <Text style={{color:'#ffffff'}}>
                  เสร็จสิ้น
                </Text>
              </Button>
            </View>
          </View>
          <View>
            <View>
              <Button full rounded  style={{width:100}}
                onPress={showDatepicker}  >
                <Text style={{color:'#ffffff'}}>
                  วัน/เดือน/ปี
                </Text>
              </Button>
            </View>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View style ={{flexDirection:'row' ,alignItems:'center',justifyContent:'center'}}>
          <View>
            <View>
              <Text style={{fontSize:16}}>เริ่ม {Timeon}</Text>
            </View>
            <View>
              <Text style={{fontSize:16}}>
                สิ้นสุด {Timeoff}
              </Text>
            </View>
            <View>
              <Text style={{fontSize:16}}>วันที่  {DateS}</Text>
            </View>
          </View>
          <View>
            <MaterialCommunityIcons name="timetable" size={80} color="#3F51B5" />
          </View>
        </View>
        
        <Content padder>
          {/* ชื่อ */}
          <Item regular>
              <Input placeholder='งาน' 
            onChangeText={(e)=>setWork(e)}
              />
          </Item>

          <Textarea rowSpan={5} bordered placeholder='รายละเอียด' 
            onChangeText={(e)=>setDes(e)}
          />
        
          <Button  full rounded    style ={{marginTop: 10, margin:20,marginTop:30}}onPress ={SaveData}>
            <Text style ={{color:'#ffffff'}}> บันทึก </Text>
          </Button>
        </Content>
    
      </View>
    </Container>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
   
  },
  checkboxInput: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    margin: 5,
  },
 
});



