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
				<View style={styles.spacerView}>
					<TouchableOpacity style={styles.subButton}>
						<Text style={styles.incText}>-</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.addButton}>
						<Text style={styles.incText}>+</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	itemButton: {
		backgroundColor: 'lightblue',
		flexDirection: 'row'
	},
	itemText: {
		fontSize: 20,
		color: 'black',
		marginLeft: 20,
		marginTop: 20,
		marginBottom: 20
	},
	incText: {
		color: 'white',
		fontSize: 30
	},
	subButton: {
		backgroundColor: 'red',
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
	},
	addButton: {
		backgroundColor: 'green',
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 5
	},
	spacerView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	}
})