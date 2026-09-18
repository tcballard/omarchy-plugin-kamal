function reduceEvents(events, now) {
  var projects = {};
  events.forEach(function(e) {
    if (!e.path || !e.phase || !Number.isFinite(e.at)) return;
    var key = e.path + '::' + (e.destination || 'default');
    var p = projects[key] || {id:key,path:e.path,project:e.service || e.path.split('/').pop(),destination:e.destination || '',versions:[],lock:{held:null},deployed:null,inProgress:null,lastFailure:null};
    if (p.lastAt && e.at < p.lastAt) return;
    p.lastAt=e.at;
    if (e.phase==='post-deploy') {p.deployed={version:e.version,at:e.at,performer:e.performer,runtime:e.runtime};p.versions=[e.version].concat(p.versions.filter(function(v){return v!==e.version;})).slice(0,5);p.inProgress=null;p.lastFailure=null;}
    else if(e.phase==='command-failed'){p.lastFailure={at:e.at,code:e.code};p.inProgress=null;}
    else {p.inProgress={phase:e.phase,since:p.inProgress?p.inProgress.since:e.at,command:e.command,hosts:e.hosts||[]};}
    p.reliability='observed';p.incomplete=!!p.inProgress && now-p.lastAt>1800000;projects[key]=p;
  });
  return Object.keys(projects).map(function(k){return projects[k];});
}
// Indicators summarise local evidence, never remote deployment health.
function barStatus(snapshot, message) {
  if (!snapshot) return {icon:'?', severity:'warn', label:'Service unavailable'};
  var rows = snapshot.rows || [];
  if (snapshot.status === 'failed' || snapshot.error || message)
    return {icon:'!', severity:'warn', label:'Needs attention — open for details'};
  if (rows.some(function(r){return r.severity === 'urgent';}))
    return {icon:'!', severity:'urgent', label:'Recorded deployment failure'};
  if (rows.some(function(r){return r.incomplete;}))
    return {icon:'?', severity:'warn', label:'Incomplete local run; outcome unknown'};
  if (rows.some(function(r){return !!r.inProgress;}))
    return {icon:'↻', severity:'watch', label:'Local deployment in progress'};
  if (snapshot.status === 'loading')
    return {icon:'…', severity:'watch', label:'Loading'};
  if (rows.some(function(r){return r.ahead > 0;}))
    return {icon:'↑', severity:'watch', label:'Commits ahead of a recorded deployment'};
  if (rows.some(function(r){return !!r.deployed;}))
    return {icon:'✓', severity:'ok', label:'Local deployment recorded; remote health not checked'};
  return {icon:'○', severity:'ok', label:rows.length ? 'No local deployment history' : 'No Kamal projects'};
}
if (typeof module!=='undefined') module.exports={reduceEvents,barStatus};
