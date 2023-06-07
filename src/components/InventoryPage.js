import React from "react";
import '../css/inventory.css'
import InventoryTable from "./InventoryPageComponents/InventoryTable";

class InventoryPage extends React.Component{

    componentDidMount() {
        this.props.LoadInventory(1);
    }
    render() {
        return(
            <div className="container">
                <InventoryTable getItemProfit={this.props.getItemProfit} Inventory={this.props.Inventory}/>
            </div>
        )
    }
}

export default InventoryPage
