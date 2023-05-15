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
  account: any;
  constructor() {
    super();
    this.account = {
      username: "",
      password: "",
      userid: "",
      token: "",
    };
  }

  get statusCodeFromPage() {
    return $(`//b[1]`);
  }

  get statusTextFromPage() {
    return $(`//b[2]`);
  }

  get getBookList() {
    return $$(`[class="rt-tr-group"]`);
  }
  get getTitle() {
    return $$(`[class="rt-tr-group"] a`);
  }
  get getAuthor() {
    return $$(`div.rt-tr-group div:nth-child(3)`);
  }
  get getPublisher() {
    return $$(`div.rt-tr-group div:nth-child(4)`);
  }

  async assertLink(element) {
    await browser.setupInterceptor();
    await this.click(element);
    let request = await browser.getRequest(0);
    let expectedCode = await (await this.statusCodeFromPage).getText();
    let expectedText = await (await this.statusTextFromPage).getText();
    let responseCode = request.response.statusCode;
    let responseText = getReasonPhrase(responseCode);
    console.log(`Status code: ${CYAN}${responseCode}${DEFAULT}`);
    console.log(`Status text: ${CYAN}${responseText}${DEFAULT}`);
    this.validationCheck(responseCode, expectedCode);
    this.validationCheck(responseText, expectedText);
    await browser.disableInterceptor();
  }

  async checkAllLinks() {
    for (let i = 3; i <= 9; i++) {
      await this.assertLink(await $(`//p[${i}]/a`));
    }
  }

  async loginRequest() {
    try {
      const loginData = {
        userName: this.account.username,
        password: this.account.password,
      };

      const request = await fetch("https://demoqa.com/Account/v1/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (request.ok) {
        let result = await request.json();
        //console.log(result);
        this.account.userid = result.userId;
      } else {
        console.log("Login failed!");
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`);
    }
  }

  async generateToken() {
    try {
      const loginData = {
        userName: this.account.username,
        password: this.account.password,
      };

      const request = await fetch(
        "https://demoqa.com/Account/v1/GenerateToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (request.ok) {
        let result = await request.json();
        //console.log(result);
        this.account.token = result.token;
      } else {
        console.log("Generate token failed!");
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`);
    }
  }

  async signupRequest() {
    try {
      this.account.username = "test_user" + this.generateRandomString(6);
      this.account.password = "P@ssword1234!";
      const signupData = {
        userName: this.account.username,
        password: this.account.password,
      };

      const request = await fetch("https://demoqa.com/Account/v1/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (request.ok) {
        console.log("Signup succesful!");
        //console.log(result);
      } else {
        console.log("Signup failed!");
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`);
    }
  }

  async getUserInfo() {
    try {
      let url = "https://demoqa.com/Account/v1/User/" + this.account.userid;
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.account.token,
        },
      });
      if (request.ok) {
        console.log("Get user info successfully!");
      } else {
        console.log("Get user info failed!");
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`);
    }
  }

  async login() {
    let mockGet = await browser.mock("https://demoqa.com/*");

    await (await $(`#userName`)).setValue(this.account.username);
    await (await $(`#password`)).setValue(this.account.password);
    await (await $(`#login`)).click();
    await browser.pause(3000);
    console.log(mockGet);
    console.log(JSON.stringify(mockGet.calls[0].headers));
    console.log(JSON.stringify(mockGet.calls[0].responseHeaders));
    // for (let r of request1){
    //   if (r.url.includes("GenerateToken")){
    //     console.log(r.response.body)
    //   }
    //   else if (r.url.includes("Login")){
    //     console.log(r.response.body)
    //   }
    // }
    // for (let r of request2){
    //   if (r.url.includes("GenerateToken")){
    //     console.log(r.response.body)
    //   }
    //   else if (r.url.includes("Login")){
    //     console.log(r.response.body)
    //   }
    // }
    console.log("End of wdio intercept service");
    await browser.disableInterceptor();
  }

  async clearUp() {
    try {
      //https://demoqa.com/Account/v1/User/e8f7cb1d-2075-44b4-b046-29f4784a1436
      let url = "https://demoqa.com/Account/v1/User/" + this.account.userid;
      // console.log(this.account)
      // console.log(this.account.userid);
      const request = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.account.token,
        },
      });
      if (request.ok) {
        // let result = await request.json();
        // console.log(result);
        console.log("Successfully delete user!");
        this.account = [];
      } else {
        console.log("Clearup failed!");
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`);
    }
  }

  async getAllBooks() {
    const items = [];

    // Loop through the name elements and create a new item object for each one
    let a = await this.getBookList;
    let titles = await this.getTitle;
    let authors = await this.getAuthor;
    let publishers = await this.getPublisher;
    for (let i = 0; i < a.length; i++) {
      const name = titles[i];
      const author = authors[i];
      const publisher = publishers[i];
      if (typeof name == "undefined") {
        break;
      }
      const item = {
        Title: await name.getText(),
        Author: await author.getText(),
        Publisher: await publisher.getText(),
      };
      console.log(item);
      items.push(item);
    }

    console.log(items);
  }
}

export default new DemoQAPageObject();
