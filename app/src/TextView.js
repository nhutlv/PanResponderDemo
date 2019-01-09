import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import {sizeFont} from "app/src/styles";

const TRANSLATE_ENDPOINT = {
    GOOGLE_TRANSLATE: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDUjja_20EpDmMvz0Ft8mkdFk49bLozTkQ',
    GOOGLE_DETECT: 'https://translation.googleapis.com/language/translate/v2/detect?key=AIzaSyDUjja_20EpDmMvz0Ft8mkdFk49bLozTkQ',
    MICROSOFT: 'https://api.microsofttranslator.com/V2/Http.svc/Translate'
};

class TextView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expand: false,
            textTranslator: null,
            loading: false,
            language: 'vi'
        };

        this.handleTranslator = this.handleTranslator.bind(this);
        this.handlePressTranslator = this.handlePressTranslator.bind(this);
        this.detectLanguage = this.detectLanguage.bind(this);
    }

    componentWillMount() {
        this.detectLanguage(this.props.text);
    }

    async detectLanguage(text) {
        fetch(`${TRANSLATE_ENDPOINT.GOOGLE_DETECT}&q=${text}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    language: responseJson.data.detections[0][0].language,
                });
            })
            .catch((error) => {
                console.log('detectLanguage', error);
            });
    }

    async handleTranslator(language, text) {
        this.setState({loading: true});

        fetch(`${TRANSLATE_ENDPOINT.GOOGLE_TRANSLATE}&target=${language}&q=${text}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    textTranslator: responseJson.data.translations[0].translatedText,
                }, () => this.setState({expand: true}));
            })
            .catch((error) => {
                console.log('handleTranslator', error);
                this.setState({loading: false});
            });
    }

    async handlePressTranslator(lang = 'vi') {
        if (!this.state.expand && !this.state.textTranslator) {
            await this.handleTranslator(lang, this.props.text);
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={{justifyContent: 'flex-start'}}>
                    <Text style={{color: 'black', fontSize: sizeFont(4)}}>
                        {this.props.text}
                    </Text>
                    {
                        !this.state.expand && this.state.language !== 'und' && this.state.language !== 'vi' &&
                        <TouchableWithoutFeedback onPress={() => this.handlePressTranslator()}>
                            <View style={{paddingVertical: 7, flexDirection: 'row'}}>
                                <Text style={styles.textTranslator}>
                                    Xem bản dịch
                                </Text>
                                {
                                    this.state.loading &&
                                    <ActivityIndicator color={'#a0a0a0'}/>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {
                        this.state.expand && this.state.textTranslator &&
                        <View style={styles.viewTranslator}>
                            <Text style={{color: 'black', fontSize: sizeFont(4)}}>
                                {this.state.textTranslator}
                            </Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

TextView.propTypes = {
    text: PropTypes.string,
    style: PropTypes.any
};

TextView.defaultProps = {
    text: ''
};

export default TextView;

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    viewTranslator: {
        paddingHorizontal: 8,
        marginTop: 5,
        borderLeftColor: '#a8a8a8',
        borderLeftWidth: 1
    },
    textTranslator: {
        color: '#a0a0a0',
        fontSize: sizeFont(3.8),
        marginRight: 5
    }
});