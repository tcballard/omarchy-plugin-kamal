const {test}=require('node:test'),assert=require('node:assert/strict'),M=require('../Model.js');
test('compact indicators distinguish local states without claiming remote health',()=>{
 const state=rows=>({status:'ready',rows});
 assert.equal(M.barStatus(null).icon,'?');
 assert.equal(M.barStatus({status:'loading'}).icon,'…');
 assert.equal(M.barStatus(state([])).icon,'○');
 assert.equal(M.barStatus(state([{}])).icon,'○');
 assert.equal(M.barStatus(state([{deployed:{version:'abc'},ahead:0}])).icon,'✓');
 assert.match(M.barStatus(state([{deployed:{}}])).label,/remote health not checked/);
 assert.equal(M.barStatus(state([{ahead:3}])).icon,'↑');
 assert.equal(M.barStatus(state([{inProgress:{},ahead:3}])).icon,'↻');
 assert.equal(M.barStatus(state([{inProgress:{},incomplete:true}])).icon,'?');
 assert.equal(M.barStatus(state([{severity:'urgent'},{inProgress:{}}])).icon,'!');
 assert.equal(M.barStatus({status:'failed',rows:[]}).icon,'!');
 assert.equal(M.barStatus(state([]),'Polling failed').icon,'!');
});
test('destinations stay independent; hook completion records runtime',()=>{const rows=M.reduceEvents([{path:'/a',phase:'pre-deploy',destination:'prod',at:1},{path:'/a',phase:'post-deploy',destination:'stage',version:'abc1234',runtime:42,at:2}],3);assert.equal(rows.length,2);assert.ok(rows[0].inProgress);assert.equal(rows[1].deployed.runtime,42);});
test('missing post hook is incomplete, never failed',()=>{const r=M.reduceEvents([{path:'/a',phase:'pre-deploy',at:1}],2000000)[0];assert.equal(r.incomplete,true);assert.equal(r.lastFailure,null);});
test('real wrapper failure sticks until a successful deploy',()=>{let r=M.reduceEvents([{path:'/a',phase:'command-failed',at:1,code:1}],2)[0];assert.equal(r.lastFailure.code,1);r=M.reduceEvents([{path:'/a',phase:'command-failed',at:1},{path:'/a',phase:'post-deploy',version:'1234567',at:2}],3)[0];assert.equal(r.lastFailure,null);});
