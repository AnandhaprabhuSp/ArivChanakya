import React, {Component} from 'react';
import {TouchableOpacity,View,Text,StyleSheet,Image,ScrollView,ImageBackground,
    NetInfo,ToastAndroid} from 'react-native'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {hideDrawer} from '../actions/drawerAction'
import {AdMobBanner} from 'react-native-admob'
import {currentScreen} from '../actions/screenAction'
import FastImage from 'react-native-fast-image'
import {getAppData, getAppDataStatus} from '../actions/index'
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import { getUniqueID } from 'react-native-device-info';  
import Share, {ShareSheet, Button} from 'react-native-share';
let tracker = new GoogleAnalyticsTracker("UA-115925715-1232");

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.updateCall = this.updateCall.bind(this)
        this.state = {
            categories: ["Home","Basic","Advacned","React Redux","React Redux and React Router"], //hardd coded
            selectedCategory:"",
        }
    }
    closeDrawer(data) {
        debugger
        this.props.closeDrawer();
        this.props.currentScreen(data.title ? data.title:'')
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        let cId = 'ariv-const';
        if(data && data.id){
            cId = data.id;
        }
        tracker.trackScreenView("HamburgerClick");
        tracker.trackEvent("Menu - "+ cId + ' - ' + data.title, uniqueId);
    }
    shareApp(data){
        this.props.closeDrawer();
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        tracker.trackScreenView("HamburgerClick");
        tracker.trackEvent("Menu - "+data.title, uniqueId);
        Share.open({
            title: 'React JS',
            message:`*Quotes Chanakya* ${'\n'}`,
            subject: "Share Quotes Chanakya",
            // url:"https://testaplimage.blob.core.windows.net/myhomedata/Webvisualiser/kr.abhimeet56@gmail.com/B2C/baseImage1522134174156.jpeg"
            // url:"https://www.flipkart.com"
            url:data.shareUrl
            // url:REACT_ICON
          }).catch((err) => { err && console.log(err); })
    }
    updateCall(){
        NetInfo .getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == ("none" || "unknown")) {
              console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
              // this.props.staticDataFetch();
              ToastAndroid.show('Please connect to internet to update the Question', ToastAndroid.SHORT); 
            } else {
                ToastAndroid.show('Please wait while we are updating the Question Bank', ToastAndroid.SHORT); 
                this.props.updateNow();
            }
          });
    }
    render() {
        console.log("state of side nav",this.props.isPortrait)
        return (
            <View style={styles.sideNavConatiner} >
                <View style={{height:"30%"}}>
             <ImageBackground style={styles.sideNavSubConatiner}  source={require('../public/bg_smallicons.png')}> 
                       <Image style={this.props.isPortrait ? styles.appImagePortrait: styles.appImageLandscape } 
                       source={require('../public/crack_reactjs.png')} />
                   <Text style={styles.appTitle}>Quotes Chanakya</Text>
                </ImageBackground>
                </View>
             {/* <TouchableOpacity style={styles.sideNavSubConatiner} activeOpacity={1}> */}
                {/* <View style={styles.sideNavSubConatinerView}>
                    <Image style={this.props.isPortrait ? styles.appImagePortrait: styles.appImageLandscape }  
                       source={require('../public/try3.jpg')} />
                </View> */}
                {/* </TouchableOpacity> */}
                <ScrollView contentContainerStyle={styles.contentContainer}>
                {this.props.category.map((data,i)=>{
                    if(data.menuType){
                        return(
                            <TouchableOpacity activeOpacity={0.5} style={styles.categoriesList} key={i} onPress={()=>{this.shareApp(data)}}>
                                <View style={styles.categoriesListView}>
                                    {/* <Image style={styles.categoryImage}  source={require('../public/Circle_Blue.png')} /> */}
                                    <View style={{flex:1,justifyContent:"center",alignItems:"center",width:"7%",height:33,left:"10%"}}>
                                    <Image style={StyleSheet.absoluteFill}  source={require('../public/placeholder.png')} />
                                    <FastImage style={StyleSheet.absoluteFill} 
                                    source={{uri:data.imgUrl,priority: FastImage.priority.high}} defaultSource={require('../public/about_us.png')}  />
                                    </View>
                                    {/* <Image style={styles.categoryImage} source={{uri:data.image}} /> */}
                            {/* <Image style={styles.categoryImage} source={{uri:"https://cdn0.iconfinder.com/data/icons/flat-round-system/512/reactos-128.png"}}/> */}
                                    <Text style={styles.titleText}>{data.title}</Text>
                                </View>
                            </TouchableOpacity>
                        );

                    } else{

                        return(
                            <TouchableOpacity activeOpacity={0.5} style={styles.categoriesList} key={i} onPress={()=>{this.closeDrawer({title:data.title,id:data.id})}}>
                                <View style={styles.categoriesListView}>
                                    {/* <Image style={styles.categoryImage}  source={require('../public/Circle_Blue.png')} /> */}
                                    <View style={{flex:1,justifyContent:"center",alignItems:"center",width:"7%",height:33,left:"10%"}}>
                                    <Image style={StyleSheet.absoluteFill}  source={require('../public/placeholder.png')} />
                                    <FastImage style={StyleSheet.absoluteFill} 
                                    source={{uri:data.image,priority: FastImage.priority.high}} defaultSource={require('../public/about_us.png')}  />
                                    </View>
                                    {/* <Image style={styles.categoryImage} source={{uri:data.image}} /> */}
                            {/* <Image style={styles.categoryImage} source={{uri:"https://cdn0.iconfinder.com/data/icons/flat-round-system/512/reactos-128.png"}}/> */}
                                    <Text style={styles.titleText}>{data.title}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                })}
                {this.props.showNavUpdate ? 
                <TouchableOpacity activeOpacity={0.5} style={styles.categoriesList} onPress={this.updateCall}>
                            <View style={styles.categoriesListView}>
                                <Image style={styles.categoryImage}  source={require('../public/about_us.png')} />
                                <Text style={styles.titleText}>Update Question Bank</Text>
                            </View>
                </TouchableOpacity>
                   : null }
                </ScrollView>
                                {/* <Image style={styles.categoryImage} source={{uri:"https://png.icons8.com/nolan/1600/synchronize.png"}}/> */}
                {/* <AdMobBanner style={styles.bottmAdBAnner} adSize="banner" adUnitID="ca-app-pub-1946179375099926/1544411301"/> */}
            </View>
        );
    }

}


function mapStateToProps(state) {
    return { 
             title:state.currentCategory.title
            };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        currentScreen:currentScreen,
        // hideDrawer: hideDrawer,
    }, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(SideNav)
const styles = StyleSheet.create({

    sideNavConatiner: {
        flex:1
    },
    sideNavSubConatiner:{
        width: undefined,
        flex:1,
        backgroundColor:"#000",
        justifyContent:"center",
        alignItems: 'center',
    },
    sideNavSubConatinerView:{
        justifyContent:"center",
        alignItems: 'center',
        backgroundColor: '#81C257',
        // height:"35%"
        borderBottomWidth:2,
        borderColor: "#CCCCD7",
    },
    categoriesList :{
        // alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'center',
    },
    categoriesListView :{
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth:0.5,
        borderColor: "#CCCCD7",
        left:"15%",
        minHeight:40,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
        // textAlign: 'center',
        textAlignVertical:"center",
        // padding:5,
        flexWrap: 'wrap',
        // margin:1,
        width:"90%",
        color:"#371620",
        left:"25%",
        // bottom:"1%",
        fontFamily: 'quicksand_medium',
    },
    appImagePortrait:{
        // width:"29%",
        // height:"45%"

        // width:"42%",
        // height:"55%"
    },
    appImageLandscape:{
        width:"16%",
        height:"45%",
        marginTop: '5%',
    },
    categoryImage:{
        width:"9%",
        height:30,
        left:"10%",
        // flex:0.7,
        // resizeMode: Image.resizeMode.contain
    },
    appTitle:{
        color:"white",
        fontSize:26,
        width:"70%",
        textAlign:"center",
        // top:"5%",
        fontFamily: 'quicksand_bold',
    }
})