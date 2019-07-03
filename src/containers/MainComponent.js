import React, {Component} from 'react';
import {View,StyleSheet,Text,NetInfo} from 'react-native';
import Loader from './Loader';
import DrawerComp from './DrawerComp';

class MainComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        
    }
    renderList() {
        // console.log("this.props.appView.appData.categories",this.props.appView.appData.categories)
        return this.props.appView && this.props.appView.appData && this.props.appView.appData.categories && this.props.appView.appData.categories.length
            ?  <DrawerComp/>
            : <Loader />;
    }

    render() {
        if(this.props.appView && this.props.appView.appData){console.log("true")}
        console.log("this.props.showTutorialScreen in main component",this.props.showTutorialScreen)
        return (
            <View style={styles.container}>
                {/* { this.props.appView && this.props.appView.appData
                    ? this.renderList()
                    : <Loader/>} */}
                     <DrawerComp showTutorialScreen={this.props.showTutorialScreen}/>
            </View>
        );
    }

}


export default MainComponent;

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

