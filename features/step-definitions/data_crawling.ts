import { Given, Then } from "@wdio/cucumber-framework";
import fs from "fs";
import page from "../pageobjects/carrental_homepage.js";
import chai from "chai";
// setWorldConstructor(CustomVar);

Given(/^I am on the home page of ACR$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await page.navigateTo("https://www.airportrentals.com/");
  await browser.refresh();
  await browser.pause(7000);
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
  page.writeToJsonFile(results, "results/branches.json");
});

Then(/^I get the reviews data$/, async () => {
  (await $(`.truspilot-desktop-widget-link`)).click();
  await browser.pause(5000);
  
  const frame = await $(`//iframe[1]`);
  await browser.switchToFrame(frame);
  const reviews = await $$("div.tp-widget-review");
  console.log(`Total number of reviews: ${reviews.length}`);

  const data = await Promise.all(
    reviews.map(async (review) => {
      const starText = await review.$("#starRating");
      let star = await browser.execute((ele) => ele.textContent, starText);
      star = star.toString().split(" ")[0];
      const invited = (await review.$(".label-text").isExisting()) ? "Yes" : "No";
      const title = await review.$(`div.header:nth-child(odd)`).getText();
      let name = await review.$(".tp-widget-review__user-name").getText();
      name = name.slice(0,-1);
      const date = await review.$(".tp-widget-review__date").getText();
      let actualDate = await page.dateConvert(date);

      const comment = await review.$(".text span").getText();
      const replyText = await review.$(".reply .reply__text");
      const reply = await browser.execute((ele) => ele.textContent, replyText);
      const replyDate = await review.$(".reply .date").getText(); 
      let actualReplyDate = await page.dateConvert(replyDate);

      return {
        rating: star,
        invited,
        title,
        name,
        date: actualDate,
        comment,
        reply,
        replyDate: actualReplyDate,
      };
    })
  );
  console.log(data);
  page.writeToJsonFile(data, "results/reviews.json");
});
