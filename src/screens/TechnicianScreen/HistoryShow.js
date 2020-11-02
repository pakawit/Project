import React,{ useState, useEffect } from 'react';
import { Image, Text,StyleSheet ,ScrollView,Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import {Container,Left,Content, Body,Right, Title, Header , Subtitle, Button,Icon, Card,CardItem} from 'native-base' 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';

import 'firebase/firestore';
import { View } from 'react-native';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  
var db = firebase.firestore();
var docRef = firebase.firestore().collection("users").doc("LA");

export default function HistoryShow (props) {

  const { navigation } = props

  const [Data,setData] = useState(null)
  const [Show,setShow] = useState(null)

  useEffect(() => {
      docRef
      .onSnapshot(function(doc) {
          //console.log("Current data: ", doc.data().Address);
          setData(doc.data());
      });
  }, [])


  if(Data != null){
    return (
      <Container style = {styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.toggleDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>ประวัติ</Title>
            <Subtitle>ประวัติส่วนตัว</Subtitle>
          </Body>
          <Right>
            <Button transparent  onPress={() => navigation.navigate('History')}> 
              < AntDesign name="edit" size={24} color="#FFFFFF" />
            </Button>
          </Right>
        </Header>

        <ScrollView>
          <View style ={{margin:5}}>
           <Card style={{alignItems:'center'}}>
            <CardItem >
              <Image source={ {uri:Data.Photo} } style={styles.Image} ></Image>
            </CardItem>
          </Card>

          <Card>
            <CardItem >
              <AntDesign name="user" size={30} color="#3F51B5" />
              <Text style ={{fontSize:16}}>ชื่อ</Text>
            </CardItem>
            <CardItem>
              <Text style={{marginLeft:30}}>{Data.Name}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem >
              <FontAwesome5 name="address-card" size={24} color="#3F51B5" />
              <Text style ={{fontSize:16}}>  ที่อยู่</Text>
            </CardItem>
            <CardItem >
              <Text style={{marginLeft:30}}>{Data.Address}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem >
              <MaterialCommunityIcons name="contact-phone-outline" size={27} color="#3F51B5" />
              <Text style ={{fontSize:16}}>  ช่องทางการติดต่อ</Text>
            </CardItem>
            <CardItem >
              <Text style={{marginLeft:30}}>{Data.Contact}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem >
              <FontAwesome5 name="store-alt" size={24} color="#3F51B5" />
              <Text style ={{fontSize:16}}>  ที่อยู่ร้าน</Text>
            </CardItem>
            <CardItem >
              <Text style={{marginLeft:30}}>{Data.Addressstore}</Text>
            </CardItem>

            <CardItem >
              <MapView style={styles.mapStyle} 
              zoomEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              zoomTapEnabled={false}
              zoomControlEnabled={false}
              region={{
                latitude: Data.latlong.latitude,
                longitude: Data.latlong.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}>
              <MapView.Marker   
                coordinate={{latitude: Data.latlong.latitude,
                      longitude: Data.latlong.longitude,
                }}    
              />
              </MapView>
            </CardItem>
          </Card>
</View>
          </ScrollView>
 

      </Container>
    );
  }else{
    return (
      <Container style = {styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>ประวัติ</Title>
          <Subtitle>ประวัติส่วนตัว</Subtitle>
        </Body>
        <Right>
          <Button transparent  onPress={() => navigation.navigate('History')}> 
            < AntDesign name="edit" size={24} color="#FFFFFF" />
          </Button>
        </Right>
      </Header>

      <ScrollView>
        <View style ={{margin:5}}>
         <Card style={{alignItems:'center'}}>
          <CardItem style ={styles.imgPosition}>
            <Entypo name="image" size={100} color="#3F51B5" />
          </CardItem>
        </Card>

        <Card>
          <CardItem >
            <AntDesign name="user" size={30} color="#3F51B5" />
            <Text style ={{fontSize:16}}>ชื่อ</Text>
          </CardItem>
          <CardItem>
            {/* <Text style={{marginLeft:30}}>{Data.Name}</Text> */}
          </CardItem>
        </Card>

        <Card>
          <CardItem >
            <FontAwesome5 name="address-card" size={24} color="#3F51B5" />
            <Text style ={{fontSize:16}}>  ที่อยู่</Text>
          </CardItem>
          <CardItem >
            {/* <Text style={{marginLeft:30}}>{Data.Address}</Text> */}
          </CardItem>
        </Card>

        <Card>
          <CardItem >
            <MaterialCommunityIcons name="contact-phone-outline" size={27} color="#3F51B5" />
            <Text style ={{fontSize:16}}>  ช่องทางการติดต่อ</Text>
          </CardItem>
          <CardItem >
            {/* <Text style={{marginLeft:30}}>{Data.Contact}</Text> */}
          </CardItem>
        </Card>

        <Card>
           <CardItem >
            <FontAwesome5 name="store-alt" size={24} color="#3F51B5" />
            <Text style ={{fontSize:16}}>  ที่อยู่ร้าน</Text>
          </CardItem>
          {/*<CardItem >
            <Text style={{marginLeft:30}}>{Data.Addressstore}</Text>
          </CardItem>

          <CardItem >
            <MapView style={styles.mapStyle} 
            zoomEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            zoomTapEnabled={false}
            zoomControlEnabled={false}
            region={{
              latitude: Data.latlong.latitude,
              longitude: Data.latlong.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}>
            <MapView.Marker   
              coordinate={{latitude: Data.latlong.latitude,
                    longitude: Data.latlong.longitude,
              }}    
            />
            </MapView>
          </CardItem> */}
        </Card>
</View>
        </ScrollView>


    </Container>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  text:{
    marginLeft:15,
    fontSize: 14
  },
  text1:{
    margin : 5,
    fontSize: 14
  },
  Image:{
    width: 200, 
    height: 250,

  },
  TextPosition:{
    justifyContent:'center'
  },
  imgPosition:{
    alignItems:'center',
  },
  mapStyle: {
    width: (Dimensions.get('window').width)-50,
    height: 200,
  },
 
});