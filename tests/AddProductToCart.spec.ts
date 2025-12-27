import {test} from '../src/config/BaseTest';
import LoginPage from '../src/pages/LoginPage';
import MyAccountPage from '../src/pages/MyAccountPage';
import ProductSelectionPage from '../src/pages/ProductSelectionPage';
import ProductDetailsPage from '../src/pages/ProductDetailsPage';
import ShoppingCartPage from '../src/pages/ShoppingCartPage';
import Log from '../src/config/Logger';
import {readExcelFile} from '../src/utils/ExcelDataProvider';

const baseURL = process.env.Base_URL; 

const testDataRecords = readExcelFile('test-data-automation-test-store.xlsx','AddProduct');

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL!);
});

test.describe('Add Product to Shopping Cart from Excel Data', () => {
    testDataRecords.forEach((testDataRecord) => {
        if(testDataRecord.ExecutionFlag == "Yes"){
            test(testDataRecord.TestCaseId + ': ' + testDataRecord.TestCaseName, async ({page}) => {    

                const myAccountPage = new MyAccountPage(page);   
                const productSelectionPage = new ProductSelectionPage(page);
                const productDetailsPage = new ProductDetailsPage(page);
                const shoppingCartPage = new ShoppingCartPage(page);               
                
                Log.testBegin(test.info().title);
                await test.step('Verify if application is logged in', async () => {
                    Log.info('Step 1: Verify if application is logged in');        
                    await myAccountPage.verifyIfApplicationIsLoggedIn();                    
                });

                await test.step('Select Product Category and Sub Category', async () => {
                    Log.info('Step 2: Select Product Category and Sub Category');        
                    await myAccountPage.hoverOnProductCategory(testDataRecord.ProductCategoryName);
                    await myAccountPage.selectProductSubCategory(testDataRecord.ProductSubCategoryName);         
                });
                
                await test.step('Select Product to Add to Cart', async () => {
                    Log.info('Step 3: Select Product to Add to Cart');
                    Log.info('Verify Product Sub Category Heading');      
                    await productSelectionPage.verifyProductSubCategoryHeading(testDataRecord.ProductSubCategoryName);  
                    Log.info('Select Product');      
                    await productSelectionPage.selectProduct(testDataRecord.ProductName);     
                });

                await test.step('Add selected Product in Shopping Cart', async () => {
                    Log.info('Step 4: Add selected Product in Shopping Cart');   
                    Log.info('Verify Product Name in Header');      
                    await productDetailsPage.verifyProductHeading(testDataRecord.ProductName);  
                    Log.info('Add Product to Shopping Cart');      
                    await productDetailsPage.addProductToCart();     
                });
                
                await test.step('Verify If Product is added in Shopping Cart', async () => {
                    Log.info('Step 5: Verify If Product is added in Shopping Cart');  
                    Log.info('Verify Shopping Cart Page Heading');  
                    await shoppingCartPage.verifyShoppingCartPageHeading();
                    Log.info('Verify Product in Shopping Cart');
                    await shoppingCartPage.verifyProductExistanceInShoppingCart(testDataRecord.ProductName);
                    Log.info('Click to Continue Shopping');
                    await shoppingCartPage.clickOnContinueShopping();                    
                }); 

                await test.step('View Shopping Cart Item Count and Price on My Account Page', async () => {
                    Log.info('Step 6: View Shopping Cart Item Count and Price on My Account Page');  
                    await myAccountPage.viewCartItemsCountAndPrice();                    
                });

                // await test.step('Logout from Application', async () => {
                //     Log.info('Step 8: Logout from Application');  
                //     Log.info('Performing Logout Action');
                //     await myAccountPage.logOutFromApplication();
                //     Log.info('Verify Logout Success');
                //     await loginPage.verifyLogoutSuccess();
                // });

                Log.testEnd(test.info().title);
                    
            });
        }
   });
});