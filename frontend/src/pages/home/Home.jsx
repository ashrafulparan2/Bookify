import React, { PureComponent } from "react";
import Banner from "./Banner";
import News from "./News";
import TopSellers from "./TopSellers";

class home extends PureComponent {
  render() {
    return (
      <div>
        <Banner />
        <TopSellers />
        <News />
      </div>
    );
  }
}

home.propTypes = {};

export default home;
