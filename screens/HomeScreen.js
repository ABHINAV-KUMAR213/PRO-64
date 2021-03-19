import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image,Animated} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { word: '', definition: '', phonetics: '' };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        console.log(word);
        var definition = response[0].meanings[0].definitions[0].definition;
        console.log(definition);
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'DICTIONARY APP',

            style: { color: 'white', fontSize: 23, fontFamily: '' },
          }}
        />
         <Image
         style={{
            width: 300,
            height: 60,
            alignSelf:"center",
            marginTop:10,
          }}
          source={{
            uri:
              'https://cdn.dribbble.com/users/72535/screenshots/4229387/search-animation-by-jardson-almeida.gif',
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              
              word: 'Loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}>Search</Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
        <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2.5,
    borderRadius: 10,
    borderColor: 'black',
    outline: 'none',
    backgroundColor: 'white'
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 6,
    margin: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderTopColor: 'yellow',
    borderBottomColor:'red',
    borderLeftColor:"orange",
    borderRightColor:"blue",
    backgroundColor: 'green',
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'calibri',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'light',
    color: 'white'
  },
});
