import React from 'react';
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native';
import { Header } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			navigation: this.props.navigation,
			profiles: this.props.navigation.getParam('profiles', null),
			curProfile: this.props.navigation.getParam('curProfile', null)
		}
	}
	
	render() {
		return (
			<View>
				<Header
					leftComponent={{icon: 'keyboard-arrow-left', color: '#fff', onPress: () => {
						// save any profile changes, then return to profile list
						AsyncStorage.setItem('profiles', JSON.stringify(this.state.profiles)).then(() => {
							this.state.navigation.navigate("ProfileListScreen", {profiles: this.state.profiles});
						});
					}}}
					centerComponent={{text: "Profile \'" + this.state.curProfile + "\'",
						style: {color: '#fff'}}}
				/>
			</View>
		)
	}
}