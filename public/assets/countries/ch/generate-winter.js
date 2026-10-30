/*
 * Narzedzie autorskie dla zlecenia 46.
 * Konwersja istniejacych warstw RGBA PNG na zima bez przesuwania geometrii.
 * Uruchomienie lokalne: node public/assets/countries/ch/generate-winter.js ch
 * Dozwolone kraje: ch, no, dk, se.
 */
function b64decode(s) {
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  s=s.replace(/\s/g,'');
  let out=new Uint8Array(Math.ceil(s.length*3/4)),p=0,acc=0,bits=0;
  for (let i=0;i<s.length;i++) {
    const c=alphabet.indexOf(s[i]); if(c<0)break;
    acc=(acc<<6)|c;bits+=6;
    if(bits>=8){bits-=8;out[p++]=(acc>>>bits)&255;}
  }
  return out.subarray(0,p);
}
function b64encode(a){
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let parts=[],p='',i=0;
  for(;i+2<a.length;i+=3){
    const n=(a[i]<<16)|(a[i+1]<<8)|a[i+2];
    p+=alphabet[n>>>18]+alphabet[(n>>>12)&63]+alphabet[(n>>>6)&63]+alphabet[n&63];
    if(p.length>=16384){parts.push(p);p='';}
  }
  if(i<a.length){
    const n=(a[i]<<16)|((i+1<a.length?a[i+1]:0)<<8);
    p+=alphabet[n>>>18]+alphabet[(n>>>12)&63]+(i+1<a.length?alphabet[(n>>>6)&63]:'=')+'=';
  }
  parts.push(p);return parts.join('');
}
function u32(a,i){return (((a[i]*16777216)+(a[i+1]<<16)+(a[i+2]<<8)+a[i+3])>>>0);}
function write32(a,i,v){a[i]=(v>>>24)&255;a[i+1]=(v>>>16)&255;a[i+2]=(v>>>8)&255;a[i+3]=v&255;}
function concat(parts){
  const len=parts.reduce((n,p)=>n+p.length,0),o=new Uint8Array(len);let x=0;
  for(const p of parts){o.set(p,x);x+=p.length;}return o;
}
function inflateZlib(src,size) {
  const bytes=typeof require==='function' ? new Uint8Array(require('zlib').inflateSync(Buffer.from(src))) : pako.inflate(src);
  if(bytes.length!==size)throw Error('Rozmiar zlib: '+bytes.length+' != '+size);
  return bytes;
}
function decodePNG(data){
  if(u32(data,0)!==0x89504e47)throw Error('PNG: podpis');
  let p=8,w=0,h=0,depth=0,color=0,idats=[];
  while(p<data.length){
    const len=u32(data,p),type=String.fromCharCode(...data.subarray(p+4,p+8)),end=p+12+len;
    if(end>data.length)throw Error('PNG: uszkodzony chunk');
    if(type==='IHDR'){w=u32(data,p+8);h=u32(data,p+12);depth=data[p+16];color=data[p+17];if(data[p+20])throw Error('PNG interlace');}
    if(type==='IDAT')idats.push(data.subarray(p+8,p+8+len));
    p=end;if(type==='IEND')break;
  }
  if(depth!==8||color!==6)throw Error('Oczekiwany PNG RGBA 8bit; '+depth+'/'+color);
  const row=w*4,raw=inflateZlib(concat(idats),h*(row+1)),pix=new Uint8Array(h*row);
  for(let y=0;y<h;y++){
    const start=y*(row+1),offset=y*row,f=raw[start];
    if(f>4)throw Error('PNG filtr '+f);
    for(let i=0;i<row;i++){
      let a=i>=4?pix[offset+i-4]:0,b=y?pix[offset-row+i]:0,c=(y&&i>=4)?pix[offset-row+i-4]:0,v=0;
      if(f===1)v=a;else if(f===2)v=b;else if(f===3)v=(a+b)>>>1;
      else if(f===4){const q=a+b-c,da=Math.abs(q-a),db=Math.abs(q-b),dc=Math.abs(q-c);v=da<=db&&da<=dc?a:db<=dc?b:c;}
      pix[offset+i]=(raw[start+1+i]+v)&255;
    }
  }
  return {w,h,pix};
}
function deflateZlib(raw) {
  return typeof require==='function' ? new Uint8Array(require('zlib').deflateSync(Buffer.from(raw),{level:8})) : pako.deflate(raw,{level:8});
}
const CRC_TABLE=new Uint32Array(256);
for(let i=0;i<256;i++){let v=i;for(let j=0;j<8;j++)v=(v&1)?(0xedb88320^(v>>>1)):(v>>>1);CRC_TABLE[i]=v>>>0;}
function chunk(type,body){
  const a=new Uint8Array(body.length+12);write32(a,0,body.length);
  for(let i=0;i<4;i++)a[4+i]=type.charCodeAt(i);
  a.set(body,8);
  let c=0xffffffff;for(let i=4;i<a.length-4;i++)c=CRC_TABLE[(c^a[i])&255]^(c>>>8);
  write32(a,a.length-4,(c^0xffffffff)>>>0);return a;
}
function encodePNG(img){
  const {w,h,pix}=img,row=w*4;
  const raw=new Uint8Array(h*(row+1));
  for(let y=0;y<h;y++){raw[y*(row+1)]=0;raw.set(pix.subarray(y*row,(y+1)*row),y*(row+1)+1);}
  const ihdr=new Uint8Array(13);write32(ihdr,0,w);write32(ihdr,4,h);ihdr[8]=8;ihdr[9]=6;
  return concat([new Uint8Array([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('sRGB',new Uint8Array([0])),chunk('IDAT',deflateZlib(raw)),chunk('IEND',new Uint8Array(0))]);
}
function mix(a,b,t){return Math.round(a*(1-t)+b*t);}
function snowLayer(img,cc,part){
  const {w,h,pix}=img;
  const sceneScale=w===2160?2160/1920:1;
  const windows={
    ch:[[105,272,545,643],[542,668,567,641],[1112,1283,546,656],[1640,1758,562,644]],
    no:[[160,271,547,632],[751,891,550,645],[1342,1436,561,633],[1810,1884,561,640]],
    dk:[[521,640,587,675],[1685,1792,605,684]],
    se:[[139,269,581,680],[898,994,605,683],[1625,1724,605,685]]
  };
  const trees={
    ch:[[38,279],[530,353],[1025,295],[1555,350],[1953,270]],
    no:[[8,282],[330,357],[843,282],[1280,332],[1925,270],[2075,285]],
    dk:[],
    se:[[5,278],[385,354],[804,282],[1154,333],[1641,286],[1988,310]]
  };
  for(let y=0;y<h;y++){
    const t=y/h;
    for(let x=0;x<w;x++){
      const i=(y*w+x)*4,alpha=pix[i+3];
      if(alpha===0)continue;
      let r=pix[i],g=pix[i+1],b=pix[i+2];
      if(part==='sky'){
        const north=cc==='no'||cc==='se';
        const low=north?[188,209,225]:[210,227,237];
        const top=north?[58,104,147]:[84,142,186];
        let k=Math.pow(t,0.83);
        let nr=mix(top[0],low[0],k),ng=mix(top[1],low[1],k),nb=mix(top[2],low[2],k);
        // Zachowane slonce: ten sam srodek jak na letnim obrazie.
        const sx=x-150,sy=y-237,d2=sx*sx+sy*sy;
        const glow=Math.max(0,1-Math.sqrt(d2)/230);
        nr=mix(nr,246,glow*0.13);ng=mix(ng,226,glow*0.12);
        if(d2<72*72){nr=254;ng=235;nb=170;}
        if(d2<54*54){nr=255;ng=244;nb=202;}
        if(north){
          const k1=Math.max(0,1-Math.abs(y-(300+95*Math.sin(x/185)))/88);
          const k2=Math.max(0,1-Math.abs(y-(435+70*Math.sin(x/150+2)))/60);
          const aur=Math.min(0.32,k1*0.23+k2*0.14);
          nr=mix(nr,103,aur);ng=mix(ng,225,aur);nb=mix(nb,196,aur);
        }
        pix[i]=nr;pix[i+1]=ng;pix[i+2]=nb;
        continue;
      }
      const dark=r<68&&g<108&&b<124;
      const isGreen=g>r*1.06&&g>b*0.88&&r<216;
      const nearPine=part==='near'&&g<145&&r<114&&isGreen;
      const farPine=part==='far'&&cc==='se'&&isGreen&&g<150&&r<110;
      if(isGreen){
        if(nearPine||farPine){
          r=mix(r,41,0.66);g=mix(g,93,0.60);b=mix(b,105,0.63);
        }else{
          const light=((Math.sin(2*Math.PI*3*x/(w-1)+y/69)+1)*0.5);
          r=219+Math.round(18*light);g=234+Math.round(11*light);b=239+Math.round(9*light);
        }
      }else if(part==='far'&&(cc==='ch'||cc==='no')&&y<530&&!dark&&b>r*1.03&&b>g*0.99&&r>95){
        const snow=Math.max(0,0.60-y/1050);
        r=mix(r,237,snow);g=mix(g,242,snow);b=mix(b,245,snow);
      }else if(r>80&&r<165&&g>130&&b>g*0.88&&part==='far'&&y>610){
        r=mix(r,83,0.28);g=mix(g,176,0.22);b=mix(b,207,0.23);
      }
      if(cc==='dk'&&part==='far'&&y>610&&y<810&&r>172&&g>140&&b<181&&r>g*1.03&&!windows[cc].some(([x0,x1,y0,y1])=>x>=x0*sceneScale&&x<=x1*sceneScale&&y>=y0*sceneScale&&y<=y1*sceneScale)){r=230;g=239;b=244;}
      if(cc==='dk'&&part==='near'&&y>510&&r>180&&g>130&&b<180&&r>g*1.05){r=201;g=221;b=233;}
      if(part==='far'&&windows[cc].some(([x0,x1,y0,y1])=>x>=x0*sceneScale&&x<=x1*sceneScale&&y>=y0*sceneScale&&y<=y1*sceneScale)){
        const coolBlue=b>r+18&&g>r+12&&r>130&&r<200&&g>170&&b>185;
        if(coolBlue){r=255;g=215;b=125;}
      }
      // Snieg na ciemnych polaciach drzew, przezroczystosc i kontur bez zmian.
      if(part==='near'&&nearPine&&trees[cc].some(([cx,cy])=>Math.abs(cx*sceneScale-x)<72*sceneScale&&y>(cy+17)*sceneScale&&y<(cy+190)*sceneScale&&((y-cy*sceneScale)%(67*sceneScale)<15*sceneScale))&&!dark){
        r=216;g=234;b=241;
      }
      pix[i]=r;pix[i+1]=g;pix[i+2]=b;
    }
  }
  // Niezmienny profil terenu i zabudowy. Jedynie snieg na wewnetrznych
  // powierzchniach dachow oraz dyskretne cieple lampki pod okapem.
  if(part==='far'){
    const roofs={
      ch:[[105,270,485,534],[541,667,540,578],[1105,1283,493,550],[1630,1760,540,579]],
      no:[[159,270,509,550],[743,889,492,544],[1331,1437,516,562],[1798,1887,548,581]],
      dk:[[514,645,543,593],[1682,1796,581,623]],
      se:[[127,270,525,584],[892,996,558,609],[1609,1726,555,605]]
    };
    for(const [sx0,sx1,sy0,sy1] of roofs[cc]){
      const x0=Math.round(sx0*sceneScale),x1=Math.round(sx1*sceneScale),y0=Math.round(sy0*sceneScale),y1=Math.round(sy1*sceneScale);
      const mid=(x0+x1)/2;
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
        const i=(y*w+x)*4;
        if(pix[i+3]<210)continue;
        const r=pix[i],g=pix[i+1],b=pix[i+2];
        if(r<62&&g<105&&b<130)continue;
        // Czapka sniegu wewnatrz istniejącego obrysu dachu.
        const edge=y0+Math.abs(x-mid)/(x1-x0)*2*(y1-y0);
        const terracotta=cc==='ch'||cc==='dk';
        const isRoof=terracotta?(r>110&&r>g*1.16&&r>b*1.18&&g<170):(r>56&&r<130&&Math.abs(r-g)<32&&Math.abs(g-b)<32&&b<158);
        if(isRoof&&y<=edge+29&&y>=edge-9){pix[i]=243;pix[i+1]=247;pix[i+2]=248;}
      }
      const lightY=y1+11;
      for(let x=x0+13;x<x1-13;x+=18){
        for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){
          if(dx*dx+dy*dy>5)continue;const xx=x+dx,yy=lightY+dy;
          if(xx>=0&&xx<w&&yy>=0&&yy<h){
            const i=(yy*w+xx)*4;
            if(pix[i+3]>220&&pix[i]>150&&pix[i]>pix[i+2]*1.30&&pix[i+1]<230){pix[i]=255;pix[i+1]=x%3===0?194:223;pix[i+2]=120;}
          }
        }
      }
    }
  }
  // Kafelkowanie: dokladnie identyczne skrajne kolumny, brak szwu.
  if(part!=='sky')for(let y=0;y<h;y++){
    let a=y*w*4,b=(y*w+w-1)*4;
    for(let k=0;k<4;k++)pix[b+k]=pix[a+k];
  }
}
function alphaOver(target,src,x0,y0,wcopy,hcopy){
  const W=target.w,H=target.h,w=src.w,h=src.h,t=target.pix,s=src.pix;
  for(let y=0;y<Math.min(hcopy,h);y++){
    const dy=y+y0;if(dy<0||dy>=H)continue;
    for(let x=0;x<Math.min(wcopy,w);x++){
      const dx=x+x0;if(dx<0||dx>=W)continue;
      const a=(y*w+x)*4,b=(dy*W+dx)*4,opacity=s[a+3]/255;
      if(!opacity)continue;
      for(let k=0;k<3;k++)t[b+k]=Math.round(s[a+k]*opacity+t[b+k]*(1-opacity));
      t[b+3]=255;
    }
  }
}
async function generateCountryWinter(cc,getSource,putOutput){
  if(!['ch','no','dk','se'].includes(cc))throw Error('Nieznany kraj');
  const imgs={},records=[],prefix='public/assets/countries/'+cc+'/'+cc+'-';
  for(const layer of ['sky','far','near']){
    const summer=decodePNG(b64decode(await getSource(prefix+layer+'.png')));
    snowLayer(summer,cc,layer);
    const filename=prefix+layer+'-zima.png',buf=encodePNG(summer);
    if(buf.length>=1200000)throw Error('PNG za duzy '+filename+' '+buf.length);
    await putOutput(filename,b64encode(buf));
    records.push({path:filename,size:buf.length,w:summer.w,h:summer.h});
    imgs[layer]=summer;
  }
  // Kompozycja przy zachowaniu skali i wysokosci warstw Canvas 2D.
  const preview={w:1080,h:1920,pix:new Uint8Array(imgs.sky.pix)};
  alphaOver(preview,imgs.far,0,765,1080,900);
  alphaOver(preview,imgs.near,0,1254,1080,720);
  const road=decodePNG(b64decode(await getSource(prefix+'road.png')));
  alphaOver(preview,road,0,1590,1080,330);
  const previewPath='docs/art/podglady/countries-'+cc+'-preview-zima.png';
  const pb=encodePNG(preview);
  await putOutput(previewPath,b64encode(pb));
  records.push({path:previewPath,size:pb.length,w:1080,h:1920});
  return records;
}
if(typeof module!=='undefined'&&module.exports)module.exports={generateCountryWinter};
if(typeof require==='function'&&typeof module!=='undefined'&&require.main===module){
  const fs=require('fs'),path=require('path'),cc=process.argv[2];
  generateCountryWinter(cc,async f=>fs.readFileSync(f).toString('base64'),
    async(f,s)=>{fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,Buffer.from(s,'base64'));})
    .then(r=>{for(const i of r)console.log(i.path+' '+i.size+' B');})
    .catch(e=>{console.error(e);process.exitCode=1;});
}
