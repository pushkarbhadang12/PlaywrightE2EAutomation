import {test} from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';
import CryptoEncryptDecrypt from '../src/utils/CryptoEncryptDecrypt';
import MyAccountPage from '../src/pages/MyAccountPage';
import Log from '../src/config/Logger';
//import loginRecords from '../test-data/user-test-data-login.json';
import { read } from 'fs';
import { readExcelFile } from '../src/utils/ExcelDataProvider';

const loginRecords = readExcelFile('user-test-data-login.xlsx', 'Sheet2');

test.describe('Login Tests from Excel Data', () => {
    loginRecords.forEach((loginRecord) => {
        if(loginRecord.ExecutionFlag == "Yes") {
            test(`Login Test: ${loginRecord.TestCaseId}`, async ({page}) => {   
                const loginURL = process.env.Base_URL;    
                const username = loginRecord.Username;
                const password = loginRecord.Password;    

                const loginPage = new LoginPage (page);    
                await loginPage.navigateToLoginPage(loginURL!);
                await loginPage.performLogin(username, password);    
                await loginPage.verifyLoginSuccess();
            });    
        }
    });
});


// test('Login', async ({page}) => {
    
//     const loginURL = process.env.Base_URL;    
//     const username = process.env.Default_Username;
//     const password = process.env.Default_Password;    
   
//     const cryptoEncryptDecrypt = new CryptoEncryptDecrypt(process.env.ENCRYPTION_KEY);
//     const decryptedPassword = cryptoEncryptDecrypt.decryptData(password!);    

//     const loginPage = new LoginPage (page); 
//     const myAccountPage = new MyAccountPage(page);   
    
//     Log.testBegin('Add to Cart Test');
    
//     await test.step('Login to Application', async () => {
//         Log.info('Step 1: Login to Application');
//         Log.info('Navigating to Login Page');
//         await loginPage.navigateToLoginPage(loginURL!);
//         Log.info('Performing Login Action');
//         await loginPage.performLogin(username!, decryptedPassword);   
//     })     
    
//     await test.step('Verify Login Success', async () => {
//         Log.info('Step 2: Verify Login Success');
//         await loginPage.verifyLoginSuccess();
//     });

// });

