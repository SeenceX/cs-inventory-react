import React from "react";
import '../css/inventory.css'
import InventoryTable from "./InventoryPageComponents/InventoryTable";

class InventoryPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [],
            selectedItem: null,
            searchText: ""
        }
    }

    componentDidMount() {
        this.props.LoadInventory(this.props.UserId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.UserId === this.props.UserId) {
            this.props.LoadInventory(this.props.UserId);
        }
    }

    render() {
        if (!this.props.isAuth) {
            return (
                <div className="container">
                    <h2>Для работы с инвентарем нужно войти в систему.</h2>
                </div>
            )
        }

        return (
            <div className="container">
                <button type={"button"} onClick={()=>{
                    if (this.state.selectedItem !== null) {
                        this.props.addItem( this.props.UserId, this.state.selectedItem.itemId);
                    }
                }}
                >Добавить предмет</button>
                <input type={"text"}
                       onChange={async (data) => {
                           console.log(data.target.value)
                           this.setState({searchText: data.target.value})
                           const items = await this.props.findItem(data.target.value);
                           console.log(items);
                           this.setState({items: items})
                           console.log(this.state)
                       }}
                       value={this.state.selectedItem ? this.state.selectedItem.itemName : this.state.searchText}
                />
                <ul>
                    {this.state.items&&this.state.items.length>0&&this.state.items.map(item=>(
                        <li key={item.itemId} onClick={() => this.handleItemClick(item)}>
                            <img alt={"img"} src={item.itemImg} />
                            {item.itemName}
                        </li>
                    ))}{}
                </ul>
                <InventoryTable
                    userId={this.props.UserId}
                    deleteItem={this.props.deleteItem}
                    updateItem={this.props.updateItem}
                    getItemProfit={this.props.getItemProfit}
                    Inventory={this.props.Inventory}/>
            </div>
        )
    }

    handleItemClick = (item) => {
        this.setState({ selectedItem: item });
    };
}

export default InventoryPage
