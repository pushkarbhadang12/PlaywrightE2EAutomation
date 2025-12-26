import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';
import {test} from "../config/BaseTest";

class MyAccountPage {
      
   private readonly ProductCategoryLink: (ProductCategoryName: string) => Locator;
   private readonly ProductSubCategoryLink: (ProductSubCategoryName: string) => Locator;
   private readonly ItemsLink: Locator;
   private readonly ItemsCount: Locator;
   private readonly HomeLink: Locator;
   private readonly AccountLink: Locator;
   private readonly logoutLink: Locator;
   
   constructor(private page: Page) {
        this.page = page;        
        this.ProductCategoryLink = (ProductCategoryName: string) => {            
            return this.page.getByRole('link', { name: ProductCategoryName });
        }        
        this.ProductSubCategoryLink = (ProductSubCategoryName: string) => {           
            return this.page.locator('#categorymenu').getByRole('link', { name: ProductSubCategoryName });
        }
        this.ItemsLink = page.locator("//span[@class='cart_total']");
        this.ItemsCount = page.locator("//span[@class='cart_total']//preceding-sibling::span");
        this.HomeLink = page.locator("//section[@id='categorymenu']//child::a[contains(text(),'Home')]");
        this.AccountLink = page.locator("//ul[@id='main_menu']//child::span[contains(text(),'Account')]");
        this.logoutLink = page.locator("//ul[@id='main_menu']//following::span[contains(text(),'Logout')]");
    }

   public async hoverOnProductCategory(ProductCategoryName: string) {
       await UIActions.hoverElement(this.ProductCategoryLink(ProductCategoryName), "Product Category Link");
   }

   public async selectProductSubCategory(ProductSubCategoryName: string) {       
       await UIActions.clickElement(this.ProductSubCategoryLink(ProductSubCategoryName), "Product Sub Category Link");
   }

   public async viewCartItemsCountAndPrice() {       
       await UIActions.hoverElement(this.ItemsLink, "Items Link");  
       await UIActions.attachScreenshot(this.page, test, "CartItemsCountAndPrice", "Cart Items Count and Price Details");   
       const itemCount = await this.ItemsCount.textContent();
       Log.info("Items Count:"+itemCount);   
       expect(itemCount).not.toBe("$0.00");

       const itemsTotal = await this.ItemsLink.textContent();
       Log.info("Items Total:"+itemsTotal);
       expect(itemsTotal).not.toBe("0");
   } 
   
   public async logOutFromApplication() {
       await UIActions.hoverElement(this.HomeLink, "Home Link");
       await UIActions.hoverElement(this.AccountLink, "Account Link");       
       await UIActions.clickElement(this.logoutLink, "Logout Link");
   }
}

export default MyAccountPage;