import React, {useState, createContext} from "react";

const RestaurantsContext = createContext();

const RestaurantsProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    }

    return(
        <RestaurantsContext.Provider value={{
            restaurants,
            setRestaurants,
            addRestaurant,
            selectedRestaurant,
            setSelectedRestaurant
        }}>
            {props.children}
        </RestaurantsContext.Provider>
    )

}

export {RestaurantsContext, RestaurantsProvider};