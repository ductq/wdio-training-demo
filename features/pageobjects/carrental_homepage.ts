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

  /**
   * WIP
   * Function created in order to process the dropdown list results dynamically 
   * @param element 
   * @param key 
   */
  async processResultDDL(element: WebdriverIO.Element, key: string) {
    await browser.pause(3000);
    let eleList = await $$("[class='select2-results__option'][role='option']");
    let matchFound = false;
    let randomIndex = Math.floor(Math.random() * eleList.length);
    //await browser.debug();
    if (key === "") {
      console.log(`Element in list at 0: ${await eleList[0].getText()}`);
      console.log(`Element in list: ${await eleList[randomIndex].getText()}`);
      // await $(
      //   '((//ul[@class="select2-results__options"])[2])//child::li[0]'
      // ).click();
      await this.click(eleList[randomIndex]);
      //let resultDDL = await $('//span[@class="select2-results"]'); ul.select2-results__options:nth-child(2)
      // (//ul[@class="select2-results__options"])[2]

      //let ele = await eleList[0];
      // console.log(ele.getText());
      // while (!(await ele.isDisplayedInViewport())) {
      //   this.scrollInside('ul.select2-results__options:nth-child(2)', 100);
      //   await browser.pause(1000);
      // }
      // let ele = await $(
      //   '((//ul[@class="select2-results__options"])[2])//child::li[2]'
      // );
      // console.log(`Displayed? ${await ele.isDisplayed()}`);
      // console.log(`Text? ${await ele.getText()}`);
      // console.log(`Loading? ${await ele.isLoading()}`);
      // console.log(`DisplayedInVP? ${await ele.isDisplayedInViewport()}`);
      // console.log(`Click? ${await ele.isClickable()}`);
      // console.log(`Exist? ${await ele.isExisting()}`);
      // await browser.debug();
      // this.click(
      //   await $("#select2-pickup_location_id-ca-results > li:nth-child(6)")
      // );
      // console.log(await ele.getText());
      await browser.pause(60000);
      await browser.debug();
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
    //await this.click(await $('((//ul[@class="select2-results__options"])[2])//child::li[1]'))
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
    console.log("Same location checkbox status: " + chkBoxStatus)
    if (parseInt(chkBoxStatus) === 1) {
      await (await this.sameLocationCheckBox).click();
      await browser.pause(1000)
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
    //await (await this.startDate).setValue(sDate);

    console.log("Start time");
    await this.click(await this.startTime);
    await this.click(await $('((//ul[@class="select2-results__options"])[2])//child::li[1]'))
    // await this.dropDownListHandler(await this.startTime, sTime, "");

    console.log("End date");
    //await (await this.endDate).setValue(eDate);

    console.log("End time");
    await this.click(await this.endTime);
    await this.click(await $('((//ul[@class="select2-results__options"])[2])//child::li[1]'))
    // await this.dropDownListHandler(await this.endTime, eTime, "");

    await this.click(await this.countryAndAge);
    
    browser.debug();

    console.log("Country");
    await this.click(await this.country);
    await this.dropDownListHandler(
      await this.countryField,
      country,
      ""
    );

    console.log("Age");
    await this.age.setValue(age);
  }

  async submit() {
    console.log("Submit");
    await this.submitBtn.click();
  }
}

export default new CarRentalPageObject();
