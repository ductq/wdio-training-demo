import {
  Given,
  When,
  Then,
} from "@wdio/cucumber-framework";
import HomePage from "../pageobjects/carrental_homepage.js";

Given(/^User at the home page of Airport Car Rental$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await HomePage.navigateTo("https://www.airportrentals.com/");
  await browser.refresh();
  // if (TestID == "TC-E2E-001a") {
  //   await browser.pause(10000);
  // }
  await browser.pause(7000)
});

When(
  /^User enter (.*), (.*), (.*), (.*), (.*), (.*), (.*) and (.*)$/,
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

When(/^User submit the form$/, async () => {
  await HomePage.submit();
});

Then(/^Validate the information after search$/, async() =>{
  await HomePage.validateInfo();
})
