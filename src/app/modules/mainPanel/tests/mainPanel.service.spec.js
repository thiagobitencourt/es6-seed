import Service from '../mainPanel.service';

describe('Main Panel service', () => {
  let mainPanelService;

  beforeEach(angular.mock.module($provide => {
    $provide.service('mainPanelService', Service);
  }));

  beforeEach(inject(_mainPanelService_ => {
    mainPanelService = _mainPanelService_;
  }));

  it(' should be defined', () => {
    expect(mainPanelService).toBeDefined();
  });

  it(' should have an initial service attribute', () => {
    expect(mainPanelService.serviceAttr).toBeDefined();
  });

  it(' should update the service attribute', () => {
    let value = 'new attribute value';
    let newValue = mainPanelService.serviceFunction(value);
    expect(newValue).toEqual(value);
  });

});