import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import TextView from "app/src/TextView";

const text1 = 'hãy đợi đấy';
const text2 = 'wait and see';

class TestTranslator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <TextView
                    text={text1}/>
                <TextView
                    text={text2}/>
            </View>
        )
    }
}

export default TestTranslator;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});