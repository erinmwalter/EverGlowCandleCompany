import { Auth0ContextInterface, User, useAuth0, withAuth0 } from "@auth0/auth0-react";
import React, { Component } from "react";

import { Col, Row } from "reactstrap";
import InventoryList from "../inventory/InventoryList";
import OrderStatusList from "../order_status/OrderStatusList";

type AuthProps = {
  auth0: Auth0ContextInterface<User>;
};

class Home extends Component<AuthProps> {
  static displayName = Home.name;
  user?:User;

  constructor(props: AuthProps | Readonly<AuthProps>) {
    super(props);

    this.user = this.props.auth0.user;
    
  }

  render() {
    return (
      <>
      <Row style={{margin:"5px"}}>
        <Col>
          <OrderStatusList/>
        </Col>
      </Row>
      <Row style={{margin:"5px"}}>
        <Col>
          <InventoryList/>
        </Col>
       </Row>
      </>
    );
  }
}

export default  withAuth0(Home);