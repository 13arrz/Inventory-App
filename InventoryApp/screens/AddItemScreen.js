import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';

export default class AddItemScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			navigation: props.navigation,
			profiles: props.navigation.getParam('profiles', null),
			curProfile: props.navigation.getParam('curProfile', null)
		}
	}
	
	render() {
		return (
			<View style={{flex: 1}}>
				<Header
					leftComponent={{icon: 'keyboard-arrow-left', color: '#fff', onPress: () => {
						// cancel the request to add a new item
						this.props.navigation.navigate("ProfileScreen", 
						{ 
							profiles: this.state.profiles,
							curProfile: this.state.curProfile
						});
					}}}
					centerComponent={{text: 'Add Item', style: {color: '#fff'}}}
				/>
			</View>
		)
	}
}