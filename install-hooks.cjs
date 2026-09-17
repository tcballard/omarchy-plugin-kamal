#!/usr/bin/env node
'use strict';
const C=require('./lib/js/core.cjs');
const target=C.path.join(C.configRoot,'kamal','hook-tap');
const phases=['pre-connect','pre-build','pre-deploy','post-deploy','pre-proxy-reboot','post-proxy-reboot','pre-app-boot','post-app-boot'];
function install(project){
 project=C.fs.realpathSync(project);if(!C.exists(C.path.join(project,'config/deploy.yml'))&&!C.exists(C.path.join(project,'.kamal/deploy.yml')))throw new Error('Not a Kamal project');
 const tap='#!/usr/bin/env bash\n# Local telemetry must never abort a deployment.\nnode '+C.quote(C.path.join(__dirname,'cli.cjs'))+' hook "${1##*/}" >/dev/null 2>&1 || true\n';
 C.atomic(target,tap);C.fs.chmodSync(target,0o700);
 const line=C.quote(target)+' "$0" # omarchy-stack hook tap';
 const changed=[];
 for(const phase of phases){const file=C.path.join(project,'.kamal/hooks',phase);let old='#!/usr/bin/env bash\n',mode=0o700;
   if(C.exists(file)){old=C.read(file);mode=C.fs.statSync(file).mode&0o777;if(old.includes('# omarchy-stack hook tap'))continue;
     if(!/^#!.*\b(bash|sh|zsh)\b/.test(old.split('\n')[0]))throw new Error('Existing non-shell hook needs manual integration: '+phase);
     C.atomic(C.state('kamal','hook-backups/'+C.path.basename(project)+'-'+phase+'-'+Date.now()),old);
   }
   C.atomic(file,old.replace(/\n?$/,'\n')+line+'\n');C.fs.chmodSync(file,mode);changed.push(file);
 }
 return changed;
}
if(require.main===module){try{console.log(JSON.stringify({changed:install(process.argv[2]||process.cwd())}));}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={install};
