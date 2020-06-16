# portfolio project

## Setup:
 - run npm i
 - pip install requests
 - Go to https://financialmodelingprep.com/developer/docs/ and get an api key
 - put that api key into sample.py or appropriate request payload

## How to run
 - npm start
 - python sample.py 

## How to run tests
 - npm test
 - ^this is currently not operational

## technologies used:
 - nodejs for most logic
 - koa for endpoints
 - python consumes endpoints and makes a csv

## Assumptions
 - The stock market is not open on 1/1/2019, so I have assumed it is safe for the data to start as soon as it becomes available on 1/2/2019.
 - The data coming from this API is factual and complete
 - An API Key exists for corporate usage and exceeds the 250 trial limit

## Future work to do
 - write unit tests
 - containerize the application
 - write integration tests
 - refactor based on test writing
