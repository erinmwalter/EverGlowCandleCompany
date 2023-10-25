import React, { Component } from 'react';
import { Container } from 'reactstrap';
import {NavMenu} from './NavMenu'

class Layout extends Component<LayoutProps> {
  static displayName = Layout.name;

  render() {
    return (
      <>
        <NavMenu />
        <Container>{this.props.children}</Container>
      </>
    );
  }
}

export default Layout;

type LayoutProps = LayoutContainerProps;

interface LayoutContainerProps {
  children: React.ReactNode;
}