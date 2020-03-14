import serverApp from './app';

export default function appServerStartTest() {
  describe('#AppStart:  App Server tests ', () => {
    it('App Server should be an object', async () => {
      expect(typeof serverApp).toEqual('object');
    });
  });
}
