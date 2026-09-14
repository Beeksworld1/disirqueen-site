document.querySelector('#year').textContent=new Date().getFullYear();

const proclamation=document.querySelector('#proclamation');
const emailField=document.querySelector('#email-field');
const email=emailField.querySelector('input');
const formElement=document.querySelector('#judgment-form');
const message=document.querySelector('#submission-message');

proclamation.addEventListener('change',()=>{
  emailField.hidden=!proclamation.checked;
  email.required=proclamation.checked;
});

formElement.addEventListener('submit',async event=>{
  event.preventDefault();
  const form=new FormData(formElement);
  const win=Number(form.get('victorScore'));
  const loss=Number(form.get('opponentScore'));
  if(win<=loss){
    message.textContent="The reported victor's score must be greater than the opponent's score.";
    return;
  }

  const files=form.getAll('photos').filter(file=>file&&file.size);
  if(files.some(file=>file.size>8*1024*1024)){
    message.textContent='Each uploaded image must be 8 MB or smaller.';
    return;
  }

  const endpoint=(window.DISIR_CONFIG&&window.DISIR_CONFIG.submissionEndpoint||'').trim();
  if(!endpoint){
    message.textContent='The Hall is not connected yet. No match details or images were sent.';
    return;
  }

  const button=formElement.querySelector('button[type="submit"]');
  button.disabled=true;
  message.textContent='Presenting the judgment to the Queen…';
  try{
    const response=await fetch(endpoint,{method:'POST',body:form});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.message||'The judgment could not be recorded.');
    message.innerHTML=`<strong>Judgment received.</strong> This match is now Pending Judgment.${result.receipt?` Keep receipt <b>${result.receipt}</b>.`:''}`;
    formElement.reset();
    emailField.hidden=true;
    email.required=false;
  }catch(error){
    message.textContent=error.message||'The judgment could not be recorded. Please try again later.';
  }finally{
    button.disabled=false;
  }
});
