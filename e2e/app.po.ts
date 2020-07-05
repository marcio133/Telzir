import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('app-root h1')).getText();
  }

  getSubmitButton() {
    return element(by.id('submit-button'));
  }

  getOriginSelect() {
    return element(by.css('[formcontrolname="origin"]'));
  }

  getDestinySelect() {
    return element(by.css('[formcontrolname="destiny"]'));
  }

  getDurationInput(duration) {
    return element(by.css('[formcontrolname="duration"]')).sendKeys(duration);
  }

  getPlanSelect() {
    return element(by.css('[formcontrolname="duration"]'));
  }

  selectDropdownbyNum (optionNum: number) {
    if (optionNum) {
      element.all(by.tagName('option')).then(options => {
        options[optionNum].click();
      });
    }
  }

  getResultTitle() {
    return element(by.css('.result_primary')).getText();
  }

  getResultNoPlanTitle() {
    return element(by.css('.result_no_plan')).getText();
  }

  getErrorMessage() {
    return element(by.css('.message-error'));
  }

  getNavigateButton() {
    return element(by.id('navigate-button'));
  }
}
