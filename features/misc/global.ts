import { setWorldConstructor } from "@wdio/cucumber-framework";

class CustomVar{
    testID: string
    urlE2E: string
    constructor(){
        this.testID = "",
        this.urlE2E = "https://www.airportrentals.com/"
    }
}

setWorldConstructor(CustomVar)