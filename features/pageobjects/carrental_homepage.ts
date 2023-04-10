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
    return $('label[for="chkbox1"]:first-of-type');
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
  
  async processResultDDL(key: string) {
    let elements = await $$("[class='select2-results__option'][role='option']");
    let matchFound = false;
    let randomIndex = Math.floor(Math.random() * elements.length);
    for (let ele of elements){
      console.log(`Element in list: ${await ele.getText()}`);
    }
    //await browser.debug();
    if (key === "") {
        await (elements.at(randomIndex)).click()
    } 
    else {
      elements.forEach(async (element, index) => {
        await element.getText().then(async (text) => {
          if (text === key) {
            await this.click(element);
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

  async dropDownListHandler(element: WebdriverIO.Element | PromiseLike<WebdriverIO.Element>, input: string, key: string){
    //await this.click(await element);
    await this.typeInto(await element, input);
    await this.processResultDDL(key);
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
    await this.dropDownListHandler(this.pickupLocationField, pLocation, "");
    //await browser.debug();

    await (await this.sameLocationCheckBox).click();

    console.log("Return Location");
    await this.dropDownListHandler(this.returnLocation, rLocation, "");

    console.log("Start date");
    await (await this.startDate).setValue(sDate);

    console.log("Start time");
    await this.dropDownListHandler(this.startTime, sTime, "");

    console.log("End date");
    await (await this.endDate).setValue(eDate);

    console.log("End time");
    await this.dropDownListHandler(this.endTime, eTime, "");

    await (await this.countryAndAge).click();

    console.log("Country");
    await this.dropDownListHandler(this.country, country, "");

    console.log("Age");
    await this.age.setValue(age);
  }

  async submit(){
    await browser.pause(5000);
    console.log("Submit");
    await this.submitBtn.click();
    await browser.debug();
  }
}

export default new CarRentalPageObject();
