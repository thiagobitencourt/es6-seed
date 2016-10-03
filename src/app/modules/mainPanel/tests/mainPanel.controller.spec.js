import mainPanel from '../mainPanel.module';

describe('Main Panel Controller', () => {
  let $controller, panelController, mainPanelService;

  beforeEach(angular.mock.module(mainPanel));

  beforeEach(inject((_$controller_, _mainPanelService_) => {
    $controller = _$controller_;
    mainPanelService = _mainPanelService_;
  }));

  beforeEach(() => {
    spyOn(mainPanelService, 'serviceFunction').and.stub();
    panelController = $controller('mainPanelController');
  });

  it('Should be defined', () => {
    expect(panelController).toBeDefined();
  });

  it('should have a hello message', () => {
    expect(panelController.hello).toEqual('Wellcome Guest');
  });

  it('should call the "serviceFunction"', () => {
    panelController.$onInit();
    expect(mainPanelService.serviceFunction).toHaveBeenCalledWith('value');
  });
});