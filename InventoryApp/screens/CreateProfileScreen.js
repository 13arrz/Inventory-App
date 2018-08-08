import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';

export default class CreateProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			profileName: null,
			profiles: this.props.navigation.getParam('profiles', null),
			error: null
		}
	}
	
	createProfile = () => {
		// add the new profile to the previously read list
		const newProfile = this.state.profileName;
		var profiles = this.state.profiles
		
		var failure = false;
		
		// check to make sure the user entered a profile name
		if (newProfile === null || newProfile === "") {
			this.setState({
				error: "Please enter a profile name."
			});
			
			failure = true;
		}
		
		if (profiles != null) {
			// check to make sure the profile name isn't taken
			Object.keys(profiles).forEach(function(key) {
				if (key === newProfile) {
					this.setState({
						error: "Profile \'" + newProfile + "\' already exists!"
					});
					
					failure = true;
				}
			}.bind(this))
			
			// if any of the error checks failed, do not save the new profile
			if (failure) return null;
			
			// update the profile list
			profiles[newProfile] = {
				"items": {
				}
			}
		} else {
			// if any of the error checks failed, do not save the new profile
			if (failure) return null;
			
			// there are no profiles, so create a new list
			profiles = {}
			profiles[newProfile] = 
				{
					"items": {
					}
				}
		}
		
		// save the updated profile list
		AsyncStorage.setItem('profiles', JSON.stringify(profiles)).then(() => {
			// navigate to profile screen
			this.props.navigation.navigate("ProfileListScreen", { profiles });
		});
	}
	
	render() {
		return (
			<View style={{flex: 1}}>
			<Header
				leftComponent={{icon: 'keyboard-arrow-left', color: '#fff', onPress: () => {
					if (this.state.profiles === null) {
						// do not allow the user to navigate back if they
						// haven't created at least one profile
						this.setState({error: "Please create a default profile first."});
					} else {
						// cancel the request to add a new profile
						this.props.navigation.navigate("ProfileListScreen", { profiles: this.state.profiles });
					}
				}}}
				centerComponent={{text: 'Create Profile', style: {color: '#fff'}}}
			/>
			
				<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
					{this.state.error &&
						<Text style={{color: 'red', fontSize: 16}}>{this.state.error}</Text>
					}
					<Text>Enter new profile name:</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(profileName) => this.setState({profileName})}
						value={this.state.profileName}
					/>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={this.createProfile}
					>
						<Text>Create</Text>
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