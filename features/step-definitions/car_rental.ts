import { Given, When, Then, setWorldConstructor } from "@wdio/cucumber-framework";
// import {CustomVar} from "./global.js";
import HomePage from "../pageobjects/carrental_homepage.js";
import chai from "chai";
// setWorldConstructor(CustomVar);

Given(/^I am on the home page of Airport Car Rental$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await HomePage.navigateTo("https://www.airportrentals.com/");
  await browser.refresh();
  await browser.pause(2000);
});

Then(
  /^I enter (.*), (.*), (.*), (.*), (.*), (.*), (.*) and (.*)$/,
  async (
    pickupLocation,
    returnLocation,
    startDate,
    startTime,
    endDate,
    endTime,
    country,
    age
  ) => {
    await HomePage.inputCarRentalInfo(
      pickupLocation,
      returnLocation,
      startDate,
      startTime,
      endDate,
      endTime,
      country,
      age
    );
  }
);

Then(/^I search for the car$/, async () => {
  await HomePage.submit();
  await browser.waitUntil(() => {
    return browser.execute(() => {
      return document.readyState === 'complete';
    });
  }, {
    timeout: 10000, // maximum wait time in milliseconds
    timeoutMsg: 'Page did not finish loading' // error message to display if timeout occurs
  });
  expect(await browser.getUrl()).toContain("search");
});
