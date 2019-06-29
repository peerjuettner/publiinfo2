import * as React from "react";

export interface IBikesPageProps {}

export interface IBikesPageState {}

export default class BikesPage extends React.Component<IBikesPageProps, IBikesPageState> {
  constructor(props: IBikesPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>{"Bikes"}</div>;
  }
}
