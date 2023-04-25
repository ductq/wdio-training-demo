automation-training-demo
This is a demo project for automation training. It includes various dependencies for running end-to-end, API, and exercise tests using WebDriverIO, Cucumber, and Chai.

Installation

To install the project dependencies, run the following command:
npm install

Usage
The following scripts are available for running tests:

demo-all: run all tests with debug mode off and headless mode off
test:exercise: run exercise tests with debug mode on and headless mode on, and output the results to a file called output.txt
test:e2e: run end-to-end tests with debug mode off and headless mode off
test:api: run API tests with debug mode off and headless mode off
test:test: run general tests with debug mode off and headless mode off

To run a specific script, use the following command:
npm run [script-name]

For example, to run the test:exercise script, use the following command:
npm run test:exercise

An allure report is newly generated after every run, run "allure open" in console to check it


Dependencies
@types/chai: "^4.3.4"
@types/supertest: "^2.0.12"
@wdio/allure-reporter: "^8.6.8"
@wdio/cli: "^8.6.9"
@wdio/cucumber-framework: "^8.6.9"
@wdio/local-runner: "^8.6.9"
@wdio/spec-reporter: "^8.6.8"
allure-commandline: "^2.21.0"
chai: "^4.3.7"
chromedriver: "^112.0.0"
geckodriver: "^3.2.0"
http-status-codes: "^2.2.0"
moment: "^2.29.4"
supertest: "^6.3.3"
ts-node: "^10.9.1"
typescript: "^5.0.3"
wdio-chromedriver-service: "^8.1.1"
wdio-geckodriver-service: "^4.1.1"
wdio-intercept-service: "^4.4.0"
License
