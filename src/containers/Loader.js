import React, {Component} from 'react';
import {View,StyleSheet, Image,Text,ImageBackground} from 'react-native';
import Orientation from 'react-native-orientation-locker'
class Loader extends Component {
  componentWillMount() {
    // Orientation.lockToPortrait();
}
componentWillUnmount () {
    // Orientation.unlockAllOrientations();
}
  render() {
    return (
      <View style={styles.container}>
        {/* <Image style={styles.splashImage} source={require('../public/splash_img.png')}/> */}
            <ImageBackground style={styles.imageBackground_container}  source={require('../public/bg_smallicons.png')}> 
                <Image style={styles.arivohmLogo} source={require('../public/Arivohm.png')}/>
                <View style={styles.subConatiner}>
                    <Image style={styles.appLogo} source={require('../public/crack_reactjs.png')}/>
                    <Text style={styles.appName}>Quotes Chanakya</Text>
                    <Text style={styles.description}>
                      A perfect app to get you trained for React JS interview
                    </Text>
                </View>
            </ImageBackground>
      </View>
    )
  }
}
export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground_container : {
    width: undefined,
    flex:1,
    backgroundColor:"#fff",
},
arivohmLogo:{
  left:"6%",
  top:"3%",
},
subConatiner:{
  top:"15%",
  justifyContent:"center",
    alignItems: 'center',
},
appName:{
    fontSize: 35,
    color:"white",
    marginTop:5 ,
    fontFamily: 'quicksand_bold',
    // fontFamily: 'Quicksans',
},
description:{
  marginTop:15,
  color:"white",
  fontSize: 18,
  // width:"70%",
  paddingRight:"10%",
  paddingLeft:"10%",
  textAlign:"center",
  color:"#e9e9e9",
  fontFamily: 'quicksand_regular',
}
});