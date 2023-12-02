import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import FeaturedItemsList from "./FeaturedItemsList";


class StorefrontParent extends Component {

  render() {
    return (
      <>
      <Row style={{marginBottom:"5px"}}>
        <Col>
            <FeaturedItemsList/>
        </Col>
      </Row>
      <Row>
        <Col>
       
        </Col>
       </Row>
      </>
    );
  }
}

export default StorefrontParent;