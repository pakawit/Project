import React,{ useState, useEffect } from 'react';
import { SafeAreaView,Image,StyleSheet, Text, View ,Alert  ,ScrollView} from 'react-native';
import {Container,Content, Title, Header , Subtitle, Item, Button,Icon,Left, Body, Right,Card, CardItem, Thumbnail,} from 'native-base' 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons';
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
  var docRef = firebase.firestore().collection("users").doc("LA").collection("Education")



  useEffect(() => {
    docRef
      .onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
  
            cities.push(doc.data());
          });
          setDataSource(cities)
      });
    }, []);
  
  

    console.log("data"+dataSource.length)


  const ItemView = (item, key) => {
    return (
      <View key={key} style ={{margin:5}}>
        <Card>
          <CardItem >
            <Left>
              <FontAwesome5 name="user-graduate" size={24} color= '#3F51B5' />
              <Text style={{marginLeft:10}}>
                สถานศึกษา {item.School}
              </Text>
            </Left>
          </CardItem>

          <CardItem cardBody>
            <View style={{flex:1,alignItems:'center'}}>
              <Image source={{uri:item.Photo}} style={{ width: 350, height: 200 ,flex:1,alignItems:'center'}}/>
            </View>
          </CardItem>

          <CardItem>
            <Left>
              <View>
                <Text style={styles.itemStyle}>
                  การศึกษา {item.EducationLevel}
                </Text>
              </View>
            </Left>
            <Body>
              
              <Text style={styles.itemStyle}>
                เกรดเฉลี่่ย {item.GPA}
              </Text>
            </Body>

            <Right>
              <Text style={styles.itemStyle}>
                ปีที่จบ {item.Year}
              </Text>
            </Right>
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
            <Subtitle>ประวัติศึกษา</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('Education')}>
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
              <Subtitle>ประวัติศึกษา</Subtitle>
            </Body>
            <Right>
              <Button transparent onPress={() => navigation.navigate('Education')}>
                < AntDesign name="edit" size={24} color="#FFFFFF" />
              </Button>
            </Right>
          </Header>

          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.container}>
                <View  style ={{margin:5}}>
                  <Card>
                    <CardItem >
                      <Left>
                        <FontAwesome5 name="user-graduate" size={24} color= '#3F51B5' />
                        <Text style={{marginLeft:10}}>
                          สถานศึกษา 
                        </Text>
                      </Left>
                    </CardItem>

                    <CardItem cardBody>
                      <View style={{flex:1,alignItems:'center'}}>
                        <Entypo name="image" size={100} color="#3F51B5" />
                      </View>
                    </CardItem>

                    <CardItem>
                      <Left>
                        <View>
                          <Text style={styles.itemStyle}>
                            การศึกษา
                          </Text>
                        </View>
                      </Left>
                      <Body>
                        
                        <Text style={styles.itemStyle}>
                          เกรดเฉลี่่ย 
                        </Text>
                      </Body>

                      <Right>
                        <Text style={styles.itemStyle}>
                          ปีที่จบ 
                        </Text>
                      </Right>
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

    textAlign:'center',
    margin:5,
    fontSize:14,
    height:40
    
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});

