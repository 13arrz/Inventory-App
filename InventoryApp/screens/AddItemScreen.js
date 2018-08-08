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
		if (this.state.itemName === null || this.state.itemName === "") {
			this.setState({error: "Please enter an item name."});
			return null;
		}
		
		if (this.state.itemQuantity === null || this.state.itemQuantity === "" ||
			isNaN(this.state.itemQuantity)) {
			this.setState({error: "Please enter a numeric item quantity."});
			return null;
		}
		// ======
		
		// update the profile list with the new item and quantity
		newProfiles[this.state.curProfile]["items"][this.state.itemName] = parseInt(this.state.itemQuantity, 10);
		
		// save the new profile list and return to ProfileScreen
		AsyncStorage.setItem('profiles', JSON.stringify(newProfiles)).then(() => {
			this.state.navigation.navigate("ProfileScreen", 
			{
				profiles: newProfiles,
				curProfile: this.state.curProfile
			})
		})
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
					<Text>(Entering an existing item will update that item's quantity)</Text>
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
		marginTop: 10,
		marginBottom: 20
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