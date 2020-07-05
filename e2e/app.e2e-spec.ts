import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('bliive-tel App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Page title must be equal to Telzir', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Telzir');
  });

  it('Submit Button must be disabled', () => {
    const button = page.getSubmitButton();

    expect(button.isEnabled()).toBeFalsy();
  });

  it('Must fill the form and check the submit button again', () => {
    page.getOriginSelect().click();
    page.selectDropdownbyNum(1);
    page.getDestinySelect().click();
    page.selectDropdownbyNum(7);
    page.getDurationInput('20');
    page.getPlanSelect().click();
    page.selectDropdownbyNum(11);
    const button = page.getSubmitButton();

    expect(button.isEnabled()).toBeTruthy();
  });

  it('Must generate the result 0 and 38', () => {
    page.getSubmitButton().click();
    browser.sleep(3000);

    const resultTitle = page.getResultTitle();
    const resultNoPlanTitle = page.getResultNoPlanTitle();

    expect(resultTitle).toContain('Com FaleMais 30');
    expect(resultTitle).toContain('$ 0.00');
    expect(resultNoPlanTitle).toContain('Sem FaleMais');
    expect(resultNoPlanTitle).toContain('$ 38.00');
  });

  it('Select the same value in origin and destiny must show the error message', () => {
    page.getOriginSelect().click();
    page.selectDropdownbyNum(1);
    page.getDestinySelect().click();
    page.selectDropdownbyNum(6);

    page.getSubmitButton().click();
    const message = page.getErrorMessage();

    expect(message).toBeTruthy();
  });

  it('Must navigate to Historic page', () => {
    page.getNavigateButton().click();

    const title = page.getTitle();

    expect(title).toContain('Histórico de Consultas');
  });
});
