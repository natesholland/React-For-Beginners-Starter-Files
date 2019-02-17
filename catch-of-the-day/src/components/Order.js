import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from "../helpers"
import {TransitionGroup, CSSTransition} from "react-transition-group"

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }


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
      return <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
        <li>
          {count} lbs {fish.name}

          {formatPrice(count * fish.price)}
          <button onClick={() => {this.props.removeFromOrder(key)}}>
            &times;
          </button>
        </li>
      </CSSTransition>
    } else {
      return <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
        <li>
          Sorry {fish ? fish.name : 'fish'} is no longer available.
        </li>
      </CSSTransition>
    }
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total: <strong>{formatPrice(this.calcTotal())}</strong>
        </div>
      </div>
    )
  }

}

export default Order;