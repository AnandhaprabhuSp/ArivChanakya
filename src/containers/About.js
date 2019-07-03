import React, {Component} from "react";
import {Text, View,StyleSheet,Image} from 'react-native';
class About extends Component {
    render() {
        return (
            <View style={styles.container}>
             <Image style={styles.arivohmLogo} source={require('../public/Arivohm.png')}/>
             <View style={styles.subConatiner}>
                <Image style={styles.mainImage} source={require('../public/object.png')}/>
                <Text style={styles.appName}>Quotes Chanakya</Text>
                <Text style={styles.text}> {this.props.viewData}</Text>
             </View>
            </View>
        );
    }
}

export default About;


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    homeText :{
        fontSize:16,
        // textAlign:"center",
        padding:10
    },
    arivohmLogo:{
        left:"6%",
        top:"3%",
      },
      subConatiner:{
        // top:"10%",
        marginTop: '5%',
        justifyContent:"center",
          alignItems: 'center',
      },
      appName : {
        fontSize: 30,
        // marginTop: 25,
        textAlign: "center",
        color:"#371620",
        fontFamily: 'quicksand_bold',
    },
    text: {
        textAlign: "center",
        color:"#371620",
        fontSize: 16,
        width:"90%",
        fontFamily: 'quicksand_regular',
    },
    mainImage:{
        height:100,
        width:100
    }
  });