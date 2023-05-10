import { ChainablePromiseElement } from "webdriverio";

import chai, { should } from "chai";
import AbstractPage from "./abstract_page.js";
/**
 * sub page containing specific selectors and methods for a specific page
 */
class CarRentalPageObject extends AbstractPage {
  infoToValidate: any;
  booleanED: boolean;
  numOP: string;
  constructor() {
    super();
    this.booleanED = false;
    this.infoToValidate = {
      pLocation: "",
      rLocation: "",
      sDate: "",
      sTime: "any",
      eDate: "",
      eTime: "",
      country: "",
      age: "",
    };
    this.numOP = "";
  }
  /**
   * Selector area
   */
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

  get enhanceCleaningCheckBox() {
    return $(`//input[@name = 'benefittick']`);
  }

  get instantConfirmationCheckBox() {
    return $(`//input[@name = 'availability']`);
  }

  set numOfPeople(nop) {
    this.numOP = `#desktop-people-${nop}`;
  }

  get numOfPeople() {
    return $(this.numOP);
  }

  get checkBoxesSuggested() {
    return $(`//*[@data-key='suggested']//div[contains(@class,'pull-left')]/span`);
  }

  get checkBoxesNumOfPeople() {
    return $$(`[data-key="people"] input[type="checkbox"]`);
  }

  get checkBoxesLocationType() {
    return $$(`[data-key="locationtype"] input[type="checkbox"]`);
  }

  get checkBoxesTransmission() {
    return $$(`[data-key="transmission"] input[type="checkbox"]`);
  }

  get checkBoxesCarType() {
    return $$(`[data-key="categoryid"] input[type="checkbox"]`);
  }

  get checkBoxesRentalCompany() {
    return $$(`[data-key="companyid"] input[type="checkbox"]`);
  }

  get checkBoxesDamageExcess() {
    return $$(`[data-key="excess"] input[type="checkbox"]`);
  }

  get checkBoxesPaymentType() {
    return $$(`[data-key="paymenttype"] input[type="checkbox"]`);
  }

  get carResults() {
    return $$(`//ul[@class='resultsGroup']/li`);
  }
  /**
   * End of Selector area
   */

  //Click on the first result of the dynamic drop down list
  async clickOnFirstResult() {
    // await browser.waitUntil(async () =>
    //   (
    //     await $('((//ul[@class="select2-results__options"])[2])//child::li[1]')
    //   ).isClickable()
    // );
    await (await $('((//ul[@class="select2-results__options"])[2])//child::li[1]')).click();
    // await this.click(
    //   await $('((//ul[@class="select2-results__options"])[2])//child::li[1]')
    //   //await $(`[class='select2-results__option'][role='option']:nth-child(1)`)
    // );
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
      await this.typeInto(await element, input);
    }
    await this.processResultDDL(key);
  }
  //Handle datetime picker for start date and end date
  async dateTimePickerHandler(dateInput: string) {
    //Split the input date into year, month and day
    let dateSplit = dateInput.split("-");
    let year = dateSplit[2].trim();
    let month = dateSplit[1].trim();
    let day = dateSplit[0].trim();

    //Format the input date using Date()
    const dateObj = new Date(`${year}-${month}-${day}`);
    const curDate = new Date();
    const dateInputTimestamp = dateObj.getTime();
    const curDateTimestamp = curDate.getTime();

    //Compare input date with current date
    // if (dateInputTimestamp > curDateTimestamp) {
    // } else
    if (dateInputTimestamp < curDateTimestamp) {
      console.log(
        "The input date has already passed. If it is start date then today will be automatically chosen, if end date then 30 days from today will be chosen."
      );
      if (this.booleanED) {
        let futureDate = new Date(); // create a new date object for the future
        futureDate.setDate(curDate.getDate() + 30); // set the date to 30 days in the future
        year = futureDate.getFullYear().toString();
        month = futureDate.getMonth().toString();
        day = futureDate.getDate().toString();
      } else {
        year = curDate.getFullYear().toString();
        month = curDate.getMonth().toString();
        day = curDate.getDate().toString();
      }
    }
    // else {
    //   console.log("The date is today.");
    // }

    //Convert month of the input date to String, eg: 4 -> April
    const monthName = dateObj.toLocaleString("default", { month: "long" });

    //Selector for the date that appears in the date time picker
    let dateOnCalendar = await $("(//th[@class='datepicker-switch'])[1]");

    //Get the DATE (Month Year) appears in the date time picker
    let monthYear = await dateOnCalendar.getText();

    //Get the display year by spliting the date from the date time picker
    let yearOnCalendar = monthYear.split(" ")[1].trim();

    //Click on the DATE to change to month selection view
    await this.click(await dateOnCalendar);

    //Selector for the DATE after view change from the click action of the above line of code
    dateOnCalendar = await $("(//th[@class='datepicker-switch'])[2]");

    //Click on the DATE to change to year selection view
    await this.click(await dateOnCalendar);

    //Selector for the DATE after view change from the click action of the above line of code
    dateOnCalendar = await $("(//th[@class='datepicker-switch'])[3]");

    //Get the decade - first 3 character that appears in the date time picker, e.g: 2020-2029 -> decade: 202
    let decade = (await dateOnCalendar.getText()).substring(0, 3);

    if (
      parseInt(year.substring(0, 3)) > parseInt(yearOnCalendar.substring(0, 3))
    ) {
      //Case that the input date's decade is bigger than the current decade

      //Next button for decade
      let next = await $("(//th[@class='next'])[3]");
      //Loop until decade is no longer bigger
      while (parseInt(year.substring(0, 3)) > parseInt(decade)) {
        await this.click(next);
        decade = (await dateOnCalendar.getText()).substring(0, 3);
      }
    } else if (
      parseInt(year.substring(0, 3)) < parseInt(yearOnCalendar.substring(0, 3))
    ) {
      //Case that the input date's decade is smaller than the current decade

      //Previous button for decade
      let prev = await $("(//th[@class='prev'])[3]");
      //Loop until decade is no longer smaller
      while (parseInt(year.substring(0, 3)) < parseInt(decade)) {
        await this.click(prev);
        decade = (await dateOnCalendar.getText()).substring(0, 3);
      }
    }
    //Get all the years on the picker then click on the year that match the input
    let years = await $$(".year");
    for (let y of years) {
      if ((await y.getText()) === year) {
        await this.click(y);
        break;
      }
    }
    //Get all the months on the picker then click on the month that match the input
    let months = await $$(".month");
    for (let m of months) {
      if ((await m.getText()) === monthName.substring(0, 3)) {
        await this.click(m);
        break;
      }
    }
    //Get all the days (filter the ones that does not belong to the selected month) on the picker then click on the day that match the input
    let days = (await $$("tbody td")).filter(
      async (tdElement) => (await tdElement.getAttribute("class")) === "day"
    );
    for (let d of days) {
      if (parseInt(await d.getText()) === parseInt(day)) {
        await this.click(d);
        break;
      }
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
    await browser.pause(1500);
    
    //await browser.waitUntil(async ()=> !((await $(`span.select2-results`)).isDisplayed()))
    let chkBoxStatus = await (await this.returnLocation).isDisplayed();
    //console.log("Same location checkbox status: " + chkBoxStatus);
    if (!chkBoxStatus) {
      //await this.click(await this.sameLocationCheckBox)
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
    this.booleanED = true;
    await this.dateTimePickerHandler(eDate);
    this.booleanED = false;

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
    //Save the input data to infoToValidate to check later
    this.infoToValidate.pLocation = await (await this.pickupLocation).getText();
    //console.log(this.infoToValidate.pLocation)
    (this.infoToValidate.rLocation = await (
      await this.returnLocation
    ).getText()),
      //console.log(this.infoToValidate.rLocation)
      (this.infoToValidate.sDate = await (await this.startDate).getValue()),
      //console.log(this.infoToValidate.sDate)
      (this.infoToValidate.sTime = await (await this.startTime).getText()),
      //console.log(this.infoToValidate.sTime)
      (this.infoToValidate.eDate = await (await this.endDate).getValue()),
      //console.log(this.infoToValidate.eDate)
      (this.infoToValidate.eTime = await (await this.endTime).getText()),
      //console.log(this.infoToValidate.eTime)
      (this.infoToValidate.country = await (await this.country).getText()),
      //console.log(this.infoToValidate.country)
      (this.infoToValidate.age = await (await this.age).getValue()),
      //console.log(this.infoToValidate.age)
      //console.log(this.infoToValidate);
      await this.submitBtn.click();
  }

  async infoCorrectionCheck() {
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
      this.infoToValidate.sDate.split(" ")[1],
      (await (await this.startDate).getValue()).split(" ")[1]
    );

    await this.validationCheck(
      this.infoToValidate.sTime,
      await (await $(`//*[contains(@id,'select2-start_time')][1]`)).getText()
    );

    await this.validationCheck(
      this.infoToValidate.eDate.split(" ")[1],
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

    await this.validationCheck(
      this.infoToValidate.age,
      await (await $(`//*[@name="age"][1]`)).getValue()
    );

    this.infoToValidate = [];
    console.log(`${CYAN} Validation Finish! ${DEFAULT}`);
  }

  async validateInfo() {
    let ageInput = this.infoToValidate.age;
    console.log("Age: " + ageInput);
    if (ageInput < 18 || ageInput > 80) {
      let alert = await browser.getAlertText();
      console.log(alert);
      let alertAppear = alert.length > 0;
      chai.expect(alertAppear).true;
      await this.validationCheck(
        alert,
        "A valid driver age is between 18 and 80 years."
      );
      console.log(`${CYAN} Invalid age case! ${DEFAULT}`);
      await browser.acceptAlert();
    } else if (ageInput < 25 || ageInput > 65) {
      let chargeNote = await $(`.js-surcharge-note`);
      chai.expect(await chargeNote.isDisplayed()).true;
      await this.infoCorrectionCheck();
    } else {
      await this.infoCorrectionCheck();
    }
    //console.log(`${CYAN} Abnormal cases validation finish! ${DEFAULT}`);
  }

  //Click on the random chosen element from the list of elements
  async clickOnRandomResult(eList) {
    let randomIndex = Math.floor(Math.random() * eList.length);
    let chkBox = await (await eList)[randomIndex];
    await this.click(chkBox);
  }

  async checkboxesHandler(elements) {
    await this.writeToJsonFile(elements,"results/checkBoxElements.json");
    const enabledElements = await elements.filter(
      (el) =>
        !el.getAttribute("disabled") ||
        el.getAttribute("disabled") !== "disabled"
    );
    console.log(enabledElements.length);
    if (enabledElements.length > 1) {
      await this.clickOnRandomResult(await enabledElements);
    } else if (enabledElements.length == 1) {
      let chkBox = await (await enabledElements)[0];
      await chkBox.click();
    } else {
      console.log("No checkboxes available");
    }
  }

  async changeOptions() {
    await this.checkboxesHandler(await this.checkBoxesSuggested.$$(`//div[contains(@class,'pull-left')]/span`));
    await browser.pause(3000);
    await this.checkboxesHandler(await this.checkBoxesNumOfPeople);
    await this.checkboxesHandler(await this.checkBoxesLocationType);
    await this.checkboxesHandler(await this.checkBoxesTransmission);
    await this.checkboxesHandler(await this.checkBoxesCarType);
    await this.checkboxesHandler(await this.checkBoxesRentalCompany);
    await this.checkboxesHandler(await this.checkBoxesDamageExcess);
    await this.checkboxesHandler(await this.checkBoxesPaymentType);
  }

  async validateCarListingResult() {
    let cars = await this.carResults;
    for (let car of cars) {
      let carDetail = await car.$(`.carDetail`);
      console.log(
        "Car model: ",
        await (await carDetail.$(`.carModel`)).getText()
      );
      console.log(
        "Car type: ",
        await (await carDetail.$(`.carType`)).getText()
      );
      if (await (await carDetail.$(`.bonus`)).isExisting()) {
        console.log(
          "Car type: ",
          await (await carDetail.$(`.bonus`)).getText()
        );
      }
      let features = await carDetail.$(`.carFeatures`);
      console.log(features);

      // for (let f of features){
      //   console.log(await (await f.$('span:nth-of-type(2)')).getText());
      // }
    }
  }
}

export default new CarRentalPageObject();
