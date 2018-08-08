import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';

export default class CreateProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			profileName: null,
			profiles: this.props.navigation.getParam('profiles', null)
		}
	}
	
	createProfile = () => {
		// add the new profile to the previously read list
		const newProfile = this.state.profileName;
		var profiles = this.state.profiles
		
		if (profiles != null) {
			// update the profile list
			profiles[newProfile] = {
				"items": {
				}
			}
		} else {
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
		})
	}
	
	render() {
		return (
			<View style={{flex: 1}}>
			<Header
				centerComponent={{text: 'Create Profile', style: {color: '#fff'}}}
			/>
			
				<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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