import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig.js';
import 'firebase/firestore';
require("firebase/firestore");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}  

export default function ocation(props) {
  const { navigation } = props
  const [Oc, setOc] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitudelongitude, setlatitudelongitude] = useState({latitude : 11.423933,longitude : 101.214496});
  const [Savelatitudelongitude, setSavelatitudelongitudeS] = useState(null);

  const [Motorcycle, setMotorcycle] = useState(false);
  const [Electrician, setElectrician] = useState(false);
  const [Electricity, setElectricity] = useState(false);


  var Refdb = firebase.firestore().collection("users").doc("LA")
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
       let location = await Location.getCurrentPositionAsync({});
      setlatitudelongitude({latitude: location.coords.latitude,longitude: location.coords.longitude});
    })();

    Refdb.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setMotorcycle(doc.data().Occupations.Motorcycle);
        setElectrician(doc.data().Occupations.Electrician);
        setElectricity(doc.data().Occupations.Electricity);
        setOc(1);

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    })

  }, []);


  const SavaLocation = (loca) => {
    console.log(loca);
    setSavelatitudelongitudeS(loca)
    SaveData(loca)
    navigation.navigate('History')
  }

  const SaveData = (location)=>{
    if(Oc == 1){
      Refdb.set({
        latlong: location,
        Occupations : {
          Motorcycle : Motorcycle,
          Electrician: Electrician,
          Electricity: Electricity,
        }
      }, { merge: true })
    }else{
      Refdb.set({
        latlong: location,
        Occupations : {
          Motorcycle : false,
          Electrician: false,
          Electricity: false,
        }
      }, { merge: true })
    }

  }

  return (
   
    <MapView style={{flex: 1 ,alignItems:'center'}}
      showsMyLocationButton={true}
      region={{
        latitude: latitudelongitude.latitude,
        longitude: latitudelongitude.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
    <MapView.Marker draggable    
      coordinate={{latitude: latitudelongitude.latitude,
                   longitude: latitudelongitude.longitude,
                  }}    
      onPress={e => SavaLocation(e.nativeEvent.coordinate)}
      
    />
    </MapView>
  );
}