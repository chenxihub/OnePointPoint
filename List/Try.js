import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    SectionList,
    ScrollView,
} from 'react-native';

const data = [
    { key: 'Devin' },
    { key: 'Jackson' },
    { key: 'James' },
    { key: 'Joel' },
    { key: 'John' },
    { key: 'Jillian' },
    { key: 'Jimmy' },
    { key: 'Julie' },
    { key: 'Joex' },
    { key: 'map' },
    { key: 'hello' },
    { key: 'normal' },
    { key: 'space-between' },
    { key: 'nover' },
    { key: 'mihuai' },
    { key: 'noverm' },
];

const sectionsdata = [
    { title: 'D', data: ['Devin'] },
    { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
];


class FlatListBasic extends Component {
    render() {
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <Text style={styles.item}>{item.title}</Text>
                        )
                    }}
                ></FlatList>
            </View>
        )
    }
}

class SectionListBasic extends Component {
    render() {
        return (
            <View>
                <SectionList
                    sections={sectionsdata}
                    renderItem={
                        ({ item }) => {
                            return (
                                <Text style={styles.item}>{item}</Text>
                            )
                        }
                    }
                    renderSectionHeader={({ section }) => {
                        return (
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                        )
                    }}
                >
                </SectionList>
            </View>
        )
    }
}

class FecthData extends Component {
    state = {
        movies: ''
    };

    fetchData = () => {
        fetch('https://api.douban.com/v2/movie/in_theaters')
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText);
                this.setState({
                    movies: json.subjects
                });
            })
            .catch((error) => {
                console.log(error)
            })
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { movies } = this.state;
        return (
            <View>
                <FlatList
                    data={movies}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Text style={styles.item}>{item.title}</Text>
                        )
                    }}
                ></FlatList>
            </View>
        )
    }

}

export default class Basic extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                {/*<FlatListBasic></FlatListBasic>*/}
                {/*<SectionListBasic/>*/}
                <View>
                    <Text style={styles.item}>Promise</Text>
                </View>
                <FecthData/>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        borderColor: '#ff6600',
        borderWidth: 1,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    }
});