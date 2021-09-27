import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

export const RestaurantsProvider = (props) => {
    const [Restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurant = (Restaurant) => {
        setRestaurants([...Restaurants, Restaurant]);
    }

    return(
        <RestaurantsContext.Provider value={{
            Restaurants,
            setRestaurants,
            addRestaurant,
            selectedRestaurant,
            setSelectedRestaurant
        }}>
            {props.children}
        </RestaurantsContext.Provider>
    )

}
