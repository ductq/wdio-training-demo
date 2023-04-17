import { Given, Then } from "@wdio/cucumber-framework";
import fs from "fs";
import HomePage from "../pageobjects/carrental_homepage.js";
import chai from "chai";
// setWorldConstructor(CustomVar);

Given(/^I am on the home page of ACR$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await HomePage.navigateTo("https://www.airportrentals.com/");
  await browser.refresh();
  await browser.pause(2000);
});

Then(/^I get the branches data$/, async () => {
  const elements = await $$(".flag + label").filter(async (element) => {
    return await element.isDisplayed();
  });
  const results = await Promise.all(
    elements.map(async (element) => {
      return {
        label: await element.getText(),
        link: await (await element.parentElement()).getAttribute("href"),
      };
    })
  );
  let path = `${process.cwd()}/results/branches.json`;
  fs.writeFile(path, JSON.stringify(results), (err) => {
    if (err) throw err;
    console.log("Results saved to branches.json");
  });
});

Then(/^I get the reviews data$/, async () => {
  (await $(`.truspilot-desktop-widget-link`)).click()
  await browser.pause(3000)
  // Step 1: Locate the elements
  const reviews = await $$("div.tp-widget-review");

  // Step 2: Extract the information
  const data = await Promise.all(reviews.map(async (review) => {
    const stars = await (
      await review.$(".tp-stars").getAttribute("aria-label")
    ).match(/\d+/)[0];
    const source = await review.$(".tp-widget-review__source .label-text").getText();
    const date = await review.$(".tp-widget-review__date").getText();
    const text = await review.$(".text span").getText();
    const reply = await review.$(".reply .reply__text")?.getText() || null;
    const replyDate = await review.$(".reply .date")?.getText() || null;

    return { stars, source, date, text, reply, replyDate };
  }));

  // Step 3: Store the extracted information
  const jsonData = JSON.stringify(data);

  // Step 4: Write to a JSON file
  let path = `${process.cwd()}/results/reviews.json`;
  fs.writeFile(path, jsonData, (err) => {
    if (err) throw err;
    console.log("Results saved to reviews.json");
  });
});
