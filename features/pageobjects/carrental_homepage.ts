import { ChainablePromiseElement } from "webdriverio";

import chai, { should } from "chai";
import AbstractPage from "./abstract_page.js";
/**
 * sub page containing specific selectors and methods for a specific page
 */
class CarRentalPageObject extends AbstractPage {
  infoToValidate: any;
  constructor() {
    super();
    this.infoToValidate = {
      pLocation: "" ,
      rLocation: "",
      sDate: "",
      sTime: "any",
      eDate: "",
      eTime: "",
      country: "",
      age: ""
    }
  }
  
  get pickupLocation() {
    return $("//span[contains(@id,'select2-pickup_location')]");
  }

  get pickupLocationField() {
    return $("//*[contains(@aria-controls,'select2-pickup_location')]");
  }

  get sameLocationCheckBox() {
    return $('//label[@class="label_chkbox"]');
  }

  get returnLocation() {
    return $("//span[contains(@id,'select2-dropoff_location')]");
  }

  get returnLocationField() {
    return $("//*[contains(@aria-controls,'select2-dropoff_location')]");
  }

  get startDate() {
    return $(".js-datepicker-start");
  }

  get endDate() {
    return $(".js-datepicker-end");
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
    return $("//span[contains(@id, 'select2-country')]");
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
   * @param key (string) matching string
   */
  async processResultDDL(key: string) {
    let eleList = await $$("[class='select2-results__option'][role='option']");
    if (key === "") {
      //await this.clickOnRandomResult(eleList);
      await this.clickOnFirstResult();
    } else {
      for (let e of eleList) {
        if ((await e.getText()) === key) {
          await this.click(e);
          break;
        }
      }
    }
  }

  async dropDownListHandler(
    element: WebdriverIO.Element,
    input: string,
    key: string
  ) {
    if (key === "") {
      await this.typeInto(element, input);
    }
    await this.processResultDDL(key);
  }

  async dateTimePickerHandler(dateInput: string) {
    let dateSplit = dateInput.split("-");
    let year = dateSplit[2].trim();
    let month = dateSplit[1].trim();
    let day = dateSplit[0].trim();

    const dateObj = new Date(`${year}-${month}-${day}`);
    const curDate = new Date();
    const dateInputTimestamp = dateObj.getTime();
    const curDateTimestamp = curDate.getTime();

    if (dateInputTimestamp > curDateTimestamp) {
      const monthName = dateObj.toLocaleString("default", { month: "long" });
      let dateOnCalendar = await $("(//th[@class='datepicker-switch'])[1]");
      let monthYear = await dateOnCalendar.getText();
      let yearOnCalendar = monthYear.split(" ")[1].trim();

      if (parseInt(year) >= parseInt(yearOnCalendar)) {
        await this.click(await dateOnCalendar);
        if (
          parseInt(year.substring(0, 3)) >=
          parseInt(yearOnCalendar.substring(0, 3))
        ) {
          dateOnCalendar = await $("(//th[@class='datepicker-switch'])[2]");
          //Click on the year to change to decade form: 12 years selection
          await this.click(await dateOnCalendar);
          dateOnCalendar = await $("(//th[@class='datepicker-switch'])[3]");
          let decade = (await dateOnCalendar.getText()).substring(0, 3);
          let next = await $("(//th[@class='next'])[3]");
          while (parseInt(year.substring(0, 3)) > parseInt(decade)) {
            await this.click(next);
          }
          let years = await $$(".year");
          for (let y of years) {
            if ((await y.getText()) === year) {
              await this.click(y);
              break;
            }
          }
          let months = await $$(".month");
          for (let m of months) {
            if ((await m.getText()) === monthName.substring(0, 3)) {
              await this.click(m);
              break;
            }
          }
          let days = (await $$("tbody td")).filter(
            async (tdElement) =>
              (await tdElement.getAttribute("class")) === "day"
          );
          //console.log(parseInt(day));
          for (let d of days) {
            if (parseInt(await d.getText()) === parseInt(day)) {
              await this.click(d);
              break;
            }
          }
        }
      } else {
        console.log("Date is before today!!!");
      }
    } else if (dateInputTimestamp < curDateTimestamp) {
      console.log("The input date has already passed. Today will be chosen as start date.");
    } else {
      console.log("The date is today.");
    }
  }

  async timeConvert(time) {
    time = time.trim();
    if (time == "0:00 am") {
      time = "Midnight";
    } else if (time == "12:00 pm") {
      time = "Noon";
    }
    return time;
  }

  async inputCarRentalInfo(
    pLocation: string,
    rLocation: string,
    sDate: string,
    sTime: any,
    eDate: string,
    eTime: any,
    country: string,
    age: string | number
  ) {
    //console.log("Pick up Location");
    await this.click(await this.pickupLocation);
    await this.dropDownListHandler(
      await this.pickupLocationField,
      pLocation,
      ""
    );

    let chkBoxStatus = await (await this.returnLocation).isDisplayed();
    //console.log("Same location checkbox status: " + chkBoxStatus);
    if (!chkBoxStatus) {
      await (await this.sameLocationCheckBox).click();
    }

    //console.log("Return Location");
    await this.click(await this.returnLocation);
    await this.dropDownListHandler(
      await this.returnLocationField,
      rLocation,
      ""
    );

    //console.log("Start date");
    await this.click(await this.startDate);
    await this.dateTimePickerHandler(sDate);

    //console.log("Start time");
    await this.click(await this.startTime);
    //await this.clickOnFirstResult();
    let stTime = await this.timeConvert(sTime);
    await this.dropDownListHandler(await this.startTime, "", stTime);

    //console.log("End date");
    await this.click(await this.endDate);
    await this.dateTimePickerHandler(eDate);

    //console.log("End time");
    await this.click(await this.endTime);
    //await this.clickOnFirstResult();
    let edTime = await this.timeConvert(eTime);
    await this.dropDownListHandler(await this.endTime, "", edTime);

    chkBoxStatus = await (await this.country).isDisplayed();
    //console.log("Same location checkbox status: " + chkBoxStatus);
    if (!chkBoxStatus) {
      await this.click(await this.countryAndAge);
    }

    //console.log("Country");
    await this.click(await this.country);
    await this.dropDownListHandler(await this.countryField, country, "");

    //console.log("Age");
    await this.age.setValue(age);

  }

  async submit() {
    // console.log(`${CYAN} Submit! ${DEFAULT}`);
    this.infoToValidate.pLocation = await (await this.pickupLocation).getText();
    //console.log(this.infoToValidate.pLocation)
    this.infoToValidate.rLocation =  await (await this.returnLocation).getText(),
    //console.log(this.infoToValidate.rLocation)
    this.infoToValidate.sDate =  await (await this.startDate).getValue(),
    //console.log(this.infoToValidate.sDate)
    this.infoToValidate.sTime =  await (await this.startTime).getText(),
    //console.log(this.infoToValidate.sTime)
    this.infoToValidate.eDate =  await (await this.endDate).getValue(),
    //console.log(this.infoToValidate.eDate)
    this.infoToValidate.eTime = await (await this.endTime).getText(),
    //console.log(this.infoToValidate.eTime)
    this.infoToValidate.country =  await (await this.country).getText(),
    //console.log(this.infoToValidate.country)
    this.infoToValidate.age = await (await this.age).getValue(),
    //console.log(this.infoToValidate.age)
    //console.log(this.infoToValidate);
    await this.submitBtn.click();
  }

  async validateInfo() {
    //console.log(TestID);
    await this.waitForBrowserLoading();
    await expect(await browser.getUrl()).toContain("search");
    //console.log(this.infoToValidate);
    await this.validationCheck(
      this.infoToValidate.pLocation,
      await (await this.pickupLocation).getText()
    );
  
    await this.validationCheck(
      this.infoToValidate.rLocation,
      await (await this.returnLocation).getText()
    );

    await this.validationCheck(
      (this.infoToValidate.sDate).split(" ")[1],
      (await (await this.startDate).getValue()).split(" ")[1]
    );

    await this.validationCheck(
      this.infoToValidate.sTime,
      await (await $(`//*[contains(@id,'select2-start_time')][1]`)).getText()
    );

    await this.validationCheck(
      (this.infoToValidate.eDate).split(" ")[1],
      (await (await this.endDate).getValue()).split(" ")[1]
    );

    await this.validationCheck(
      this.infoToValidate.eTime,
      await (await this.endTime).getText()
    );

    await this.validationCheck(
      this.infoToValidate.country,
      await (await this.country).getText()
    );

    await this.validationCheck(this.infoToValidate.age,await (await $(`//*[@name="age"][1]`)).getValue());
    
    this.infoToValidate = [];
    console.log(`${CYAN} Validation Finish! ${DEFAULT}`);
  }

  async validateInfoNegative() {
    //console.log(TestID);
    await this.waitForBrowserLoading();
    await expect(await browser.getUrl()).toContain("search");
    
    await this.validationCheck(
      this.infoToValidate.pLocation,
      await (await this.pickupLocation).getText()
    );
  
    await this.validationCheck(
      this.infoToValidate.rLocation,
      await (await this.returnLocation).getText()
    );

    await this.validationCheck(
      (this.infoToValidate.sDate).split(" ")[1],
      (await (await this.startDate).getValue()).split(" ")[1]
    );

    await this.validationCheck(
      this.infoToValidate.sTime,
      await (await $(`//*[contains(@id,'select2-start_time')][1]`)).getText()
    );

    await this.validationCheck(
      (this.infoToValidate.eDate).split(" ")[1],
      (await (await this.endDate).getValue()).split(" ")[1]
    );

    await this.validationCheck(
      this.infoToValidate.eTime,
      await (await this.endTime).getText()
    );

    await this.validationCheck(
      this.infoToValidate.country,
      await (await this.country).getText()
    );

    await this.validationCheck(this.infoToValidate.age,await (await $(`//*[@name="age"][1]`)).getValue());
    
    this.infoToValidate = [];
    console.log(`${CYAN} Validation Finish! ${DEFAULT}`);
  }
}

export default new CarRentalPageObject();
