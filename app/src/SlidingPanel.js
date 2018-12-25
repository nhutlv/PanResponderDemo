import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

class SlidingPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            visibleModal: false
        };

        this.translateYAnimated = new Animated.Value(0);
        this.height = 0;
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: this.handlePanResponderMove.bind(this),
            onPanResponderRelease: this.handlePanResponderRelease.bind(this)
        })
    }

    toggleModal(visibleModal) {
        if (visibleModal) {
            this.translateYAnimated = new Animated.Value(300);
            this.setState({visibleModal, visible: visibleModal}, () => {
                Animated.timing(this.translateYAnimated, {
                    toValue: 0,
                    duration: this.height
                }).start();
            });
        } else {
            this.handleRequestClose();
        }
    }

    handlePanResponderMove(event, gestureState) {
        let dy = gestureState.dy;

        if (dy < 0) {
            dy = 0;
        }

        this.translateYAnimated = new Animated.Value(dy);
        this.forceUpdate();
    }

    handlePanResponderRelease(event, gestureState) {
        let dy = gestureState.dy;
        if (dy > this.height / 3) {
            this.translateYAnimated = new Animated.Value(dy);
            Animated.timing(this.translateYAnimated, {
                toValue: this.height,
                duration: 300
            }).start(() => {
                this.setState({visible: false, visibleModal: false});
            });
            this.forceUpdate();
        } else {
            dy = 0;
            this.translateYAnimated = new Animated.Value(dy);
            this.forceUpdate();
        }
    }

    handleRequestClose() {
        Animated.timing(this.translateYAnimated, {
            toValue: this.height,
            duration: 300
        }).start(() => {
            this.setState({visible: false, visibleModal: false});
        })
    }

    render() {
        if (!this.state.visibleModal) return null;

        return (
            <View style={[styles.fillParent]}>
                {
                    this.state.visibleModal &&
                    <View style={{flex: 1}}>
                        {
                            this.state.visible && this.state.visibleModal &&
                            <TouchableWithoutFeedback onPress={this.handleRequestClose} accessible={true}>
                                <View style={[styles.fillParent, styles.overlay, styles.fullParent]}/>
                            </TouchableWithoutFeedback>
                        }
                        <Animated.View {...this.panResponder.panHandlers}
                                       style={[styles.view, {
                                           transform: [{translateY: this.translateYAnimated}]
                                       }]}
                                       onLayout={(event) => {
                                           let {height} = event.nativeEvent.layout;
                                           console.log('height', height);
                                           this.height = height;
                                           this.forceUpdate();
                                       }}
                        >
                            <View style={{
                                alignItems: "center", justifyContent: 'center',
                                backgroundColor: 'white', paddingVertical: 15,
                                borderBottomColor: '#CCCCCC',
                                borderBottomWidth: 0.5,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }}>
                                <Text>Header</Text>
                            </View>
                            <View
                                style={{backgroundColor: 'white', flex: 1, height: 300}}
                                ref={ref => this.view = ref}/>
                        </Animated.View>
                    </View>
                }
            </View>
        );
    }
}

SlidingPanel.propTypes = {
    style: PropTypes.any
};

SlidingPanel.defaultProps = {};

export default SlidingPanel;

const styles = StyleSheet.create({
    view: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    fillParent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    fullParent: {
        height: '100%',
        width: '100%'
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(10, 10, 10, .5)'
    }
});
