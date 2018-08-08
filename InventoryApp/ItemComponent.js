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
	}
	
	render() {
		return (
			<TouchableOpacity style={styles.itemButton}>
				<Text>({this.state.count}) {this.state.name}<Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	itemButton: {
		backgroundColor: 'lightblue'
	},
	itemText: {
		fontSize: 18,
		color: 'black',
		marginLeft: 20,
		marginTop: 20,
		marginBottom: 20
	}
})