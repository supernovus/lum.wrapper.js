// Test the basic Wrapper functionality.

const plan = 4;
const t = require('@lumjs/tests').new({module, plan});
const Wrapper = require('../index');

const toVals = ['original','overridden'];

const obj1 = 
{
  aMethod()
  {
    return toVals[0];
  }
}

t.is(obj1.aMethod(), toVals[0], 'Unwrapped method call');

const wrap1 = Wrapper.getWrapper(obj1);
const proxy1 = wrap1.wrap();

t.is(proxy1.aMethod(), toVals[0], 'Non-overridden proxy method call');

wrap1.add('aMethod', function() { return toVals[1]; });

t.is(proxy1.aMethod(), toVals[1], 'Overridden proxy method call');

t.call(() => (proxy1.orig$aMethod() === toVals[0]), 'Backup method call');

t.done();
