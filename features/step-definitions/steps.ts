import { Given, When, Then } from '@wdio/cucumber-framework';

import LoginPage from '../pageobjects/login.page.ts';
import SecurePage from '../pageobjects/car.rental.home.page.ts';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

describe('Car Rental E2E Test', () => {
    const carRentalPage = new CarRentalPageObject();

    it('should rent a car with provided location and time', () => {
        browser.url('https://www.carrentalwebsite.com');
        carRentalPage.rentCar('New York', '2023-04-15', '10:00 AM', '2023-04-18', '2:00 PM');
        // Verify search results, select car, complete rental process, and verify confirmation
    });
});
