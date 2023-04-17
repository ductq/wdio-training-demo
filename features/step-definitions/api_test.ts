import { Given, Then } from "@wdio/cucumber-framework";
import request from "supertest";
import page from "../pageobjects/carrental_homepage.js";
import chai from "chai";
// setWorldConstructor(CustomVar);

Given(/^I am on the home page of demoqa$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await page.navigateTo("https://demoqa.com/links");
  await browser.pause(1500);
});

Then(/^I check responses of the links$/, async () => {
  await browser.setupInterceptor();
  let ele = await $(`#created`);
 // let createdMock = await browser.mock('**/created', {method: 'get'})
  await ele.click();
  await browser.pause(3000)
  await browser.expectRequest('GET','https://demoqa.com/created', 201);
  //console.log(createdMock);
  //await browser.debug();

});
