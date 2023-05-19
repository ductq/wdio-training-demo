import {
  Given,
  When,
  Then,
} from "@wdio/cucumber-framework";
import HomePage from "../pageobjects/carrental_homepage.js";

Given(/^User at the home page of Airport Car Rental$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await browser.pause(2000)
  await HomePage.navigateTo("https://www.airportrentals.com/");
  //await browser.pause(2000)
  if (TestID == "TC-E2E-001a" || TestID == "TC-E2E-001g") {
    await browser.pause(7000);
  }
  //await browser.pause(8000)
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

When(/^User change desired options$/, async () => {
  await HomePage.changeOptions();
});

Then(/^Verify that the search results include the correct information$/, async() =>{
  await HomePage.validateCarListingResult();
  await browser.debug();
  //await browser.closeWindow();
})

