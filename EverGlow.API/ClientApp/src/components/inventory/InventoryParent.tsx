import React, { Component } from "react";
import InventoryList from "./InventoryList";
import { Button, Col, NavLink, Row } from "reactstrap";

import { Link } from "react-router-dom";
import AddInventoryItem from "./AddItem";
import InventoryStats from "./InventoryStats";


class InventoryParent extends Component {

  render() {
    return (
      <>
      <Row>
        <Col md={5} style={{margin:"5px"}}>
          <AddInventoryItem/>
        </Col>
        <Col style={{margin:"5px"}}>
          <InventoryStats/>
        </Col>
      </Row>
      <Row>
        <Col style={{margin:"5px"}}>
          <InventoryList/>
        </Col>
       </Row>
      </>
    );
  }
}

export default InventoryParent;