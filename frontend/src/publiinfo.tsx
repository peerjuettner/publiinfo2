import * as React from "react";
import AppHeader from "./components/Header/Header";
import BikesPage from "./components/BikesPage/BikesPage";
import InfoPage from "./components/InfoPage/InfoPage";
import StationsPage from "./components/StationsPage/Stations";
import { Viewport } from "react-leaflet";
import Axios from "axios";

export interface IPubliInfoProps {}
export type PageType = "Info" | "Bikes" | "Stations";

export interface IPubliInfoState {
  showMenu: boolean;
  activePage: PageType;
  viewport: Viewport;
  stations: Array<Station> | null;
}

export default class PubliInfo extends React.Component<IPubliInfoProps, IPubliInfoState> {
  constructor(props: IPubliInfoProps) {
    super(props);
    this.state = {
      showMenu: false,
      activePage: "Stations",
      viewport: { center: [46.948, 7.4474], zoom: 10 },
      stations: null
    };
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
          <StationsPage
            stations={this.state.stations}
            updateViewport={this.updateViewport}
            viewport={this.state.viewport}
          />
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

  async componentDidMount() {
    const st = await getStations();
    this.setState({ stations: st! });
  }
}

const getStations = async () => {
  try {
    return (await Axios.get<Array<Station>>("http://localhost:3001/api/stations")).data;
  } catch (error) {
    console.error(error.response);
  }
};

export interface Station {
  _id: number;
  lat: number;
  long: number;
  state: number;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  network: string;
  created: Date;
  station: number;
}
