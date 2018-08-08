import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

// import screens
import LoadingScreen from './screens/LoadingScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import CreateProfileScreen from './screens/CreateProfileScreen.js';
import ProfileListScreen from './screens/ProfileListScreen.js';

const App = createSwitchNavigator(
	{
		LoadingScreen,
		ProfileScreen,
		CreateProfileScreen,
		ProfileListScreen
	},
	{
		initialRouteName: 'LoadingScreen'
	}
)

export default App;