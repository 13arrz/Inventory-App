import React from 'react';
import { StyleSheet, View, FlatList, AsyncStorage, Alert, Text } from 'react-native';
import { Header } from 'react-native-elements';

import ItemComponent from '../ItemComponent.js';

export default class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			navigation: this.props.navigation,
			profiles: this.props.navigation.getParam('profiles', null),
			curProfile: this.props.navigation.getParam('curProfile', null),
			itemList: []
		}
	}
	
	componentDidMount() {
		const profiles = this.state.profiles;
		const curProfile = this.state.curProfile;
		
		// add all profile items to state itemList
		var newItemList = []
		
		Object.keys(profiles[curProfile]["items"]).forEach(function(item) {
			newItemList.push({
				name: item,
				count: profiles[curProfile]["items"][item]
			})
		});
		
		this.setState({
			itemList: newItemList
		});
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
								}},
								{text: 'Add Item', onPress: () => {
									this.state.navigation.navigate("AddItemScreen",
									{
										profiles: this.state.profiles,
										curProfile: this.state.curProfile
									})
								}}
							]
						)
					}}}
				/>
				
				<FlatList
					data={this.state.itemList}
					renderItem={({item}) => (
						<ItemComponent
							name={item.name}
							count={item.count}
						/>
					)}
					keyExtractor={(item, index)=> "$" + index}
					ItemSeparatorComponent={() => (
						<View style={styles.itemSeparator} />
					)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	itemSeparator: {
		backgroundColor: 'gray',
		height: 2
	}
})