/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class AbstractPage {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async navigateTo(path: string) {
        await browser.url(path)
        await browser.maximizeWindow()
    }
    //Click on an element
    async click(ele: WebdriverIO.Element) {
        await ele.waitForClickable({timeout: 6000})
        if (!ele.elementId){
            throw Error(ele.error.message)
        }
        await ele.click()
    }
    //Type into an element
    async typeInto(ele: WebdriverIO.Element, text: string) {
        await ele.waitForClickable({timeout: 6000})
        if (!ele.elementId){
            throw Error(ele.error.message)
        }
        await ele.setValue(text)
    }

}
