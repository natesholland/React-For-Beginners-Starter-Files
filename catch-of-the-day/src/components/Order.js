import React from "react";
import {formatPrice} from "../helpers"

class Order extends React.Component {

  calcTotal = () => {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const available = fish && fish.status === 'available';
      if (available) {
        return prevTotal + (count * fish.price);
      } else {
        return prevTotal
      }
    }, 0);
    return total;
  }

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    // Make sure we have a fish before we continue
    if (!fish) return null;
    if(fish.status === 'available') {
      return <li key={key}>
        {count} lbs {fish.name}

        {formatPrice(count * fish.price)}
      </li>
    } else {
      return <li key={key}>
        Sorry {fish ? fish.name : 'fish'} is no longer available.
      </li>
    }
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">
          Total: <strong>{formatPrice(this.calcTotal())}</strong>
        </div>
      </div>
    )
  }

}

export default Order;