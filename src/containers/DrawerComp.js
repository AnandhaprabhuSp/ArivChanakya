import React, {Component} from 'react';
import {View, DrawerLayoutAndroid, Text,AppRegistry,
     TouchableOpacity,StyleSheet,ScrollView,Image,Dimensions,ImageBackground,Modal,ActivityIndicator
    ,AsyncStorage,NetInfo,ToastAndroid,
    // Share
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideNav from './SideNav';
import {showDrawer,hideDrawer} from '../actions/drawerAction'
import ViewContent from "./ViewContent"
import About from "./About"
import {currentScreen} from '../actions/screenAction'
import {getAppData, getAppDataStatus} from '../actions/index'
import {AdMobBanner} from 'react-native-admob'
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import { getUniqueID } from 'react-native-device-info';  
import Orientation from 'react-native-orientation-locker'
import Share, {ShareSheet, Button} from 'react-native-share';
let tracker = new GoogleAnalyticsTracker("UA-115925715-1232");


class DrawerComp extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.detectOrientation = this.detectOrientation.bind(this);
        this.goHome = this.goHome.bind(this);
        this.resetHome = this.resetHome.bind(this);
        this.updateNow = this.updateNow.bind(this);
        this.remindMe = this.remindMe.bind(this);
        this.dontRemind = this.dontRemind.bind(this); 
        this.updateCallforSideNav = this.updateCallforSideNav.bind(this); 
        this.shareContent = this.shareContent.bind(this)
        this.state ={
            drawerActive:false,
            isPortrait:true,
            updateData: false,
            showPopup:false,
            showsideNavUpdate:false,
            showTutorialScreen : this.props.showTutorialScreen
        }

    }
    openDrawer() {
        // this.setState({drawerActive:true}, () => {
            this.drawer.openDrawer();
            // this.props.showDrawer();
        // })
    }
    closeDrawer() {
        // this.setState({drawerActive:false}, () => {
            this.drawer.closeDrawer();
        // })
    }
    goHome(){
        if(this.props.title !== "About Us"){
            this.props.currentScreen("About Us")
        }
    }
    resetHome(){
        // if(this.props.title != this.props.appView.appData.categories[0].title )
        // {
        // }
        this.props.currentScreen(this.props.appView.appData.categories[0].title)
    }
    detectOrientation(e) {
        // this.setState({
        //     isPortrait : e.nativeEvent.layout.height > e.nativeEvent.layout.width
        // })
      }
      updateCallforSideNav(){
        this.drawer.closeDrawer();
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        tracker.trackEvent("UpdatePopUp - Update", uniqueId);

          console.log("update now called");
            this.setState({
                updateData : true,
                showPopup:true,
            })
            this.props.getAppData();
            AsyncStorage.setItem('@appData_dontRemind',"false");
            AsyncStorage.setItem('@appData_remindMe',"false");
      }
      updateNow(){
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        tracker.trackEvent("UpdatePopUp - Update", uniqueId);

          console.log("update now called");
            this.setState({
                updateData : true
            })
            this.props.getAppData();
            AsyncStorage.setItem('@appData_dontRemind',"false");
            AsyncStorage.setItem('@appData_remindMe',"false");
      }
      remindMe(){
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        tracker.trackEvent("UpdatePopUp - RemindMeLater", uniqueId);
          
        let date = new Date().getDate().toString();
        AsyncStorage.setItem('@appData_remindMe',date);
        AsyncStorage.setItem('@appData_showPopup',"false");
        AsyncStorage.setItem('@appData_dontRemind',"fasle");
        this.setState({
            showPopup : false
        })
      }
      dontRemind(){
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        tracker.trackEvent("UpdatePopUp - Ignore", uniqueId);

        AsyncStorage.setItem('@appData_showPopup',"false");
        AsyncStorage.setItem('@appData_dontRemind',"true");
        AsyncStorage.setItem('@appData_remindMe',"false");
        this.setState({
            showPopup : false,
            showsideNavUpdate:true
        })
      }
      componentDidMount() {
            // this.props.getAppData();
        NetInfo .getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == ("none" || "unknown")) {
              console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
              // this.props.staticDataFetch();
              AsyncStorage.getItem('@appData_dontRemind').then((result)=>{
                  if(result === "true"){
                    this.setState({
                        showsideNavUpdate : true
                    })
                  }
              })
            } else {
                AsyncStorage.multiGet(['@appData_CUD','@appData_remindMe','@appData_dontRemind','@appData_showPopup']).then(function (result, error) { 
                    // debugger;
                    if(result[0][1] === null){
                        this.props.getAppDataStatus();
                    }
                    else{
                        if(result[1][1] !== "false" && Number(result[1][1]) < new Date().getDate() ){
                            // console.log("true")
                            this.setState({
                                showPopup : true,
                                updateData : false
                            })
                        }
                        else if(result[2][1] === "true"){
                            this.setState({
                                showsideNavUpdate : true,
                                updateData : false
                            })
                        } else if(result[3][1] === "true"){
                            this.setState({
                                showPopup : true,
                                updateData : false
                            })
                        }
                    }
                }.bind(this))
            }   
          });
      }
      componentWillReceiveProps(nextProps) {
        console.log("draw wil recive props")
        tracker.trackScreenView("UpdatePopUp");
          
        NetInfo .getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == ("none" || "unknown")) {
                console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
                // this.props.staticDataFetch();
              } else {
        AsyncStorage.multiGet(['@appData_showPopup','@appData_remindMe','@appData_dontRemind','@appData_showUpdatedToast']).then(function (result, error) { 
            // console.log("@appData_showPopup drawer",result)
            if(result[0][1] == "true" && result[1][1] == "false" )    {
                this.setState({
                    showPopup : true
                })
            } else if(result[0][1] == "false"){
                this.setState({
                    showPopup : false,
                },()=>{
                    if(result[3][1] == "true"){
                        ToastAndroid.show('Question bank is updated!', ToastAndroid.SHORT); 
                        AsyncStorage.setItem('@appData_showUpdatedToast',"false");
                    }
                })
            }

            if(result[2][1] === "false"){
                this.setState({
                    showsideNavUpdate : false
                })
            }
        }.bind(this))
    }
        })
      }
      shareContent(app){
        let uniqueId = 'ariv-const'; 
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        let qId = 'ariv-const';
        if(app){
            Share.open({
                title: "Quotes Chanakya",
                message:"*Quotes Chanakya*",
                subject: "Wonderful Quotes App",
                url:''
              }).catch((err) => { err && console.log(err); })
              return;
        }else{

            if(this.props && this.props.shareData && this.props.shareData.qId){
                qId = this.props.shareData.qId;
            }
            tracker.trackEvent("QuestionShare - "+ qId, uniqueId);
    
            //   const REACT_ICON = `data:image/png;base64,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`;
            if(this.props.shareData.base64){
    
                Share.open({
                    title: this.props.shareData.ques,
                    message:`*${this.props.shareData.ques}?* ${'\n'} ${this.props.shareData.ans}`,
                    subject: "Share React Question",
                    // url:"https://testaplimage.blob.core.windows.net/myhomedata/Webvisualiser/kr.abhimeet56@gmail.com/B2C/baseImage1522134174156.jpeg"
                    // url:"https://www.flipkart.com"
                    url:this.props.shareData.base64
                    // url:REACT_ICON
                  }).catch((err) => { err && console.log(err); })
            } else{
                Share.open({
                    title: this.props.shareData.ques,
                    message:`*${this.props.shareData.ques}?* ${'\n'} ${this.props.shareData.ans}`,
                    subject: "Share React Question",
                    url:''
                  }).catch((err) => { err && console.log(err); })
            }
        }

        // Share.share({
        //     message: 'BAM: we\'re helping your business with awesome React Native apps',
        //     url:REACT_ICON,
        //     title: 'Wow, did you see that?'
        //   }, {
        //     // Android only:
        //     dialogTitle: 'Share BAM goodness',
        //   })
      }
    render() {
        console.log(" state fo drawer comp",this.state)
          return (
            <DrawerLayoutAndroid  onLayout={this.detectOrientation} style={{backgroundColor:"#fff",flex:1}} 
             drawerWidth={320} ref={(_drawer) => this.drawer = _drawer} drawerPosition={DrawerLayoutAndroid.positions.Left} 
             renderNavigationView={() => <SideNav category={this.props.appView.appData.categories} 
             isPortrait = {this.state.isPortrait} closeDrawer={this.closeDrawer} 
                   updateNow={this.updateCallforSideNav} showNavUpdate={this.state.showsideNavUpdate}/>}>
                <ImageBackground  style={{width: undefined,flex:this.state.isPortrait ? 0.13:0.23,flexDirection: 'row',
                 backgroundColor:"#fff", justifyContent:"center" }}  source={require('../public/small-icons.png')}> 
                          <TouchableOpacity  style={styles.burgerButton}  onPress={this.openDrawer}>
                       <Image style={styles.burgerImage} source={require('../public/menu.png')} />
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.appNameButton} onPress={this.resetHome}>
                   <Text style={styles.title}>Quotes Chanakya</Text>
                   </TouchableOpacity>
                   {/* <Text style={styles.title}>Crack React JS</Text> */}
                    
                   <TouchableOpacity  style={styles.appButton} onPress={()=>{this.shareContent(1)}}>
                        <Image  style={styles.shareStyle} source={require('../public/coloredIcon.png')} />
                        {/* <Image style={styles.shareStyle} source={{uri:'https://ibmcai.files.wordpress.com/2014/03/plain-white-background.png'}}/> */}
                   </TouchableOpacity> 
                   
                </ImageBackground>
                <ViewContent viewData={this.props.appView.appData.categories} title ={this.props.title}
                 isPortrait={this.state.isPortrait} isShowDetailPage = {this.props.showDetailScreenStatus} />
                <AdMobBanner style={styles.admob} adSize="smartBanner" adUnitID="ca-app-pub-3940256099942544/6300978111"/>
                    {/* {this.props.title === "About Us" ? <About viewData={this.props.appView.aboutUs}/> : 
                    <ViewContent title={this.props.title} viewData={this.props.appView.appData.categories} isPortrait={this.state.isPortrait}/> } */}
                   {/* {this.props.title === "About Us" ?null: <AdMobBanner style={styles.admob} adSize="smartBanner" adUnitID="ca-app-pub-1946179375099926/9652456878"/>} */}
                   <Modal styles={[styles.modal]} animationType="slide" transparent={true} 
                   visible={this.state.showPopup} onRequestClose={() => 
                   {this.remindMe()}} >
                   {/* ToastAndroid.show('Please choose any one of the action to proceed!', ToastAndroid.SHORT); */}
                        <View style={{ flex: 1,flexDirection: 'column', justifyContent: 'center',alignItems: 'center',
                        backgroundColor:'rgba(0, 0, 0, 0.7)'}}>
                        {!this.state.updateData ? 
                            <View style={[styles.modalContentWrapper,styles.border]}>
                            <Text style={{color:"#371620",fontFamily:"quicksand_bold"}}>New question bank available</Text>
                            <Text style={styles.updateInfo}>
                                This is not an app update. We will update question bank only.</Text>
                            <Text>{'\n'}</Text>
                            <TouchableOpacity style={styles.updatePopButton} onPress={this.updateNow}>
                                <Text style={[styles.test,styles.bold]}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.updatePopButton} onPress={this.remindMe}>
                                <Text style={styles.test}>Remind Me Later</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.updatePopButton} onPress={this.dontRemind}>
                                <Text style={styles.ignoreText}>Ignore</Text>
                            </TouchableOpacity>
                        </View> 
                        : 
                        <View style={styles.modalContentWrapper}>
                            <Text style={styles.updateInfo}>
                              Pleae wait we are updating the content
                            </Text>
                            <ActivityIndicator size={50} color="#fff" />
                         </View> 
                        }
                        </View>
                   </Modal>

                         <Modal style={{flex:1}}animationType="slide" visible={this.state.showTutorialScreen} onRequestClose={() => 
                   {
                       this.setState({ showTutorialScreen : false})
                   }} >
                   <TouchableOpacity style={{flex:1}} onPress={()=>{ this.setState({ showTutorialScreen : false})}}>
                   <Image style={styles.tutorialImage} source={require('../public/tutorial.png')}/>
                </TouchableOpacity>
                    </Modal> 

            </DrawerLayoutAndroid>
          );
    }

}

function mapStateToProps(state) {
    return { drawerActive: state.drawer.drawerActive,
             appView: state.appView.mainData,
             title:state.currentCategory.title,
             lastUpdatedTime:state.appView.lastUpdatedTime,
             showDetailScreenStatus : state.currentCategory.showDetailScreen,
             shareData:state.currentCategory.questionData
            };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showDrawer: showDrawer,
        getAppData: getAppData,
        currentScreen:currentScreen,
        getAppDataStatus:getAppDataStatus
    }, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(DrawerComp)
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#81C257',
        // height:50,
        flexDirection: 'row',
    },
    burgerButton:{
        width:"18%",
        justifyContent:"center",
        alignItems: 'center',
    },
    burgerImage: {
        resizeMode: Image.resizeMode.contain
    },
    appButton:{
        width:"18%",
        justifyContent:"center",
        alignItems: 'center',
    },
    appNameButton:{
        width:"64%",
        justifyContent:"center",
    },
    appImage:{
        resizeMode: Image.resizeMode.contain,
        top:"5%",
        width:"50%"
    },
    title: {
        // textAlign: "center",
        color:"#371620",
        fontSize: 28,
        // width:"82%",
        textAlignVertical:"center",
        fontFamily: 'quicksand_bold',
        bottom:"5%"
    },
    admob:{
        // backgroundColor: "red",
    },
    modal:{
        justifyContent: 'center',
        flex:1
    },
    modalContentWrapper:{
        backgroundColor: "white",
        // height:150,
        width:"90%",
        alignItems: 'center',
        padding: 10,
    },
    updateInfo:{
        fontSize: 15,
        fontFamily: 'quicksand_regular',
        textAlign:'center',
        marginBottom: 5,
    },
    updatePopButton:{
        margin: 3,
        width:"100%",
        padding: 10,
        justifyContent: 'center',
        borderColor:"#CCCCD7",
        borderTopWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
    },
    test:{
        fontSize: 15,
        fontFamily: 'quicksand_regular',
        // textAlign:'center'
        color:"#fff"
    },
    ignoreText:{
        fontSize: 15,
        fontFamily: 'quicksand_regular',
        // textAlign:'center'
        color:"red"
    },
    bold:{
        fontWeight: 'bold'
    },
    border:{
        borderRadius: 13,
    },
    tutorialImage:{
        width:undefined,
        height:undefined,
        flex:1,
    },
    shareStyle:{
        width:30,
        height:30
    }
  });

  //ca-app-pub-1946179375099926/9652456878
  //ca-app-pub-3940256099942544/2934735716