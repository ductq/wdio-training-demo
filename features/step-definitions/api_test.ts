import { Given, Then } from "@wdio/cucumber-framework";
import request from "supertest";
import page from "../pageobjects/carrental_homepage.js";
import chai from "chai";
import fs from "fs";
import demoPage from "../pageobjects/demoqa_page.js";

Given(/^I am on the home page of demoqa$/, async () => {
  // console.log(`Test ID: ${this.urlE2E}`);
  await demoPage.navigateTo("https://demoqa.com/links");
  //await browser.setupInterceptor();
});

/**
 * Test demoqa with wdio-intercept-service
 */
Then(/^I check responses of the links$/, async () => {
  await demoPage.checkAllLinks();
});

Then(/^I check login feature$/, async () => {
  await demoPage.navigateTo("https://demoqa.com/");
  await demoPage.loginRequest();
});
/**
 * Test demoqa with mock
 */
// Then(/^I check responses of the links$/, async () => {
//   await browser.url("https://demoqa.com/links");
//   //await browser.setupInterceptor();
//   let mockGet = await browser.mock("https://demoqa.com/*");
//   //let request = await browser.getRequests();
//   //let ele = await $(`#created`);
//   let created = await $(`//*[@id="created"]`);
//   let nocontent = await $(`//*[@id="no-content"]`);
//   let moved = await $(`//*[@id="moved"]`);
//   let badrequest = await $(`//*[@id="bad-request"]`);
//   let unauthorized = await $(`//*[@id="unauthorized"]`);
//   let forbidden = await $(`//*[@id="forbidden"]`);
//   let notfound = await $(`//*[@id="invalid-url"]`);
//   let home = await $(`//*[@id="simpleLink"]`);
//   await created.click();
//   await browser.pause(1000);
//   await nocontent.click();
//   await browser.pause(1000);
//   await moved.click();
//   await browser.pause(1000);
//   await badrequest.click();
//   await browser.pause(1000);
//   await unauthorized.click();
//   await browser.pause(1000);
//   await forbidden.click();
//   await browser.pause(1000);
//   await notfound.click();
//   await browser.pause(1000);
//   await home.click();
//   await browser.pause(3000);
//   //console.log(mockGet);
//   console.log(JSON.stringify(mockGet.calls[0].headers));
//   console.log(JSON.stringify(mockGet.calls[0].responseHeaders));
//   //let request = await browser.getRequests();
//   //let request2 = await browser.getRequests();
//   //console.log(request)
//   //console.log(request2)
//   //await browser.expectRequest('GET', '/created', 400);
//   //await browser.debug();
//   let path = `${process.cwd()}/apiTest.json`;
//   fs.writeFile(path, JSON.stringify(mockGet), (err) => {
//     if (err) throw err;
//     console.log("Results saved to apiTest.json");
//   });
// });

/**
 * Test pokeapi with mock
 */
// Then(/^I check responses of the links$/, async () => {
//   let mockGet = await browser.mock("**");
//   let pkm = await $(`//*[@id="url-input"]`);
//   await pkm.setValue("pokemon/pikachu");
//   await browser.pause(2000)
//   let ele = await $(`//*[@id="site-content"]/div[3]/div/div[1]/form/button`);
//   //let ele = await $(`#created`);
//   await ele.click();
//   await browser.pause(2000)
//   //let request = await (await browser).getRequests();
//   //console.log(request)
//   //await browser.debug();
//   console.log(mockGet);
//   console.log(mockGet.calls[0].body);
//   console.log(mockGet.calls[0].headers);
// });
