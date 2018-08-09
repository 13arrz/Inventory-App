/*
 * This is the view screen for a single profile. It lists all the items the
 * user has added to the profile. The user may add more items, delete existing
 * items, or delete the entire profile.
 */

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
	
	/*
	 * Update the state's itemList so that items in the profile are listed
	 * correctly.
	 * This method basically extracts the item names as keys from the profile.
	 */
	refreshItemList = (profiles) => {
		const curProfile = this.state.curProfile;
		
		// add all profile items to state itemList
		var newItemList = []
		
		Object.keys(profiles[curProfile]["items"]).forEach(function(item) {
			newItemList.push({
				name: item,
				count: profiles[curProfile]["items"][item]
			})
		});
		
		this.setState({itemList: newItemList});
	}
	
	/*
	 * Subtract quantity from a specific item.
	 */
	subCount = (item, count) => {
		if (count > 0) {
			var newProfiles = this.state.profiles;
			const curProfile = this.state.curProfile;
			
			var newCount = "" + (parseInt(count, 10) - 1);
			
			newProfiles[curProfile]["items"][item] = 
				newCount;
				
			this.setState({profiles: newProfiles});
			
			// save the updated profile list
			AsyncStorage.setItem('profiles', JSON.stringify(this.state.profiles));
			
			return newCount;
		} else {
			return "0";
		}
	}
	
	/*
	 * Add quantity to a specific item.
	 */
	addCount = (item, count) => {
		var newProfiles = this.state.profiles;
		const curProfile = this.state.curProfile;
			
		var newCount = "" + (parseInt(count, 10) + 1);
			
		newProfiles[curProfile]["items"][item] = 
			newCount;
				
		this.setState({profiles: newProfiles});
		
		// save the updated profile list
		AsyncStorage.setItem('profiles', JSON.stringify(this.state.profiles));
			
		return newCount;
	}
	
	deleteItem = (item) => {
		var newProfiles = this.state.profiles;
		
		// delete the specified item from the profile list
		delete newProfiles[this.state.curProfile]["items"][item];
		
		this.refreshItemList(newProfiles);
		
		this.setState({
			profiles: newProfiles
		});
		
		AsyncStorage.setItem('profiles', JSON.stringify(this.state.profiles))
	}
	
	componentDidMount() {
		this.refreshItemList(this.state.profiles);
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
							subFunc={() => this.subCount(item.name, 
								this.state.profiles[this.state.curProfile]["items"][item.name])}
							addFunc={() => this.addCount(item.name,
								this.state.profiles[this.state.curProfile]["items"][item.name])}
							delFunc={() => this.deleteItem(item.name)}
						/>
					)}
					extraData={this.state}
					keyExtractor={(item, index)=> item.name}
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