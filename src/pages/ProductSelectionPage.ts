import { Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';

class ProductSelectionPage {      
    
   private readonly ProductHeading: Locator;
   private readonly ProductLink: Locator;
   
   
   constructor(private page: Page) {
        this.page = page;       
        this.ProductHeading = page.locator("//span[contains(text(),'T-shirts')]");
        this.ProductLink = page.locator("//div[contains(@class,'list-inline')]//child::a[contains(text(),'Polo Shirt')]");
   }

   public async verifyProductHeading() {
       await UIActions.verifyElement(this.ProductHeading, "Product Heading: T-shirts");
   }

   public async selectProduct() {       
       await UIActions.scrollToElement(this.ProductLink, "Product Link: Polo Shirt");   
       await UIActions.clickElement(this.ProductLink, "Product Link: Polo Shirt");
   }  
   
}

export default ProductSelectionPage;