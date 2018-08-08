import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default class ItemComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			name: props.name,
			count: props.count,
			/*addFunc: props.addFunc,
			subFunc: props.subFunc*/
		}
		
		console.log(this.state.name);
	}
	
	render() {
		return (
			<TouchableOpacity style={styles.itemButton}>
				<Text style={styles.itemText}>({this.state.count}) {this.state.name}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	itemButton: {
		backgroundColor: 'lightblue'
	},
	itemText: {
		fontSize: 20,
		color: 'black',
		marginLeft: 20,
		marginTop: 20,
		marginBottom: 20
	}
})