import React from "react";
import '../css/inventory.css'
import InventoryTable from "./InventoryPageComponents/InventoryTable";

class InventoryPage extends React.Component{
    render() {
        return(
            <div className="container">
                <InventoryTable getItemProfit={this.props.getItemProfit} Items={this.props.Items}/>
            </div>
        )
    }
}

export default InventoryPage
