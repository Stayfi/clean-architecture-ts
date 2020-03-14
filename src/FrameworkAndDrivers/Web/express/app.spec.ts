import appServerStartTest from './app.start.spec.inc';
import environmentsServerconfigTests from './app.environments-server-options.spec.inc';
import serverStartTests from './app.server-start.spec.inc';

describe('#App:', function() {

  appServerStartTest();

  environmentsServerconfigTests();

  serverStartTests()

});

