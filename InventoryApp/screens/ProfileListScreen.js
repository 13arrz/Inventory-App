import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Header } from 'react-native-elements';

export default class ProfileListScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			navigation: this.props.navigation,
			profiles: this.props.navigation.getParam('profiles'),
			profileList: []
		}
	}
	
	componentDidMount() {
		// add each profile name to the profile list
		var newProfileList = [];
		
		Object.keys(this.state.profiles).forEach(function(profile) {
			newProfileList.push({'profile': profile});
		})
		
		this.setState({
			profileList: newProfileList
		})
	}
	
	render() {
		return(
			<View>
				<Header
					leftComponent={{icon: 'add', color: '#fff', onPress: () => {
						// allow the user to add a new profile
						// pass in the current profile list as a param
						this.state.navigation.navigate("CreateProfileScreen", {profiles: this.state.profiles});
					}}}
					centerComponent={{text: 'Profiles', style:{color: '#fff'}}}
					rightComponent={{icon: 'settings', color: '#fff', onPress: () => {
						Alert.alert(
							'InventoryApp',
							'Options',
							[
							{text: 'Erase All Profiles', onPress: () => {
								// erase all profiles and navigate to the loading screen
								AsyncStorage.removeItem('profiles', () => 
									this.state.navigation.navigate("LoadingScreen"));
							}}
							]
						)
					}}}
				/>
				
				<FlatList
					data={this.state.profileList}
					renderItem={({item})=>
					<TouchableOpacity style={styles.profileButton}
						onPress={() => {
							// navigate to the relevant profile
							this.state.navigation.navigate("ProfileScreen", 
								{
									profiles: this.state.profiles, 
									curProfile: item["profile"]
								})
						}}>
						<Text style={styles.profileText}>{item["profile"]}</Text>
					</TouchableOpacity>
					}
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
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	profileButton: {
		backgroundColor: 'lightblue'
	},
	profileText: {
		fontSize: 20,
		color: 'black',
		marginLeft: 20,
		marginTop: 20,
		marginBottom: 20
	},
	itemSeparator: {
		backgroundColor: 'gray',
		height: 2
	}
})