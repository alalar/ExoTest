import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo() {
    return await browser.get('/');
  }

  async getConsultantsList() {
    await browser.driver.findElements(by.css('.userList mat-list-item[routerlinkactive]'));
    return await element.all(by.css('.userList > mat-list-item')).count();
  }

  getCommentsList(){
    return element.all(by.css('.comments mat-list-item'));
  }
  async clickFirstConsultant() {
    await browser.driver.findElements(by.css('.userList mat-list-item[routerlinkactive]'));
    return await element(by.css('.userList > mat-list-item')).click();
  }
  async getFirstConsultantNameFromList() {
    await browser.driver.findElements(by.css('.userList > mat-list-item  .mat-list-text p span'));
    return element(by.css('.userList > mat-list-item  .mat-list-text p span')).textContent.trim();
  }

  async getConsultantNameCardInfo() {
    return await element(by.css('.mainInfo mat-card-header mat-card-title span')).textContent.trim();
    
  }
  async clickShowConsultantListsPanel() {
    await browser.driver.findElements(by.css('.consultantInfoPanel button'));
    return await element(by.css('.consultantInfoPanel button')).click();
  }

  selectEnglish(){
    element(by.css('mat-toolbar-row button')).click();
    element(by.css('.ENlanguage')).click();
  }
  selectSpanish(){
    element(by.css('mat-toolbar-row button')).click();
    element(by.css('.ESlanguage')).click();
  }
  async getUserInfo() {
    await browser.driver.findElements(by.css('.consultantsListPanel mat-nav-list h2'));
    return await element(by.css('.consultantsListPanel mat-nav-list h2')).textContent.trim();
    
  }
  
}
