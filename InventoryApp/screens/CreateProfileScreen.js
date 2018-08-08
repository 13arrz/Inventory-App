import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class CreateProfileScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>CreateProfileScreen</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})