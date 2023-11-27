import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import  Home  from '../home/Home';
import Profile from './Profile';
import AddInventoryItem from '../inventory/AddItem';
import InventoryParent from '../inventory/InventoryParent';
import EditItem from '../inventory/EditItem';

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
        </Routes>
      </Layout>
    );
  }
}