import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  NetInfo,
  Image,
  BackHandler,
  StatusBar,
  PixelRatio,
  BackAndroid
} from 'react-native';
import {AdMobInterstitial} from 'react-native-admob'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// import {staticDataFetch, getAppDataStatus} from '../actions/index'
import { showDetailScreen,hideDetailScreen,toggleZoomPageActive } from '../actions/screenAction';
import MainComponent from '../containers/MainComponent';
import Loader from '../containers/Loader';
import AboutPage from './AboutPage';
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import { getUniqueID } from 'react-native-device-info';  
import Orientation from 'react-native-orientation-locker'
let tracker = new GoogleAnalyticsTracker("UA-115925715-1232");

class LandingComponent extends Component {
  constructor(props) {
    super(props);
    this.goApp = this
      .goApp
      .bind(this)
    this.state = {
      showAboutUsStatus: false,
      isShowAbout: false,
      showLoader: true,
      showFullAdd: false,
      dpi:PixelRatio.get(),
      showTutorialScreen:false
    }
  }
  componentWillMount() {
    Orientation.lockToPortrait();
    let uniqueId = 'ariv-const'; 
      if(typeof getUniqueID == 'function'){
          uniqueId = getUniqueID();
      }
    tracker.trackScreenView("LandingPage");
    tracker.trackEvent("LandingPage", uniqueId);
    console.log("landing component",)
    this.showFullPageAdd();
    setTimeout(() => {this.setState({showLoader: false})}, 1000)

    // let num = 3;
    // AsyncStorage.setItem('@test_2',num.toString())
    // AsyncStorage.setItem('@test_1',num.toString())
    // AsyncStorage.setItem('@test_3',num.toString())
    // AsyncStorage.multiGet(['ww','@test_1','@test_2','@test_3']).then(function (result, error) { 
    //   debugger;
    //     console.log("test data",result)
    // })
  }
  componentDidMount() {
    
    this.checkFirstLaunch();
    BackHandler.addEventListener('hardwareBackPress', function () {
      console.log("back pressed")
      if (!this.state.showFullAdd) {
        this.setState({showFullAdd: true})
        AdMobInterstitial.isReady((data) => {
          if (data) {
            AdMobInterstitial.showAd();
          } 
          else{
            BackHandler.exitApp()
          }
        })
        return true;
      }
      else{
        return false;
      }
    }.bind(this))
  }
  async checkFirstLaunch() {
    console.log("checking async function");
    try {
      const value = await AsyncStorage.getItem('@IsFirstLaunch');
      if (value !== null) {
        this.setState({showAboutUsStatus: true, isShowAbout: false})
      } else {
        this.setState({showAboutUsStatus: true, isShowAbout: true})
        // try {
        //   await AsyncStorage.setItem('@IsFirstLaunch', "firstLaunchDone");
        // } catch (error) {
        //   console.log(error);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  }
  goApp() {
    AsyncStorage.setItem('@IsFirstLaunch', "firstLaunchDone");
    AsyncStorage.setItem('@appData_showPopup',"false");
    AsyncStorage.setItem('@appData_dontRemind',"false");
    AsyncStorage.setItem('@appData_remindMe',"false");
    this.setState({isShowAbout: false,showTutorialScreen: true})
  }
  showFullPageAdd() {
    // console.log("landing component showFullPageAdd Method called state", this.state.showFullAdd)
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // test id
    AdMobInterstitial.requestAd();
    AdMobInterstitial.addEventListener('adLoaded', () => {
      console.log('landing component AdMobInterstitial adLoaded')
    });
    // AdMobInterstitial.addEventListener('adFailedToLoad', (error) => {
    //   // console.log('landing component AdMobInterstitial => adFailedToLoad')
    // });
    // AdMobInterstitial.addEventListener('adOpened', () => console.log('landing component AdMobInterstitial => adOpened'));
    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('landing component AdMobInterstitial => adClosed');
      BackAndroid.exitApp()
      // AdMobInterstitial.requestAd().catch(error => console.warn(error));
    });
  }
  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }
  renderView() {
    return this.state.showAboutUsStatus && this.state.isShowAbout
      ? <AboutPage launchApp={this.goApp} dpi={this.state.dpi}/>
      : <MainComponent showTutorialScreen={this.state.showTutorialScreen} />
  }
  
render() {
    console.log("render method of Landing page with showabout state",this.state)
    // AsyncStorage.removeItem("@appData_CUD");
    // AsyncStorage.setItem('@appData_dontRemind',"false");
    return (
      <View style={styles.container}>
        { !this.state.showLoader && this.state.showAboutUsStatus
          ?  this.renderView()
          : <Loader/>
        }
        {/* <Loader/> */}
      </View>
    )
  }

}

// function mapStateToProps(state) {
//   return {appView: state.appView.mainData};
// }

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({
//     staticDataFetch: staticDataFetch,
//     getAppDataStatus: getAppDataStatus
//   }, dispatch);
// }

// export default connect(mapStateToProps, matchDispatchToProps)(LandingComponent);

export default LandingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


//allowFontScaling