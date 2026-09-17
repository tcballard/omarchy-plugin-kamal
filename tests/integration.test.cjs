'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');const fs=require('node:fs'),path=require('node:path'),os=require('node:os');const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function fixture(fn){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'stack-integration-'));try{return fn(dir);}finally{fs.rmSync(dir,{recursive:true,force:true});}}
function node(dir,code){const p=spawnSync(process.execPath,['-e',code],{cwd:root,env:{...process.env,HOME:dir,XDG_CONFIG_HOME:path.join(dir,'config'),XDG_STATE_HOME:path.join(dir,'state')},encoding:'utf8'});assert.equal(p.status,0,p.stderr||p.stdout);return p.stdout;}
test('Kamal installs hook taps idempotently without deleting user logic',()=>fixture(dir=>{node(dir,`
 const C=require('./lib/js/core.cjs'),B=require('./install-hooks.cjs'),assert=require('node:assert/strict');
 const repo=C.path.join(C.HOME,'repo');C.atomic(C.path.join(repo,'config/deploy.yml'),'service: demo');const hook=C.path.join(repo,'.kamal/hooks/pre-deploy');C.atomic(hook,'#!/bin/bash\\nprintf user-hook\\n');
 B.install(repo);B.install(repo);const s=C.read(hook);assert.ok(s.includes('printf user-hook'));assert.equal(s.split('# omarchy-stack hook tap').length,2);`);}));
test('atomic writes reject symlinked ancestor directories',()=>fixture(dir=>{node(dir,`const C=require('./lib/js/core.cjs');C.fs.mkdirSync(C.path.join(C.HOME,'real'));C.fs.symlinkSync(C.path.join(C.HOME,'real'),C.path.join(C.HOME,'link'));require('node:assert/strict').throws(()=>C.atomic(C.path.join(C.HOME,'link/sub/file'),'bad'),/symlink/);`);}));
