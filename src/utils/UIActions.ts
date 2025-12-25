import { Locator, expect, Page, TestInfo } from "@playwright/test";
import Log from '../config/Logger';

export default class UIActions {
    // Add common UI action methods here in the future  

    /**
     * Navigates to a specified URL in the provided page context.
     * @param url - The URL to navigate to.
     * @param page - The page object used to perform the navigation.
     * @param description - A description of the navigation action (currently unused).
     * @throws {Error} Throws an error if navigation fails.
     * @returns {Promise<void>}
     */
    public static async navigateToUrl(url: string, page: any, description: string) {
        try{
            await page.goto(url);
            Log.info(`Navigated to URL: ${url} successfully.`);
        }   catch (error) { 
            Log.error(`Error navigating to URL ${url}: ${error}`);
            throw error;    
        }       
    }

    /**
     * Clicks on an element identified by the provided locator.
     * @param locator - The Locator object representing the element to click
     * @param description - A descriptive name of the element being clicked, used for logging purposes
     * @throws {Error} Throws an error if the click action fails
     * @returns {Promise<void>} A promise that resolves when the click action completes successfully
     */
    public static async clickElement(locator: Locator, description: string) {
        try{
            await locator.click();            
            Log.info(`Clicked on ${description} successfully.`);
        } catch (error) {           
            Log.error(`Error clicking on ${description}: ${error}`);
            throw error;    
        }
    }   
    
    /**
     * Fills an input element with the specified value.
     * @param locator - The Locator object pointing to the input element to fill.
     * @param value - The text value to fill into the element.
     * @param description - A descriptive name of the element being filled, used for logging purposes.
     * @throws {Error} Throws an error if the fill operation fails.
     * @returns {Promise<void>} A promise that resolves when the element has been filled successfully.
     */
    public static async fillElement(locator: Locator, value: string, description: string) {
        try{
            await locator.fill(value);            
            Log.info(`Filled ${description} with value: ${value} successfully.`);
        } catch (error) {           
            Log.error(`Error filling ${description} with value ${value}: ${error}`);
            throw error;    
        }   
    }

    /**
     * Fills a locator with a sensitive value and logs the action with masked data.
     * @param locator - The Playwright Locator element to fill
     * @param value - The sensitive value to fill into the locator
     * @param description - A description of the element being filled, used in logging
     * @throws {Error} Throws an error if the fill operation fails
     */
    public static async fillElementWithSensitiveData(locator: Locator, value: string, description: string) {
        try{
            await locator.fill(value);  
            const maskedValue = await UIActions.maskSensitiveData(value);          
            Log.info(`Filled ${description} with value: ${maskedValue} successfully.`);
        } catch (error) {           
            Log.error(`Error filling ${description} with value: ${error}`);
            throw error;    
        }   
    }

    /**
     * Masks sensitive data by replacing it with a repeated mask character.
     * @param password - The sensitive string to be masked.
     * @param maskChar - The character to use for masking. Defaults to '*'.
     * @returns A promise that resolves to a string where all characters are replaced with the mask character.
     * @example
     * const masked = await maskSensitiveData('myPassword123');
     * // Returns: '***************'
     */
    public static async maskSensitiveData(password: string, maskChar: string = '*'): Promise<string> {
        return maskChar.repeat(password.length);
    }

    
    /**
     * Verifies that the current page title matches the expected title.
     * @param expectedTitle - The expected page title to verify against
     * @param page - The page object from Playwright
     * @returns A promise that resolves when the verification is complete
     * @remarks Logs the page title and verification result. Logs an error if the actual title does not match the expected title.
     */
    public static async verifyPageTitle(expectedTitle: string, page: any, description: string): Promise<boolean> {
        const pageTitle = (await page.title());       
        Log.info("Checking page title");
        Log.info("Page title is "+ pageTitle);      
        if (pageTitle === expectedTitle) {              
               Log.info("Page Title Verification Passed");
                return true;
         } else {              
               Log.error(`Page Title Verification Failed. Expected: ${expectedTitle}, Actual: ${pageTitle}`);   
               return false;                 
         }
    }    

    /**
     * Hovers over the specified element.
     * @param locator - The locator of the element to hover over.
     * @param description - A description of the element being hovered on, used for logging purposes.
     * @throws {Error} Throws an error if the hover action fails.
     * @returns {Promise<void>}
     */
    public static async hoverElement(locator: Locator, description: string) {
        try{
            await locator.hover();            
            Log.info(`Hovered on ${description} successfully.`);
        } catch (error) {           
            Log.error(`Error hovering on ${description}: ${error}`);
            throw error;    
        }   
    }

    /**
     * Scrolls to a specific element on the page if it is not already visible.
     * @param locator - The Locator object representing the element to scroll to
     * @param description - A description of the element being scrolled to, used for logging purposes
     * @throws {Error} Throws an error if the scroll action fails
     * @returns {Promise<void>}
     */
    public static async scrollToElement(locator: Locator, description: string): Promise<void> {
        try{
            await locator.scrollIntoViewIfNeeded();            
            Log.info(`Scrolled to ${description} successfully.`);
        } catch (error) {           
            Log.error(`Error scrolling to ${description}: ${error}`);
            throw error;    
        }   
    }


    /**
     * Verifies that a specified element is visible on the page.
     * @param locator - The Locator object representing the element to verify
     * @param description - A descriptive name of the element for logging purposes
     * @throws {Error} Throws an error if the element is not visible
     * @returns {Promise<void>} A promise that resolves when the visibility check completes
     */
    public static async verifyElement(locator: Locator, description: string): Promise<Boolean> {
        try{
            await expect(locator).toBeVisible();            
            Log.info(`${description} is visible on the page.`);
            return true;
        } catch (error) {           
            Log.error(`Error verifying visibility of ${description}: ${error}`);
            return false;  
        }       
    }

    public static async attachScreenshot(page: any, test:any, screenshotName: any, screenshotDetails: string){
        screenshotName = await page.screenshot({ fullPage: true });
        test.info().attach(screenshotDetails, {body: screenshotName, contentType: 'image/png'})
    }
    
}