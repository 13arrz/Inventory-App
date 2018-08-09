import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';

export default class ItemComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			name: props.name,
			count: props.count,
			subFunc: props.subFunc,
			addFunc: props.addFunc,
			delFunc: props.delFunc
		}
	}
	
	render() {
		return (
			<TouchableOpacity style={styles.itemButton} onPress={() => {
				Alert.alert(
					'InventoryApp',
					'Delete Item \'' + this.state.name + '\'?',
					[
					{text: 'Delete', onPress: () => this.state.delFunc()}
					]
				)
				}}>
				<Text style={styles.itemText}>({this.state.count}) {this.state.name}</Text>
				<View style={styles.spacerView}>
					<TouchableOpacity style={styles.subButton} onPress={() => {
							this.setState({count: this.state.subFunc()})
						}}>
						<Text style={styles.incText}>-</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.addButton} onPress={() => {
							this.setState({count: this.state.addFunc()})
						}}>
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