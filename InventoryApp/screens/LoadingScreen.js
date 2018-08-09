/*
 * This screen loads the user's saved profile list and navigates according to
 * whether a profile list has been saved.
 * If there is a saved profile list, the user is navigated to view all of their
 * profiles.
 * If there is no saved profile list, the user is navigated to create a new
 * profile.
 */

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

export default class LoadingScreen extends React.Component {
	async componentDidMount() {
		// determine whether there are profiles saved or not
		try {
			const profiles = await AsyncStorage.getItem('profiles');
			profiles = JSON.parse(profiles);
			
			if (profiles != null && Object.keys(profiles).length > 0) {
				// if so, send the user to the profile list
				// pass in the read profile list for reading/modification
				this.props.navigation.navigate("ProfileListScreen", { profiles });
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