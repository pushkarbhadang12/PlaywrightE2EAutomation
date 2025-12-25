import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';

class MyAccountPage {
      
   private readonly ProductCategoryLink: (ProductCategoryName: string) => Locator;
   private readonly ProductSubCategoryLink: (ProductSubCategoryName: string) => Locator;
   private readonly ItemsLink: Locator;
   private readonly ItemsCount: Locator;
   
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
    }

   public async hoverOnProductCategory(ProductCategoryName: string) {
       await UIActions.hoverElement(this.ProductCategoryLink(ProductCategoryName), "Product Category Link");
   }

   public async selectProductSubCategory(ProductSubCategoryName: string) {       
       await UIActions.clickElement(this.ProductSubCategoryLink(ProductSubCategoryName), "Product Sub Category Link");
   }

   public async viewCartItemsCountAndPrice() {       
       await UIActions.hoverElement(this.ItemsLink, "Items Link");  
       
       const itemCount = await this.ItemsCount.textContent();
       Log.info("Items Count:"+itemCount);   
       expect(itemCount).not.toBe("$0.00");

       const itemsTotal = await this.ItemsLink.textContent();
       Log.info("Items Total:"+itemsTotal);
       expect(itemsTotal).not.toBe("0");
   }   
}

export default MyAccountPage;