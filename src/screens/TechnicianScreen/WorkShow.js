import React,{ useState, useEffect } from 'react';
import { SafeAreaView,Image,StyleSheet, Text, View ,Alert  ,ScrollView} from 'react-native';
import {Container,Left, Body,Right,Card, CardItem, Title, Header , Subtitle, Item, Button,Icon,Textarea} from 'native-base' 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import 'firebase/firestore';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  



export default function History (props) {

  const { navigation } = props

  const [dataSource, setDataSource] = useState([]);
  var cities = [];
  var docRef = firebase.firestore().collection("users").doc("LA").collection("HistoryWork");
  useEffect(() => {
  docRef
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data());
        });
        setDataSource(cities)
    });

  }, []);

const ItemView = (item, key) => {
  return (
    // Flat List Item
    <View key={key} style ={{margin:5}}>

      <Card>

        <CardItem>
          <FontAwesome5 name="store-alt" size={24} color= '#3F51B5' />
          <Text style={styles.itemStyle}>
            ชื่อบริษัท/ร้าน {item.CompanyName}
          </Text>
        </CardItem>

        <CardItem>
          <MaterialCommunityIcons name="human-male-height" size={24} color= '#3F51B5' />
          <Text style={styles.itemStyle}>
            ตำแหน่ง {item.WorkingPosition}
          </Text>
        </CardItem>

        <CardItem>
          <Fontisto name="date" size={24} color= '#3F51B5' />
          <Text style={styles.itemStyle}>
            ช่วงปีที่ทำ {item.YearsWorked}
          </Text>
        </CardItem>

        <CardItem>
          <FontAwesome5 name="address-card" size={24} color= '#3F51B5' />
          <Text style={styles.itemStyle}>
            ที่อยู่บริษัท/ร้าน {item.CompanyAddress}
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


if(dataSource.length > 0){
    return (
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

        <SafeAreaView style={{ flex: 1 }}> 
          <ScrollView>
            <View style={styles.container}>
              {
              //Loop of JS which is like foreach loop
                dataSource.map(ItemView)
              }
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
            <Title>ประวัติ</Title>
            <Subtitle>ประวัติการทำงาน</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('Work')}>
              < AntDesign name="edit" size={24} color="#FFFFFF" />
            </Button>
          </Right>
        </Header>

        <SafeAreaView style={{ flex: 1 }}> 
          <ScrollView>
            <View style={styles.container}>
              {
                <View style ={{margin:5}}>

                <Card>
          
                  <CardItem>
                    <FontAwesome5 name="store-alt" size={24} color= '#3F51B5' />
                    <Text style={styles.itemStyle}>
                      ชื่อบริษัท/ร้าน 
                    </Text>
                  </CardItem>
          
                  <CardItem>
                    <MaterialCommunityIcons name="human-male-height" size={24} color= '#3F51B5' />
                    <Text style={styles.itemStyle}>
                      ตำแหน่ง 
                    </Text>
                  </CardItem>
          
                  <CardItem>
                    <Fontisto name="date" size={24} color= '#3F51B5' />
                    <Text style={styles.itemStyle}>
                      ช่วงปีที่ทำ 
                    </Text>
                  </CardItem>
          
                  <CardItem>
                    <FontAwesome5 name="address-card" size={24} color= '#3F51B5' />
                    <Text style={styles.itemStyle}>
                      ที่อยู่บริษัท/ร้าน
                    </Text>
                  </CardItem>
          
                </Card>
          
              </View>
              }
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
    padding: 5,
   
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});

