import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

export default class LoadingScreen extends React.Component {
	async componentDidMount() {
		// determine whether there are profiles saved or not
		try {
			const profiles = await AsyncStorage.getItem('profiles');
			
			if (profiles != null) {
				// if so, send the user to the profile list
				this.props.navigation.navigate("ProfileListScreen");
			} else {
				// if not, send the user to create a new profile
				this.props.navigation.navigate("CreateProfileScreen");
			}
		} catch (error) {
			// error retrieving data
			console.error(error);
		}
	}
	
	render() {
		return (
			<View style={styles.container}>
				<Text>Reading Profiles...</Text>
				<ActivityIndicator size='large' />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})