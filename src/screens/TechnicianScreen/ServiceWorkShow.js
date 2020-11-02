import React,{ useState, useEffect } from 'react';
import { SafeAreaView,Image,StyleSheet, Text, View ,Alert  ,ScrollView} from 'react-native';
import {Container,Left, Body,Right,Content, Title, Header , Subtitle, Item, Button,Icon,Card,CardItem} from 'native-base' 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import 'firebase/firestore';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  



export default function ServiceWorkShow (props) {

  const { navigation } = props


  var docRefOccupation = firebase.firestore().collection("users").doc("LA");
  var docRefOnoff = firebase.firestore().collection("users").doc("LA").collection("onoff");
  var docRefService = firebase.firestore().collection("users").doc("LA").collection("ServiceWork");

  const [Show,setShow] = useState(0)

  const [Motorcycle, setMotorcycle] = useState(false);
  const [Electrician, setElectrician] = useState(false);
  const [Electricity, setElectricity] = useState(false);


  const [dataOnoff, setDataOnoff] = useState([]);
  const [dataService, setDataService] = useState([]);
  var Onoff = [];
  var Service = [];



  useEffect(() => {
    docRefOnoff
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          Onoff.push(doc.data());
        });
        setDataOnoff(Onoff)
    });

    docRefService
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          Service.push(doc.data());
        });
        setDataService(Service)
    });

    docRefOccupation
    .onSnapshot(function(doc) {
      if (doc.exists) {
        setMotorcycle(doc.data().Occupations.Motorcycle);
        setElectrician(doc.data().Occupations.Electrician);
        setElectricity(doc.data().Occupations.Electricity);}
    });
    setShow(1)
  }, []);

const OnoffView = (item, key) => {
  return (
    // Flat List Item
    <View key={key}>
      <Text style={styles.itemStyle}>
        {item.on} - {item.off} 
        {item.Day.Sunday ? "  อา" : ""}
        {item.Day.Monday ? "  จ" : ""}
        {item.Day.Tuesday ? "  อ" : ""}
        {item.Day.Wednesday ? "  พ" : ""}
        {item.Day.Thursday ? "  พฤ" : ""}
        {item.Day.Friday ? "  ศ" : ""}
        {item.Day.Saturday ? "  ส" : ""}
      </Text>
      <ItemSeparatorView />
    </View>
  );
};

const ServicView = (item, key) => {
  return (
    // Flat List Item
    <View key={key}>
      <Card>
        <CardItem>
          <MaterialIcons name="work" size={24} color="#3F51B5" />
          <Text style={styles.itemStyle2}>
            งาน {item.NameWork}
          </Text>
        </CardItem>

        <CardItem>
          <MaterialIcons name="attach-money" size={24} color="#3F51B5" />
          <Text style={styles.itemStyle2}>
            ราตา {item.Rate}
          </Text>
        </CardItem>

        <CardItem>
          <FontAwesome5 name="hand-rock" size={24} color="#3F51B5" />
          <Text style={styles.itemStyle2}>
            เทคนิควิธีการ {item.description}
          </Text>
        </CardItem>
      </Card>
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


if(dataOnoff.length > 0 || dataService.length > 0){
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
            <Button transparent onPress={() => navigation.navigate('ServiceWork')}>
              < AntDesign name="edit" size={24} color="#FFFFFF" />
            </Button>
          </Right>
        </Header>

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
          <View style={{margin:5}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',margin:10}}>
              <View>
                <MaterialCommunityIcons name="worker" size={100} color="#3F51B5" />
              </View>

              <View>
                <Text style={{fontSize:16}}>{Motorcycle ? " ช่างซ่อมรถจักรยานยนต์\n" : null} 
                      {Electrician ? " ช่างซ่อมเครื่องใช้ไฟฟ้า\n" : null}
                      {Electricity ? " ช่างซ่อมไฟฟ้า\n" : null}
                </Text>
              </View>
            </View>

            <View style = {{margin:10}}>
              <Text>เวลาเปิด-ปิด </Text>
              {dataOnoff.map(OnoffView)}
            </View>
         
       
            <View style={styles.container}>
              
                {dataService.map(ServicView)}
              
            </View>
          </View>
          </ScrollView>
        </SafeAreaView>
      </Container>
      
    );
  }else{
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
            <Button transparent onPress={() => navigation.navigate('ServiceWork')}>
              < AntDesign name="edit" size={24} color="#FFFFFF" />
            </Button>
          </Right>
        </Header>

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
          <View style={{margin:5}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',margin:10}}>
              <View>
                <MaterialCommunityIcons name="worker" size={100} color="#3F51B5" />
              </View>
              <View>
                <Text style={{fontSize:16}}>
                  ประเภทงานบริการ
                </Text>
                <Text style={{fontSize:16}}>{Motorcycle ? " ช่างซ่อมรถจักรยานยนต์\n" : null} 
                      {Electrician ? " ช่างซ่อมเครื่องใช้ไฟฟ้า\n" : null}
                      {Electricity ? " ช่างซ่อมไฟฟ้า\n" : null}
                </Text>
              </View>
            </View>

            <View style = {{margin:10}}>
              <Text>เวลาเปิด-ปิด </Text>
              
            </View>
         
       
            <View style = {{margin:10}}>
              <Text>
                งานที่ให้บริการ
              </Text>
            </View>
          </View>
          </ScrollView>
        </SafeAreaView>
      </Container>
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
  itemStyle2: {
    padding: 5,
  },
  itemSeparatorStyle: {
    height: 0.5,
    marginLeft:10,
    width: '96%',
    backgroundColor: '#C8C8C8',
  },
});

