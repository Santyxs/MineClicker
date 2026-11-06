'use strict';

(() => {

const SAVE_KEY='mineclicker_save_v1';
const toolInfo={pickaxe:{name:'Pico',icon:'⛏️',plural:'picos'},axe:{name:'Hacha',icon:'🪓',plural:'hachas'},shovel:{name:'Pala',icon:'🪏',plural:'palas'}};
const tiers=['Madera','Piedra','Cobre','Hierro','Oro','Diamante','Netherita'];
const tierCosts=[0,65,150,330,680,1350,2700];
const zones=[
 {name:'Superficie',range:'Y 64–49',top:64,bottom:49,icon:'🌿',biome:'Pradera',blocks:[['dirt',34],['grass',13],['oak_log',13],['stone',23],['coal_ore',12],['copper_ore',5]]},
 {name:'Cuevas superiores',range:'Y 48–33',top:48,bottom:33,icon:'🪨',biome:'Cueva rocosa',blocks:[['stone',28],['coal_ore',24],['copper_ore',19],['iron_ore',20],['dirt',5],['oak_log',4]]},
 {name:'Cuevas intermedias',range:'Y 32–17',top:32,bottom:17,icon:'🕯️',biome:'Galerías subterráneas',blocks:[['stone',17],['deepslate',12],['coal_ore',15],['copper_ore',17],['iron_ore',21],['lapis_ore',10],['gold_ore',8]]},
 {name:'Cuevas profundas',range:'Y 16–1',top:16,bottom:1,icon:'🌑',biome:'Caverna profunda',blocks:[['deepslate',25],['iron_ore',20],['gold_ore',17],['redstone_ore',17],['lapis_ore',9],['diamond_ore',7],['copper_ore',5]]},
 {name:'Profundidades',range:'Y 0 a -15',top:0,bottom:-15,icon:'💎',biome:'Profundidades',blocks:[['deepslate',25],['gold_ore',16],['redstone_ore',20],['diamond_ore',19],['iron_ore',10],['lapis_ore',6],['obsidian',3],['ancient_debris',1]]},
 {name:'Pizarra profunda',range:'Y -16 a -31',top:-16,bottom:-31,icon:'⬛',biome:'Pizarra profunda',blocks:[['deepslate',29],['diamond_ore',23],['redstone_ore',18],['gold_ore',12],['obsidian',10],['ancient_debris',5],['iron_ore',3]]},
 {name:'Abismo',range:'Y -32 a -47',top:-32,bottom:-47,icon:'🌌',biome:'Abismo',blocks:[['deepslate',25],['diamond_ore',25],['redstone_ore',16],['obsidian',13],['ancient_debris',12],['gold_ore',9]]},
 {name:'Límite inferior',range:'Y -48 a -64',top:-48,bottom:-64,icon:'🔥',biome:'Límite inferior',blocks:[['deepslate',20],['diamond_ore',25],['obsidian',18],['ancient_debris',25],['redstone_ore',12]]}
];
const blocks={
 dirt:{name:'Tierra',icon:'🟫',a:'#806044',b:'#46392e',tool:'shovel',req:0,hp:9,drop:'dirt',min:2,max:4},
 grass:{name:'Tierra con césped',icon:'🟩',a:'#567d46',b:'#594635',tool:'shovel',req:0,hp:11,drop:'dirt',min:2,max:3},
 sand:{name:'Arena',icon:'🟨',a:'#c5ae72',b:'#806e4b',tool:'shovel',req:0,hp:9,drop:'sand',min:2,max:4},
 oak_log:{name:'Tronco de roble',icon:'🪵',a:'#9b6c3d',b:'#50341f',tool:'axe',req:0,hp:13,drop:'oak_log',min:1,max:3},
 stone:{name:'Piedra',icon:'🪨',a:'#89919c',b:'#414955',tool:'pickaxe',req:0,hp:15,drop:'cobblestone',min:2,max:4},
 coal_ore:{name:'Mineral de carbón',icon:'⚫',a:'#737d89',b:'#303743',tool:'pickaxe',req:0,hp:17,drop:'coal',min:1,max:3},
 copper_ore:{name:'Mineral de cobre',icon:'🟠',a:'#9c7960',b:'#3b4449',tool:'pickaxe',req:1,hp:20,drop:'copper_ore',min:1,max:3},
 iron_ore:{name:'Mineral de hierro',icon:'⚙️',a:'#8c8580',b:'#3c4650',tool:'pickaxe',req:1,hp:23,drop:'iron_ore',min:1,max:3},
 lapis_ore:{name:'Mineral de lapislázuli',icon:'🔵',a:'#4869a9',b:'#25334d',tool:'pickaxe',req:1,hp:22,drop:'lapis',min:1,max:3},
 deepslate:{name:'Pizarra profunda',icon:'⬛',a:'#59616c',b:'#242a34',tool:'pickaxe',req:0,hp:24,drop:'deepslate',min:2,max:4},
 gold_ore:{name:'Mineral de oro',icon:'🟡',a:'#a58e52',b:'#46413a',tool:'pickaxe',req:2,hp:28,drop:'gold_ore',min:1,max:2},
 redstone_ore:{name:'Mineral de redstone',icon:'🔴',a:'#8e5559',b:'#3b333b',tool:'pickaxe',req:2,hp:29,drop:'redstone',min:2,max:4},
 diamond_ore:{name:'Mineral de diamante',icon:'💎',a:'#579e9c',b:'#253d4e',tool:'pickaxe',req:3,hp:34,drop:'diamond',min:1,max:2},
 obsidian:{name:'Obsidiana',icon:'🟪',a:'#64518d',b:'#242033',tool:'pickaxe',req:4,hp:43,drop:'obsidian',min:1,max:2},
 ancient_debris:{name:'Escombros ancestrales',icon:'🟫',a:'#80604e',b:'#392d2b',tool:'pickaxe',req:5,hp:49,drop:'ancient_debris',min:1,max:1}
};
const resources={
 dirt:{name:'Tierra',icon:'🟫',price:1},sand:{name:'Arena',icon:'🟨',price:1},oak_log:{name:'Tronco de roble',icon:'🪵',price:5},cobblestone:{name:'Piedra',icon:'🪨',price:3},coal:{name:'Carbón',icon:'⚫',price:5},copper_ore:{name:'Cobre',icon:'🟠',price:7},iron_ore:{name:'Hierro',icon:'⚙️',price:10},lapis:{name:'Lapislázuli',icon:'🔵',price:11},deepslate:{name:'Pizarra profunda',icon:'⬛',price:4},gold_ore:{name:'Oro',icon:'🟡',price:15},redstone:{name:'Redstone',icon:'🔴',price:13},diamond:{name:'Diamante',icon:'💎',price:42},obsidian:{name:'Obsidiana',icon:'🟪',price:24},ancient_debris:{name:'Escombros ancestrales',icon:'🟫',price:90}
};
const blockExperience={coal_ore:[0,2],lapis_ore:[2,5],redstone_ore:[1,5],diamond_ore:[3,7]};

  const iconShapes={
 dirt:'<path fill="#936b48" d="M16 22h32v28H16z"/><path fill="#68472f" d="M16 38h32v12H16z"/><path fill="#b98a5c" d="M20 26h8v6h-8zm18 12h6v6h-6z"/>',
 grass:'<path fill="#76513a" d="M14 24h36v26H14z"/><path fill="#6da84c" d="M14 18h36v13H14z"/><path fill="#8bc65b" d="M18 18h8v6h-8zm16 0h8v5h-8z"/>',
 sand:'<path fill="#d7c17e" d="M16 22h32v28H16z"/><path fill="#b39a5d" d="M16 40h32v10H16z"/><path fill="#f0dfa2" d="M20 26h6v5h-6zm20 8h5v5h-5z"/>',
 oak_log:'<path fill="#87552f" d="M18 14h28v36H18z"/><path fill="#bd8950" d="M22 14h20v36H22z"/><path fill="#e0b16c" d="M25 18h14v28H25z"/><path fill="#8b5a32" d="M29 22h6v20h-6z"/>',
 cobblestone:'<path fill="#929ba5" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#626d78" d="M16 34l12-5 10 6-3 12-17-1z"/><path fill="#c0c7cd" d="M25 18l12-1-2 10-12 3z"/>',
 coal_ore:'<path fill="#8b9299" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#252a31" d="M19 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 copper_ore:'<path fill="#9b8a7d" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#c87542" d="M18 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 iron_ore:'<path fill="#92979a" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#d5c8b7" d="M18 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 lapis_ore:'<path fill="#858d9c" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#2455b5" d="M18 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 deepslate:'<path fill="#59616d" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#353c48" d="M16 34l14-5 10 6-3 12-17-1z"/><path fill="#78818d" d="M25 18l12-1-2 10-12 3z"/>',
 gold_ore:'<path fill="#89877d" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#f1c33f" d="M18 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 redstone_ore:'<path fill="#817d80" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#bd3039" d="M18 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 diamond_ore:'<path fill="#638d91" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#55e0d1" d="M18 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 obsidian:'<path fill="#51436f" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#241d39" d="M16 34l14-5 10 6-3 12-17-1z"/><path fill="#8d6ac5" d="M25 18l12-1-2 10-12 3z"/>',
 ancient_debris:'<path fill="#745b4d" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/><path fill="#c18a61" d="M18 22l8-4 5 5-3 7-9 1zm15 12l8-4 5 6-5 8-8-2z"/>',
 pickaxe:'<path fill="#b6c5d5" d="M10 17l7-8 8 6 8-6 7 8-12 5-8-2z"/><path fill="#8a5935" d="M27 20l6 3-15 27-6-3z"/>',
 axe:'<path fill="#8a5935" d="M25 19l7 3-15 28-7-3z"/><path fill="#c4d0d9" d="M23 12l15-5 12 9-8 14-15-5-5-7z"/>',
 shovel:'<path fill="#8a5935" d="M25 19l7 3-15 28-7-3z"/><path fill="#c3ccd4" d="M19 8l17 2 4 10-11 11-12-8z"/>',
 wood:'<path fill="#a56a3b" d="M18 14h28v36H18z"/><path fill="#d49a58" d="M22 14h20v36H22z"/>', stone:'<path fill="#aab3bc" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/>', copper:'<path fill="#c87542" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/>', iron:'<path fill="#d5c8b7" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/>', gold:'<path fill="#f1c33f" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/>', diamond:'<path fill="#55e0d1" d="M10 23l10-12h20l10 12-20 28z"/><path fill="#b4fff4" d="M20 11l10 40 10-40z"/>', netherite:'<path fill="#8c8795" d="M12 20l12-7 13 4 12-1 5 14-7 18-17 2-18-8z"/>'
};
const galleryVersion='1.21.9';
const blockRenderIds={dirt:'dirt',grass:'grass_block',sand:'sand',oak_log:'oak_log',stone:'stone',coal_ore:'coal_ore',copper_ore:'copper_ore',iron_ore:'iron_ore',lapis_ore:'lapis_ore',deepslate:'deepslate',gold_ore:'gold_ore',redstone_ore:'redstone_ore',diamond_ore:'diamond_ore',obsidian:'obsidian',ancient_debris:'ancient_debris',cobblestone:'cobblestone'};
const galleryIds={pickaxe:'wooden_pickaxe',axe:'wooden_axe',shovel:'wooden_shovel',wood:'oak_planks',stone:'cobblestone',copper:'copper_ingot',iron:'iron_ingot',gold:'gold_ingot',diamond:'diamond',netherite:'netherite_ingot',dirt:'dirt',sand:'sand',oak_log:'oak_log',coal:'coal',cobblestone:'cobblestone',copper_ore:'raw_copper',iron_ore:'raw_iron',lapis:'lapis_lazuli',deepslate:'cobbled_deepslate',gold_ore:'raw_gold',redstone:'redstone',diamond:'diamond',obsidian:'obsidian',ancient_debris:'ancient_debris'};
function iconMarkup(id,cls='game-icon'){
 const blockId=blockRenderIds[id];
 const itemId=galleryIds[id];
 const src=blockId?`https://blockrender.dev/render/block/${blockId}.png?size=128`:itemId?`https://mcitemgallery.com/images/${galleryVersion}/${itemId}.webp`:'';
 const fallback=blockId?`https://mcitemgallery.com/images/${galleryVersion}/${itemId||blockId}.webp`:`https://blockrender.dev/render/item/${itemId||id}.png?size=128`;
 if(src)return `<img class="${cls}" src="${src}" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallback}'">`;
 const shape=iconShapes[id]||iconShapes.stone;
 return `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect x="5" y="5" width="54" height="54" rx="5" fill="#ffffff08"/>${shape}</svg>`;
}
function toolFallbackDataUri(tool,tier){
 const palettes=['#a56a3b','#aeb6bf','#d77b49','#d5dbe2','#f0c44c','#55d9d0','#746a7d'];
 const head=palettes[tier]||palettes[0];
 const dark=tier===2?'#984b2c':'#354052';
 const shine=tier===2?'#f3a477':'#edf2fb';
 const shaft='<path d="M29 20l7 4-18 31-7-4z" fill="#865532" stroke="#4e3528" stroke-width="2"/>';
 const heads={
  pickaxe:`<path d="M7 17L18 8l13 6 13-6 13 9-5 8-20-5-20 5z" fill="${head}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/><path d="M17 13l7 3m13-1 7-3" stroke="${shine}" stroke-width="2" stroke-linecap="round"/>`,
  axe:`<path d="M29 14L43 7l12 8-5 17-12 5-12-10z" fill="${head}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/><path d="M41 12l8 5-3 9" fill="none" stroke="${shine}" stroke-width="2" stroke-linecap="round"/>`,
  shovel:`<path d="M18 7l25 3 5 15-17 13-17-12z" fill="${head}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 12l16 2" stroke="${shine}" stroke-width="2" stroke-linecap="round"/>`
 };
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges">${shaft}${heads[tool]||heads.pickaxe}</svg>`;
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function toolMarkup(tool,tier){
 const materials=['wooden','stone','copper','iron','golden','diamond','netherite'];
 const mat=materials[tier]||'wooden';
 const item=`${mat}_${tool}`;
 const fallback=`https://blockrender.dev/render/item/${item}.png?size=128`;
 const finalFallback=toolFallbackDataUri(tool,tier);
 const src=`https://mcitemgallery.com/images/${galleryVersion}/${item}.webp`;
 return `<span class="tool-art"><img class="game-icon tool-svg" src="${src}" alt="${tiers[tier]||'Madera'} ${toolInfo[tool].name.toLowerCase()}" loading="lazy" decoding="async" onerror="if(!this.dataset.fallback){this.dataset.fallback='blockrender';this.src='${fallback}'}else{this.onerror=null;this.src='${finalFallback}'}"></span>`;
}
const $=id=>document.getElementById(id);
const coinSvg=()=>'<svg class="coin-icon" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="28" fill="#e8b84a"/><circle cx="32" cy="32" r="28" fill="none" stroke="#a67c1a" stroke-width="4"/><circle cx="32" cy="32" r="20" fill="none" stroke="#f5d78e" stroke-width="2.5"/><text x="32" y="41" text-anchor="middle" font-size="26" font-weight="800" font-family="system-ui,Segoe UI,sans-serif" fill="#8b6914">$</text></svg>';
const blankTools=()=>({pickaxe:{tier:0},axe:{tier:0},shovel:{tier:0}});
function initialState(){return {coins:35,playerXp:0,tools:blankTools(),selected:'pickaxe',inventory:{},miners:0,totalMined:0,progress:Array(8).fill(0),unlocked:0,zone:0,block:null,activity:[]}}
let s=loadState();let toastTimer=null;let autoClock=0;let lastSave=0;
function loadState(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return initialState();const saved=JSON.parse(raw),base=initialState(),savedXp=Number(saved.playerXp);const savedCoins=Number(saved.coins);return {...base,...saved,coins:Number.isFinite(savedCoins)?Math.max(0,Math.floor(savedCoins)):base.coins,playerXp:Number.isFinite(savedXp)?Math.max(0,Math.min(1000000000,Math.floor(savedXp))):0,tools:{...base.tools,...saved.tools},progress:Array.isArray(saved.progress)?[...base.progress.map((_,i)=>Math.max(0,Number(saved.progress[i])||0))]:base.progress,inventory:saved.inventory||{},activity:Array.isArray(saved.activity)?saved.activity.slice(0,5):[],unlocked:Math.max(0,Math.min(7,Number(saved.unlocked)||0)),zone:Math.max(0,Math.min(7,Number(saved.zone)||0))}}catch(e){return initialState()}}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(s));$('saveState').textContent='Partida guardada';$('saveState').style.color='#7f91a9';lastSave=Date.now()}catch(e){$('saveState').textContent='No se pudo guardar'}}
function exportGame(){save();const payload={app:'MineClicker',version:1,exportedAt:new Date().toISOString(),state:s};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mineclicker-partida.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Partida exportada. Guarda el archivo para transferirlo.')}
async function importGame(file){if(!file)return;try{const payload=JSON.parse(await file.text());const data=payload?.app==='MineClicker'&&payload?.state?payload.state:payload;if(!data||typeof data!=='object'||!data.tools||!Array.isArray(data.progress)||!data.inventory||!Number.isFinite(Number(data.coins)))throw new Error('Archivo no válido');if(!confirm('¿Importar esta partida? Reemplazará el progreso actual de este navegador.'))return;localStorage.setItem(SAVE_KEY,JSON.stringify(data));s=loadState();if(!s.block||!blocks[s.block.id])s.block=makeBlock();render();save();notify('Partida importada correctamente.')}catch(e){notify('No se pudo importar: archivo inválido o dañado.')}finally{$('importFile').value=''}}
function fmt(n){const v=Math.floor(Number(n)||0);return v.toLocaleString('es-ES')}
function xpToNextLevel(level){if(level<=15)return 2*level+7;if(level<=30)return 5*level-38;return 9*level-158}
function playerLevelData(){let remaining=Math.max(0,Math.floor(s.playerXp||0)),level=0,needed=xpToNextLevel(level);while(remaining>=needed){remaining-=needed;level++;needed=xpToNextLevel(level)}return {level,xp:remaining,needed}}
function addPlayerXp(amount,source){if(amount<=0)return;const before=playerLevelData().level;s.playerXp=Math.min(1000000000,s.playerXp+amount);const after=playerLevelData();addActivity(`+${amount} XP · ${source}`);if(after.level>before){addActivity(`¡Has alcanzado el nivel ${after.level}!`);notify(`¡Has subido al nivel ${after.level}!`)}}
function damage(tool){const t=s.tools[tool];return 1+t.tier*.28}
function blockMaxHp(type,zone){return Math.round(blocks[type].hp*(1+zone*.1))}
function pickBlock(zone){const entries=zones[zone].blocks.filter(([id])=>s.tools[blocks[id].tool].tier>=blocks[id].req);const pool=entries.length?entries:zones[zone].blocks.filter(([id])=>blocks[id].req===0);const total=pool.reduce((a,x)=>a+x[1],0);let r=Math.random()*total;for(const [id,w] of pool){r-=w;if(r<=0)return id}return pool[0][0]}
function makeBlock(){const id=pickBlock(s.zone),d=blocks[id],max=blockMaxHp(id,s.zone);return {id,max,hp:max}}
if(!s.block||!blocks[s.block.id])s.block=makeBlock();
function notify(text){const el=$('toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100)}
function addActivity(text){s.activity.unshift(text);s.activity=s.activity.slice(0,4)}
function getY(zone){const maxStep=zone===7?16:15;const p=Math.min(maxStep,s.progress[zone]||0);return zones[zone].top-p}
function pluralResource(id,n){return resources[id].name+(n===1?'':'')}
function chooseAutoTool(b){const t=s.tools[b.tool];if(t&&t.tier>=b.req)return b.tool;return null}
function breakCurrentBlock(tool){const d=blocks[s.block.id],amount=Math.floor(d.min+Math.random()*(d.max-d.min+1));s.inventory[d.drop]=(s.inventory[d.drop]||0)+amount;s.totalMined++;s.progress[s.zone]++;addActivity(`+${amount} ${resources[d.drop].name.toLowerCase()}`);
 const xpRange=blockExperience[s.block.id];if(xpRange){const gained=Math.floor(xpRange[0]+Math.random()*(xpRange[1]-xpRange[0]+1));if(gained>0)addPlayerXp(gained,d.name.toLowerCase())}
 const zoneDone=s.progress[s.zone]>=16;
 if(zoneDone&&s.zone===s.unlocked&&s.unlocked<7){s.unlocked++;const next=zones[s.unlocked];addActivity(`Nueva profundidad: ${next.name}`);notify(`¡Nueva profundidad desbloqueada: ${next.name}!`)}
 s.block=makeBlock();render();save();
}
function hit(toolOverride=null,auto=false){const tool=toolOverride||s.selected;const b=s.block,d=blocks[b.id];if(tool!==d.tool)return;const t=s.tools[tool];if(t.tier<d.req)return;
 const power=damage(tool)*(auto?.72:1);b.hp=Math.max(0,b.hp-power);const btn=$('blockButton');btn.classList.remove('mining');void btn.offsetWidth;btn.classList.add('mining');if(b.hp<=0)breakCurrentBlock(tool);else{updateBlockView();if(!auto&&navigator.vibrate)navigator.vibrate(8);saveSoon()}}
let saveSoonTimer=null;function saveSoon(){clearTimeout(saveSoonTimer);saveSoonTimer=setTimeout(save,450)}
function selectZone(index){if(index<0||index>s.unlocked)return;s.zone=index;s.block=makeBlock();render();save()}
function selectTool(tool){s.selected=tool;renderTools();$('selectedToolLabel').textContent=`${toolInfo[tool].icon} ${toolInfo[tool].name} de ${tiers[s.tools[tool].tier].toLowerCase()}`;save()}
function upgradeTool(tool){const t=s.tools[tool],next=t.tier+1;if(next>=tiers.length)return;const cost=tierCosts[next];if(s.coins<cost){notify('No tienes monedas suficientes');return}s.coins-=cost;t.tier=next;addActivity(`${toolInfo[tool].name} mejorado a ${tiers[next]}`);notify(`${toolInfo[tool].name} mejorado: ${tiers[next]}`);render();save()}
function hireCost(){return Math.round(150*Math.pow(1.7,s.miners))}
function hireMiner(){const cost=hireCost();if(s.coins<cost){notify('No tienes monedas suficientes');return}s.coins-=cost;s.miners++;addActivity('Has contratado un minero automático');notify('Minero contratado');render();save()}
function sellResource(id){const count=s.inventory[id]||0;if(!count)return;const gain=count*resources[id].price;s.coins+=gain;delete s.inventory[id];addActivity(`Vendidos ${count} ${resources[id].name.toLowerCase()} · +${gain} monedas`);notify(`+${gain} monedas`);render();save()}
function sellAll(){let count=0,gain=0;for(const [id,n] of Object.entries(s.inventory)){count+=n;gain+=n*resources[id].price}if(!count)return;s.inventory={};s.coins+=gain;addActivity(`Inventario vendido · +${gain} monedas`);notify(`Inventario vendido por ${gain} monedas`);render();save()}
function renderTools(){const root=$('toolsList');root.innerHTML='';for(const tool of ['pickaxe','axe','shovel']){const t=s.tools[tool],info=toolInfo[tool],selected=s.selected===tool;const card=document.createElement('div');card.className='tool-card'+(selected?' selected':'');const top=document.createElement('div');top.className='tool-top';top.innerHTML=`<div class="tool-icon">${toolMarkup(tool,t.tier)}</div><div class="tool-title"><strong>${info.name}</strong><small>${tiers[t.tier]}</small></div>${selected?'<span class="selected-mark">EQUIPADA</span>':''}`;card.appendChild(top);const actions=document.createElement('div');actions.className='tool-actions';const choose=document.createElement('button');choose.className='tool-select';choose.textContent=selected?'Seleccionada':'Seleccionar';choose.addEventListener('click',()=>selectTool(tool));actions.appendChild(choose);const up=document.createElement('button');up.className='upgrade-btn';if(t.tier>=tiers.length-1){up.textContent='Material máximo';up.disabled=true}else{up.innerHTML=`Mejorar · ${fmt(tierCosts[t.tier+1])} ${coinSvg()}`;up.disabled=s.coins<tierCosts[t.tier+1];up.addEventListener('click',()=>upgradeTool(tool))}actions.appendChild(up);card.appendChild(actions);root.appendChild(card)}}
function renderInventory(){const root=$('inventoryList');root.innerHTML='';const ids=Object.keys(s.inventory).filter(id=>s.inventory[id]>0).sort((a,b)=>resources[b].price-resources[a].price);$('inventoryKinds').textContent=`${ids.length} ${ids.length===1?'recurso':'recursos'}`;if(!ids.length){root.innerHTML='<div class="empty">Todavía no has conseguido recursos.<br>Rompe bloques para llenar tu inventario.</div>';$('sellAllBtn').disabled=true;return}for(const id of ids){const r=resources[id],n=s.inventory[id];const row=document.createElement('div');row.className='inventory-row';row.innerHTML=`<div class="item-icon">${iconMarkup(id)}</div><div class="item-info"><strong>${r.name}</strong><small>${r.price} ${coinSvg()} por unidad</small></div><div class="item-count">×${fmt(n)}</div>`;const btn=document.createElement('button');btn.className='inv-sell';btn.innerHTML=`Vender · ${fmt(n*r.price)} ${coinSvg()}`;btn.addEventListener('click',()=>sellResource(id));row.appendChild(btn);root.appendChild(row)}$('sellAllBtn').disabled=false}
function renderDepthSelect(){const sel=$('depthSelect');sel.innerHTML='';for(let i=0;i<=s.unlocked;i++){const opt=document.createElement('option');opt.value=i;opt.textContent=`${zones[i].icon} ${zones[i].name}`;if(i===s.zone)opt.selected=true;sel.appendChild(opt)}}
function blockFallbackSvg(id){const shape=iconShapes[id]||iconShapes.stone;const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges"><rect x="5" y="5" width="54" height="54" rx="5" fill="#ffffff08"/>${shape}</svg>`;return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
function updateBlockView(){const d=blocks[s.block.id],z=zones[s.zone],img=$('blockSymbol'),blockId=blockRenderIds[s.block.id],itemId=galleryIds[s.block.id];$('blockName').textContent=d.name;$('blockSub').textContent=`Necesita ${toolInfo[d.tool].name.toLowerCase()} de ${tiers[d.req].toLowerCase()} o superior`;img.alt=d.name;img.onerror=()=>{if(itemId&&img.dataset.fallback!=='gallery'){img.dataset.fallback='gallery';img.src=`https://mcitemgallery.com/images/${galleryVersion}/${itemId}.webp`}else{img.onerror=null;img.src=blockFallbackSvg(s.block.id)}};img.dataset.fallback='';img.src=blockId?`https://blockrender.dev/render/block/${blockId}.png?size=256`:itemId?`https://mcitemgallery.com/images/${galleryVersion}/${itemId}.webp`:blockFallbackSvg(s.block.id);$('blockCube').style.setProperty('--block-a',d.a);$('blockCube').style.setProperty('--block-b',d.b);const pct=Math.max(0,Math.min(100,s.block.hp/s.block.max*100));$('hpFill').style.width=pct+'%';$('hpText').textContent=`${Math.ceil(s.block.hp)} / ${s.block.max}`;$('cracks').style.opacity=String((1-pct/100)*.9);$('selectedToolLabel').textContent=`${toolInfo[s.selected].icon} ${toolInfo[s.selected].name} de ${tiers[s.tools[s.selected].tier].toLowerCase()}`}
function renderPlayerXp(){const data=playerLevelData();$('playerLevel').textContent=fmt(data.level);$('playerXpText').textContent=`${fmt(data.xp)} / ${fmt(data.needed)} XP`;$('playerXpFill').style.width=(data.xp/data.needed*100)+'%';$('playerXpTrack').setAttribute('aria-valuemax',String(data.needed));$('playerXpTrack').setAttribute('aria-valuenow',String(data.xp));$('playerXpTrack').setAttribute('aria-valuetext',`Nivel ${data.level}: ${data.xp} de ${data.needed} XP`)}
function render(){ renderPlayerXp();$('coinsStat').textContent=fmt(s.coins);$('depthStat').textContent=`Y = ${getY(s.zone)}`;$('depthSub').textContent=zones[s.zone].name;$('blocksStat').textContent=fmt(s.totalMined);$('minersStat').textContent=fmt(s.miners);$('minersSub').textContent=s.miners?`Trabajando · ${Math.max(1,Math.round(2.7/(1+s.miners*.16)*10)/10)} s por golpe`:'Sin minería automática';$('zoneTitle').textContent=zones[s.zone].name;$('zoneSubtitle').textContent=`${zones[s.zone].range} · ${Math.min(16,s.progress[s.zone])}/16 bloques excavados`;$('biomeIcon').innerHTML=iconMarkup(['grass','stone','coal_ore','deepslate','diamond_ore','deepslate','obsidian','ancient_debris'][s.zone]);$('biomeLabel').textContent=zones[s.zone].biome;$('yLabel').textContent=`Y = ${getY(s.zone)}`;$('zoneProgressCount').textContent=`${Math.min(16,s.progress[s.zone])} / 16`;$('zoneProgressFill').style.width=(Math.min(16,s.progress[s.zone])/16*100)+'%';$('minerCount').textContent=fmt(s.miners);$('minerCost').innerHTML=`${fmt(hireCost())} ${coinSvg()}`;$('hireMinerBtn').disabled=s.coins<hireCost();renderDepthSelect();renderTools();renderInventory();updateBlockView();$('activityFeed').innerHTML=s.activity.length?s.activity.map(x=>`<div class="feed-line">${escapeHtml(x)}</div>`).join(''):'<div class="feed-line">Bienvenido a <b>MineClicker</b>. Empieza a excavacar.</div>'}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function autoMine(){if(!s.miners)return;const now=Date.now(),interval=Math.max(650,2700/(1+s.miners*.16));if(now-autoClock<interval)return;autoClock=now;const d=blocks[s.block.id],tool=chooseAutoTool(d);if(!tool)return;hit(tool,true)}
$('exportBtn').addEventListener('click',exportGame);$('importBtn').addEventListener('click',()=>$('importFile').click());$('importFile').addEventListener('change',e=>importGame(e.target.files?.[0]));$('blockButton').addEventListener('click',()=>hit());$('depthSelect').addEventListener('change',e=>selectZone(Number(e.target.value)));$('sellAllBtn').addEventListener('click',sellAll);$('hireMinerBtn').addEventListener('click',hireMiner);
$('resetBtn').addEventListener('click',()=>$('resetModal').classList.add('open'));$('cancelReset').addEventListener('click',()=>$('resetModal').classList.remove('open'));$('resetModal').addEventListener('click',e=>{if(e.target===$('resetModal'))$('resetModal').classList.remove('open')});$('confirmReset').addEventListener('click',()=>{s=initialState();s.block=makeBlock();localStorage.removeItem(SAVE_KEY);$('resetModal').classList.remove('open');render();save();notify('Partida reiniciada')});
render();save();setInterval(()=>{autoMine();if(Date.now()-lastSave>12000)save()},200);
window.addEventListener('beforeunload',save);
})();
