import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default class CreateProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			profileName: null
		}
	}
	
	createProfile = () => {
		console.log("Create new profile");
	}
	
	render() {
		return (
			<View style={styles.container}>
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