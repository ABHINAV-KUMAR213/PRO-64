import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image,Animated} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { word: '', definition: '', phonetics: '' };
  }
  getWord = (text) => {
    text = text.toLowerCase();
   try {
     var word = dictionary[text]['word'];
     var lexicalCategory = dictionary[text]['lexicalCategory'];
     var definition = dictionary[text]['definition'];
     this.setState({
       word: word,
       lexicalCategory: lexicalCategory,
       definition: definition,
     });
   } catch (err) {
     alert('Sorry, this word is not available in this dictionary for now. You can search for this word in this link - https://snack.expo.io/@charvikashyap/online-dictionary-app');
     this.setState({
       text: '',
       isSearchPressed: false,
     });
   }
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
