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
      username: "" ,
      password: "",
    }
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
    console.log(`Status code: ${CYAN}${responseCode}${DEFAULT}`);
    console.log(`Status text: ${CYAN}${responseText}${DEFAULT}`);
    this.validationCheck(responseCode,expectedCode);
    this.validationCheck(responseText,expectedText);
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
        userName: "test_user001",
        password: "P@ssword1234!"
      };
      
      const request = await fetch(//'https://demoqa.com/Account/v1/GenerateToken', {
       'https://demoqa.com/Account/v1/Login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      // .then(async response => {
      //   if (await response.ok) {
      //     // Login successful
      //     console.log(JSON.stringify(await response))
      //   } else {
      //     // Login failed
      //     console.log("Login failed!")
      //   }
      // })
      // .catch(error => console.error(error));
      if(request.ok){
        console.log(await request.json());
      }
      else{
        console.log("Login failed!")
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`)
    }
    
  }

  async signupRequest() {
    try {
      this.account.username = "test_user" + this.generateRandomString();
      this.account.password = "P@ssword1234!"; 
      const signupData = {
        userName: this.account.username,
        password: this.account.password
      };
      
      const request = await fetch(
       'https://demoqa.com/Account/v1/User',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })
      // .then(async response => {
      //   if (await response.ok) {
      //     // Login successful
      //     console.log(JSON.stringify(await response))
      //   } else {
      //     // Login failed
      //     console.log("Login failed!")
      //   }
      // })
      // .catch(error => console.error(error));
      if(request.ok){
        console.log(await request.json());
      }
      else{
        console.log("Signup failed!")
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`)
    }
    
  }

  async login(){
    await (await $(`#userName`)).setValue(this.account.username);
    await (await $(`#password`)).setValue(this.account.password);
    await (await $(`#login`)).click();
  }
}

export default new DemoQAPageObject();
