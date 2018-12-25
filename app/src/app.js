import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import SlidingPanel from "app/src/SlidingPanel";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.handleModal = this.handleModal.bind(this);
    }

    handleModal() {
        this.slidingPanel.toggleModal(true);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, alignItems: 'center', justifyContent: 'center'}}
                                  onPress={this.handleModal}>
                    <Text style={{color: 'white'}}>Button</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, alignItems: 'center', justifyContent: 'center'}}
                                  onPress={this.handleModal}>
                    <Text style={{color: 'white'}}>Button</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, alignItems: 'center', justifyContent: 'center'}}
                                  onPress={this.handleModal}>
                    <Text style={{color: 'white'}}>Button</Text>
                </TouchableOpacity>
                <SlidingPanel ref={ref => this.slidingPanel = ref}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    view: {
        height: 100,
        width: 100,
        backgroundColor: 'green'
    },
    fullParent: {
        height: '100%',
        width: '100%'
    },
    fillParent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
