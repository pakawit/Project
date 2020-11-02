import React,{ useState, useEffect } from 'react';
import { SafeAreaView,Image,StyleSheet, Text, View ,Alert  ,ScrollView} from 'react-native';
import {Container,Left, Body,Right,Content, Title, Header , Subtitle, Item, Button,Icon,Textarea} from 'native-base' 
import { AntDesign } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import 'firebase/firestore';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  



export default function History (props) {

  const { navigation } = props

  const [Show,setShow] = useState(0)
  const [onoff,setonoff] = useState(null)
  const [dataSource, setDataSource] = useState([]);
  var cities = [];
  var docRef = firebase.firestore().collection("users");
  useEffect(() => {
  docRef
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data());
        });
        //console.log("Current cities in CA: ", cities);
        setDataSource(cities)
    });
    setShow(1)
  }, []);

const ItemView = (item, key) => {
  return (
    // Flat List Item

    <View key={key}>

      <Image source={{uri:item.Photo}} style={{ width:150 , height: 200 ,marginTop : 10}}/>

      <Text style={styles.itemStyle}>
        ชื่อ {item.Name}
      </Text>
      <Text style={styles.itemStyle}>
        {item.Occupations.Motorcycle ? " ช่างซ่อมรถจักรยานยนต์ " : ""}
      </Text>
      <Text style={styles.itemStyle}>
        {item.Occupations.Electrician ? " ช่างซ่อมเครื่องใช้ไฟฟ้า " : ""}
      </Text>
      <Text style={styles.itemStyle}>
        {item.Occupations.Electricity ? " ช่างซ่อมไฟฟ้า " : ""}
      </Text>
      <Text style={styles.itemStyle}>
        ระยะห่าง
      </Text>
      <Text style={styles.itemStyle}>
        คะเเนนรวม
      </Text>
      <Text style={styles.itemStyle}>
        งานที่สำเร็จ
      </Text>
      <ItemSeparatorView />
    </View>
  );
};

const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View style={styles.itemSeparatorStyle} />
  );
};

const getItem = (item) => {
  // Function for click on an item
  alert('Id : ' + item.id + ' Title : ' + item.title);
};


if(Show == 1){
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.toggleDrawer()}>
              <Icon name='menu'  />
            </Button>
          </Left>
          <Body>
            <Title>รายชื่อช่าง</Title>
          </Body>
          {/* <Right>
            <Button transparent onPress={() => navigation.navigate('WorkPicture')}>
              < AntDesign name="edit" size={24} color="#FFFFFF" />
            </Button>
          </Right> */}
        </Header>

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            {/* List Item as a function */}
              <ScrollView>
            {
            //Loop of JS which is like foreach loop
              dataSource.map(ItemView)
            }
              </ScrollView>
          </View>
        </SafeAreaView>
      </Container>
      
    );
  }else{
    return (
      <Text></Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});

