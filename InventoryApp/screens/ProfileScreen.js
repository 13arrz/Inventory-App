import React from 'react';
import { StyleSheet, View, FlatList, AsyncStorage, Alert } from 'react-native';
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
	
	/*
	 * Save the current profile state and return to ProfileListScreen
	 */
	saveProfilesAndExit = (dest) => {
		AsyncStorage.setItem('profiles', JSON.stringify(this.state.profiles)).then(() => {
			this.state.navigation.navigate(dest, {profiles: this.state.profiles});
		})
	}
	
	render() {
		return (
			<View>
				<Header
					leftComponent={{icon: 'keyboard-arrow-left', color: '#fff', onPress: () => {
						this.saveProfilesAndExit("ProfileListScreen");
					}}}
					centerComponent={{text: "Profile \'" + this.state.curProfile + "\'",
						style: {color: '#fff'}}}
					rightComponent={{icon: 'settings', color: '#fff', onPress: () => {
						Alert.alert(
							'InventoryApp',
							'Profile \'' + this.state.curProfile + '\'',
							[
								{text: 'Erase Profile', onPress: () => {
									// delete the current profile from component state
									var newProfiles = this.state.profiles;
									delete newProfiles[this.state.curProfile];
									
									// navigate to the loading screen, because the user may have
									// deleted their last profile and it's better to know explicitly
									this.saveProfilesAndExit("LoadingScreen");
								}}
							]
						)
					}}}
				/>
			</View>
		)
	}
}