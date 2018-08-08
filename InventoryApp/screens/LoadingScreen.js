import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default class LoadingScreen extends React.Component {
	componentDidMount() {
		// determine whether there are profiles saved or not
		// if so, send the user to the profiles screen
		// if not, send the user to create a new profile
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