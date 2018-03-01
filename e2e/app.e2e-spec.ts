import { AppPage } from './app.po';
import { browser, ElementArrayFinder, by, element } from 'protractor';

describe('exo-test App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    var width = 1200;
    var height = 600;
    browser.driver.manage().window().setSize(width, height);
  });

  it('should display list of consultants',async() => {
    await page.navigateTo();
    expect(page.getConsultantsList()).toBeGreaterThan(4);
    });

 it('should show the first consultant', async() => {
    await page.navigateTo();
    page.clickFirstConsultant();
    expect(page.getFirstConsultantNameFromList()).toEqual(page.getConsultantNameCardInfo());
  });

  it('should only show one Panel', async() => {
    var width = 800;
    var height = 600;
    browser.driver.manage().window().setSize(width, height);
    await page.navigateTo();
    expect(element(by.css('.consultantsListPanel')).isDisplayed()).not.toBeTruthy();
    expect(element(by.css('.consultantInfoPanel')).isDisplayed()).toBeTruthy();
    page.clickShowConsultantListsPanel();
    expect(element(by.css('.consultantsListPanel')).isDisplayed()).toBeTruthy();
    expect(element(by.css('.consultantInfoPanel')).isDisplayed()).not.toBeTruthy();
  });

  it('should show it in two languages', async() => {
    await page.navigateTo();
    page.selectEnglish();
    expect(page.getUserInfo()).toEqual("Users");
    page.selectSpanish();
    expect(page.getUserInfo()).toEqual("Usuarios");
  });


});


