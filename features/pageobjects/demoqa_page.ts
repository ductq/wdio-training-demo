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
        //console.log(result);
        this.account.userid = result.userId;
      }
      else{
        console.log("Login failed!")
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`)
    }
    
  }

  async generateToken() {
    try {
      const loginData = {
        userName: this.account.username,
        password: this.account.password
      };
      
      const request = await fetch(
       'https://demoqa.com/Account/v1/GenerateToken',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      if(request.ok){
        let result = await request.json();
        //console.log(result);
        this.account.token = result.token;
      }
      else{
        console.log("Generate token failed!")
      }
    } catch (err) {
      console.log(`${RED} Error: ${err} ${DEFAULT}`)
    }
    
  }

  async signupRequest() {
    try {
      this.account.username = "test_user" + this.generateRandomString(6);
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
        console.log("Signup succesful!")
        //console.log(result);
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
          Authorization: 'Bearer ' + this.account.token
        }
      })
      if(request.ok){
        console.log("Get user info successfully!");
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
      //https://demoqa.com/Account/v1/User/e8f7cb1d-2075-44b4-b046-29f4784a1436
      let url = "https://demoqa.com/Account/v1/User/" + this.account.userid;
      // console.log(this.account)
      // console.log(this.account.userid);
      const request = await fetch(
        url,{
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.account.token
        }
      })
      if(request.ok){
        // let result = await request.json();
        // console.log(result);
        console.log("Successfully delete user!")
        this.account = [];
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
