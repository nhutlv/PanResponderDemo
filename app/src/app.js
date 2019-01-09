import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Animated, ScrollView} from 'react-native';
import SlidingPanel from "app/src/SlidingPanel";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0)
        };

        this.handleModal = this.handleModal.bind(this);
    }

    handleModal() {
        this.slidingPanel.toggleModal(true);
    }

    render() {
        const headerTranslate = Animated.diffClamp(this.state.scrollY, 0, 60)
            .interpolate({
                inputRange: [0, 1],
                outputRange: [0, -1],
            });

        console.log('headerTranslate', headerTranslate);

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                            )}
                >
                    <View style={{width: '100%', height: 1500, backgroundColor: 'green'}}/>
                    <TouchableOpacity
                        style={{backgroundColor: 'blue', padding: 10, alignItems: 'center', justifyContent: 'center'}}
                        onPress={this.handleModal}>
                        <Text style={{color: 'white'}}>Button</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Animated.View style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
                    <View style={styles.bar}>
                        <Text style={styles.title}>Title</Text>
                    </View>
                </Animated.View>
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
    },
    header: {
        position: 'absolute',
        top: 0,
        padding: 10,
        width: '100%',
        backgroundColor: 'red'
    }
});
