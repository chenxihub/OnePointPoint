import React from 'react';
import {
    NativeModules,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    PixelRatio
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
    state = {
        w: 100,
        h: 100,
    };

    _onPress = () => {
        LayoutAnimation.spring();
        this.setState({ w: this.state.w + 15, h: this.state.h + 15 })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.box, { width: this.state.w, height: this.state.h }]}></View>
                <TouchableOpacity onPress={this._onPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Press me!</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: '#ff8080',
        borderRadius: 6,
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 15,
        borderRadius: 4,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ff8080',
    },
    buttonText: {
        color: '#ff8080',
        fontWeight: 'bold'
    }
});