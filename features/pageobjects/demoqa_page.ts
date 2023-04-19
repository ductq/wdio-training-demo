import { ChainablePromiseElement } from "webdriverio";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import AbstractPage from "./abstract_page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DemoQAPageObject extends AbstractPage {
  constructor() {
    super();
  }

  get statusCodeFromPage() {
    return $(`//b[1]`);
  }

  get statusTextFromPage() {
    return $(`//b[2]`);
  }

  async assertLink(element) {
    await browser.setupInterceptor();
    await this.click(element);
    //await browser.debug();
    let request = await browser.getRequest(0);
    let expectedCode = await (await this.statusCodeFromPage).getText();
    let expectedText = await (await this.statusTextFromPage).getText();
    let responseCode = request.response.statusCode;
    let responseText = getReasonPhrase(responseCode);
    console.log("Status code: " + responseCode);
    console.log("Status text: " + responseText);
    this.responseCheck(responseCode,expectedCode);
    this.responseCheck(responseText,expectedText);
    await browser.disableInterceptor();
  }

  async checkAllLinks() {
    for (let i = 3; i <= 9; i++) {
      await this.assertLink(await $(`//p[${i}]/a`));
    }
  }
}

export default new DemoQAPageObject();
