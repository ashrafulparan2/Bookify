import React, { PureComponent } from "react";
import Banner from "./Banner";
import News from "./News";
import TopSellers from "./TopSellers";
import Recommened from "./Recommened";

class home extends PureComponent {
  render() {
    return (
      <div>
        <Banner />
        <TopSellers />
        <Recommened />
        <News />
      </div>
    );
  }
}

home.propTypes = {};

export default home;
