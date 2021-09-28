import React from 'react'
import Header from '../components/Header';
import AddRestaurant from '../components/AddRestaurant';
import RestaurantList from '../components/RestaurantList';
import StateDebug from "../components/StateDebug";

const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
      <StateDebug />
    </div>
  )
}

export default Home
