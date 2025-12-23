import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';

class MyAccountPage {
      
   private readonly ProductCategoryLink: Locator;
   private readonly ProductSubCategoryLink: Locator;
   
   constructor(private page: Page) {
        this.page = page;
        this.ProductCategoryLink = page.locator("//section[@id='categorymenu']//child::a[contains(text(),'Apparel & accessories')]");
        this.ProductSubCategoryLink = page.locator("//section[@id='categorymenu']//child::a[contains(text(),'T-shirts')]");
    }

   public async hoverOnProductCategory() {
       await UIActions.hoverElement(this.ProductCategoryLink, "Product Category Link");
   }

   public async selectProductSubCategory() {       
       await UIActions.clickElement(this.ProductSubCategoryLink, "Product Sub Category Link");
   }

   
}

export default MyAccountPage;