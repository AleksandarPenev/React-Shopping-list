import React, { Component } from 'react';

class Item extends Component {
	constructor(props){
		super(props);

		this.state = {
			isInEditMode: false,
			value: this.props.item.text
		}
	}

	handleChange = (e) => {
		e.preventDefault();

		this.setState({
			isInEditMode: !	this.state.isInEditMode
		})
	}

	handleDelete = (e) => {
		this.props.onDelete(this.props.item.id);
	}

	handleToggleComplete = () => {
		this.props.toggleComplete(this.props.item.id)
	}

	changeText = (e) => {
		this.setState({
			value: e.target.value
		})
	}

	render() {
		return (
			<div className="item">
				<div className="item_status">
					<button className={`button-check ${this.props.item.complete ? "checked" : null}`} onClick={this.handleToggleComplete}>
						<i className="fa fa-check" aria-hidden="true"></i>
					</button>
				</div>
				<div className="item_title">
					{this.state.isInEditMode ? (
						<form onSubmit={this.handleChange}>
							<input type="text" className="change_item_title" value={this.state.value} onChange={this.changeText} />
						</form>
					) : (
						<div className={this.props.item.complete ? "is_completed" : null} onDoubleClick={this.handleChange}>
							{this.state.value}
						</div>
					)}
				</div>

				<div className="item_delete">
					<button className="item_remove_btn" onClick={this.handleDelete}>
						<i className="fa fa-trash-o" aria-hidden="true"></i>
					</button>
				</div>			
			</div>
		)
	}
}

export default Item;		






	