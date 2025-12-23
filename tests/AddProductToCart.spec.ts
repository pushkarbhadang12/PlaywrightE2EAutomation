import {test} from '@playwright/test';
import HomePage from '../src/pages/HomePage';
import LoginPage from '../src/pages/LoginPage';
import MyAccountPage from '../src/pages/MyAccountPage';
import ProductSelectionPage from '../src/pages/ProductSelectionPage';
import ProductDetailsPage from '../src/pages/ProductDetailsPage';
import CryptoEncryptDecrypt from '../src/utils/CryptoEncryptDecrypt';
import Log from '../src/config/Logger';

test('Add Product to Shopping Cart', async ({page}) => {
    
    const baseURL = process.env.Base_URL;    
    const username = process.env.Default_Username;
    const password = process.env.Default_Password;    
   
    const cryptoEncryptDecrypt = new CryptoEncryptDecrypt(process.env.ENCRYPTION_KEY);
    const decryptedPassword = cryptoEncryptDecrypt.decryptData(password!);    

    const loginPage = new LoginPage (page); 
    const homePage = new HomePage(page);   
    const myAccountPage = new MyAccountPage(page);   
    const productSelectionPage = new ProductSelectionPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    
    Log.testBegin(test.info().title);
    await test.step('Navigate to Application URL', async () => {
        Log.info('Step 0: Navigate to Application URL');        
        await page.goto(baseURL!);        
    });

    await test.step('Click on Login Link', async () => {
        Log.info('Step 1: Click on Login Link');        
        await homePage.clickLoginLink();        
    });
    
    await test.step('Login to Application', async () => {
        Log.info('Step 2: Login to Application');       
        Log.info('Performing Login Action');       
        await loginPage.performLogin(username!, decryptedPassword);   
    })     
    
    await test.step('Verify Login Success', async () => {
        Log.info('Step 3: Verify Login Success');
        await loginPage.verifyLoginSuccess();
    });

    await test.step('Select Product Category and Sub Category', async () => {
        Log.info('Step 4: Select Product Category and Sub Category');        
        await myAccountPage.hoverOnProductCategory();
        await myAccountPage.selectProductSubCategory();      
        await page.waitForTimeout(5000);  
    });

    await test.step('Verify Product Heading', async () => {
        Log.info('Step 5: Verify Product Heading');      
        await productSelectionPage.verifyProductHeading();      
    });

    await test.step('Select Product to Add to Cart', async () => {
        Log.info('Step 6: Select Product to Add to Cart');      
        await productSelectionPage.selectProduct();      
    });

    await test.step('Verify Product Name in Header', async () => {
        Log.info('Step 7: Verify Product Name in Header');      
        await productDetailsPage.verifyProductNameInHeader();      
    });

    await test.step('Add selected Product in Shopping Cart', async () => {
        Log.info('Step 8: Add selected Product in Shopping Cart');      
        await productDetailsPage.addProductToCart();      
    }); 

    Log.testEnd(test.info().title);
        
});