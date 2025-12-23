import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';

class ProductDetailsPage {      
    
   private readonly ProductNameHeader: Locator;
   private readonly AddToCartButton: Locator;

   constructor(private page: Page) {
        this.page = page;        
        this.ProductNameHeader = page.locator("//span[contains(text(),'Polo Shirt')]");
         this.AddToCartButton = page.getByText("Add to Cart");
    }

   public async verifyProductNameInHeader() {
       await UIActions.verifyElement(this.ProductNameHeader, "Product Name Header: Polo Shirt");
   }  

    public async addProductToCart(){
           await UIActions.scrollToElement(this.AddToCartButton, "Add To Cart Button");
           await UIActions.clickElement(this.AddToCartButton, "Add To Cart Button");
       }
   
}

export default ProductDetailsPage;