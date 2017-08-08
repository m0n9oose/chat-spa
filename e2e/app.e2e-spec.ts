import { ChatSpaPage } from './app.po';

describe('chat-spa App', () => {
  let page: ChatSpaPage;

  beforeEach(() => {
    page = new ChatSpaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
