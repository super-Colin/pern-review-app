import React from 'react'
import RestuarantFinder from '../apis/RestuarantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'


const AddRestaurant = () => {

  const {addRestuarant} = React.useContext(RestaurantsContext);
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [priceRange, setPriceRange] = React.useState('Price Range');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestuarantFinder.post('/', {name, location, price_range: priceRange});
      console.log(response.data.data);
      addRestuarant(response.data);
    } catch (err){
      console.log(err);
    }
  }


  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
