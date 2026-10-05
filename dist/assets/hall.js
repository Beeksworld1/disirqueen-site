window.DISIR_CONFIG = window.DISIR_CONFIG || {
  submissionEndpoint: "",
  inspireFeatureUrl: "",
  merchandiseUrl: ""
};

window.HOC_BADGE_ASSETS={"10": "assets/hoc/badge-10.png", "25": "assets/hoc/badge-25.png", "50": "assets/hoc/badge-50.png", "75": "assets/hoc/badge-75.png", "100": "assets/hoc/badge-100.png"};
(() => {
'use strict';
const milestones=[{wins:100,rank:'Legend',gems:5},{wins:75,rank:'Veteran',gems:4},{wins:50,rank:'Rising',gems:3},{wins:25,rank:'Contender',gems:2},{wins:10,rank:'Apprentice',gems:1}];
const stageFor=wins=>milestones.find(stage=>wins>=stage.wins)||null;
const rows=[127,96,82,61,51,34,28,17];
const tbody=document.getElementById('champions');
rows.forEach((wins,index)=>{const stage=stageFor(wins);const row=document.createElement('tr');
 [String(index+1),'SAMPLE DATA','SAMPLE DATA',String(wins)].forEach(value=>{const cell=document.createElement('td');cell.textContent=value;row.append(cell);});
 const badge=document.createElement('td');const img=document.createElement('img');img.src=window.HOC_BADGE_ASSETS[stage.wins];img.alt=`${stage.wins}-win ${stage.rank} badge: ${stage.gems} earned gems${stage.wins===100?', golden wolf center':', open center'}`;badge.append(img);row.append(badge);const rank=document.createElement('td');rank.textContent=stage.rank;row.append(rank);tbody.append(row);
});
const config=window.DISIR_CONFIG||{};
function safeURL(value){if(!value)return null;try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
const endpoint=safeURL(config.submissionEndpoint);
const dialog=document.getElementById('report-dialog');const form=document.getElementById('judgment-form');const message=document.getElementById('submission-message');const submit=document.getElementById('send-report');
const proclamation=document.getElementById('proclamation'); const emailField=document.getElementById('email-field'); const email=emailField.querySelector('input'); proclamation.addEventListener('change',()=>{emailField.hidden=!proclamation.checked;email.required=proclamation.checked;});
document.getElementById('open-report').addEventListener('click',()=>dialog.showModal());dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
if(endpoint){submit.disabled=false;document.getElementById('connection-note').textContent='Your result will be sent for review before it counts toward your wins.';}
form.addEventListener('submit',async event=>{event.preventDefault();if(!endpoint){message.textContent='Match reporting is coming soon. No details were sent.';return;}const data=new FormData(form);const victor=Number(data.get('victorScore')),opponent=Number(data.get('opponentScore'));
 if(victor<=opponent){message.textContent='The champion’s final score must be higher than the opponent’s score.';return;}
 const files=data.getAll('photos').filter(file=>file.size);if(files.length>3||files.some(file=>file.size>8*1024*1024)){message.textContent='Choose up to 3 images, each 8 MB or smaller.';return;}
 submit.disabled=true;message.textContent='Sending your result…';try{const response=await fetch(endpoint,{method:'POST',body:data});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error('Your result could not be sent. Please try again.');message.textContent='Judgment received. Your result is now Pending Judgment.';if(typeof result.receipt==='string')message.textContent+=` Receipt: ${result.receipt.slice(0,150)}`;document.getElementById('submission-status').textContent='Pending Judgment';form.reset();}catch(error){message.textContent=error.message||'Your result could not be sent. Please try again.';}finally{submit.disabled=false;}
});
function linkOrNotice(id,noteId,destination,notice){document.getElementById(id).addEventListener('click',()=>{const url=safeURL(destination);if(url){location.assign(url);return;}const note=document.getElementById(noteId);note.hidden=false;note.textContent=notice;});}
linkOrNotice('inspire-link','inspire-note',config.inspireFeatureUrl,'This SU8 INSPIRE feature is coming soon.');
linkOrNotice('merch-link','merch-note',config.merchandiseUrl,'Merchandise and sales are coming soon.');
})();
