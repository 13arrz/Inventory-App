import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';

export default class AddItemScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			navigation: props.navigation
		}
	}
	
	render() {
		return <View />
	}
}