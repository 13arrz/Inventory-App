import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class ProfileListScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			profiles: this.props.navigation.getParam('profiles')
		}
	}
	
	async componentDidMount() {
		// load user profiles into component state
		console.log(this.state.profiles);
	}
	
	render() {
		return(
			<View style={styles.container}>
				<Text>ProfileListScreen</Text>
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