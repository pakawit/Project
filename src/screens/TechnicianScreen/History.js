import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Alert } from 'react-native';
import {Container,Left, Body,Right,Content, Title, Header , Subtitle,Input, Item, Button,Icon,Textarea} from 'native-base' 
import {  Image,Modal, TouchableHighlight,ScrollView} from 'react-native';
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

  //const uid = firebase.firestore().collection("users").doc().id
  const [Name, setName] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");
  const [Addressstore, setAddressstore] = useState("");



  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [URLPhoto,setURLPhoto] = useState(null); 



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


  const pickImageCamara = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickImageFoder = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3,4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const urlPhoto = async (url) =>{

    setURLPhoto(url)
    console.log(URLPhoto)
    SaveData(Name,Contact,Address,url)

  };

  const uploadImage = async () => {

    var metadata = {
      contentType: 'image_profile',
    };
    const response = await fetch(image);
    const blob = await response.blob();
    let name = new Date().getTime() + ".jpg"
    var ref = firebase.storage().ref().child("profile/" + name);
    await ref.put(blob, metadata)
    await ref.getDownloadURL().then((Url) => 
    urlPhoto(Url)
    )
    .then(() => {
      navigation.navigate('HistoryShow')
      // Alert.alert("Success");
    })
    .catch((error) => {
      Alert.alert(error);
    });
  }


  const Camara = async () =>{
    setModalVisible(!modalVisible);
    pickImageCamara();
    
  }

  const Folder = async () =>{
    setModalVisible(!modalVisible);
    pickImageFoder();
    
  }



  const SaveData = (name,contact,address,UrlPhoto)=>{
    db.collection("users").doc("LA").set({
      Name: name,
      Contact: contact,
      Address: address,
      Addressstore: Addressstore,
      Photo: UrlPhoto,
  }, { merge: true })
  }

  return (

    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name='menu'  />
          </Button>
        </Left>
        <Body>
          <Title>ประวัติ</Title>
          <Subtitle>ประวัติส่วนตัว</Subtitle>
        </Body>
        <Right>
          <Button transparent>
            < AntDesign name="edit" size={24} color="#FFFFFF" />
          </Button>
        </Right>
      </Header>
    <ScrollView>
      <View style={{alignItems: 'center'}}>

      { <Image source={{ uri: image }} style={{ width: 200, height: 250 ,margin: 15}} />}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>เลือกรูป</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  Camara();
                }}>
                <Text style={styles.textStyle}>กล้อง</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  Folder();
                }}>
                <Text style={styles.textStyle}>แฟ้มภาพ</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.textStyle}>เลือกรูป</Text>
        </TouchableHighlight>

      </View>
        <View style = {styles.boxinput}>
          {/* ชื่อ */}
          <Item regular>
              <Input placeholder='ชื่อ - สกุล' 
              onChangeText={(e)=>setName(e)}/>
          </Item>

          <Textarea rowSpan={4} bordered placeholder="ช่องทางการติดต่อ" 
          onChangeText={(f)=>setContact(f)}/>

          <Textarea rowSpan={4} bordered placeholder="ที่อยู่" 
          onChangeText={(g)=>setAddress(g)}/>

          <Textarea rowSpan={4} bordered placeholder="ที่อยู่ร้าน" 
          onChangeText={(g)=>setAddressstore(g)}/>

          <View style={{alignSelf:'center'}}>
            <Button rounded style = {{flex:1,width : 120,marginTop: 10 }}
              onPress ={()=> navigation.navigate('Location')}>
                <Text style = {{color: '#FFFFFF',textAlign:'center'}}> GPS </Text>
            </Button>
          </View>    
  
          <Button  full rounded    style ={{marginTop: 10, margin:20}}
            onPress ={uploadImage}>
            <Text style = {{color: '#FFFFFF',textAlign:'center'}}> บันทึก </Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
      
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#FE9D09',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom:10,
    width: 100
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleT: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16
  },
  boxinput:{
    marginRight: 20,
    marginTop:15,
    marginLeft:20,
  }
});
