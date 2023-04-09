import { ChainablePromiseElement } from 'webdriverio';

import chai from "chai"
import AbstractPage from './abstract.page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CarRentalPageObject extends AbstractPage {

    constructor() {
        super();
    }

    get pickupLocation () {
        return $('#select2-pickup_location_id-5x-container');
    }

    get sameLocationCheckBox () {
        return $('#chkbox1');
    }

    get returnLocation () {
        return $('#select2-dropoff_location_id-fj-container');
    }

    get startDate () {
        return $('.js-search-box-start-datepicker');
    }

    get endDate () {
        return $('.js-search-box-end-datepicker');
    }

    get startTime () {
        return $('#select2-start_time-hj-container');
    }

    get endTime () {
        return $('#select2-end_time-b9-container');
    }

    get countryLiveIn () {
        return $('#chkbox2');
    }

    get country () {
        return $('#select2-country-p2-container');
    }

    get age () {
        return $('*[name="age"]');
    }

    get submitBtn () {
        return $('//div[@class="section-submit"]/button');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to submit test data
     */
    async searchCar (pLocation, rLocation, startDate, startTime, endDate, endTime, country, age) {
        
        console.log("Pick up Location");
        await this.pickupLocation.click();
        (await this.pickupLocation).setValue(pLocation);

        await this.sameLocationCheckBox.click();
       
        console.log("Pick up Location");
        await this.returnLocation.click();
        (await this.returnLocation).setValue(rLocation);
        
        console.log("DOB");
        await this.dateTimePickerDOB.click();
        await $('//*[@class="react-datepicker__year-select"]').click();
        await $('//*[@class="react-datepicker__year-select"]').selectByAttribute('value','2000');
        await $('//*[@class="react-datepicker__month-select"]').click();
        await $('//*[@class="react-datepicker__month-select"]').selectByAttribute('value','8');
        await $('aria/17').click();

        console.log("Subjects");
        let subj = Math.floor(Math.random() * 3);
        switch (subj) {
            case 0: 
                    break;
            case 1:
                    await this.inputSubjects.setValue(subject);
                    await browser.pause(1000);
                    await $('#react-select-2-option-' + subj).click();
                    //await $('div=History').click();
                    break;
            case 2:
                    await this.inputSubjects.setValue(subject);
                    await browser.pause(1000);
                    await $('#react-select-2-option-' + subj).click();
                    //await $('div=Arts').click();
                    subj--;
            case 3:
                    await this.inputSubjects.setValue(subject);
                    await browser.pause(1000);
                    await $('#react-select-2-option-' + subj).click();
                    //await $('div=Maths').click();
                    --subj;
        }
            
        console.log("Subjects: ", await this.inputSubjects.getValue());

        console.log("Hobbies");
        switch (hobbies) {
            case 0: 
                    break;
            case 1:
                    await $('label=Sports').click();
                    hobbies--;
            case 2:
                    await $('label=Reading').click();
                    hobbies--;
            case 3:
                    await $('label=Music').click();
                    hobbies--;
        }
       
        console.log("Current Address");
        await this.inputCurrentAddress.setValue(curAdd);
        
        console.log("State");
        await this.stateSelection.click();
        await browser.pause(1000);
        await $('#react-select-3-option-' + city).scrollIntoView();
        await $('#react-select-3-option-' + state).click();
        
        console.log("City");
        //await this.citySelection
        await this.citySelection.click();
        await browser.pause(1000);
        await $('#react-select-4-option-' + city).scrollIntoView();
        await $('#react-select-4-option-' + city).click();
        
        console.log("DOB is: ", (await this.dateTimePickerDOB).getText());

        //#select2-country-0v-result-vtja-SG
        
        await browser.pause(5000);
        console.log("Submit");
        await this.submitBtn.click();
    }
}

export default new CarRentalPageObject();
