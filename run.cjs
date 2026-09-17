#!/usr/bin/env node
'use strict';
// Optional foreground wrapper adds a real exit-status event (hooks have no failure event).
const C=require('./lib/js/core.cjs'),B=require('./backend.cjs'),{spawn}=require('node:child_process');
const argv=process.argv.slice(2);if(!['deploy','redeploy','rollback'].includes(argv[0]))throw new Error('Only deploy, redeploy and rollback supported');
const command=B.command(process.cwd(),argv);const child=spawn(command[0],command.slice(1),{stdio:'inherit'});
child.on('error',e=>{console.error(e.message);process.exitCode=1;});
child.on('exit',async(code,signal)=>{if(code!==0){
 try{C.append(C.state('kamal','events.jsonl'),{path:process.cwd(),phase:'command-failed',at:Date.now(),destination:argv.includes('-d')?argv[argv.indexOf('-d')+1]:'',code,signal});}catch(e){console.error('Could not record deploy result: '+e.message);}
 try{await C.run(['notify-send','-a','Kamal','-u','critical','Deploy failed',C.path.basename(process.cwd())],{timeout:1500});}catch{}
 }process.exitCode=code===null?1:code;});
