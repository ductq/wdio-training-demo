import { Given, Then } from "@wdio/cucumber-framework";
import fs from "fs";
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

Then(/^I get the branches data$/, async () => {
  const elements = $$(".flag + label");

  const results = elements.map(async (element) => {
    return {
      label: await element.getText(),
      link: await element.getAttribute("href"),
    };
  });
  let path = `${process.cwd}/results/branches.json`;
  fs.writeFile(path, JSON.stringify(results), (err) => {
    if (err) throw err;
    console.log("Results saved to results.json");
  });
});

Then(/^I get the reviews data$/, async () => {
  // Step 1: Locate the elements
  const reviews = await $$("div.tp-widget-review");

  // Step 2: Extract the information
  const data = reviews.map(async (review) => {
    const stars = await (
      await review.$(".tp-stars").getAttribute("aria-label")
    ).match(/\d+/)[0];
    const source = review.$(".tp-widget-review__source .label-text").getText();
    const date = review.$(".tp-widget-review__date").getText();
    const text = review.$(".text span").getText();
    const reply = review.$(".reply .reply__text")?.getText() || null;
    const replyDate = review.$(".reply .date")?.getText() || null;

    return { stars, source, date, text, reply, replyDate };
  });

  // Step 3: Store the extracted information
  const jsonData = JSON.stringify(data);

  // Step 4: Write to a JSON file
  fs.writeFileSync("reviews.json", jsonData);
});
