import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu'
import { Footer } from './Footer';

class Layout extends Component<LayoutProps> {
  static displayName = Layout.name;

  render() {
    return (
      <>
        <NavMenu />
        <Container>{this.props.children}</Container>
        {/* <Footer /> */}
      </>
    );
  }
}

export default Layout;

type LayoutProps = LayoutContainerProps;

interface LayoutContainerProps {
  children: React.ReactNode;
}