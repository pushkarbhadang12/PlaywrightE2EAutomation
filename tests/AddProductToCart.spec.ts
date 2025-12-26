import {test} from '../src/config/BaseTest';
import HomePage from '../src/pages/HomePage';
import LoginPage from '../src/pages/LoginPage';
import MyAccountPage from '../src/pages/MyAccountPage';
import ProductSelectionPage from '../src/pages/ProductSelectionPage';
import ProductDetailsPage from '../src/pages/ProductDetailsPage';
import ShoppingCartPage from '../src/pages/ShoppingCartPage';
import CryptoEncryptDecrypt from '../src/utils/CryptoEncryptDecrypt';
import Log from '../src/config/Logger';
import {readExcelFile} from '../src/utils/ExcelDataProvider';

const baseURL = process.env.Base_URL;    
const username = process.env.Default_Username;
const password = process.env.Default_Password;    

const cryptoEncryptDecrypt = new CryptoEncryptDecrypt(process.env.ENCRYPTION_KEY);
const decryptedPassword = cryptoEncryptDecrypt.decryptData(password!); 

const testDataRecords = readExcelFile('test-data-automation-test-store.xlsx','AddProduct');

test.describe('Add Product to Shopping Cart from Excel Data', () => {
    testDataRecords.forEach((testDataRecord) => {
        if(testDataRecord.ExecutionFlag == "Yes"){
            test(testDataRecord.TestCaseId + ': ' + testDataRecord.TestCaseName, async ({page}) => {    

                const loginPage = new LoginPage (page); 
                const homePage = new HomePage(page);   
                const myAccountPage = new MyAccountPage(page);   
                const productSelectionPage = new ProductSelectionPage(page);
                const productDetailsPage = new ProductDetailsPage(page);
                const shoppingCartPage = new ShoppingCartPage(page);
                
                Log.testBegin(test.info().title);
                await test.step('Navigate to Application URL', async () => {
                    Log.info('Step 0: Navigate to Application URL');        
                    await page.goto(baseURL!);        
                });

                await test.step('Click on Login Link', async () => {
                    Log.info('Step 1: Click on Login Link');        
                    await homePage.clickLoginLink();        
                });
                
                await test.step('Login to Application and verify login', async () => {
                    Log.info('Step 2: Login to Application and verify login');       
                    Log.info('Performing Login Action');       
                    await loginPage.performLogin(username!, decryptedPassword);   
                    Log.info('Verify Login Success');
                    await loginPage.verifyLoginSuccess(testDataRecord.PageTitleMyAccountPage);
                })  
                
                await test.step('Select Product Category and Sub Category', async () => {
                    Log.info('Step 3: Select Product Category and Sub Category');        
                    await myAccountPage.hoverOnProductCategory(testDataRecord.ProductCategoryName);
                    await myAccountPage.selectProductSubCategory(testDataRecord.ProductSubCategoryName);         
                });
                
                await test.step('Select Product to Add to Cart', async () => {
                    Log.info('Step 4: Select Product to Add to Cart');
                    Log.info('Verify Product Sub Category Heading');      
                    await productSelectionPage.verifyProductSubCategoryHeading(testDataRecord.ProductSubCategoryName);  
                    Log.info('Select Product');      
                    await productSelectionPage.selectProduct(testDataRecord.ProductName);     
                });

                await test.step('Add selected Product in Shopping Cart', async () => {
                    Log.info('Step 5: Add selected Product in Shopping Cart');   
                    Log.info('Verify Product Name in Header');      
                    await productDetailsPage.verifyProductHeading(testDataRecord.ProductName);  
                    Log.info('Add Product to Shopping Cart');      
                    await productDetailsPage.addProductToCart();     
                });
                
                await test.step('Verify If Product is added in Shopping Cart', async () => {
                    Log.info('Step 6: Verify If Product is added in Shopping Cart');  
                    Log.info('Verify Shopping Cart Page Heading');  
                    await shoppingCartPage.verifyShoppingCartPageHeading();
                    Log.info('Verify Product in Shopping Cart');
                    await shoppingCartPage.verifyProductExistanceInShoppingCart(testDataRecord.ProductName);
                    Log.info('Click to Continue Shopping');
                    await shoppingCartPage.clickOnContinueShopping();                    
                }); 

                await test.step('View Shopping Cart Item Count and Price on My Account Page', async () => {
                    Log.info('Step 7: View Shopping Cart Item Count and Price on My Account Page');  
                    await myAccountPage.viewCartItemsCountAndPrice();
                });

                await test.step('Logout from Application', async () => {
                    Log.info('Step 8: Logout from Application');  
                    Log.info('Performing Logout Action');
                    await myAccountPage.logOutFromApplication();
                    Log.info('Verify Logout Success');
                    await loginPage.verifyLogoutSuccess();
                });

                Log.testEnd(test.info().title);
                    
            });
        }
   });
});
