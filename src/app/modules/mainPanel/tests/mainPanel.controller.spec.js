import mainPanelService from '../mainPanel.service';
import mainPanelController from '../mainPanel.controller';

describe('Main Panel Controller', () => {
  let $controller, panelController, panelService;

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;

    panelService = mainPanelService();
    spyOn(panelService, 'serviceFunction').and.stub();

    panelController = $controller(mainPanelController, {mainPanelService : panelService});
  }));

  it('Should be defined', () => {
    expect(panelController).toBeDefined();
  });

  it('should have a hello message', () => {
    expect(panelController.hello).toEqual('Wellcome Guest');
  });

  it('should call the "serviceFunction"', () => {
    expect(panelService.serviceFunction).toHaveBeenCalledWith('value');
  });

});