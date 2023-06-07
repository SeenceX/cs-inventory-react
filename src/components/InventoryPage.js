import React from "react";
import '../css/inventory.css'
import InventoryTable from "./InventoryPageComponents/InventoryTable";

class InventoryPage extends React.Component{

    componentDidMount() {
        this.props.LoadInventory(this.props.UserId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.UserId === this.props.UserId) {
            this.props.LoadInventory(this.props.UserId);
        }
    }
    render() {
        if(!this.props.isAuth){
            return(
                <div className="container">
                    <h2>Для работы с инвентарем нужно войти в систему.</h2>
                </div>
            )
        }
        return(
            <div className="container">
                <InventoryTable getItemProfit={this.props.getItemProfit} Inventory={this.props.Inventory}/>
            </div>
        )
    }
}

export default InventoryPage
