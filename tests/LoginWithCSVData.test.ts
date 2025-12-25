import {test, expect} from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';

import { readCSVFile } from '../src/utils/CSVDataProvider';

const loginRecords = readCSVFile('user-test-data-login.csv');

test.describe('Login Tests from CSV Data', () => {
    loginRecords.forEach((loginRecord) => {
        if(loginRecord.ExecutionFlag == "Yes") {    
            test(`Login Test: ${loginRecord.TestCaseId}`, async ({page}) => {   
                const loginURL = process.env.Base_URL;    
                const username = loginRecord.Username;
                const password = loginRecord.Password;
                
                const loginPage = new LoginPage (page);    
                await page.goto(loginURL!);
                await loginPage.performLogin(username, password);    
                await loginPage.verifyLoginSuccess("My Account");
            });
        }    
    });
});