import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Image,
    TouchableHighlight,
} from 'react-native';

import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
// const HomeScreen = ({ navigation }) => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//             onPress={() => navigation.navigate('Details')}
//             title='Go to details'
//         />
//     </View>
// );
//
// const DetailsScreen = () => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//     </View>
// );
//
// const RootNavigator = StackNavigator({
//     Home: {
//         screen: HomeScreen,
//         navigationOptions: {
//             headerTitle: 'Home',
//         },
//     },
//     Details: {
//         screen: DetailsScreen,
//         navigationOptions: {
//             headerTitle: 'Details',
//         },
//     },
// });


//TabBarNavigator
// const HomeScreen = () => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//     </View>
// );
//
// const ProfileScreen = () => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Profile Screen</Text>
//     </View>
// );
//
//
// const RootTabs = TabNavigator({
//     Home: {
//         screen: HomeScreen,
//         navigationOptions: {
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ tintColor, focused }) => (
//                 <Ionicons
//                     name={focused ? 'ios-home' : 'ios-home-outline'}
//                     size={26}
//                     style={{ color: tintColor }}
//                 />
//             ),
//         },
//     },
//     Profile: {
//         screen: ProfileScreen,
//         navigationOptions: {
//             tabBarLabel: 'Profile',
//             tabBarIcon: ({ tintColor, focused }) => (
//                 <Ionicons
//                     name={focused ? 'ios-person' : 'ios-person-outline'}
//                     size={26}
//                     style={{ color: tintColor }}
//                 />
//             ),
//         },
//     },
// });
//侧边抽屉抽出Tab
// const HomeScreen = ({ navigation }) => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//             onPress={() => navigation.navigate('DrawerToggle')}
//             title='Open Drawer'
//         />
//     </View>
// );
//
//
// const ProfileScreen = () => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Profile Screen</Text>
//     </View>
// );
// //DrawerNavigator
// const RootDrawer = DrawerNavigator({
//     Home: {
//         screen: HomeScreen,
//         navigationOptions: {
//             drawerLabel: 'Home',
//             drawerIcon: ({ tintColor, focused }) => (
//                 <Ionicons
//                     name={focused ? 'ios-home' : 'ios-home-outline'}
//                     size={20}
//                     style={{ color: tintColor }}
//                 />
//             )
//         }
//     },
//     Profile: {
//         screen: ProfileScreen,
//         navigationOptions: {
//             drawerLabel: 'Profile',
//             drawerIcon: ({ tintColor, focused }) => (
//                 <Ionicons
//                     name={focused ? 'ios-person' : 'ios-person-outline'}
//                     size={20}
//                     style={{ color: tintColor }}
//                 />
//             )
//
//         }
//     }
// });

// export default RootNavigator;
// export default RootTabs;
// export default RootDrawer;

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello,Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                />
                <Button
                    onPress={() => navigate('PersonList')}
                    title='PersonList Detail'
                />
            </View>
        )
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        // const { state, setParams } = navigation;
        const isInfo = navigation.state.params.mode === 'info';
        const { user } = navigation.state.params;
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${navigation.state.params.user}`,
            headerRight: (
                <Button
                    title={isInfo ? 'Done' : `${user}'s info`}
                    onPress={() => navigation.setParams({
                        mode: isInfo ? 'none' : 'info'
                    })}
                />
            )
        }
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        )
    }
}

class EditInfoScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <Button
                title="Save"
                onPress={params.handleSave ? params.handleSave : () => null}
            />
        );
        if (params.isSaving) {
            headerRight = <ActivityIndicator/>;
        }
        return { headerRight };
    };

    state = {
        nickname: 'Lucy jacuzzi'
    };

    _handleSave = () => {
        // Update state, show ActivityIndicator
        this.props.navigation.setParams({ isSaving: true });

        // Fictional function to save information in a store somewhere
        saveInfo().then(() => {
            this.props.navigation.setParams({ isSaving: false });
        })
    };

    componentDidMount() {
        // We can only set the function after the component has been initialized
        this.props.navigation.setParams({ handleSave: this._handleSave });
    }

    render() {
        return (
            <TextInput
                onChangeText={(nickname) => this.setState({ nickname })}
                placeholder={'Nickname'}
                value={this.state.nickname}
            />
        );
    }
}


class PersonList extends React.Component {
    static navigationOptions = {
        title: 'PersonList Detail'
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>PersonList Detail {params.women}</Text>
            </View>
        )
    }
}

class RecentChatScreen extends React.Component {
    static navigationOptions: {
        title: 'Home Recent'
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>List of recent chats</Text>
                <Button
                    onPress={() => navigate('Chat', { user: 'JoeX' })}
                    title='recent chats JoeX'
                />
                <Button
                    onPress={() => navigate('PersonList', { women: 'Women' })}
                    title='recent chats Women'
                />
            </View>
        )
    }
}

class AllContactsScreen extends React.Component {
    static navigationOptions: {
        title: 'Home All'
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>List Of All</Text>
                <Button
                    onPress={() => navigate('Edit', { women: 'Women' })}
                    title='Edit'
                />
                <Button
                    onPress={() => navigate('ModalNavigator', { women: 'Women' })}
                    title='Edit'
                />
            </View>
        )
    }
}


const MainScreenNavigator = TabNavigator({
    Recent: {
        screen: RecentChatScreen,
        navigationOptions: {
            tabBarLabel: 'Recent',
            tabBarIcon: ({ tintColor, focused }) => {
                return (
                    <Ionicons
                        name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        }
    },
    All: {
        screen: AllContactsScreen,
        navigationOptions: {
            tabBarLabel: 'All',
            tabBarIcon: ({ tintColor, focused }) => {
                return (
                    <Ionicons
                        name={focused ? 'ios-person' : 'ios-person-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        }
    }
});


const ModalNavigator = StackNavigator(
    {
        Main: { screen: ChatScreen },
        Login: { screen: PersonList },
    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);
const SimpleApp = StackNavigator({
    Home: {
        screen: MainScreenNavigator,
        navigationOptions: {
            title: 'Home'
        }
    },
    Chat: {
        screen: ChatScreen
    },
    PersonList: {
        screen: PersonList
    },
    Edit: {
        screen: EditInfoScreen
    },
    ModalNavigator: {
        screen: ModalNavigator
    }
});

let pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};

class MyHomeScreen extends React.Component {

    static navigationOptions = {
        tabBarLabel: '首页',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={pic}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };


    //function
    _onPressButton() {
        alert('this is a button')
    }


    render() {
        return (
            <View>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />

                <TouchableHighlight
                    onPress={this._onPressButton}
                >
                    <Text>Button</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

class MyContactScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '通讯录',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={pic}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '通知',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={pic}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

class MyCenterScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={pic}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

const MyApp = TabNavigator({
    Home: {
        screen: MyHomeScreen,
    },
    Mycontact: {
        screen: MyContactScreen,
    },
    Notifications: {
        screen: MyNotificationsScreen,
    },
    Mycenter: {
        screen: MyCenterScreen,
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        // activeTintColor: '#e91e63',
        activeTintColor: 'green',
        // labelStyle: {
        //   fontSize: 8,
        // },
        style: {
            backgroundColor: 'white',
        },
    },

});

//默认导出
export default class App extends React.Component {
    render() {
        return (
            <MyApp/>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemColor: {
        color: '#ff8080'
    },
    icon: {
        width: 26,
        height: 26,
    },
});
