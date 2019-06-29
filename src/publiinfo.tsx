import * as React from "react";
import AppHeader from "./components/Header/Header";
import BikesPage from "./components/BikesPage/BikesPage";

export interface IPubliInfoProps {}
export type PageType = "Info" | "Bikes" | "Stations";

export interface IPubliInfoState {
  showMenu: boolean;
  activePage: PageType;
}

export default class PubliInfo extends React.Component<IPubliInfoProps, IPubliInfoState> {
  constructor(props: IPubliInfoProps) {
    super(props);
    this.state = { showMenu: false, activePage: "Bikes" };
  }
  onToggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  public render() {
    return (
      <>
        <AppHeader onNavigationChange={this.onNavigationChange} />
        {this.state.activePage === "Bikes" && <BikesPage />}
      </>
    );
  }
  onNavigationChange = (type: PageType) => {
    this.setState({ activePage: type, showMenu: false });
  };
}

/*

import React from "react";
import "./App.css";
import HeaderAppBar from "./Components/Header/HeaderAppBar";
export interface IAppProps {}

export interface IAppState {
  activePage: "Info" | "Bikes" | "Stations";
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      activePage: "Bikes"
    };
  }
  public render() {
    return (
      <div className="App">
        <HeaderAppBar onNavigationChange={this.onNavigationChange} />
      </div>
    );
  }
}


*/
