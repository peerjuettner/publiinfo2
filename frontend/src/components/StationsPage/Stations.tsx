import * as React from "react";
import { Map, TileLayer, ZoomControl, Viewport, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { Typography, List, ListItem, ListItemIcon, ListItemText, Drawer } from "@material-ui/core";
import BikeIcon from "@material-ui/icons/DirectionsBike";
import PowerIcon from "@material-ui/icons/Power";
import { Station } from "../../publiinfo";

interface Bike {
  id: number;
  name: string;
  biketype: number;
  station: number;
}

export interface IStationsPageProps {
  updateViewport: (viewport: Viewport) => void;
  viewport: Viewport;
  stations: Array<Station> | null;
}

export interface IStationsPageState {
  bikes: Array<Bike>;
  currentStation: Station | null;
}

export default class StationsPage extends React.Component<IStationsPageProps, IStationsPageState> {
  constructor(props: IStationsPageProps) {
    super(props);
    this.state = {
      bikes: [],
      currentStation: null
    };
  }

  public render() {
    const customMarker = L.icon({ iconUrl: require("../../images/location.svg"), iconAnchor: [12, 0] });
    const { bikes, currentStation } = this.state;
    const { stations } = this.props;
    return (
      <>
        <Map center={this.props.viewport.center!} zoom={this.props.viewport.zoom!} zoomControl={false}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          {stations &&
            stations.map(s => (
              <Marker
                icon={customMarker}
                position={[s.lat, s.long] as [number, number]}
                key={s._id}
                onClick={() =>
                  getBikesForStations(s._id).then(res => this.setState({ bikes: res!, currentStation: s! }))
                }
              >
                <Popup>
                  <Typography variant="h6" gutterBottom>
                    {s.name}
                  </Typography>
                </Popup>
              </Marker>
            ))}
        </Map>
        <Drawer
          className={"drawer-right"}
          variant="persistent"
          anchor="right"
          open={currentStation !== null && this.state.bikes.length !== 0}
          onClose={() => this.setState({ currentStation: null })}
        >
          {currentStation && (
            <>
              <Typography variant="h4" className={"drawer-right-title"}>
                {currentStation.name}
              </Typography>
              <Typography variant="h5">
                {`${currentStation.address}, ${currentStation.zipcode} ${currentStation.city}`}
              </Typography>
            </>
          )}
          <List>
            {bikes &&
              bikes.map(bike => (
                <ListItem button key={bike.name} onClick={() => console.log("clicked on bike " + bike.biketype)}>
                  <ListItemIcon>{bike.biketype === 2 ? <PowerIcon /> : <BikeIcon />}</ListItemIcon>
                  <ListItemText primary={bike.name} />
                </ListItem>
              ))}
          </List>
        </Drawer>
      </>
    );
  }
}

const getBikesForStations = async (id: number) => {
  try {
    return (await axios.get<Array<Bike>>(`/api/station/bikes/${id}`)).data;
  } catch (error) {
    console.error(error.response);
  }
};
