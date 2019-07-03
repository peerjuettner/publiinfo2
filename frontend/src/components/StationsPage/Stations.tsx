import * as React from "react";
import { Map, TileLayer, ZoomControl, Viewport, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { Typography, List, ListItem, ListItemIcon, ListItemText, Drawer } from "@material-ui/core";
import BikeIcon from "@material-ui/icons/DirectionsBike";
import PowerIcon from "@material-ui/icons/Power";

interface Station {
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

interface Bike {
  id: number;
  name: string;
  type: number;
  station: number;
}

export interface IStationsPageProps {
  updateViewport: (viewport: Viewport) => void;
  viewport: Viewport;
}

export interface IStationsPageState {
  stations: Array<Station> | undefined;
  bikes: Array<Bike>;
  showBikes: boolean;
}

export default class StationsPage extends React.Component<IStationsPageProps, IStationsPageState> {
  constructor(props: IStationsPageProps) {
    super(props);
    this.state = {
      stations: [],
      bikes: [],
      showBikes: false
    };
  }

  public render() {
    const customMarker = L.icon({ iconUrl: require("../../images/location.svg"), iconAnchor: [12, 0] });
    const { bikes, stations } = this.state;
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
                onClick={() => getBikesForStations(s._id).then(res => this.setState({ bikes: res!, showBikes: true }))}
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
          anchor="right"
          open={this.state.showBikes && this.state.bikes.length !== 0}
          onClose={() => this.setState({ showBikes: false })}
        >
          <List>
            {bikes &&
              bikes.map(bike => (
                <ListItem button key={bike.name} onClick={() => console.log("clicked on bike " + bike.name)}>
                  <ListItemIcon>{bike.type === 2 ? <PowerIcon /> : <BikeIcon />}</ListItemIcon>
                  <ListItemText primary={bike.name} />
                </ListItem>
              ))}
          </List>
        </Drawer>
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

const getBikesForStations = async (id: number) => {
  try {
    return (await axios.get<Array<Bike>>(`http://localhost:3001/api/station/bikes/${id}`)).data;
  } catch (error) {
    console.error(error.response);
  }
};
