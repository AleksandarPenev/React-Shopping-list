import React, { Component } from 'react';
import ItemInput from 'inputForm';  
import Item from 'item';  

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			items: [],
			itemsToShow: 'all',
			checkAllComplete: true
		}
	}

	addItem = (item) => {
		this.setState({
			items: [...this.state.items, item]
		})
	}

	toggleComplete = (id) => {
		this.setState({
			items: this.state.items.map( item => {
				if (item.id === id) {
					return {
						...item,
						complete: ! item.complete
					};
				} else {
					return item;
				}
			}),
			checkAllComplete: true	 
		})
	}

	updateItemToShow = (string) => {
		this.setState({
			itemsToShow: string
		})
	}

	handleDeleteItem =(id) => {
		this.setState({
			items: this.state.items.filter(item => item.id !== id)
		})
	}

	clearCompletedItems =() => {
		let uncompletedItems = this.state.items.filter(item => ! item.complete);

		this.setState({
			items: uncompletedItems,
			checkAllComplete: true
		});
	}

	handleCheckAllItems = (e) => {
		this.setState({
			items: this.state.items.map(item => ({
				...item,
				complete: this.state.checkAllComplete
			})),
			checkAllComplete: ! this.state.checkAllComplete 
		})
	}

	componentDidUpdate() {
    	localStorage.setItem('items', JSON.stringify(this.state.items))
  	}

	componentDidMount() {
	    let itemsList = localStorage.getItem('items');
	    if (itemsList) {
	    	this.setState({
	       		items: JSON.parse(itemsList)
	      	})
	    }
	}

	render(){
		let items = [];

		if (this.state.itemsToShow === 'all') {
			items = this.state.items;
		} else if (this.state.itemsToShow === 'active') {
			items = this.state.items.filter(item => ! item.complete);
		} else if (this.state.itemsToShow === 'completed') {
			items = this.state.items.filter(item => item.complete);
		}

		return (
			<div className="app">
				<header>
					<h1>My Shopping List</h1>
				</header>
				<div className="app_body">
					<div className="shoppingList_head">
						<div className="shoppingList_head_button">
							<button 
								onClick={this.handleCheckAllItems} 
								className={`button-check ${! this.state.checkAllComplete ? "checked" : null}`} 
								disabled={this.state.items.length > 0 ? false : true}
							>
								<i className="fa fa-check" aria-hidden="true"></i>
							</button>
						</div>
						<div className="shoppingList_head_form">	
							<ItemInput 
								onSubmit={this.addItem} 
								checkAllComplete={this.handleCheckAllItems}  
							/>
						</div>
					</div>
					<div className="shoppingList_body">
						{items.length > 0 ? (
							items.map( item => {
								return (
									<Item 
										key={item.id} 
										toggleComplete={this.toggleComplete} 
										onDelete={this.handleDeleteItem} 
										item={item} 
									/>
								)
							})
						) : (
							<div className="no_items">No items here</div>
						)}
					</div>	
					<div className="shoppingList_footer">
						<div className="active_item_counter">
							{this.state.items.filter(item => ! item.complete).length} {this.state.items.length > 1 ? "items" : "item"} left
						</div>
						<div className="listType">
							<button onClick={() => this.updateItemToShow("all")} className="listType_btn">all</button>
							<button onClick={() => this.updateItemToShow("active")} className="listType_btn">active</button>
							<button onClick={() => this.updateItemToShow("completed")} className="listType_btn">completed</button>
						</div>
						<div className="delete_completed_btn">
							<button 
								className="listType_btn" 
								onClick={this.clearCompletedItems} 
								disabled={this.state.items.length > 0 ? false : true}
							>
								clear completed
							</button>
							
						</div>
					</div>
				</div>
				<div className="app_footer">Double-click to edit an item</div>	
			</div>
		);
	}
}

export default App;
