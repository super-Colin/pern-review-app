import React from 'react'
import UpdateRestaurant from "../components/UpdateRestaurant";
import Header from "../components/Header";

// import StateDebug from "../components/StateDebug";

const UpdatePage = () => {
  return (
    <div>
      <Header />
      <h1 className="text-center">Update Restaurant</h1>
      <UpdateRestaurant />
      {/* <StateDebug /> */}
    </div>
  );
};

export default UpdatePage;
