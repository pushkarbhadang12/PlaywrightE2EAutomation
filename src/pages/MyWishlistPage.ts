import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Reporter from "../config/Reporter";

class MyWishlistPage {      
    
   private readonly pageHeading: Locator;
   private readonly ProductInWishlist: (ProductName: string) => Locator; 
   private readonly deleteButton: (ProductName: string) => Locator;
   
   constructor(private page: Page) {
        this.page = page;        ""
        this.pageHeading = page.locator("//span[@class='maintext']");
        this.ProductInWishlist = (ProductName: string) => {
          return page.locator("//div[@id='maincontainer']//child::a[contains(text(),'"+ProductName+"')]");
        } 
        this.deleteButton = (ProductName: string) => {
          return page.locator("//tr[.//a[contains(text(),'"+ProductName+"')]]//following-sibling::td//a[contains(@class,'btn-remove')]");
        }
   }

   public async verifyPageHeading(expectedHeading: string): Promise<boolean> {
       const pageHeadingText = await UIActions.getElementText(this.pageHeading, "My Wishlist Page Heading");
       console.log("Page Heading Text: " + pageHeadingText);
       if(pageHeadingText.includes(expectedHeading)){
              return true;
       } else{
              return false;
       }
    }

    public async verifyExistanceOfProductInWishList(productName: string): Promise<boolean> {
        const isProductAvailableInWishlist = await UIActions.verifyElementVisibility(this.ProductInWishlist(productName), "Product in Wishlist");
        Reporter.attachScreenshotToReport(this.page, "MyWishlistPage","My Wishlist Page");
        if(isProductAvailableInWishlist){
            return true;
        } else {
            return false;
        }
        //expect(isProductAvailableInWishlist).toBeTruthy();
   }

    public async deleteProductFromWishlist(ProductName: string) {        
        await UIActions.scrollToElement(this.deleteButton(ProductName), "Delete Button for Product: "+ProductName);
        await UIActions.clickElement(this.deleteButton(ProductName), "Delete Button for Product: "+ProductName);    
        await UIActions.waitForElementToBeInvisible(this.ProductInWishlist(ProductName), "Product in Wishlist after Deletion");
        await Reporter.attachScreenshotToReport(this.page, "MyWishlistPage","My Wishlist Page after Deletion");
    }
}

export default MyWishlistPage;