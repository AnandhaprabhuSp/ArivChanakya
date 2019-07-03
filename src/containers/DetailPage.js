import React, {Component} from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Image,BackHandler, Dimensions} from 'react-native'
import ImageView from 'react-native-image-view';
// import SyntaxHighlighter from 'react-native-syntax-highlighter';
/*by default component uses hljs so access hljs styles, import from /prism for prism styles */
import { agate } from 'react-syntax-highlighter/styles/hljs';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/styles/prism'; 

import HTML from 'react-native-render-html';


import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import { getUniqueID } from 'react-native-device-info'; 
let tracker = new GoogleAnalyticsTracker("UA-115925715-1232");

const images = [
    {
        source: {
            uri:"https://res.cloudinary.com/anandhsp/image/upload/v1522243940/ArivohmReact/medium/captureSample320x480.jpg",
        },
        width:200,
        height:250
    },{
        source: {
            uri:"https://res.cloudinary.com/anandhsp/image/upload/v1522243940/ArivohmReact/medium/captureSample320x480.jpg",
        },
        width:200,
        height:250
    }
    // ,{
    //     source: {
    //         uri:"https://res.cloudinary.com/anandhsp/image/upload/v1522243940/ArivohmReact/medium/captureSample320x480.jpg",
    //     },
    //     width: 500,
    //     height: 200,
    // },{
    //     source: {
    //         uri:"https://res.cloudinary.com/anandhsp/image/upload/v1522243940/ArivohmReact/medium/captureSample320x480.jpg",
    //     },
    //     width: 500,
    //     height: 200,
    // },{
    //     source: {
    //         uri:"https://res.cloudinary.com/anandhsp/image/upload/v1522243940/ArivohmReact/medium/captureSample320x480.jpg",
    //     },
    //     width: 500,
    //     height: 200,
    // },
]
class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showFullPageImage: false,
            index:0,
            imageArr:[]
         };
    }
    componentWillMount() {
        debugger
        if(typeof getUniqueID == 'function'){
            uniqueId = getUniqueID();
        }
        let qId = 'ariv-const';
        if(this.props && this.props.qaData && this.props.qaData.qID){
            qId = this.props.qaData.qId;
        }
        tracker.trackScreenView("Detailspage");
        tracker.trackEvent("DetailsPage - "+ qId, uniqueId,{"qId":qId,"ques":this.props.qaData.ques});

        // BackHandler.addEventListener('hardwareBackPress', function () { 
        //     if(this.state.showFullPageImage){
        //         this.setState({ showFullPageImage : false});
        //         return true;
        //     }
        //     else{
        //         return false;
        //     }

        // }.bind(this));
    //     let arr = [];
    //     if( this.props.qaData.imgUrls){
    //     this.props.qaData.imgUrls.map((data)=>{
    //             let Obj = {
    //                 source: {
    //                     uri:data.imgUrl
    //                 },
    //                 width:320,
    //                 height:480
    //             }
    //             arr.push(Obj);
    //     })
    // }
    //     console.log("arr",arr)
    //     this.setState({
    //         imageArr:arr
    //     })
    }
    render() {
        console.log("images",images)
        console.log("state",this.state.imageArr)
        console.log('This',this.props);
        const stylesHtml = StyleSheet.create({
            container: {
            borderRadius: 3,
            backgroundColor: '#000',
            padding:10,
            margin:10,
            },
        });
        let imgContent = this.props.qaData.img ? <Image  key={this.props.qaData.qId} style={styles.programImage} source={{uri:this.props.qaData.img}}/> : <Image />;
        let descContent = this.props.qaData.desc ? <Text style={styles.cardViewData}>{this.props.qaData.desc}</Text> : <Text></Text>;
        const tagsStyles = { pre:{ color: '#ffda87',fontFamily: 'quicksand_regular',lineHeight: 25 }}
        return (
            <View style={styles.cardViewConatiner}>
                <ScrollView style={styles.scrollWrapper}>
                <Text style={styles.cardViewHeader}>
                    {this.props.qaData.ques}
                </Text>
                {/* {<SyntaxHighlighter
                    //   style= base16AteliersulphurpoolLight
                    //   customStyle={'padding': 5, margin: 0, }
                    //   language='javascript'
                    >
                    'Hello'
                </SyntaxHighlighter>} */}

                {/* {this.props.qaData && this.props.qaData.code ? <HTML html={`<pre>`+this.props.qaData.code+`</pre>`} imagesMaxWidth={Dimensions.get('window').width} tagsStyles={tagsStyles} containerStyle={stylesHtml.container}/> : ''} */}
                {/* { !this.props.qaData.code && this.props.qaData.imgUrls && this.props.qaData.imgUrls.length > 0 ?   */}
                <Text style={styles.cardViewData}>
                    {this.props.qaData.ans}
                </Text>
                {imgContent}
                {descContent}
                <View style={styles.ImageViewWrapper}>
                    {this.props.qaData.imgUrls && this.props.qaData.imgUrls.map((image, index) => ( 
                        <Image  key={index} style={styles.programImage} source={{uri:image.imgUrl}}/>
                        ))}
                        
                </View>
                    </ScrollView>
                {/* <ImageView images={images} imageIndex={this.state.index} isVisible={this.state.showFullPageImage}
                onClose={()=>{
                    this.setState({ showFullPageImage : false });
                }} renderFooter={false}/> */}
            </View>
        );
    }
}

export default DetailPage;

const styles = StyleSheet.create({
    cardViewConatiner: {
        width: "95%",
        // backgroundColor: "grey",
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        elevation: 10,
        flexDirection: 'column'
    },
    cardViewHeader: {
        fontSize: 18,
        color: "#371620",
        // backgroundColor: "#fdfdfd",
        backgroundColor: "#fff",
        minHeight: 35,
        paddingLeft: "2%",
        textAlignVertical: "center",
        fontFamily: 'quicksand_bold',
        width: "100%"
    },
    cardViewData: {
        padding: 5,
        paddingLeft: 10,
        color: "#371620",
        // backgroundColor: "#f8f8f8",
        
        fontSize: 14,
        fontFamily: 'quicksand_regular'
    },
    image: {
        alignSelf: 'flex-end',
        right: "1%"
    },
    ImageViewWrapper: {
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },
    scrollWrapper: {
        flex: 1,
        width: "100%"
    },
    ImageWrapper: {
        flex: 1,
        width: "100%",
        marginBottom: 5,
    },
    programImage: {
        // resizeMode: Image.resizeMode.cover,
        // // width: "100%",
        // // height: 400
        // // width:undefined,
        // // height:undefined
        // // flex:1,
        // width: 320,
        // height:480,
        resizeMode: "contain",
        flex:1,
        width: 320,
        height:320,
        alignSelf: 'center',
        margin: 5,
    },
    test:{
        resizeMode: Image.resizeMode.contain,
        width: 320,
            height:480,
        // flex:1,
        // marginTop:15 ,
    }
})