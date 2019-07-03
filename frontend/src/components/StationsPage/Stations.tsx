import * as React from "react";
import { Map, TileLayer, ZoomControl, Viewport, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";

type Station = {
  _id: number;
  lat: number;
  long: number;
  state: number;
  name: String;
  address: String;
  zipcode: String;
  city: String;
  network: String;
  created: Date;
  station: number;
};

export interface IStationsPageProps {
  updateViewport: (viewport: Viewport) => void;
  viewport: Viewport;
}

export interface IStationsPageState {
  stations: Array<Station>;
}

export default class StationsPage extends React.Component<IStationsPageProps, IStationsPageState> {
  constructor(props: IStationsPageProps) {
    super(props);
    this.state = {
      stations: []
    };
  }

  public render() {
    const customMarker = L.icon({ iconUrl: require("../../images/location.svg") });

    return (
      <>
        <Map center={this.props.viewport.center!} zoom={this.props.viewport.zoom!} zoomControl={false}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          {this.state.stations &&
            this.state.stations.map(s => (
              <Marker icon={customMarker} position={[s.lat, s.long] as [number, number]} key={s._id}>
                <Popup>{"This is a test"}</Popup>
              </Marker>
            ))}
        </Map>
      </>
    );
  }
  async componentDidMount() {
    const st = await getStations();
    this.setState({ stations: st! });
  }
}

const getStations = async () => {
  try {
    return (await axios.get<Array<Station>>("http://localhost:3001/api/stations")).data;
  } catch (error) {
    console.error(error.response);
  }
};
