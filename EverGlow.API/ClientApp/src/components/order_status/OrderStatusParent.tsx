import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import OrderStatusList from "./OrderStatusList";
import OrderStatusStats from "./OrderStatusStats";


class OrderStatusParent extends Component {

  render() {
    return (
      <>
      <Row style={{marginBottom:"5px"}}>
        <Col>
            <OrderStatusStats/>
        </Col>
      </Row>
      <Row>
        <Col>
            <OrderStatusList/>
        </Col>
       </Row>
      </>
    );
  }
}

export default OrderStatusParent;