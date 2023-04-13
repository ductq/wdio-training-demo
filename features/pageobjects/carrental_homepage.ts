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
    return $("//span[contains(@aria-labelledby, 'select2-pickup_location')]");
  }

  get pickupLocationField() {
    return $("//*[contains(@aria-controls,'select2-pickup_location')]");
  }

  get sameLocationCheckBox() {
    return $('//label[@class="label_chkbox"]');
  }

  get returnLocation() {
    return $("//span[contains(@aria-labelledby, 'select2-dropoff_location')]");
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
    return $('//label[@class="js-extra-info label_chkbox"]');
  }

  get country() {
    return $("//span[contains(@aria-labelledby, 'select2-country')]");
  }

  get countryField() {
    return $("//*[contains(@aria-controls,'select2-country')]");
  }

  get age() {
    return $('*[name="age"]');
  }

  get submitBtn() {
    return $('//div[@class="section-submit"]/button');
  }
  //Click on the first result of the dynamic drop down list
  async clickOnFirstResult() {
    await this.click(
      await $('((//ul[@class="select2-results__options"])[2])//child::li[1]')
    );
  }
  //Click on the random result of the dynamic drop down list
  async clickOnRandomResult(eList) {
    let randomIndex = Math.floor(Math.random() * eList.length);
    await this.click(eList[randomIndex]);
  }
  /**
   * WIP
   * Function created in order to process the dropdown list results dynamically
   * @param element
   * @param key
   */
  async processResultDDL(element: WebdriverIO.Element, key: string) {
    let eleList = await $$("[class='select2-results__option'][role='option']");
    let matchFound = false;
    if (key === "") {
      //await this.clickOnRandomResult(eleList);
      await this.clickOnFirstResult();
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
    let chkBoxStatus = await (await $("#chkbox1")).getValue();
    console.log("Same location checkbox status: " + chkBoxStatus);
    if (parseInt(chkBoxStatus) === 1) {
      await (await this.sameLocationCheckBox).click();
      await browser.pause(1000);
    }

    console.log("Pick up Location");
    await this.click(await this.pickupLocation);
    await this.dropDownListHandler(
      await this.pickupLocationField,
      pLocation,
      ""
    );

    console.log("Return Location");
    await this.click(await this.returnLocation);
    await this.dropDownListHandler(
      await this.returnLocationField,
      rLocation,
      ""
    );

    console.log("Start date");
    await (await this.startDate).setValue(sDate);

    console.log("Start time");
    await this.click(await this.startTime);
    await this.clickOnFirstResult();
    // await this.dropDownListHandler(await this.startTime, sTime, "");

    console.log("End date");
    await (await this.endDate).setValue(eDate);

    console.log("End time");
    await this.click(await this.endTime);
    await this.clickOnFirstResult();
    // await this.dropDownListHandler(await this.endTime, eTime, "");

    await this.click(await this.countryAndAge);

    console.log("Country");
    await this.click(await this.country);
    await this.dropDownListHandler(await this.countryField, country, "");

    console.log("Age");
    await this.age.setValue(age);
  }

  async submit() {
    console.log("Submit");
    await this.submitBtn.click();
  }
}

export default new CarRentalPageObject();
