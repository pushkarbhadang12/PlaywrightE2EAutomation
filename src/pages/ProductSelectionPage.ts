import { Page, Locator, expect } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Reporter from "../config/Reporter";

class ProductSelectionPage {      
    
   private readonly ProductSubCategoryHeading: (ProductSubCategoryName: string) => Locator;
   private readonly ProductLink: (ProductName: string) => Locator;
   
   
   constructor(private page: Page) {
        this.page = page;       
        this.ProductSubCategoryHeading = (ProductSubCategoryName: string) => {
            return page.locator("//span[contains(text(),'"+ProductSubCategoryName+"')]");
        }       
        this.ProductLink = (ProductName: string) => {
            return page.locator("//div[contains(@class,'list-inline')]//child::a[contains(text(),'"+ProductName+"')]");
        }
    }

   public async verifyProductSubCategoryHeading(ProductSubCategoryName: string) {
       const productSubCategoryHeading = await UIActions.verifyElementVisibility(this.ProductSubCategoryHeading(ProductSubCategoryName), "Product Sub Category Heading: "+ProductSubCategoryName);       
       await Reporter.attachScreenshotToReport(this.page, "ProductSubCategoryHeading","Product Sub Category Heading");
       expect(productSubCategoryHeading).toBeTruthy();
    }

   public async selectProduct(ProductName: string) {       
       await UIActions.scrollToElement(this.ProductLink(ProductName), "Product Link: "+ProductName);   
       await UIActions.clickElement(this.ProductLink(ProductName), "Product Link: "+ProductName);
   }   
}

export default ProductSelectionPage;