import { Given, Then } from "@wdio/cucumber-framework";
import fs from "fs";
import HomePage from "../pageobjects/carrental_homepage.js";
import chai from "chai";
// setWorldConstructor(CustomVar);

Given(/^I am on the home page of playground$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await HomePage.navigateTo("http://uitestingplayground.com/");
  await browser.refresh();
  await browser.pause(2000);
});

// Then(/^I interact with Ajax$/, async () => {
//   (await $(`#ajaxButton`)).click();
// });
Then(/^I interact with Ajax$/, async () => {
  await browser.scroll(0, 200);
  await $(`=AJAX Data`).click();
  await browser.pause(3000);

  const element = await browser.$(`#ajaxButton`);
  console.log("Clickable " + await element.isClickable())
  console.log("Load " + await element.isLoading())
  console.log("Display " + await element.isDisplayed())
  console.log("Display in VP " + await element.isDisplayedInViewport())
  console.log("Size " + await element.getSize())
  //await browser.debug();
  //   await element.waitForClickable({ timeout: 6000 });
  //   let clickable = await element.isClickable()
  //     console.log(clickable)
  //     await browser.waitUntil(()=>element.isClickable())
  // await element.scrollIntoView();
  //   let ajaxButton =  $(`#ajaxButton`);
  //   let buttonDisplayed = await ajaxButton.isDisplayed();
  await element.waitForDisplayed({ timeout: 20000 });
  await element.click();
  //   if (buttonDisplayed) {
  // await ajaxButton.click();
  //   } else {
  //     console.log("-----------------Button is not displayed yet");
  //   }
  //   await $(`#ajaxButton`).click()
  let loadLabel = await browser.$(".bg-success");
  await loadLabel.waitForDisplayed({ timeout: 30000 });

  const labelText = await loadLabel.getText();
  await loadLabel.click();

  console.log(`Clicked on label text: ${labelText}`);
});
