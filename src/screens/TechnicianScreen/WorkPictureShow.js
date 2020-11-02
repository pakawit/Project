import React,{ useState, useEffect } from 'react';
import { SafeAreaView,Image,StyleSheet, Text, View ,Alert  ,ScrollView} from 'react-native';
import {Container,Left, Body,Right,Content,Card,CardItem, Title, Header , Subtitle, Item, Button,Icon,Textarea} from 'native-base' 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import 'firebase/firestore';
import { ViewPropTypes } from 'react-native';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  



export default function History (props) {

  const { navigation } = props

  const [Show,setShow] = useState(0)

  const [dataSource, setDataSource] = useState([]);
  var cities = [];
  var docRef = firebase.firestore().collection("users").doc("LA").collection("WorkingPicture");
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
    <View key={key} style ={{margin:5}}>

      <Card>
        <CardItem>
          <Image source={{uri:item.Photo}} style={{ width: 350, height: 200 }}/>
        </CardItem>

        <CardItem>
          <Text style={styles.itemStyle}>
            {item.PhotoExplain}
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
          <Title>รูปภาพการทำงาน</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('WorkPicture')}>
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
    <Title>รูปภาพการทำงาน</Title>
  </Body>
  <Right>
    <Button transparent onPress={() => navigation.navigate('WorkPicture')}>
      < AntDesign name="edit" size={24} color="#FFFFFF" />
    </Button>
  </Right>
</Header>

<SafeAreaView style={{ flex: 1 }}>
  <ScrollView>
    <View style={styles.container}>
      
        <View style ={{margin:5}}>

          <Card>
            <CardItem>
              <View style={{flex:1,alignItems:'center'}}>
                <Entypo name="image" size={100} color="#3F51B5" />
              </View>
            </CardItem>
    
            <CardItem>
              <Text style={styles.itemStyle}>
                คำอธิบาย
              </Text>
            </CardItem>
          </Card>
  
  
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
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});

