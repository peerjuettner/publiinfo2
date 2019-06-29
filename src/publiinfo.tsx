import * as React from "react";
import AppHeader from "./components/Header/Header";
import BikesPage from "./components/BikesPage/BikesPage";
import InfoPage from "./components/InfoPage/InfoPage";

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
        {this.state.activePage === "Info" && <InfoPage />}
      </>
    );
  }
  onNavigationChange = (type: PageType) => {
    this.setState({ activePage: type, showMenu: false });
  };
}
