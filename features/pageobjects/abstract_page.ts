import fs from "fs";
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
    await ele.waitForClickable({ timeout: 6000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.click();
    await browser.pause(500);
  }
  //Type into an element
  async typeInto(ele: WebdriverIO.Element, text: string) {
    await ele.waitForExist({ timeout: 6000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.setValue(text);
    await browser.pause(500);
  }

  async writeToJsonFile(content: any, filePath: string) {
    let path = `${process.cwd()}/${filePath}`;
    fs.writeFile(path, JSON.stringify(JSON.stringify(content)), (err) => {
      if (err) throw err;
      console.log(`Results saved to ${filePath}`);
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
      console.log(err);
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
}
