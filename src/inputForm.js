import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class ItemForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			text: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			text: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.onSubmit({
			id: uuidv4(),
			text: this.state.text,
			complete: false
		})

		this.setState({
			text: ''
		})
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.text} className="new_item_input" onChange={this.handleChange} placeholder="What I need to buy today" />
			</form>
		)
	}
}

export default ItemForm;