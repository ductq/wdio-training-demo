import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai"

class CustomVar{
    testID: string
    constructor(){
        this.testID = ""
    }
}

setWorldConstructor(CustomVar)