import React, { RefObject } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import BikeIcon from "@material-ui/icons/DirectionsBike";

import MenuIcon from "@material-ui/icons/Menu";
import StationIcon from "@material-ui/icons/EvStation";
import InfoIcon from "@material-ui/icons/Info";
import { PageType } from "../../publiinfo";

export interface IHeaderState {
  showMenu: boolean;
}
interface IHeaderProps {
  onNavigationChange: (page: PageType) => void;
}

type MenuItem = { Text: PageType; Icon: any };

export default class AppHeader extends React.Component<IHeaderProps, IHeaderState> {
  private anchorRef: RefObject<Element>;
  constructor(props: any) {
    super(props);
    this.state = { showMenu: false };
    this.anchorRef = React.createRef();
  }
  public render() {
    const menuItems = Array<MenuItem>(
      { Text: "Bikes", Icon: <BikeIcon /> },
      { Text: "Stations", Icon: <StationIcon /> },
      { Text: "Info", Icon: <InfoIcon /> }
    );
    return (
      <div>
        <AppBar position="static">
          <Toolbar ref={this.anchorRef}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Menu"
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">PubliInfo</Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.showMenu} onClose={() => this.setState({ showMenu: false })}>
          <List>
            {menuItems.map(menuitem => (
              <ListItem button key={menuitem.Text} onClick={() => this.props.onNavigationChange(menuitem.Text)}>
                <ListItemIcon>{menuitem.Icon}</ListItemIcon>
                <ListItemText primary={menuitem.Text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}
