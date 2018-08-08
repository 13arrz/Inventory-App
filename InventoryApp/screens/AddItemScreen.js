import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';

export default class AddItemScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			navigation: props.navigation,
			profiles: props.navigation.getParam('profiles', null),
			curProfile: props.navigation.getParam('curProfile', null),
			error: null,
			itemName: null,
			itemQuantity: "0"
		}
	}
	
	addItem = () => {
		var newProfiles = this.state.profiles;
		
		// error checking
		
		// ======
		
		
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
				
				<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
					{this.state.error &&
						<Text style={{color: 'red', fontSize: 16}}>{this.state.error}</Text>
					}
					<Text>Enter new item name:</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(itemName) => this.setState({itemName})}
						value={this.state.itemName}
					/>
					<Text>Enter initial item quantity:</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(itemQuantity) => this.setState({itemQuantity})}
						value={this.state.itemQuantity}
						keyboardType="numeric"
					/>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={this.addItem}
					>
						<Text>Add</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
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
	textInput: {
		height: 40,
		width: '80%',
		backgroundColor: '#fff',
		opacity: .9,
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 10
	},
	submitButton: {
		backgroundColor: 'lightblue',
		marginTop: 10,
		height: 40,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center'
	}
})