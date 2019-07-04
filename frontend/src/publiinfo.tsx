import * as React from "react";
import AppHeader from "./components/Header/Header";
import BikesPage from "./components/BikesPage/BikesPage";
import InfoPage from "./components/InfoPage/InfoPage";
import StationsPage from "./components/StationsPage/Stations";
import { Viewport } from "react-leaflet";

export interface IPubliInfoProps {}
export type PageType = "Info" | "Bikes" | "Stations";

export interface IPubliInfoState {
  showMenu: boolean;
  activePage: PageType;
  viewport: Viewport;
}

export default class PubliInfo extends React.Component<IPubliInfoProps, IPubliInfoState> {
  constructor(props: IPubliInfoProps) {
    super(props);
    this.state = { showMenu: false, activePage: "Stations", viewport: { center: [46.948, 7.4474], zoom: 10 } };
  }
  onToggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  public render() {
    return (
      <>
        <AppHeader onNavigationChange={this.onNavigationChange} />
        {this.state.activePage === "Bikes" && (
          <BikesPage updateViewport={this.updateViewport} viewport={this.state.viewport} />
        )}
        {this.state.activePage === "Info" && <InfoPage />}
        {this.state.activePage === "Stations" && (
          <StationsPage updateViewport={this.updateViewport} viewport={this.state.viewport} />
        )}
      </>
    );
  }
  onNavigationChange = (type: PageType) => {
    this.setState({ activePage: type, showMenu: false });
  };
  updateViewport = (viewport: Viewport) => {
    this.setState({ viewport });
  };
}
