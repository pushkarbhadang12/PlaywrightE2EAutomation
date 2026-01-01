import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Reporter from "../config/Reporter";

class ProductDetailsPage {      
    
   private readonly ProductNameHeader: (ProductName: string)=>Locator;
   private readonly AddToCartButton: Locator;
   private readonly AddToWishlistLink: Locator
   private readonly RemoveFromWishlistLink: Locator;
   private readonly welcomeMessage: Locator;
   private readonly myWishlistLink: Locator;

   constructor(private page: Page) {
        this.page = page;       
        this.ProductNameHeader = (ProductName: string)=>{
            return page.locator("//span[contains(text(),'"+ProductName+"')]");
        }
        this.AddToCartButton = page.getByText("Add to Cart");
        this.AddToWishlistLink = page.locator("//a[contains(@class,'wishlist_add')]");
        this.RemoveFromWishlistLink = page.locator("//a[contains(@class,'wishlist_remove')]");
        this.welcomeMessage = page.locator("//div[contains(text(),'Welcome')]");
        this.myWishlistLink = page.locator("//li[@class='dropdown open']//child::a[contains(text(),'My wish list')]");
    }

   public async verifyProductHeading(ProductName: string) {
       const verifyHeader = await UIActions.verifyElementVisibility(this.ProductNameHeader(ProductName), "Product Name Header: "+ProductName);
       expect(verifyHeader).toBeTruthy();
    }  

    public async addProductToCart(){
           await UIActions.scrollToElement(this.AddToCartButton, "Add To Cart Button");
           await UIActions.clickElement(this.AddToCartButton, "Add To Cart Button");
    }  

    public async addProductToWishlist(){
           await UIActions.scrollToElement(this.AddToWishlistLink, "Add To Wishlist Link");
           await UIActions.clickElement(this.AddToWishlistLink, "Add To Wishlist Link");
    }  

    public async checkIfRemoveFromWishlistLinkIsVisible(): Promise<boolean> {
           await UIActions.scrollToElement(this.AddToCartButton, "Add To Cart Button"); 
           const isProductAddedToWishlist = await UIActions.verifyElementVisibility(this.RemoveFromWishlistLink, "Remove From Wishlist Link");
           Reporter.attachScreenshotToReport(this.page, "RemoveFromWishlistLink","Remove From Wishlist Link Visibility");
           if(isProductAddedToWishlist){
               return true;
           } else{
               return false;
           }
    }

    public async goToWishListPage(){
           await UIActions.scrollToElement(this.welcomeMessage, "Welcome Message");
           await UIActions.hoverElement(this.welcomeMessage, "Welcome Message");
           await UIActions.clickElement(this.myWishlistLink, "My Wishlist Link");          
    }
}

export default ProductDetailsPage;