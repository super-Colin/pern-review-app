if( process.env.NODE_ENV === 'production' ){
  console.log('Looks like we are in production mode, skipping dotenv: ', process.env.NODE_ENV, process.env.);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
}else{
  require('dotenv').config();
  console.log('Looks like we are in development mode! Loading .env: ', process.env.NODE_ENV);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
}
const port = process.env.PORT || 3001;


const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static( __dirname + 'client/build' ));


// check for tables
async function checkTables() {
  try{
    const results = await db.query(`
      CREATE TABLE IF NOT EXISTS restaurants(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50),
        location VARCHAR(50),
        price_range INT
      );
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL NOT NULL PRIMARY KEY,
        restaurant_id INT NOT NULL REFERENCES restaurants(id),
        name VARCHAR(50) NOT NULL,
        review TEXT NOT NULL,
        rating INT NOT NULL check(
          rating >= 1
          and rating <= 5
        )
      );
    `);
    
    console.log('3 checked db tables')
    console.log('~~~~~~~~~~~~');
  }catch(err){
    console.log('3 error creating tables', err)
    console.log('~~~~~~~~~~~~');
  }
};
console.log('1 Running checkTables')
checkTables();
console.log('4 checkTables Done')
console.log('~~~~~~~~~~~~');




// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    console.log('Recieved restaurant GET:', req.url);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  try {
    //const results = await db.query("select * from restaurants");
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
      // "select * from restaurants;"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });

  } catch (err) {console.log(err);}
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log( 'recieved get by id: ', req.url);

  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    // select * from restaurants wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });

  } catch (err) {console.log(err);}
});

// Create a Restaurant

app.post("/api/v1/restaurants", async (req, res) => {
  console.log('Recieved restaurant POST:', req.url);


  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });

  } catch (err) {console.log(err);}
});

// Update Restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {
    console.log('Recieved put: ', req.params.id);
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        retaurant: results.rows[0],
      },
    });

  } catch (err) {console.log(err);}
});

// Delete Restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  console.log('Recieved restaurant DELETE:', req.url);
  try {
    const results = db.query("DELETE FROM restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });

  } catch (err) {console.log(err);}

});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  console.log('Recieved review POST:', req.url);
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview.rows);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });

  } catch (err) {console.log(err);}

});




app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
  console.log('~~~~~~~~~~~~~~~~~~~~');
});