import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
} from 'react-native';

const ScreenWith = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

console.log(ScreenWith + '/' + ScreenHeight);

class Werther extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View style={styles.flex}>
                <View style={styles.container}>
                    <Image source={pic} style={styles.pic}/>
                </View>
            </View>
        );
    }
}

class Greeting extends Component {
    render() {
        return (
            <Text style={styles.font}>Hello {this.props.name} !</Text>
        );
    };
}

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: true
        };

        // setInterval(() => {
        //     this.setState((previousState) => {
        //         return {
        //             showText: !previousState.showText
        //         }
        //     })
        // }, 1000)
    }

    render() {
        let display = this.state.showText ? this.props.text : '';
        console.log(display);
        return (
            <Text style={styles.font}>{display}</Text>
        )
    }
}


class FlexDirectionBasics extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ width: 50, height: 50, backgroundColor: 'red' }}></View>
                <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }}></View>
                <View style={{ width: 50, height: 50, backgroundColor: 'green' }}></View>
            </View>
        )
    }
}

class PizzaTranslater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40, borderWidth: 1, borderColor: 'green' }}
                    placeholder='Type here to translate'
                    onChangeText={(text) => {
                        this.setState({ text })
                    }}
                ></TextInput>

                <Text
                    style={{ padding: 10, fontSize: 42, color: '#ff8080', borderWidth: 1, borderColor: 'red' }}
                >
                    {this.state.text.split(' ').map((word) => {
                        return word && '🍕'
                    }).join(' ')}
                </Text>
            </View>
        )
    }
}

export default class LotsOfGreetings extends Component {
    render() {
        return (
            <ScrollView>
                <View style={[styles.flex]}>
                    <View>
                        <View>
                            <View>
                                <Greeting name='Rexxar'/>
                                <Greeting name='Jaina'/>
                                <Greeting name='Valeera'/>
                            </View>
                            <View>
                                <Werther/>
                            </View>
                        </View>
                        <View>
                            <Blink text='I love to blink'/>
                            <Blink text='Yes blinking is so great'/>
                            <Blink text='Why did they ever take this out of HTML'/>
                            <Blink text='Look at me look at me look at me'/>
                        </View>
                    </View>
                    <FlexDirectionBasics/>

                    <PizzaTranslater/>
                </View>
                <View>
                    <Text style={{ fontSize: 48 }}>Scroll me plz</Text>
                    <Image style={styles.pic} source={require('./img/timg.jpeg')}/>
                </View>
            </ScrollView>
        );
    }
};
const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        marginTop: 64,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ff8800',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pic: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    font: {
        fontSize: 16,
        color: '#ff8080'
    },
    blink: {
        color: '#ff87ff',
        borderWidth: 1,
        borderColor: '#ff9832'
    }
});



