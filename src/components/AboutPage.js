import React, {Component} from 'react';
import {Text, View, StyleSheet, Button,ImageBackground,Image,TouchableOpacity,
ActivityIndicator,NetInfo,ScrollView} from 'react-native';
import Orientation from 'react-native-orientation-locker'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import { getUniqueID } from 'react-native-device-info';  

import {getAppData} from '../actions/index'
let url ={
    "1":"",
    
}

let tracker = new GoogleAnalyticsTracker("UA-115925715-1232");

class AboutPage extends Component {
    constructor (props) {
        super(props)
        this.goApp = this.goApp.bind(this); 
        this.renderContentBasedOnNet = this.renderContentBasedOnNet.bind(this);
        // this.handleFirstConnectivityChange = this.this.handleFirstConnectivityChange.bind(this)
        this.state ={
            internetConnected : true
        }
    }
    componentWillMount() {
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        tracker.trackScreenView("AboutUs");
        tracker.trackEvent("AboutUs", uniqueId);
        Orientation.lockToPortrait();
        NetInfo .getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == ("none" || "unknown")) {
              console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
              this.setState({
                internetConnected : false
            })
              NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange); 
              // this.props.staticDataFetch();
            } else {
              if(!this.props.appView.aboutUs){
                  this.props.getAppData();
              }
            }
          });
    }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({
                internetConnected : true
            })
            this.props.getAppData();
        } else {
            this.setState({
                internetConnected : false
            })
        }
      };
    componentDidMount() {
        // Orientation.lockToPortrait();
        // Orientation.addOrientationListener(this._onOrientationDidChange);
    }
    componentWillUnmount () {
        // Orientation.unlockAllOrientations();
    }
    _onOrientationDidChange(orientation) {
        if (orientation == 'LANDSCAPE-LEFT') {
          //do something with landscape left layout
        } else {
          //do something with portrait layout
          console.log(orientation);
        }
      }
    goApp(){
        this.props.launchApp();
    }
    renderContentBasedOnNet(){
        return (
        this.state.internetConnected ? <View style={styles.subConatinerForLoader}>
        <Image source={require('../public/object.png')}/>
        <Text style={styles.appName}>Quotes Chanakya</Text>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>Fetching Quotes...</Text>
         </View> : 
         <View style={styles.subConatinerForLoader}>
         <Image source={require('../public/object.png')}/>
         <Text style={styles.appName}>Quotes Chanakya</Text>
         <Text style={styles.text}>Please connect to internet atleast once to start with the app</Text>
          </View>
        )
    }
    render() {
        return (
        <View style={styles.container}>
            <ImageBackground style={styles.imageBackground_container}  source={require('../public/bg_smallicons.png')}> 
                <ScrollView style={styles.ScrollView}>
                <View>
                <Image style={styles.arivohmLogo} source={require('../public/Arivohm.png')}/>
                {this.props.appView.aboutUs ? 
                <View style={styles.subConatiner}>
                    <Image style={styles.ObjectImage} source={require('../public/object.png')}/>
                    <Text style={styles.appName}>Quotes Chanakya</Text>
                    <Text style={styles.text}> {this.props.appView.aboutUs}</Text>
                    <TouchableOpacity style={styles.button}  onPress={this.goApp}>
                        <Text style={styles.startTxt}>GET START</Text>
                    </TouchableOpacity>
                </View> 
                : this.renderContentBasedOnNet() }
                </View>
                </ScrollView>
            </ImageBackground>
        </View> 
        );
    }
}

function mapStateToProps(state) {
    return {appView: state.appView.mainData};
  }
  
  function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAppData: getAppData,
    }, dispatch);
  }

export default connect(mapStateToProps, matchDispatchToProps)(AboutPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageBackground_container : {
        width: undefined,
        flex:1,
        backgroundColor:"#fff",
    },
    ScrollView:{
        flex:1,
        flexDirection: 'column',
    },
    arivohmLogo:{
        left:"6%",
        top:"2%",
      },
      ObjectImage:{
        marginTop: "10%",
      },
      subConatiner:{
        alignItems: 'center',
      },
      subConatinerForLoader:{
        marginTop: "10%",
        alignItems: 'center',
      },
    text: {
        textAlign: "center",
        color:"#371620",
        fontSize: 16,
        width:"92%",
        fontFamily: 'quicksand_regular',
    },
    appName : {
        fontSize: 30,
        // marginTop: 35,
        textAlign: "center",
        color:"#371620",
        fontFamily: 'quicksand_bold',
    },
    button:{
        alignItems: 'center',
        width:"70%",
        height:50,
        marginTop: '5%',
        borderColor: "#371620",
        borderRadius: 50,
        borderWidth: 3,
        marginBottom: '5%',
    },
    startTxt :{
        color:"#371620",
        fontSize: 25,
        fontFamily: 'quicksand_bold',
    }
});