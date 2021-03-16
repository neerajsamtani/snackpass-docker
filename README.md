![Image of Snackpass](https://www.snackpass.co/static/media/logo_round_2.d74f1dd2.png)

# Snackpass Full Stack Code Challenge
Welcome to the Snackpass Challenge. We really appreciate your time to participate. 

## The Challenge

Assume the customers around a campus order 5000 orders a day from 50 local restaurants. Each order contains one or multiple products. For eg, `2 burritos, a soda, and a side of chips`.

1. Design a full stack application which returns an infinite-scrolling list of trending products to the user.
2. A product can be qualified as trending if it is purchased at least once in last 48 hours
3. Each product should be tagged with two tags:
    * a recent purchase tag: `5 purchased recently`
    * a time tag `ordered 3 min ago`
4. Use a heuristic to determine which trending products gets returned higher. Base heuristic on both recency and number of recent purchases.

## Requirements
1. Implement a Full stack solution including web server, persistent storage and associated code
2. Please submit with in 72 hours from the time you accept invitation. 
3. You can use pseudocode for parts of web application. For instance, you could replace a function body with "assume this service has the following API."

## Practices
### Quality of code 
 Please use best practices for writing code and publish to this repo. 
### Q & A
 Please create an issue and tag @shrimuthu, @aduca98, @nprbst or @seankwalker for questions or review.
### Data
For sample data, use [Sample Orders](https://docs.google.com/spreadsheets/d/1xfAjSlBflehOYj4O7I2YkfcBB1b9VgSHg9X-SmRWmsE/edit#gid=280279953)

Note: Remember to insert your own random timestamps to fit within 48 hours window.
 
## Solution

### How I solved the problem

...to

## Setup and Run

### 1. Simulate the data
```
cd mongo && python create_data.py && cd ..
```

### 2. Compose the containers
```
docker-compose -f dev-docker-compose.yml up --build
```

### 3. Setup a records in the database to retrieve
Run this command in a separate terminal
```
docker exec snackpass-docker_db_1 mongoimport --type csv -d db -c orders --headerline --drop ordersWithTime.csv
```

### 4. View the applicaton
Visit http://localhost:3000/ to view the trending products on Snackpass!
