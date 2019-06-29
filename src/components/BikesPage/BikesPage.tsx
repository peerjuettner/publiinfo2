import * as React from "react";
import { Map, Marker, TileLayer, ZoomControl } from "react-leaflet";

export interface IBikesPageProps {}

export interface IBikesPageState {
  lat: number;
  lng: number;
  zoom: number;
}

export default class BikesPage extends React.Component<IBikesPageProps, IBikesPageState> {
  constructor(props: IBikesPageProps) {
    super(props);

    this.state = {
      lat: 46.948,
      lng: 7.4474,
      zoom: 13
    };
  }

  public render() {
    return (
      <>
        <Map center={[this.state.lat, this.state.lng]} zoom={13} zoomControl={false}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
        </Map>
      </>
    );
  }
}
