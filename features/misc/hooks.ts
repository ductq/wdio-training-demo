import { BeforeStep } from "@wdio/cucumber-framework";

BeforeStep(function(){
    this.testID = browser.options.testID

})