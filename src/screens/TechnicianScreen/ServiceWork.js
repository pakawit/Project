import { AntDesign } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import 'firebase/firestore';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  
import {Container,Left, Body,Right,Content, Title, Header ,Input, Item, Button,Icon,Textarea} from 'native-base' 
import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View ,  Platform,ScrollView} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyApp (props){
  const { navigation } = props

  var docRefOccupation = firebase.firestore().collection("users").doc("LA");
  var docRefOnoff = firebase.firestore().collection("users").doc("LA").collection("onoff");
  var docRefService = firebase.firestore().collection("users").doc("LA").collection("ServiceWork");

  const [onoff, setonoff] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  //เวลาเปิดปิด
  const [Timeon, setTimeon] = useState(null);
  const [Timeoff, setTimeoff] = useState(null);
  
  const uidOnoff = docRefOnoff.doc().id
  const uidService = docRefService.doc().id
  //อาชีพ
  const [Motorcycle, setMotorcycle] = useState(false);
  const [Electrician, setElectrician] = useState(false);
  const [Electricity, setElectricity] = useState(false);

  //วันทำการ
  const [Sunday, setSunday] = useState(false)
  const [Monday, setMonday] = useState(false)
  const [Tuesday, setTuesday] = useState(false)
  const [Wednesday,setWednesday] = useState(false)
  const [Thursday, setThursday] = useState(false)
  const [Friday, setFriday] = useState(false)
  const [Saturday, setSaturday] = useState(false)

  //รายละเอียดการทำงาน
  const [Work, setWork] = useState(null);
  const [Rate, setRate] = useState(null);
  const [Dis, setDis] = useState(null);



  const Occupation = () =>{
    
    docRefOccupation.set({Occupations : {
      Motorcycle : Motorcycle,
      Electrician: Electrician,
      Electricity: Electricity,
    }},{ merge: true })
    
  }

  const SavaOnoff = () =>{
    if(Timeon != null && Timeoff != null){
      docRefOnoff.doc(uidOnoff).set({
        Day : {Sunday : Sunday,
        Monday: Monday,
        Tuesday: Tuesday,
        Wednesday: Wednesday,
        Thursday: Thursday,
        Friday: Friday,
        Saturday: Saturday},
        on : Timeon,
        off : Timeoff,
        Key : uidOnoff
      },{ merge: true })
    }
  }

  const SaveServiceWork = () =>{
    if(Work != null && Rate != null && Dis != null){
      docRefService.doc(uidService).set({
        NameWork : Work,
        Rate : Rate,
        description : Dis,
        Key : uidService
      },{ merge: true })
    }
  }

  const SaveData = () =>{
    SavaOnoff();
    Occupation();
    SaveServiceWork();
    navigation.navigate('ServiceWorkShow')
  }


  const onChange = (event, selectedDate) => {

    let offtime
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    if(onoff == 1){
      let onminute = currentDate.getHours().toString()
      let onhour = currentDate.getMinutes().toString()

      setTimeon(onminute .concat(":").concat(onhour));
    }

    if(onoff == 2){
      let onminute = currentDate.getHours().toString()
      let onhour = currentDate.getMinutes().toString()

      setTimeoff(onminute .concat(":").concat(onhour));
    }
    
    console.log(currentDate.toLocaleTimeString())
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

      <ScrollView>
      <View style={styles.container}>
        <View style = {{marginLeft:15,marginTop:10}}>
          <View style={styles.checkboxInput}>
            <CheckBox
              value={Motorcycle}
              onValueChange={setMotorcycle}
              style={styles.checkbox}
            />
            <Text style={styles.label}>ช่างซ่อมรถจักรยานยนค์</Text>
          </View>


          <View style={styles.checkboxInput}>
            <CheckBox
              value={Electrician}
              onValueChange={setElectrician}
              style={styles.checkbox}
            />
            <Text style={styles.label}>ช่างซ่อมเครื่องใช้ไฟฟ้า</Text>
          </View>

          <View style={styles.checkboxInput}>
            <CheckBox
              value={Electricity}
              onValueChange={setElectricity}
              style={styles.checkbox}
            />
            <Text style={styles.label}>ช่างซ่อมไฟฟ้า</Text>
          </View>
        </View>


        {/* <View style = {{flex: 1}}> */}
          <View style = {{flex: 2,flexDirection:'column',alignItems: 'center'}}>
            <View style = {{flex: 2,flexDirection:'row',alignItems: 'center'}}>
              <View>
                <View>
                  <Button full rounded onPress={showTimepickeron}  style={{marginRight: 10, width: 100,alignItems: 'center'}}>
                    <Text style = {{color:'#ffffff'}}>เวลาเปิด</Text>
                  </Button>
                </View>
              </View>
              <View>
                <View>
                  <Button full rounded onPress={showTimepickeroff}  style={{marginLeft: 10, width: 100,alignItems: 'center'}}>
                    <Text style = {{color:'#ffffff'}}>เวลาปิด</Text>
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
            <View style = {{flex: 2,flexDirection:'row',alignItems: 'center',margin:15}}>
              <View>
                <Text>เวลาเปิด {Timeon}</Text>
              </View>
              <View>
                <Text> -  {Timeoff}</Text>
              </View>
            </View>
          </View>
        {/* </View> */}


        <View style = {{flex: 2,flexDirection:'row',justifyContent:'center'}}>
          <View style={{marginRight: 35}}>
            <View style={styles.checkboxInput}>
              <CheckBox
                value={Sunday}
                onValueChange={setSunday}
                style={styles.checkbox}
              />
              <Text style={styles.label}>วันอาทิตย์</Text>
            </View>

            
            <View style={styles.checkboxInput}>
              <CheckBox
                value={Monday}
                onValueChange={setMonday}
                style={styles.checkbox}
              />
              <Text style={styles.label}>วันจันทร์</Text>
            </View>

            <View style={styles.checkboxInput}>
              <CheckBox
                value={Tuesday}
                onValueChange={setTuesday}
                style={styles.checkbox}
              />
              <Text style={styles.label}>วันอังคาร</Text>
            </View>
            <View style={styles.checkboxInput}>
              <CheckBox
                value={Wednesday}
                onValueChange={setWednesday}
                style={styles.checkbox}
              />
              <Text style={styles.label}>วันพุธ</Text>
            </View>
          </View>
          <View style={{marginLeft: 35}}>
            <View style={styles.checkboxInput}>
              <CheckBox
                value={Thursday}
                onValueChange={setThursday}
                style={styles.checkbox}
              />
              <Text style={styles.label}>วันพฤหัสบดี</Text>
            </View>

            <View style={styles.checkboxInput}>
              <CheckBox
                value={Friday}
                onValueChange={setFriday}
                style={styles.checkbox}
              />
              <Text style={styles.label}>วันศุกร์</Text>
            </View>
            <View style={styles.checkboxInput}>
              <CheckBox
                value={Saturday}
                onValueChange={setSaturday}
                style={styles.checkbox}
              />
              <Text style={styles.label}>วันเสาร์</Text>
            </View>
          </View>
        </View>

        <View>
          <Content padder>
            {/* ชื่อ */}
            <Item regular>
                <Input placeholder='งาน' 
              onChangeText={(e)=>setWork(e)}
                />
            </Item>
            <Textarea rowSpan={5} bordered placeholder='อัตราค่าบริการ' 
              onChangeText={(e)=>setRate(e)}
            />
            <Textarea rowSpan={5} bordered placeholder="เทคนิควิธีการอื่นๆ" 
              onChangeText={(f)=>setDis(f)}
            />
          
          <Button  full rounded    style ={{marginTop: 10, margin:20,color:'#ffffff'}}
            // onPress ={()=>SaveData(Name,Contact,Address)}>
            onPress ={SaveData}
            >
              <Text style ={{color:'#ffffff'}}> บันทึก </Text>
            </Button>
          </Content>
        </View>

      </View>
      </ScrollView>
    </Container>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
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



