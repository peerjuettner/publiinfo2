import * as React from "react";
import { Map, TileLayer, ZoomControl, Viewport } from "react-leaflet";

export interface IBikesPageProps {
  updateViewport: (viewport: Viewport) => void;
  viewport: Viewport;
}

export interface IBikesPageState {}

export default class BikesPage extends React.Component<IBikesPageProps, IBikesPageState> {
  constructor(props: IBikesPageProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <Map
          center={this.props.viewport.center!}
          zoom={13}
          zoomControl={false}
          onViewportChanged={this.props.updateViewport}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
        </Map>
      </>
    );
  }

  componentWillUnmount = () => {
    //this.props.updateMapState(this.state.lat, this.state.lng, this.state.zoom);
  };
}
