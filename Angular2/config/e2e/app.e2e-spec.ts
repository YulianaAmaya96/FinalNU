import { tiendaA2 } from './app.po';

describe('Tienda-virtual', function() {
  let page: tiendaA2;

  beforeEach(() => {
    page = new tiendaA2();
  });

  it('message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ok');
  });
});
