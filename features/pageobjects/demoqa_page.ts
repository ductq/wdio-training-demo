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
      userid: "",
      token: ""
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
        userName: this.account.username,
        password: this.account.password
      };
      
      const request = await fetch(
       'https://demoqa.com/Account/v1/Login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      if(request.ok){
        let result = await request.json();
        console.log(result);
        this.account.userid = result.userID;
        this.account.token = result.token;
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

      if(request.ok){
        let result = await request.json();
        console.log(result);
        //this.account.userid = await request.
      }
      else{
        console.log("Signup failed!")
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`)
    }
    
  }

  async getUserInfo(){
    try {
      let url = "https://demoqa.com/Account/v1/User/" + this.account.userid;
      const request = await fetch(
        url,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.account.token
        }
      })
      if(request.ok){
        let result = await request.json();
        console.log(result);
        //this.account.userid = await request.
      }
      else{
        console.log("Get user info failed!")
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

  async clearUp(){
    try {
      console.log(`https://demoqa.com/Account/v1/User/${this.account.userid}`);
      const request = await fetch(
       `https://demoqa.com/Account/v1/User/${this.account.userid}`,{
        method: 'DELETE'
      })
      if(request.ok){
        let result = await request.json();
        console.log(result);
        //this.account.userid = await request.
      }
      else{
        console.log("Clearup failed!")
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`)
    }
  }
}

export default new DemoQAPageObject();
