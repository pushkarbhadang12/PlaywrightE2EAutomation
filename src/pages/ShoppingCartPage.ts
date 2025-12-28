import { Page, Locator, expect } from "@playwright/test";
import {test} from "../config/BaseTest";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';

class ShoppingCartPage {      
    
   private readonly ShoppingCartHeading: Locator; 
   private readonly ProductInShoppingCart: (ProductName: string) => Locator;  
   private readonly ContinueShopping: Locator;
   private readonly deleteButton: (ProductName: string) => Locator;  
   
   constructor(private page: Page) {
        this.page = page;       
        this.ShoppingCartHeading = page.getByText("Shopping Cart");        
        this.ProductInShoppingCart = (ProductName: string) => {
          return page.locator("//form[@id='cart']//child::a[contains(text(),'"+ProductName+"')]");
        }        
        this.ContinueShopping = page.locator("//table[@id='totals_table']//following::a[@title='']");
        this.deleteButton = (ProductName: string) => {
          return page.locator("//tr[.//a[contains(text(),'"+ProductName+"')]]//td//a[contains(@href,'cart&remove')]");
        }
   }

   public async verifyShoppingCartPageHeading() {
       await UIActions.verifyElementVisibility(this.ShoppingCartHeading, "Shopping Cart Heading");
   }

   public async verifyProductExistanceInShoppingCart(ProductName: string): Promise<Boolean> {
      //  await UIActions.scrollToElement(this.ProductInShoppingCart(ProductName), "Product Name " + ProductName + " in Shopping Cart");
      //  await UIActions.attachScreenshot(this.page, test, "ShoppingCart", "Shopping Cart Page"); 
       const IsProductAvailableInCart:Boolean = await UIActions.verifyElementVisibility(this.ProductInShoppingCart(ProductName), "Product Name in Shopping Cart");
       if(!IsProductAvailableInCart){
          Log.error("Product "+ ProductName + "is not available in Shopping Cart");
       } else{
          Log.info("Product " + ProductName + " is available in Shopping Cart");
       }
       return IsProductAvailableInCart;
    }

   public async clickOnContinueShopping() {
       await UIActions.scrollToElement(this.ContinueShopping, "Continue Shopping");
       await UIActions.attachScreenshot(this.page, test, "ShoppingCartTotal", "Shopping Cart Total Amount");
       await UIActions.clickElement(this.ContinueShopping, "Continue Shopping");
   }
   
   public async deleteProductFromShoppingCart(ProductName: string) {
       await UIActions.verifyElementVisibility(this.ProductInShoppingCart(ProductName), "Product Name in Shopping Cart before Deletion");
       await UIActions.scrollToElement(this.deleteButton(ProductName), "Delete Button for Product: "+ProductName);
       await UIActions.clickElement(this.deleteButton(ProductName), "Delete Button for Product: "+ProductName);
       await this.page.waitForTimeout(5000);
       await UIActions.attachScreenshot(this.page, test, "ShoppingCartAfterDeletion", "Shopping Cart After Deletion of Product: "+ProductName); 
   }
}

export default ShoppingCartPage;