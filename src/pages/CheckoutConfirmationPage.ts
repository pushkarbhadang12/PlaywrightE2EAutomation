import { expect, Page, Locator } from "@playwright/test";
import UIActions from "../utils/UIActions";
import Log from '../config/Logger';
import Reporter from "../config/Reporter";


class CheckoutConfirmationPage  {      
    
   private readonly ConfirmOrderButton: Locator;
   private readonly CheckoutConfirmationPageHeading: Locator;
   private readonly productTotalAmount: Locator;
   private readonly finalAmount: Locator;
   
   constructor(private page: Page) {
        this.page = page;        
        this.ConfirmOrderButton = page.getByTitle('Confirm Order');
        this.CheckoutConfirmationPageHeading = page.locator("//span[contains(text(),'Checkout Confirmation')]");
        this.productTotalAmount = page.locator("//td[@class='checkout_heading']");
        this.finalAmount = page.locator("//span[@class='bold totalamout']");
    } 

   public async verifyCheckoutConfirmationPageHeading() {       
       await UIActions.verifyElementVisibility(this.CheckoutConfirmationPageHeading, "Checkout Confirmation Page Heading");
   }

   public async clickConfirmOrderButton() {
       await UIActions.scrollToElement(this.ConfirmOrderButton, "Confirm Order Button");       
       await Reporter.attachScreenshotToReport(this.page, "CheckoutConfirmationPage","Checkout Confirmation Page");
       await UIActions.clickElement(this.ConfirmOrderButton, "Confirm Order Button");
   }

   public async calculateShoppingCartTotalAmount(): Promise<number> {
       // Implementation for calculating total amount can be added here
       const productTotalAmount = this.productTotalAmount;
       const productCount = await productTotalAmount.count();
       let totalAmount = 0;
       for (let i = 0; i < productCount; i++) {
           const amountText = await productTotalAmount.nth(i).innerText();
           const amountValue = parseFloat(amountText.replace(/[^0-9.]/g, ''));
           totalAmount += amountValue;
       }
       return totalAmount;
   }

   public async getShoppingCartTotalAmountOnCheckoutConfirmationPage(): Promise<number> {
       const finalAmount = this.finalAmount;
       const finalAmountText = await finalAmount.textContent();
       const amountValue = parseFloat(finalAmountText!.replace(/[^0-9.]/g, ''));
       return amountValue;
   }    

   
}

export default CheckoutConfirmationPage;