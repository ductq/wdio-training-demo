import fs from "fs";
import path from "path";
import chai from "chai";
/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class AbstractPage {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  async navigateTo(path: string) {
    await browser.url(path);
    await browser.maximizeWindow();
  }

  //Click on an element
  async click(ele: WebdriverIO.Element) {
    //await ele.waitForClickable({ timeout: 5000 });
    //await ele.waitForExist({ timeout: 5000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.click();
    await browser.pause(1000);
  }
  //Type into an element
  async typeInto(ele: WebdriverIO.Element, text: string) {
    await ele.waitForExist({ timeout: 5000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.setValue(text);
    await browser.pause(1000);
  }

  async writeToJsonFile(content: any, filePath: string) {
    let path = `${process.cwd()}/${filePath}`;
    const dir = path.substring(0, path.lastIndexOf("/"));
    if (!fs.existsSync(dir)) {
      console.log("Directory not exist, proceed to create folder!")
      fs.mkdirSync(dir);
    }
    else{
      console.log("Directory existed, proceed to writing file!")
    }

    fs.writeFile(path, JSON.stringify(content), (err) => {
      if (err) throw err;
      console.log(`Results saved to: ${filePath}`);
    });
  }

  async validationCheck(res, exp) {
    try {
      if (res.length === exp.length) {
        if (typeof res != typeof exp) {
          exp = parseInt(exp);
        }
        chai.expect(res).to.equal(exp);
      } else if (res.length > exp.length) {
        chai.expect(res).to.include(exp);
      } else {
        chai.expect(exp).to.include(res);
      }
    } catch (err) {
      console.log(
        `${RED} ERROR AT VALUE: ${DEFAULT} ${res} and ${exp}, Error: ${err}`
      );
    }
  }

  async dateConvert(date) {
    let actualDate, day, month, year;

    if (date.includes("ago")) {
      date = date.split(" ")[0];
      let curDate = new Date();
      actualDate = new Date(curDate.getDate());
      actualDate.setDate(curDate.getDate() - parseInt(date));
    } else {
      actualDate = new Date(date);
    }

    day = String(actualDate.getDate()).padStart(2, "0");
    month = String(actualDate.getMonth() + 1).padStart(2, "0");
    year = actualDate.getFullYear();
    const dateString = `${day}-${month}-${year}`;
    return dateString;
  }

  async waitForBrowserLoading() {
    await browser.waitUntil(
      () => {
        return browser.execute(() => {
          return document.readyState === "complete";
        });
      },
      {
        timeout: 10000, // maximum wait time in milliseconds
        timeoutMsg: "Page did not finish loading", // error message to display if timeout occurs
      }
    );
  }

  generateRandomString(num) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  getSelectors() {
    const selectorsFilePath = path.resolve(process.cwd(), './features/pageobjects/selectors.json');
    const selectors = JSON.parse(fs.readFileSync(selectorsFilePath).toString());
    return selectors;    
  }
  /**
   * Use for case that have too many pages
   * Read the json file, then iterate through the items and set them as global variables for easy access
   */
  selectorReading(){
    const locatorPages = ['carrental', 'demoqa']
    locatorPages.forEach((element) =>{
      const locator = this.getSelectors()[element]
      for (const key of Object.keys(locator)){
        // console.log("Setting global variable: " + key)
        // console.log("Value: " + locator[key])
        this.globalMap(locator[key], key);
      }
    })
  }

  globalMap(value, variable){
    if(global[variable]){
      console.log(`Variable ${variable} already exist so it will be overwritten!`)
      console.log("Current value: " + global[variable])
    }
    global[variable] = value;
  }
}
