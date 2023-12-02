import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import  Home  from '../home/Home';
import Profile from './Profile';
import AddInventoryItem from '../inventory/AddItem';
import InventoryParent from '../inventory/InventoryParent';
import EditItem from '../inventory/EditItem';
import OrderStatusParent from '../order_status/OrderStatusParent';
import OrderDetails from '../order_status/OrderDetails';
import StorefrontParent from '../storefront/StorefrontParent';
import CustomizeItem from '../storefront/CustomizeItem';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory/add" element={<AddInventoryItem />} />
          <Route path="/inventory" element={<InventoryParent/>}/>
          <Route path="/inventory/:id" element={<EditItem/>}/>
          <Route path="/orders" element={<OrderStatusParent/>}/>
          <Route path="/orders/:id" element={<OrderDetails/>}/>
          <Route path="/storefront" element={<StorefrontParent/>}/>
          <Route path="/storefront/:id" element={<CustomizeItem/>}/>
        </Routes>
      </Layout>
    );
  }
}