const audio = document.querySelector('#audio');
const tracklist = document.querySelector('#tracklist');
const currentTitle = document.querySelector('#current-title');
const detailTitle = document.querySelector('#track-detail-title');
const detail = document.querySelector('#track-detail');
const lyrics = document.querySelector('#lyrics');
const currentTime = document.querySelector('#current-time');
const duration = document.querySelector('#duration');
const playButton = document.querySelector('#play-button');
const status = document.querySelector('#player-status');
const volume = document.querySelector('#volume');
const waveformButton = document.querySelector('#waveform-button');
const waveformCanvas = document.querySelector('#waveform');
const waveformContext = waveformCanvas.getContext('2d');
let activeIndex = 0;
let waveformValues = [];
let detailUpdateId = 0;

const formatTime = seconds => { if (!Number.isFinite(seconds)) return '00:00'; const mins = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`; };
const getThemeColor = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
function drawWaveform(){ const width=waveformCanvas.clientWidth, height=waveformCanvas.clientHeight, dpr=window.devicePixelRatio||1; if(!width||!height||!waveformValues.length)return; waveformCanvas.width=Math.round(width*dpr); waveformCanvas.height=Math.round(height*dpr); waveformContext.setTransform(dpr,0,0,dpr,0,0); waveformContext.clearRect(0,0,width,height); const progressValue=audio.duration?(audio.currentTime/audio.duration):0; const played=getThemeColor('--wave-played'), idle=getThemeColor('--wave-idle'), center=height/2; const slot=width/waveformValues.length; const barWidth=Math.max(1,slot*.64); waveformValues.forEach((value,index)=>{const x=index*slot+(slot-barWidth)/2, barHeight=Math.max(3,value*height*.88), y=center-barHeight/2; waveformContext.fillStyle=(index/waveformValues.length)<=progressValue?played:idle; waveformContext.fillRect(x,y,barWidth,barHeight);}); }

function renderList(){ tracklist.innerHTML = tracks.map((track,index) => `<button class="track-row ${index === activeIndex ? 'active' : ''}" data-index="${index}" type="button"><span class="track-number">${track.number}</span><span class="track-name">${track.title}</span><span class="track-duration">${formatTime(track.duration)}</span></button>`).join(''); }
function updateDetail(track){ const updateId=++detailUpdateId; detail.classList.add('fading'); setTimeout(()=>{ if(updateId!==detailUpdateId)return; currentTitle.textContent=track.title; detailTitle.textContent=track.title; lyrics.textContent=track.text; detail.querySelector('.detail-description').textContent=track.description; detail.classList.remove('fading'); },140); }
function syncPlayButton(){ const isPlaying=!audio.paused; playButton.classList.toggle('is-playing',isPlaying); playButton.setAttribute('aria-label',isPlaying?'Пауза':'Воспроизвести'); }
function playAudio(){ const promise=audio.play(); if(promise&&typeof promise.catch==='function')promise.catch(syncPlayButton); }
function selectTrack(index,{autoplay=null}={}){ const wasPlaying=!audio.paused; audio.pause(); activeIndex=(index+tracks.length)%tracks.length; const track=tracks[activeIndex]; audio.src=encodeURI(track.audio); audio.load(); audio.currentTime=0; waveformValues=waveforms[track.title]||[]; renderWaveform(); renderList(); syncCardActive(); updateDetail(track); status.textContent=`Трек ${track.number} / 08`; currentTime.textContent='00:00'; duration.textContent=formatTime(track.duration); if(autoplay===true||autoplay===null&&wasPlaying)playAudio(); else syncPlayButton(); }
function renderWaveform(){ requestAnimationFrame(drawWaveform); }
function togglePlay(){ if(audio.paused) playAudio(); else audio.pause(); }
document.querySelector('#play-button').addEventListener('click',togglePlay);
document.querySelector('#prev-button').addEventListener('click',()=>selectTrack(activeIndex-1));
document.querySelector('#next-button').addEventListener('click',()=>selectTrack(activeIndex+1));
tracklist.addEventListener('click',event=>{const row=event.target.closest('.track-row');if(row&&tracklist.contains(row))selectTrack(Number(row.dataset.index));});
audio.addEventListener('play',()=>{syncPlayButton();status.textContent=`Играет · ${tracks[activeIndex].number} / 08`;});
audio.addEventListener('pause',()=>{syncPlayButton();if(audio.currentTime>0&&audio.currentTime<audio.duration) status.textContent=`Пауза · ${tracks[activeIndex].number} / 08`;});
audio.addEventListener('timeupdate',()=>{drawWaveform();currentTime.textContent=formatTime(audio.currentTime);});
audio.addEventListener('loadedmetadata',()=>{duration.textContent=formatTime(audio.duration);});
audio.addEventListener('ended',()=>selectTrack(activeIndex+1,{autoplay:true}));
waveformButton.addEventListener('click',event=>{if(!audio.duration)return;const rect=waveformCanvas.getBoundingClientRect();audio.currentTime=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width))*audio.duration;drawWaveform();});
window.addEventListener('resize',renderWaveform); window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',renderWaveform);
volume.addEventListener('input',()=>audio.volume=volume.value); audio.volume=volume.value;
for (const [id, url] of [['download-link', siteConfig.downloadUrl], ['support-link', siteConfig.supportUrl]]) { const link=document.querySelector(`#${id}`); if(url){link.href=url;link.target='_blank';link.rel='noopener';link.classList.remove('is-disabled');link.removeAttribute('aria-disabled');link.firstChild.textContent=id==='download-link'?'Скачать альбом ':'Поддержать ';} else link.addEventListener('click',event=>event.preventDefault()); }
if(siteConfig.supportQr){const qr=document.querySelector('#support-qr');qr.textContent='';const image=document.createElement('img');image.src=siteConfig.supportQr;image.alt='QR-код для поддержки альбома';image.style.cssText='width:100%;height:100%;object-fit:contain;display:block';qr.append(image);}

// ── Сетка карточек треков: одна обложка, 8 кропов, из массива tracks ──
const releaseGrid = document.querySelector('#releases-grid');
function renderCards(){
  if(!releaseGrid) return;
  releaseGrid.innerHTML = tracks.map((track,index) => `<button class="release-card track-0${index+1}${index === activeIndex ? ' active' : ''}" data-index="${index}" type="button" aria-label="${track.number} · ${track.title}"><span class="release-card-inner"><img class="release-cover" src="Cover.png" alt="${track.number} · ${track.title}" loading="lazy"><span class="release-overlay"><span class="release-meta"><span class="release-number">${track.number}</span><span class="release-info-title">${track.title}</span></span><span class="release-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></span></span></button>`).join('');
}
function syncCardActive(){
  if(!releaseGrid) return;
  document.querySelectorAll('.release-card').forEach(card=>card.classList.toggle('active',Number(card.dataset.index)===activeIndex));
}
if(releaseGrid){
  renderCards();
  releaseGrid.addEventListener('click',event=>{
    const card=event.target.closest('.release-card');
    if(!card) return;
    selectTrack(Number(card.dataset.index),{autoplay:true});
    document.querySelector('.album-layout').scrollIntoView({behavior:'smooth',block:'start'});
  });
}

// ── Загрузка ──
const loader=document.getElementById('loader');
const loaderBar=document.getElementById('loader-bar');
function finishLoader(){ if(!loader||loader.classList.contains('hidden'))return; loaderBar.style.width='100%'; setTimeout(()=>loader.classList.add('hidden'),500); }
window.addEventListener('load',finishLoader);
setTimeout(finishLoader,2800);

// ── Появление заголовка ──
setTimeout(()=>{ document.querySelectorAll('.hero-title span').forEach(span=>span.classList.add('visible')); },650);

// ── Появление блоков при скролле ──
const fadeObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');fadeObserver.unobserve(entry.target);}});},{threshold:.12});
document.querySelectorAll('.fade-in').forEach(el=>fadeObserver.observe(el));

// ── Кастомный курсор ──
const cursorEl=document.getElementById('cursor');
const ringEl=document.getElementById('cursor-ring');
if(cursorEl&&ringEl&&window.matchMedia('(pointer:fine)').matches){
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  const lerp=(a,b,t)=>a+(b-a)*t;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cursorEl.style.left=mx+'px'; cursorEl.style.top=my+'px'; });
  (function loop(){ rx=lerp(rx,mx,.16); ry=lerp(ry,my,.16); ringEl.style.left=rx+'px'; ringEl.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.track-row,input,.waveform-button,.release-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursorEl.classList.add('cursor-hover'); ringEl.classList.add('ring-active'); });
    el.addEventListener('mouseleave',()=>{ cursorEl.classList.remove('cursor-hover'); ringEl.classList.remove('ring-active'); });
  });
} else {
  document.body.style.cursor='auto';
}

selectTrack(0);
