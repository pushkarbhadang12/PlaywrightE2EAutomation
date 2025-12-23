import { expect, Page, Locator } from "@playwright/test";
import Log from '../config/Logger';
import UIActions from "../utils/UIActions"; 

class LoginPage {
      
   private readonly userNameTextBox: Locator;
   private readonly passwordTextBox: Locator;
   private readonly loginButton: Locator;
   private readonly errorMessage: Locator;

   constructor(private page: Page) {
        this.page = page;        
        this.userNameTextBox = page.locator('#loginFrm_loginname');
        this.passwordTextBox = page.locator('#loginFrm_password');
        this.loginButton = page.getByTitle('Login');
        this.errorMessage = page.getByText('Incorrect login or password');
   }

   public async performLogin(username: string, password: string) {        
       await UIActions.fillElement(this.userNameTextBox, username, "User Name Text Box");
       await UIActions.fillElementWithSensitiveData(this.passwordTextBox, password, "Password Text Box");
       await UIActions.clickElement(this.loginButton, "Login Button");
   }

   public async verifyLoginSuccess() {
       const pageTitleCheck = await UIActions.verifyPageTitle("My Account", this.page, "My Account Page");

       if (!pageTitleCheck ){
            Log.error("Login Failed - Page title does not match"); 
            Log.error(`Received error on Login` + await this.errorMessage.textContent()!);
         }         
       else
            Log.info("Login Successful - Page title matches");    
     
        expect(pageTitleCheck).toBeTruthy();       
   }
}

export default LoginPage;