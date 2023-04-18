import { Given, Then } from "@wdio/cucumber-framework";
import request from "supertest";
import page from "../pageobjects/carrental_homepage.js";
import chai from "chai";
// setWorldConstructor(CustomVar);

Given(/^I am on the home page of demo site$/, async () => {
  //console.log(`Test ID: ${this.testID}`);
  //console.log(`Test ID: ${this.urlE2E}`);
  await browser.url("http://uitestingplayground.com/dynamictable");
  await browser.pause(1500);
});

Then(/^I check what I want$/, async () => {
  let colCount = await $$(`//div[@role='table']/div[2]/div/span`).length;
  //   chai.expect(rowCount).to.equal(5);
  console.log(`----------- number of rows: ${colCount}`);

  let table = [];
  let headers = [];
  let isChrome = false;
  for (let i = 0; i < colCount; i++) {
    let header = await $(
      `(//div[@role='table']/div[2]/div/span)[${i + 1}]`
    ).getText();
    headers.push(header);
    let row = [];
    for (let j = 0; j < colCount; j++) {
      if ((i + 1) < 5) {
        // check the location of Chrome
        let cell = await $(
          `//div[@role='table']/div[3]/div[${i + 1}]/span[${j + 1}]`
        ).getText();
        if(cell.trim() == "Chrome"){
          isChrome = true;
        }
        if(isChrome == true && cell.includes("%")){
          console.log("Chrome CPU%: " + cell)
          isChrome = false;
        }
        row.push(cell);
      }
    }
    if (row.length > 0) {
      table.push(row);
    }
  }
  table.unshift(headers);
  console.log(table);
  //await browser.debug();
});
