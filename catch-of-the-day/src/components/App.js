import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes"
import Fish from "./Fish"
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const params  = this.props.match.params;

    this.ref = base.syncState(`${this.props.match.params.storeId}`, {
      context: this,
      state: 'fishes'
    });

    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)})
    }
  }

  componentDidUpdate() {
    localStorage.setItem(`${this.props.match.params.storeId}`, JSON.stringify(this.state.order));
  }


  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish)  => {
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes: fishes
    });
  }

  updateFish = (key, updateFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updateFish;
    this.setState({
      fishes: fishes
    })
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish addToOrder={this.addToOrder} index={key} key={key} details={this.state.fishes[key]}/>)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
         />

      </div>
    )
  }

}

export default App;