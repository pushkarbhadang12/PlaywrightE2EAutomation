import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';

class ProductDetailsPage {      
    
   private readonly ProductNameHeader: (ProductName: string)=>Locator;
   private readonly AddToCartButton: Locator;

   constructor(private page: Page) {
        this.page = page;       
        this.ProductNameHeader = (ProductName: string)=>{
            return page.locator("//span[contains(text(),'"+ProductName+"')]");
        }
        this.AddToCartButton = page.getByText("Add to Cart");
    }

   public async verifyProductHeading(ProductName: string) {
       const verifyHeader: Boolean = await UIActions.verifyElement(this.ProductNameHeader(ProductName), "Product Name Header: Polo Shirt");
       expect(verifyHeader).toBeTruthy();
    }  

    public async addProductToCart(){
           await UIActions.scrollToElement(this.AddToCartButton, "Add To Cart Button");
           await UIActions.clickElement(this.AddToCartButton, "Add To Cart Button");
       }  
}

export default ProductDetailsPage;