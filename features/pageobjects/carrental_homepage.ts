import { ChainablePromiseElement } from "webdriverio";

import chai from "chai";
import AbstractPage from "./abstract_page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CarRentalPageObject extends AbstractPage {
  constructor() {
    super();
  }

  get pickupLocation() {
    return $("//*[contains(@id,'select2-pickup_location')]");
  }

  get pickupLocationField() {
    return $("//*[contains(@aria-controls,'select2-pickup_location')]");
  }

  get sameLocationCheckBox() {
    return $('(//label[@for="chkbox1"])[1]');
  }

  get returnLocation() {
    return $("//*[contains(@id,'select2-dropoff_location')]");
  }

  get returnLocationField() {
    return $("//*[contains(@aria-controls,'select2-dropoff_location')]");
  }

  get startDate() {
    return $(".js-search-box-start-datepicker");
  }

  get endDate() {
    return $(".js-search-box-end-datepicker");
  }

  get startTime() {
    return $("//*[contains(@id,'select2-start_time')]");
  }

  get endTime() {
    return $("//*[contains(@id,'select2-end_time')]");
  }

  get countryAndAge() {
    return $("#chkbox2");
  }

  get country() {
    return $("//*[contains(@id,'select2-country')]");
  }

  get age() {
    return $('*[name="age"]');
  }

  get submitBtn() {
    return $('//div[@class="section-submit"]/button');
  }

  async scrollInside(selector, scrollAmount) {
    browser.execute(
      (selector, scrollAmount) => {
        var e = document.querySelector(`${selector}`);
        e.scrollTop = e.scrollTop + parseInt(`${scrollAmount}`);
      },
      selector,
      scrollAmount
    );
  }

  async processResultDDL(element: WebdriverIO.Element, key: string) {
    await browser.pause(3000);
    let eleList = await $$("[class='select2-results__option'][role='option']");
    let matchFound = false;
    let randomIndex = Math.floor(Math.random() * eleList.length);
    //await browser.debug();
    if (key === "") {
      // console.log(`Element in list at 0: ${await eleList[0].getText()}`);
      // console.log(`Element in list: ${await eleList[randomIndex].getText()}`);
      //let resultDDL = await $('//span[@class="select2-results"]'); ul.select2-results__options:nth-child(2)
      // (//ul[@class="select2-results__options"])[2]
      let ele = await eleList[randomIndex];
      console.log(ele.getText());
      while (!(await ele.isDisplayedInViewport())) {
        this.scrollInside('ul.select2-results__options:nth-child(2)', 100);
        await browser.pause(1000);
      }
      this.click(ele);
    } else {
      eleList.forEach(async (e, index) => {
        await e.getText().then(async (text) => {
          if (text === key) {
            await this.click(e);
            console.log(`Match found at index ${index}: ${text}`);
            matchFound = true;
          }
        });

        if (matchFound) {
          return false; // exit the loop if match is found
        }
      });
    }
  }

  async dropDownListHandler(
    element: WebdriverIO.Element,
    input: string,
    key: string
  ) {
    //await this.click(await element);
    await this.typeInto(element, input);
    await this.processResultDDL(element, key);
  }
  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to submit test data
   */
  async inputCarRentalInfo(
    pLocation,
    rLocation,
    sDate,
    sTime,
    eDate,
    eTime,
    country,
    age
  ) {
    console.log("Pick up Location");
    await this.click(await this.pickupLocation);
    await this.dropDownListHandler(
      await this.pickupLocationField,
      pLocation,
      ""
    );
    //await browser.debug();

    await (await this.sameLocationCheckBox).click();

    console.log("Return Location");
    await this.dropDownListHandler(await this.returnLocation, rLocation, "");

    console.log("Start date");
    await (await this.startDate).setValue(sDate);

    console.log("Start time");
    await this.dropDownListHandler(await this.startTime, sTime, "");

    console.log("End date");
    await (await this.endDate).setValue(eDate);

    console.log("End time");
    await this.dropDownListHandler(await this.endTime, eTime, "");

    await (await this.countryAndAge).click();

    console.log("Country");
    await this.dropDownListHandler(await this.country, country, "");

    console.log("Age");
    await this.age.setValue(age);
  }

  async submit() {
    await browser.pause(5000);
    console.log("Submit");
    await this.submitBtn.click();
    await browser.debug();
  }
}

export default new CarRentalPageObject();
