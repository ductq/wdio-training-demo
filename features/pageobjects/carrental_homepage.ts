import { ChainablePromiseElement } from "webdriverio";

import chai, { should } from "chai";
import AbstractPage from "./abstract_page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CarRentalPageObject extends AbstractPage {
  infoToValidate: any;
  carObj;
  booleanED: boolean;
  numOP: string;
  selector;
  constructor() {
    super();
    this.selectorReading();
    this.selector = this.getSelectors()["carrental"];
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
    this.carObj = {
      headlines: {
        supplier: "",
        rating: "",
        tier: "",
        numOfReviews: "",
        badge: "",
        carType: ""
      },
      details: {
        model: "",
        type: "",
        seats: "",
        bonus: "",
        features: [],
      },
      price: {
        total: "",
        perDay: "",
      },
    };
  }
  /**
   * Selector area
   */
  get pickupLocation() {
    return $(`${pLocation}`);
  }

  get pickupLocationField() {
    return $(this.selector.pLocationField);
  }

  get sameLocationCheckBox() {
    return $(this.selector.chkBoxSameLocation);
  }

  get returnLocation() {
    return $(this.selector.rLocation);
  }

  get returnLocationField() {
    return $(this.selector.rLocationField);
  }

  get startDate() {
    return $(this.selector.sDate);
  }

  get endDate() {
    return $(this.selector.eDate);
  }

  get startTime() {
    return $(this.selector.sTime);
  }

  get endTime() {
    return $(this.selector.eTime);
  }

  get countryAndAge() {
    return $(this.selector.chkBoxCountryAge);
  }

  get country() {
    return $(this.selector.country);
  }

  get countryField() {
    return $(this.selector.countryField);
  }

  get age() {
    return $(this.selector.age);
  }

  get submitBtn() {
    return $(this.selector.btnSubmit);
  }

  get checkBoxesSuggested() {
    return $$(this.selector.chkBoxSuggested);
  }

  get checkBoxesNumOfPeople() {
    return $$(this.selector.chkBoxNumOfPeople);
  }

  get checkBoxesLocationType() {
    return $$(this.selector.chkBoxLocationType);
  }

  get checkBoxesTransmission() {
    return $$(this.selector.chkBoxTransmission);
  }

  get checkBoxesCarType() {
    return $$(this.selector.chkBoxCarType);
  }

  get checkBoxesRentalCompany() {
    return $$(this.selector.chkBoxRentalCompany);
  }

  get checkBoxesDamageExcess() {
    return $$(this.selector.chkBoxDamageExcess);
  }

  get checkBoxesPaymentType() {
    return $$(this.selector.chkBoxPaymentType);
  }

  get carResults() {
    return $$(this.selector.carResults);
  }

  get ddlResults() {
    return $$(this.selector.ddlResult);
  }
  /**
   * End of Selector area
   */

  //Click on the first result of the dynamic drop down list
  async clickOnFirstResult(eList) {
    await this.click(await eList[0]);
    //await this.click(await $(`${this.selector.ddlResult}:nth-of-type(1)`));
    //await this.waitForDDLClosed();
  }

  /**
   * WIP
   * Function created in order to process the dropdown list results dynamically
   * @param key (string) matching string
   */
  async processResultDDL(key: string) {
    let eleList = await this.ddlResults;
    if (key === "") {
      //await this.clickOnRandomResult(eleList);
      await this.clickOnFirstResult(eleList);
    } else {
      for (let e of eleList) {
        if ((await e.getText()) === key) {
          await this.click(e);
          break;
        }
      }
    }
  }

  async waitForDDLClosed() {
    let ddl = await $$(`.locname`);
    await browser.waitUntil(() => {
      return !(ddl.length != 0);
    });
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

    //Convert month of the input date to String, eg: 4 -> April
    const monthName = dateObj.toLocaleString("default", { month: "long" });

    //Selector for the date that appears in the date time picker
    let dateOnCalendar = await $(this.selector.dtPickerMonthView);

    //Get the DATE (Month Year) appears in the date time picker
    let monthYear = await dateOnCalendar.getText();

    //Get the display year by spliting the date from the date time picker
    let yearOnCalendar = monthYear.split(" ")[1].trim();

    //Click on the DATE to change to month selection view
    await this.click(await dateOnCalendar);

    //Selector for the DATE after view change from the click action of the above line of code
    dateOnCalendar = await $(this.selector.dtPickerYearView);

    //Click on the DATE to change to year selection view
    await this.click(await dateOnCalendar);

    //Selector for the DATE after view change from the click action of the above line of code
    dateOnCalendar = await $(this.selector.dtPickerDecadeView);

    //Get the decade - first 3 character that appears in the date time picker, e.g: 2020-2029 -> decade: 202
    let decade = (await dateOnCalendar.getText()).substring(0, 3);

    if (
      parseInt(year.substring(0, 3)) > parseInt(yearOnCalendar.substring(0, 3))
    ) {
      //Case that the input date's decade is bigger than the current decade

      //Next button for decade
      let next = await $(this.selector.dtPickerNextDecade);
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
      let prev = await $(this.selector.dtPickerPrevDecade);
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
    let chkBoxStatus = await (await this.returnLocation).isDisplayed();
    if (!chkBoxStatus) {
      //await this.click(await this.sameLocationCheckBox)
      await (await this.sameLocationCheckBox).click();
    }

    await this.click(await this.returnLocation);
    await this.dropDownListHandler(
      await this.returnLocationField,
      rLocation,
      ""
    );

    await this.click(await this.pickupLocation);
    await this.dropDownListHandler(
      await this.pickupLocationField,
      pLocation,
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
    await this.waitForResultListLoading();
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
    // List index starting at 0, need to be handled...???
    let chkBox = await (await eList)[randomIndex];
    let chkBoxText = await chkBox.getText();
    console.log("Checkbox: " + chkBoxText);
    if (chkBoxText.includes("People (")) {
      this.numOP = chkBoxText.split(" ").at(0);
      //console.log("Number of people from checkbox: ", this.numOP.trim());
    }
    await this.click(chkBox);
  }

  async checkboxesHandler(elements) {
    /**
     * The commented code is for filtering the elements by select only the one that
     * do not have attribute "disabled" OR attribute "disabled" == "disabled"
     *
     * It does not work as expected because:
     *  - The "disabled" attribute belongs to input elements (checkbox)
     *  - The input (checkbox) is not clickable
     *  - The label is clickable so it is chosen to be selector
     *  - The label do not have "disabled" attribute
     */
    //await this.writeToJsonFile(elements,"results/checkBoxElements.json");
    // const enabledElements = await elements.filter(
    //   (el) =>
    //     !el.getAttribute("disabled") ||
    //     el.getAttribute("disabled") !== "disabled"
    // );

    /**
     * Filtering the elements by select only the ones that have number of items != 0
     * Quite slow?
     */
    let enabledElements = [];
    let label = "";
    for (let e of elements) {
      label = await e.getText();
      if (!label.includes("(0)")) {
        enabledElements.push(e);
      }
    }

    if (enabledElements.length >= 1) {
      await this.clickOnRandomResult(enabledElements);
    } else {
      console.log("No checkboxes available");
    }
    await browser.pause(3000);
  }

  async changeOptions() {
    let carList = await this.getCarList();
    this.writeToJsonFile(carList, "results/carList.json");
    await this.checkboxesHandler(await this.checkBoxesNumOfPeople);
    await this.checkboxesHandler(await this.checkBoxesSuggested);
    await this.checkboxesHandler(await this.checkBoxesLocationType);
    await this.checkboxesHandler(await this.checkBoxesTransmission);
    await this.checkboxesHandler(await this.checkBoxesCarType);
    await this.checkboxesHandler(await this.checkBoxesRentalCompany);
    await this.checkboxesHandler(await this.checkBoxesDamageExcess);
    await this.checkboxesHandler(await this.checkBoxesPaymentType);
  }

  async validateCarListingResult() {
    let carList = await this.getCarList();
    console.log("Checking results after filtering!");
    for (const car of carList) {
      chai
        .expect(parseInt(car.seats))
        .to.be.at.greaterThanOrEqual(parseInt(this.numOP));
    }
    this.writeToJsonFile(carList, "results/carListAfterFiltered.json");
    console.log(`${GREEN}>> Finished checking car list! ${DEFAULT}`);
  }

  async waitForResultListLoading() {
    let progressionBar = await $(`.progress-bar`);
    await browser.waitUntil(async () => {
      let style = await progressionBar.getAttribute("style");
      return style == "width: 100%;";
    });
    await browser.pause(1000);
  }

  async getCarPhoto(car) {
    const carPhoto = await car.$(`.carPhoto`);
    const supplier = await carPhoto.$(`.itemLogo`).getAttribute(`title`);
    const ratingScore = await carPhoto.$(`.rating_score-number`).getText();
    const scoreTier = await carPhoto.$(`.score-tier_label`).getText();
    const numOfReviews = await carPhoto.$(`.score-tier_desc`).getText();
    const badge = await carPhoto.$(`.badge-content`).getText();
    const carType = await carPhoto.$(`.carTypeLink`).getText();
    this.carObj.headlines.supplier = supplier;
    this.carObj.headlines.rating = ratingScore;
    this.carObj.headlines.tier = scoreTier;
    this.carObj.headlines.numOfReviews = numOfReviews;
    this.carObj.headlines.badge = badge;
    this.carObj.headlines.carType = carType;
  }

  async getCarPrice(car) {
    const carPrice = await car.$(`.carPrice`);
    const currencyTotal = await carPrice
      .$(`div.js-price-in-money span.currency`)
      .getText();
    const priceTotal = await carPrice
      .$(`div.js-price-in-money span.price`)
      .getText();
    const currencyPerDay = await carPrice
      .$(`span.js-price-in-money span.currency`)
      .getText();
    const pricePerDay = await carPrice
      .$(`span.js-price-in-money span.price`)
      .getText();
      this.carObj.price.total = priceTotal + currencyTotal;
      this.carObj.price.perDay = pricePerDay + currencyPerDay;
  }

  async getCarDetail(car) {
    const carDetail = await car.$(`.carDetail`);
    let bonus;
    if (await (await carDetail.$(`.bonus`)).isExisting()) {
      bonus = await (await carDetail.$(`.bonus`)).getText();
    } else {
      bonus = "";
    }
    let carModel = await carDetail.$(`.carModel`).getText();
    let carType = await carDetail.$(`.carType`).getText();
    let numOS = carType.split(" ").at(-2);
    const carFeature = await carDetail.$(`.carFeatures`);
    const featureEles = await carFeature.$$("span:nth-of-type(2)");

    this.carObj.details.model = carModel;
    this.carObj.details.type = carType;
    this.carObj.details.seats = numOS;
    this.carObj.details.bonus = bonus;

    let caseCount = 0;
    for (let f of featureEles) {
      let feature = await f.getText();
      if (feature.length == 1) {
        switch (caseCount) {
          case 0:
            feature = feature + " Big case(s)";
            caseCount++;
            break;
          case 1:
            feature = feature + " Small case(s)";
            break;
        }
      }
      this.carObj.details.features.push(feature);
    }
  }

  async getCarList() {
    let carList = [];
    const totalNumOfCars = parseInt(
      await (await $(this.selector.totalCars)).getText()
    );
    console.log(`Total number of cars: ${totalNumOfCars}`);
    const nextPage = await $(this.selector.next);
    let curCarIndex = 0;
    while (carList.length < totalNumOfCars) {
      await this.waitForResultListLoading();
      let cars = await this.carResults;
      let carDetail, carPhoto, carPrice, carFeature, featureEles, bonus;

      for (let car of cars) {
        carPhoto = await car.$(`.carPhoto`);
        carDetail = await car.$(`.carDetail`);
        carPrice = await car.$(`.carPrice`);
        if (await (await carDetail.$(`.bonus`)).isExisting()) {
          bonus = await (await carDetail.$(`.bonus`)).getText();
        } else {
          bonus = "";
        }
        let carModel = await carDetail.$(`.carModel`).getText();
        let carType = await carDetail.$(`.carType`).getText();
        let numOS = carType.split(" ").at(-2);
        let carObj = {
          model: carModel,
          type: carType,
          seats: numOS,
          bonus: bonus,
          features: [],
        };
        carFeature = await carDetail.$(`.carFeatures`);
        featureEles = await carFeature.$$("span:nth-of-type(2)");
        let caseCount = 0;
        for (let f of featureEles) {
          let feature = await f.getText();
          if (feature.length == 1) {
            switch (caseCount) {
              case 0:
                feature = feature + " Big case(s)";
                caseCount++;
                break;
              case 1:
                feature = feature + " Small case(s)";
                break;
            }
          }

          carObj.features.push(feature);
        }

        console.log(
          `Getting cars info: 
          ${(100 * (curCarIndex / totalNumOfCars)).toFixed(2)} %`
        );
        curCarIndex++;
      }
      //await nextPage.scrollIntoView();
      if (!(carList.length == totalNumOfCars)) {
        await this.click(nextPage);
      } else break;
    }

    return carList;
  }
}

export default new CarRentalPageObject();
