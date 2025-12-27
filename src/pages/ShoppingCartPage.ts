import { Page, Locator, expect } from "@playwright/test";
import {test} from "../config/BaseTest";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';

class ShoppingCartPage {      
    
   private readonly ShoppingCartHeading: Locator; 
   private readonly ProductInShoppingCart: (ProductName: string) => Locator;  
   private readonly ContinueShopping: Locator;  
   
   constructor(private page: Page) {
        this.page = page;       
        this.ShoppingCartHeading = page.getByText("Shopping Cart");        
        this.ProductInShoppingCart = (ProductName: string) => {
          return page.locator("//form[@id='cart']//child::a[contains(text(),'"+ProductName+"')]");
        }        
        this.ContinueShopping = page.locator("//table[@id='totals_table']//following::a[@title='']");
   }

   public async verifyShoppingCartPageHeading() {
       await UIActions.verifyElementVisibility(this.ShoppingCartHeading, "Shopping Cart Heading");
   }

   public async verifyProductExistanceInShoppingCart(ProductName: string) {
       await UIActions.scrollToElement(this.ProductInShoppingCart(ProductName), "Product Name in Shopping Cart");
       await UIActions.attachScreenshot(this.page, test, "ShoppingCart", "Shopping Cart Page"); 
       const IsProductAddedInCart:Boolean = await UIActions.verifyElementVisibility(this.ProductInShoppingCart(ProductName), "Product Name in Shopping Cart");
       if(!IsProductAddedInCart){
          Log.error("Unable to Add Product in Shopping Cart");
       } else{
          Log.info("Product added successfully in Shopping Cart");
       }
       expect(IsProductAddedInCart).toBeTruthy();
    }
   
   public async clickOnContinueShopping() {
       await UIActions.scrollToElement(this.ContinueShopping, "Continue Shopping");
       await UIActions.attachScreenshot(this.page, test, "ShoppingCartTotal", "Shopping Cart Total Amount");
       await UIActions.clickElement(this.ContinueShopping, "Continue Shopping");
   }   
}

export default ShoppingCartPage;