-- run as postgres user to create user and database on localhost
CREATE USER reviews WITH PASSWORD 'reviews123';
CREATE DATABASE reviews;
GRANT ALL PRIVILEGES ON DATABASE reviews TO reviews;


-- help \?
-- connect to db \c db_name
-- display all relations \d
-- display tables \dt


CREATE TABLE restaurants(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT
);


CREATE TABLE reviews (
    id SERIAL NOT NULL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);
select *
from restaurants
    left join(
        select restaurant_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id;