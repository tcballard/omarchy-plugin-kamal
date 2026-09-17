'use strict';
const C=require('./lib/js/core.cjs');const M=require('./Model.js');
const journal=()=>C.state('kamal','events.jsonl');
async function metadata(project){
 const file=[C.path.join(project,'config/deploy.yml'),C.path.join(project,'.kamal/deploy.yml')].find(C.exists);if(!file)return {error:'No deploy.yml'};
 // Ruby's safe YAML parser never evaluates ERB or reads .kamal/secrets.
 const ruby='s=File.binread(ARGV[0],1048577);abort "config too large" if s.bytesize>1048576; d=YAML.safe_load(s, aliases: false)||{}; abort "mapping required" unless d.is_a?(Hash); puts JSON.generate({service:d["service"],servers:d["servers"],accessories:(d["accessories"]||{}).keys,hooks_path:d["hooks_path"]})';
 try{return JSON.parse((await C.run(['ruby','-ryaml','-rjson','-e',ruby,file],{timeout:3000,limit:65536})).out);}catch(e){return {error:'Metadata unavailable (ERB/YAML aliases are not evaluated): '+e.message};}
}
function command(project,args) {const gem=C.path.join(project,'Gemfile');let bundle=false;try{bundle=/gem\s+['"]kamal['"]/.test(C.read(gem));}catch{}return [...(!C.which('kamal')&&bundle?['bundle','exec','kamal']:['kamal']),...args];}
async function collect(config) {
  const all=C.events(journal()+'.1').concat(C.events(journal()));const projects=M.reduceEvents(all,Date.now());
  const paths=new Set([...C.repoPaths(config),...(config.projects||[]).map(C.expand)]);
  let focused='';try{const active=JSON.parse((await C.run(['hyprctl','-j','activewindow'])).out);focused=C.foregroundCwd(active.pid)||'';if(focused)paths.add(focused);}catch{}
  for(const p of paths)if((C.exists(C.path.join(p,'config/deploy.yml'))||C.exists(C.path.join(p,'.kamal/deploy.yml')))&&!projects.some(x=>x.path===p))projects.push({id:p+'::default',path:p,project:C.path.basename(p),destination:'',versions:[],deployed:null,inProgress:null,lock:{held:null}});
  const acknowledged=C.json(C.state('kamal','ack.json'),{});
  const rows=[];for(const p of projects){let head='',ahead=null;try{head=await C.git(p.path,['rev-parse','HEAD']);if(p.deployed&&/^[a-f0-9]{7,64}$/.test(p.deployed.version)){const a=await C.run(['git','-C',p.path,'merge-base','--is-ancestor',p.deployed.version,head],{allowFailure:true});if(a.code===0)ahead=Number(await C.git(p.path,['rev-list','--count',p.deployed.version+'..HEAD']));}}catch{}
    const fail=p.lastFailure&&acknowledged[p.id]!==p.lastFailure.at;
    const detail=fail?'Deploy failed':p.incomplete?'Incomplete local run; outcome unknown':p.inProgress?'Running: '+p.inProgress.phase:p.deployed?'Last local deploy '+p.deployed.version.slice(0,8)+(ahead!==null?' · '+ahead+' ahead':''):'No local hook events';
    rows.push(C.row(p.id,p.project+' · '+(p.destination||'default'),detail,{...p,head,ahead,severity:fail?'urgent':p.inProgress?'watch':'ok',secretsPresent:C.exists(C.path.join(p.path,'.kamal/secrets'))}));}
  const selected=C.json(C.state('kamal','selected.json'),{});
  rows.sort((a,b)=>Number(b.path===focused)-Number(a.path===focused)||Number(b.id===selected.id)-Number(a.id===selected.id)||(b.lastAt||0)-(a.lastAt||0));
  if(rows[0])rows[0].metadata=await metadata(rows[0].path);
  let pollError='';if(config.pollRemote===true&&rows[0]){const p=rows[0],file=C.state('kamal','poll.json');let cache=C.json(file,{});
    if(cache.id!==p.id||!cache.at||Date.now()-cache.at>=600000){
      // Reserve the interval before SSH, including failed attempts. Never parse audit text as structured truth.
      if(!cache.at||Date.now()-cache.at>=600000){cache={id:p.id,at:Date.now(),output:{}};C.atomic(file,cache);
        try{for(const [label,args]of Object.entries({lock:['lock','status'],details:['details'],audit:['audit'],version:['app','version']}))cache.output[label]=(await C.run(command(p.path,[...args,...(p.destination?['-d',p.destination]:[])]),{cwd:p.path,timeout:15000,limit:65536,env:{SSH_ASKPASS_REQUIRE:'never'}})).out;}
        catch(e){cache.error=e.message;}C.atomic(file,cache);}}
    if(cache.id===p.id){p.remote=cache;pollError=cache.error||'';}}
  return C.snapshot(rows,rows[0]?rows[0].title+' · '+rows[0].detail:'No Kamal projects',{pollError,severity:rows.some(x=>x.severity==='urgent')?'urgent':rows.some(x=>x.inProgress)?'watch':'ok'});
}
async function action(config,id,key) {
  const p=(await collect(config)).rows.find(x=>x.id===id);if(!p)throw new Error('Project no longer available');
  const dest=p.destination?['-d',p.destination]:[];
  if(key==='p'){C.atomic(C.state('kamal','selected.json'),{id});return;}
  if(key==='h')return C.terminal(p.path,['node',C.path.join(__dirname,'install-hooks.cjs'),p.path]);
  if(key==='ack'){const a=C.json(C.state('kamal','ack.json'),{});a[id]=p.lastFailure?.at;C.atomic(C.state('kamal','ack.json'),a);return;}
  const commands={enter:['app','logs','-f'],l:['app','logs','-f'],d:['deploy'],r:['redeploy'],L:['lock','status'],a:['audit'],v:['app','version'],K:['lock','acquire','--message','Review and replace this lock message']};
  let args=commands[key];if(key.startsWith('rollback:')){const sha=key.slice(9);if(!p.versions.includes(sha)||!/^[a-f0-9]{7,64}$/.test(sha))throw new Error('Invalid rollback version');args=['rollback',sha];}
  if(key==='commits')return C.terminal(p.path,['git','log',(p.deployed?.version||'HEAD')+'..HEAD','--oneline']);
  if(!args)throw new Error('Unknown action');
  if(['deploy','redeploy','rollback'].includes(args[0]))return C.terminal(p.path,['node',C.path.join(__dirname,'run.cjs'),...args,...dest]);
  return C.terminal(p.path,command(p.path,[...args,...dest]));
}
async function hook(phase) {
  if(!/^(pre-connect|pre-build|pre-deploy|post-deploy|pre-proxy-reboot|post-proxy-reboot|pre-app-boot|post-app-boot)$/.test(phase))throw new Error('Unknown hook');
  const env=process.env;C.append(journal(),{phase,path:process.cwd(),at:Date.now(),service:env.KAMAL_SERVICE||C.path.basename(process.cwd()),version:env.KAMAL_VERSION||'',destination:env.KAMAL_DESTINATION||'',command:env.KAMAL_COMMAND||'',performer:env.KAMAL_PERFORMER||'',runtime:Number(env.KAMAL_RUNTIME)||null,hosts:(env.KAMAL_HOSTS||'').split(',').filter(Boolean)});
  if(['pre-deploy','post-deploy'].includes(phase)){try{await C.run(['notify-send','-a','Kamal',phase==='post-deploy'?'Deploy finished':'Deploy started',(env.KAMAL_SERVICE||C.path.basename(process.cwd()))+(phase==='post-deploy'?' · '+(env.KAMAL_RUNTIME||'?')+' seconds':'')],{timeout:1500});}catch{}}
}
module.exports={collect,action,hook,command};
