import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showDetailScreen} from '../actions/screenAction'

var {width, height} = Dimensions.get('window')
class CardView extends Component {
  constructor(props) {
    super(props);
    this.showDetailPage = this.showDetailPage.bind(this);
  }
  showDetailPage(quesId) {
    this.props.showDetailScreen();
    this.props.callShowDetail(quesId);
  }
  render() {
    debugger  
    // let imgContent = this.props.qaData.img ?  <Image  key={1} style={styles.programImage} source={{uri:this.props.qaData.img}}/> :<Image />;
    // console.log(this.props);
    return (
      <View style={styles.cardViewConatiner}>

        <TouchableOpacity>
              <Text style={styles.cardViewHeader}>
                <Text style={{color: "#000"}}>{"#" + this.props.no + "  "}</Text>
                {this.props.qaData.ques}
              </Text>
              {/* <View style={styles.hr}></View> */}
              <View style={styles.cardViewDataContainer}>
              <Text style={styles.cardViewData}>
              <Text style={{color:"#000"}}>
                {/* Code Re-usability – A component-based approach makes your application development easier and faster. If you want to use a pre-existing functionality in your code, you can just put that code in yours instead of building it from scratch. It also allows your application architecture to stay up to date over time as you can update the specific areas which need up-gradations. */}
                {this.props.qaData.ans}
              </Text></Text>
              </View>
              <View style={styles.imgContainer}>
                {/* <Image style={styles.moreImage} source = {{uri:'https://png.icons8.com/windows/50/000000/paper-plane.png'}}/> */}
                <Image style={styles.moreImage} source = {{uri:'https://png.icons8.com/material/50/000000/download.png'}}/>
              </View>
              {/* <View style={styles.hr}></View> */}
              {/* {imgContent} */}
              {/* <Image style={styles.moreImage}source={{uri: 'https://cdn2.iconfinder.com/data/icons/symbol-color-common-2/32/more-128.png'}}/> */}
              {/* <Image style={styles.moreImage} source = {{uri:'https://png.icons8.com/ios/100/000000/more-filled.png'}}/> */}
            </TouchableOpacity>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    //  storeTitle : state.currentCategory.title
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    showDetailScreen: showDetailScreen
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(CardView)

const colorArr = ["#5ac2ea","#ff9e25","#2b65f8","#13d99e","#ffce2b","#833ff1","#fb9399"];

const styles = StyleSheet.create({
  cardViewConatiner: {
    width: "95%",
    backgroundColor: '#fff',//colorArr[Math.floor((Math.random()*10)%7)],
    // alignItems: 'center',
    margin: 10,
    flex: 1,
    borderRadius: 10, borderWidth: 1, borderColor: '#fff', borderBottomWidth: 0,
    elevation: 10,
    // justifyContent: 'center', 
    // alignItems: 'center', 
    // lineHeight:275
    height:275,
    position:"relative"
  },
  imgContainer:{
    display: "flex",
    justifyContent: 'space-between'
  },
  cardViewHeader: {
    height:20,
    fontSize: 18,
    color: "#3C4043",
    // height:30,
    minHeight: 25,
    paddingLeft: "2%",
    backgroundColor: "#f6f7fb", 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: "#fff",
    textAlignVertical: "top",
    fontFamily: 'quicksand_bold',
    // position:"absolute",
    // top:0
  },
  cardViewDataContainer:{
    height:225,
    // backgroundColor:"#777",
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cardViewData: {
    padding: 10,
    paddingLeft: 10,
    // color: colorArr[Math.floor((Math.random()*10)%7)],
    // backgroundColor: "#f8f8f8",
    // backgroundColor: "grey",
    // height:275,
    fontSize: 16,
    lineHeight: 25,
    // fontFamily: 'quicksand_bold',
    fontFamily: 'quicksand_bold',
    // justifyContent: 'center', 
    textAlign: 'center' 
  },
  hr: {
    // borderBottomColor: "#CCCCD7", borderBottomWidth: 0.5, width:"95%", padding:5,
    // paddingLeft: 10,
  },
  moreImage: {
    height: 20,
    width: "10%",
    alignSelf: 'flex-end',
    margin: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    resizeMode:"contain",
  },
  moreImage1: {
    height: 20,
    width: "10%",
    alignSelf: 'flex-start',
    margin: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    resizeMode:"contain",
  },
  programImage: {
    resizeMode: "contain",
    // width: "100%",
    // height: 400
    // width:undefined,
    // height:undefined
    flex:1,
    width: 320,
    height:320,
    alignSelf: 'center',
    margin: 5,
}
})