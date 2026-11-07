'use strict';
let allPRs = [];
const el = Object.fromEntries(['summary','prTable','branchFilter','statusFilter','search','lastUpdated','errorMessage','refreshButton'].map(id => [id,document.getElementById(id)]));
const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeGitHubUrl(url){try{const u=new URL(url);return u.protocol==='https:' && (u.hostname==='github.com'||u.hostname.endsWith('.github.com'))?u.href:null;}catch{return null;}}
function statusStyle(status){if(['Validation Failed','Changes Requested','Merge Conflict'].includes(status))return 'failed';if(status==='Ready to Merge')return 'success';if(status==='Waiting for Approval')return 'pending';if(status==='Validation In Progress')return 'running';return 'neutral';}
function badge(value){return `<span class="pill ${statusStyle(value)}">${safe(value || 'Unknown')}</span>`;}
function render(){
 const branch=el.branchFilter.value,status=el.statusFilter.value,term=el.search.value.toLowerCase().trim();
 const visible=allPRs.filter(p=>(branch==='all'||p.targetBranch===branch)&&(status==='all'||p.dashboardStatus===status)&&[p.number,p.title,p.story,p.developer,p.sourceBranch,p.targetBranch].join(' ').toLowerCase().includes(term));
 const count=s=>visible.filter(p=>p.dashboardStatus===s).length;
 el.summary.innerHTML=[['Open PRs',visible.length],['Validation Failed',count('Validation Failed')],['Waiting Approval',count('Waiting for Approval')],['Ready to Merge',count('Ready to Merge')]].map(([label,num])=>`<div class="metric">${label}<strong>${num}</strong></div>`).join('');
 if(!visible.length){el.prTable.innerHTML='<tr><td colspan="9">No matching open PRs. Check the selected filters and source repository.</td></tr>';return;}
 el.prTable.innerHTML=visible.map(p=>{
  const prUrl=safeGitHubUrl(p.prUrl);const prLabel=`#${safe(p.number)}`;
  const prLink=prUrl?`<a href="${safe(prUrl)}" target="_blank" rel="noopener noreferrer">${prLabel} ↗</a>`:prLabel;
  const failedChecks=Array.isArray(p.failedChecks)?p.failedChecks:[];
  const checkLinks=failedChecks.map(c=>{const u=safeGitHubUrl(c.url);return u?`<a href="${safe(u)}" target="_blank" rel="noopener noreferrer">${safe(c.name||'Failed check')} ↗</a>`:safe(c.name||'Failed check');}).join(', ');
  const pending=Array.isArray(p.pendingReviewers)?p.pendingReviewers.join(', '):'';
  const approvals=p.requiredApprovals==null?`${safe(p.approvedCount??0)} approved`:`${safe(p.approvedCount??0)} / ${safe(p.requiredApprovals)}`;
  return `<tr><td>${prLink}<div class="subtle">${safe(p.title||'')}</div></td><td>${safe(p.story||'—')}</td><td>${safe(p.developer||'—')}</td><td>${safe(p.sourceBranch||'—')}</td><td>${safe(p.targetBranch||'—')}</td><td>${badge(p.pipelineStatus)}${checkLinks?`<div class="subtle">${checkLinks}</div>`:''}</td><td>${approvals}</td><td>${safe(pending||'—')}</td><td>${badge(p.dashboardStatus)}</td></tr>`;
 }).join('');
}
let loading=false;
async function loadDashboard(){
 if(loading)return;loading=true;el.refreshButton.disabled=true;
 try{
  const response=await fetch('./data/prs.json?v='+Date.now(),{cache:'no-store'});
  if(!response.ok)throw new Error(`prs.json returned HTTP ${response.status}`);
  const data=await response.json();if(!Array.isArray(data.prs))throw new Error('prs.json must contain a prs array');
  allPRs=data.prs;el.errorMessage.hidden=true;
  const stamp=data.lastUpdated?new Date(data.lastUpdated):null;
  el.lastUpdated.textContent=stamp&&!isNaN(stamp)?`Data updated: ${stamp.toLocaleString()}`:'No data refresh timestamp available';
  render();
 }catch(error){console.error('Dashboard load failed:',error);el.errorMessage.textContent=`Unable to load dashboard data: ${error.message}. Check the deployed data/prs.json file and the browser Network tab.`;el.errorMessage.hidden=false;el.lastUpdated.textContent='Dashboard data unavailable';if(!allPRs.length)el.prTable.innerHTML='<tr><td colspan="9">Could not load PR data.</td></tr>';}
 finally{loading=false;el.refreshButton.disabled=false;}
}
['branchFilter','statusFilter','search'].forEach(id=>el[id].addEventListener('input',render));
el.refreshButton.addEventListener('click',loadDashboard);
loadDashboard();setInterval(loadDashboard,60000);
