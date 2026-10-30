/*
 * Generator wariantów zimowych dla BE/NL/DE/UK/FR.
 * Oryginalne letnie PNG są źródłem pikseli; kontury i kadr pozostają na miejscu.
 * Czysty JavaScript: brak zależności runtime gry.
 * Udostępnia funkcje przez wartość ostatniego wyrażenia (IIFE).
 */
(() => {
const ABC="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function fromBase64(s) {
 const tab=new Int8Array(128).fill(-1); for(let i=0;i<64;i++)tab[ABC.charCodeAt(i)]=i;
 const out=new Uint8Array(Math.floor(s.length*3/4)+3);let p=0,a=0,k=0;
 for(let j=0;j<s.length;j++){const c=s.charCodeAt(j);if(c===61)break;const v=c<128?tab[c]:-1;if(v<0)continue;
 a=(a<<6)|v;k+=6;if(k>=8){k-=8;out[p++]=(a>>>k)&255;a&=(1<<k)-1;}}
 return out.slice(0,p);
}
function toBase64(a){
 let parts=[],s="";for(let i=0;i<a.length;i+=3){const n=(a[i]<<16)|((i+1<a.length?a[i+1]:0)<<8)|(i+2<a.length?a[i+2]:0);
 s+=ABC[(n>>>18)&63]+ABC[(n>>>12)&63]+(i+1<a.length?ABC[(n>>>6)&63]:"=")+(i+2<a.length?ABC[n&63]:"=");
 if(s.length>16000){parts.push(s);s="";}}parts.push(s);return parts.join("");
}
function u32(a,i){return (a[i]*16777216+a[i+1]*65536+a[i+2]*256+a[i+3])>>>0;}
function huffman(lens){
 let ct=new Uint16Array(16),next=new Uint16Array(16),max=0,map=Array.from({length:16},()=>new Map());
 for(const len of lens)if(len){ct[len]++;max=Math.max(len,max);}
 let code=0;for(let n=1;n<=15;n++){code=(code+ct[n-1])<<1;next[n]=code;}
 for(let symbol=0;symbol<lens.length;symbol++){const len=lens[symbol];if(!len)continue;let num=next[len]++,reverse=0;
 for(let k=0;k<len;k++){reverse=(reverse<<1)|(num&1);num>>>=1;}map[len].set(reverse,symbol);}
 return {map,max};
}
const LB=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
const LE=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
const DB=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
const DE=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
function inflate(z,expected){
 let p=2,buf=0,bits=0;const read=n=>{while(bits<n){buf|=z[p++]<<bits;bits+=8;}const value=buf&((1<<n)-1);buf>>>=n;bits-=n;return value;};
 const sym=h=>{let value=0;for(let n=1;n<=h.max;n++){value|=read(1)<<(n-1);const v=h.map[n].get(value);if(v!==undefined)return v;}throw Error("Błędny kod Huffmana");};
 const out=new Uint8Array(expected),fixLit=huffman(Array.from({length:288},(_,i)=>i<144?8:i<256?9:i<280?7:8)),fixDist=huffman(Array.from({length:32},()=>5));
 let pos=0,end=0;
 while(!end){end=read(1);const kind=read(2);
 if(kind===0){buf=bits=0;const len=z[p]|(z[p+1]<<8);p+=4;out.set(z.subarray(p,p+len),pos);pos+=len;p+=len;continue;}
 let lh,dh;
 if(kind===1){lh=fixLit;dh=fixDist;}
 else if(kind===2){
 const nl=257+read(5),nd=1+read(5),nc=4+read(4),order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],cl=new Array(19).fill(0);
 for(let j=0;j<nc;j++)cl[order[j]]=read(3);
 const ch=huffman(cl),lengths=[];
 while(lengths.length<nl+nd){const v=sym(ch);if(v<=15)lengths.push(v);else if(v===16){const n=3+read(2),last=lengths[lengths.length-1];for(let j=0;j<n;j++)lengths.push(last);}
 else if(v===17){const n=3+read(3);for(let j=0;j<n;j++)lengths.push(0);}
 else{const n=11+read(7);for(let j=0;j<n;j++)lengths.push(0);}}
 lh=huffman(lengths.slice(0,nl));dh=huffman(lengths.slice(nl,nl+nd));
 }else throw Error("Niedozwolony typ DEFLATE");
 while(true){const c=sym(lh);if(c<256){out[pos++]=c;continue;}if(c===256)break;const i=c-257;if(i<0||i>28)throw Error("Kod długości");
 const len=LB[i]+read(LE[i]),di=sym(dh);if(di>29)throw Error("Kod dystansu");
 const dist=DB[di]+read(DE[di]);if(pos-dist<0)throw Error("Odległość poza buforem");
 for(let j=0;j<len;j++){out[pos]=out[pos-dist];pos++;}}
 }
 if(pos!==expected)throw Error("Niewłaściwy rozmiar po dekompresji");
 return out;
}
function readPng(bytes){
 if(u32(bytes,0)!==0x89504e47)throw Error("To nie jest PNG");
 let ofs=8,palette,alpha,idat=[],total=0,w=0,h=0,depth=0,ct=0;
 while(ofs<bytes.length){const n=u32(bytes,ofs),name=String.fromCharCode(...bytes.subarray(ofs+4,ofs+8)),data=bytes.subarray(ofs+8,ofs+8+n);
 if(name==="IHDR"){w=u32(data,0);h=u32(data,4);depth=data[8];ct=data[9];}
 if(name==="PLTE")palette=data;if(name==="tRNS")alpha=data;if(name==="IDAT"){idat.push(data);total+=n;}
 ofs+=n+12;}
 const bpp={0:1,2:3,3:1,4:2,6:4}[ct];if(depth!==8||!bpp)throw Error("PNG musi mieć 8 bitów na kanał");
 const zipped=new Uint8Array(total);let ptr=0;for(const c of idat){zipped.set(c,ptr);ptr+=c.length;}
 let stride=w*bpp,raw=inflate(zipped,(stride+1)*h),rgba=new Uint8Array(w*h*4),cur=new Uint8Array(stride),prev=new Uint8Array(stride);ptr=0;
 for(let y=0;y<h;y++){const filter=raw[ptr++];
 for(let x=0;x<stride;x++){let n=raw[ptr++],a=x>=bpp?cur[x-bpp]:0,b=prev[x],c=x>=bpp?prev[x-bpp]:0;
 if(filter===1)n+=a;else if(filter===2)n+=b;else if(filter===3)n+=Math.floor((a+b)/2);
 else if(filter===4){const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);n+=pa<=pb&&pa<=pc?a:pb<=pc?b:c;}
 else if(filter!==0)throw Error("Nieznany filtr PNG");cur[x]=n&255;}
 for(let x=0;x<w;x++){const k=x*bpp,o=(y*w+x)*4;if(ct===6)rgba.set(cur.subarray(k,k+4),o);
 else if(ct===2){rgba[o]=cur[k];rgba[o+1]=cur[k+1];rgba[o+2]=cur[k+2];rgba[o+3]=255;}
 else if(ct===3){const ix=cur[x];rgba[o]=palette[ix*3];rgba[o+1]=palette[ix*3+1];rgba[o+2]=palette[ix*3+2];rgba[o+3]=alpha&&ix<alpha.length?alpha[ix]:255;}
 else if(ct===0){rgba[o]=rgba[o+1]=rgba[o+2]=cur[x];rgba[o+3]=255;}
 else if(ct===4){rgba[o]=rgba[o+1]=rgba[o+2]=cur[k];rgba[o+3]=cur[k+1];}}
 const swap=cur;cur=prev;prev=swap;}
 return {w,h,rgba};
}
const rev=(n,len)=>{let r=0;for(let i=0;i<len;i++){r=(r<<1)|(n&1);n>>>=1;}return r;};
const LC=new Uint16Array(288),LL=new Uint8Array(288),DC=new Uint16Array(32);
for(let i=0;i<288;i++){const n=i<144?8:i<256?9:i<280?7:8,code=i<144?0x30+i:i<256?0x190+i-144:i<280?i-256:0xc0+i-280;LC[i]=rev(code,n);LL[i]=n;}
for(let i=0;i<32;i++)DC[i]=rev(i,5);
function compress(raw){
 const output=[],head=new Int32Array(131072),link=new Int32Array(32768),n=raw.length;
 let bits=0,shift=0;
 const emit=(value,width)=>{bits|=value<<shift;shift+=width;while(shift>=8){output.push(bits&255);bits>>>=8;shift-=8;}};
 const literal=v=>emit(LC[v],LL[v]),hash=i=>((raw[i]*8191)^(raw[i+1]*127)^(raw[i+2]*31))&131071;
 emit(3,3);
 for(let i=0;i<n;){
 let maxLen=0,distance=0;
 if(i+3<n){const key=hash(i);let candidate=head[key]-1,tries=0;
 while(candidate>=0&&i-candidate<=32768&&tries++<5){
 if(raw[candidate]===raw[i]&&raw[candidate+1]===raw[i+1]&&raw[candidate+2]===raw[i+2]){const limit=Math.min(258,n-i);let j=3;while(j<limit&&raw[candidate+j]===raw[i+j])j++;if(j>maxLen){maxLen=j;distance=i-candidate;if(j===258)break;}}
 const next=link[candidate&32767]-1;if(next>=candidate)break;candidate=next;}
 link[i&32767]=head[key];head[key]=i+1;}
 if(maxLen>=3){let li=0,di=0;while(li<28&&LB[li+1]<=maxLen)li++;while(di<29&&DB[di+1]<=distance)di++;
 literal(li+257);emit(maxLen-LB[li],LE[li]);emit(DC[di],5);emit(distance-DB[di],DE[di]);
 for(let j=1;j<maxLen;j++){const p=i+j;if(p+3<n){const key=hash(p);link[p&32767]=head[key];head[key]=p+1;}}
 i+=maxLen;
 }else{literal(raw[i]);i++;}}
 literal(256);if(shift>0)output.push(bits&255);
 let a=1,b=0;for(let i=0;i<n;i++){a+=raw[i];b+=a;if((i&8191)===8191){a%=65521;b%=65521;}}
 a%=65521;b%=65521;const sum=((b<<16)|a)>>>0,z=new Uint8Array(output.length+6);z[0]=0x78;z[1]=0x9c;z.set(output,2);
 const p=output.length+2;z[p]=sum>>>24;z[p+1]=sum>>>16;z[p+2]=sum>>>8;z[p+3]=sum;return z;
}
const CRC=new Uint32Array(256);for(let i=0;i<256;i++){let v=i;for(let j=0;j<8;j++)v=(v&1)?0xedb88320^(v>>>1):v>>>1;CRC[i]=v>>>0;}
function chunk(name,data){
 const a=new Uint8Array(data.length+12),n=data.length;a[0]=n>>>24;a[1]=n>>>16;a[2]=n>>>8;a[3]=n;
 a.set(Array.from(name,c=>c.charCodeAt(0)),4);a.set(data,8);let crc=0xffffffff;
 for(let i=4;i<a.length-4;i++)crc=(crc>>>8)^CRC[(crc^a[i])&255];crc=(crc^0xffffffff)>>>0;
 a[a.length-4]=crc>>>24;a[a.length-3]=crc>>>16;a[a.length-2]=crc>>>8;a[a.length-1]=crc;return a;
}
function writePng(w,h,rgba){
 const raw=new Uint8Array((w*4+1)*h);let p=0;
 for(let y=0;y<h;y++){raw[p++]=1;for(let x=0;x<w;x++){const o=(y*w+x)*4;for(let c=0;c<4;c++)raw[p++]=(rgba[o+c]-(x?rgba[o-4+c]:0))&255;}}
 const zipped=compress(raw),ihdr=new Uint8Array(13);ihdr[0]=w>>>24;ihdr[1]=w>>>16;ihdr[2]=w>>>8;ihdr[3]=w;ihdr[4]=h>>>24;ihdr[5]=h>>>16;ihdr[6]=h>>>8;ihdr[7]=h;ihdr[8]=8;ihdr[9]=6;
 const parts=[new Uint8Array([137,80,78,71,13,10,26,10]),chunk("IHDR",ihdr),chunk("sRGB",new Uint8Array([0])),chunk("IDAT",zipped),chunk("IEND",new Uint8Array())];
 const size=parts.reduce((s,v)=>s+v.length,0),out=new Uint8Array(size);let q=0;for(const part of parts){out.set(part,q);q+=part.length;}return out;
}
const clamp=n=>Math.max(0,Math.min(255,Math.round(n)));
function disc(png,cx,cy,r,rgb,opacity,transparentOnly){
 const {w,h,rgba}=png;for(let y=Math.max(0,Math.floor(cy-r));y<=Math.min(h-1,Math.ceil(cy+r));y++)for(let x=Math.max(0,Math.floor(cx-r));x<=Math.min(w-1,Math.ceil(cx+r));x++){
 const dx=x-cx,dy=y-cy;if(dx*dx+dy*dy>r*r)continue;const k=(y*w+x)*4;if(transparentOnly&&rgba[k+3]>90)continue;
 const a=opacity/255,b=rgba[k+3]/255,o=a+b*(1-a);if(!o)continue;
 for(let c=0;c<3;c++)rgba[k+c]=clamp((rgb[c]*a+rgba[k+c]*b*(1-a))/o);rgba[k+3]=clamp(o*255);}}
function makeWinter(png,kind,country){
 const {w,h,rgba}=png,mask=kind==="sky"?null:new Uint8Array(w*h);let changed=0;
 for(let i=0;i<w*h;i++){
 const p=i*4,alpha=rgba[p+3];if(alpha<5)continue;const r=rgba[p],g=rgba[p+1],b=rgba[p+2];let R=r,G=g,B=b;
 const outline=r<76&&g<89&&b<117;
 if(kind==="sky"){
 const sun=r>g*1.13&&g>b*1.07;if(sun){R=.97*r+4;G=.96*g+5;B=.97*b+3;}
 else{R=.84*r+31;G=.86*g+27;B=.87*b+24;}
 }else if(!outline){
 const foliage=g>r*1.045&&g>b*.83&&g>80&&r<220;
 const field=r>114&&g>119&&b<g*.88&&Math.abs(r-g)<50;
 const roof=r-g>35&&r-b>53&&r>118&&b<192;
 const window=r>207&&g>163&&b<185&&r-g<90&&r>g*1.04;
 if(foliage||field){const lum=.28*r+.57*g+.15*b,dark=lum<132;R=(dark?168:207)+(lum-150)*(dark?.24:.14);
 G=(dark?196:222)+(lum-150)*(dark?.19:.12);B=(dark?205:231)+(lum-150)*(dark?.16:.10);mask[i]=1;}
 else if(roof){R=.93*r+10;G=.95*g+11;B=.96*b+16;mask[i]=2;}
 else if(window){R=255;G=223;B=149;}
 else{R=.94*r+12;G=.94*g+13;B=.96*b+11;}
 }
 const nr=clamp(R),ng=clamp(G),nb=clamp(B);if(nr!==r||ng!==g||nb!==b)changed++;
 rgba[p]=nr;rgba[p+1]=ng;rgba[p+2]=nb;
 }
 if(kind==="sky"){
 const seed={be:3,nl:7,de:13,uk:17,fr:23}[country];
 for(let i=0;i<36;i++){const x=(73+i*217+seed*37)%w,y=(102+i*361+seed*19)%h;
 disc(png,x,y,2+(i%3),[255,255,250],205,false);
 if(i%5===0){disc(png,x+6,y,1,[247,255,255],185,false);disc(png,x-6,y,1,[247,255,255],185,false);}}
 }else{
 const snow=new Uint8Array(w*h);
 for(let x=0;x<w;x++){let last=0,run=0;for(let y=0;y<h;y++){const q=y*w+x,m=mask[q];run=m&&m===last?run+1:m?1:0;last=m;
 if(m&&run<=(m===2?12:9)&&y>8&&(x*13+y*7)%31>3)snow[q]=m;}}
 for(let i=0;i<snow.length;i++){if(!snow[i])continue;const p=i*4;if(rgba[p+3]<90)continue;
 if(snow[i]===2){rgba[p]=245;rgba[p+1]=249;rgba[p+2]=246;}else{rgba[p]=226;rgba[p+1]=238;rgba[p+2]=238;}}
 for(let y=105;y<h-42;y+=91)for(let x=37;x<w-15;x+=103){const k=y*w+x;if(mask[k]!==1)continue;
 for(let dy=-3;dy<=3;dy++)for(let dx=-9;dx<=9;dx++){if(dx*dx/81+dy*dy/9>1)continue;const q=(y+dy)*w+x+dx;
 if(mask[q]===1){const p=q*4;rgba[p]=240;rgba[p+1]=247;rgba[p+2]=244;}}}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const k=y*w+x,p=k*4;if(rgba[p+3]<245||mask[k])continue;
 const r=rgba[p],g=rgba[p+1],b=rgba[p+2];if(r>244&&g>205&&g<239&&b>130&&b<167&&(x+2*y)%19<4){rgba[p]=255;rgba[p+1]=246;rgba[p+2]=196;}}
 if(kind==="far"){for(let tile=0;tile<w;tile+=1080)for(const rel of [315,700]){let roof=null;
 for(let dx=-20;dx<=20;dx+=5){const x=tile+rel+dx;if(x<10||x>=w-12)continue;
 for(let y=80;y<h-95;y++){if(mask[y*w+x]===2){roof={x,y};break;}}if(roof)break;}
 if(roof)for(let i=0;i<3;i++)disc(png,roof.x+5+i*9,roof.y-18-i*19,8+i*2,[228,238,245],120,true);}}
 // Przez ostatnią kolumnę wymuszamy dokładnie tę samą sekwencję pikseli.
 for(let y=0;y<h;y++){const a=y*w*4,b=a+(w-1)*4;for(let c=0;c<4;c++)rgba[b+c]=rgba[a+c];}
 }
 return changed;
}
function blend(preview,layer,offsetY){
 const {w:W,h:H,rgba:dst}=preview,{w,h,rgba:src}=layer,copyW=Math.min(W,w),start=Math.max(0,-offsetY),end=Math.min(h,H-offsetY);
 for(let y=start;y<end;y++)for(let x=0;x<copyW;x++){const si=(y*w+x)*4,di=((y+offsetY)*W+x)*4,sa=src[si+3];if(sa===0)continue;
 if(sa===255){dst[di]=src[si];dst[di+1]=src[si+1];dst[di+2]=src[si+2];dst[di+3]=255;continue;}
 const da=dst[di+3]/255,a=sa/255,oa=a+da*(1-a);if(oa<.001)continue;
 for(let c=0;c<3;c++)dst[di+c]=clamp((src[si+c]*a+dst[di+c]*da*(1-a))/oa);dst[di+3]=clamp(oa*255);}
}
function verifyWinter(original,winter,kind){
 if(winter.w!==original.w||winter.h!==original.h)throw Error("Przesunięty wymiar");
 if(kind!=="sky"){const w=winter.w,h=winter.h,a=original.rgba,b=winter.rgba;let bad=0;
 for(let y=0;y<h;y++){const row=y*w*4,edge=row+(w-1)*4;
 for(let c=0;c<4;c++)if(b[row+c]!==b[edge+c])throw Error("Nieszczelny kafelek");
 for(let x=0;x<w-1;x++){const p=row+4*x;if(a[p+3]>180&&a[p]<76&&a[p+1]<89&&a[p+2]<117
 &&(b[p]!==a[p]||b[p+1]!==a[p+1]||b[p+2]!==a[p+2]))bad++;}}
 if(bad)throw Error("Zmieniono "+bad+" ciemnych konturów");}
}
return {fromBase64,toBase64,readPng,writePng,makeWinter,blend,verifyWinter};
})()