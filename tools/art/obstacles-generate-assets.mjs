/**
 * Oryginalne, samowystarczalne ilustracje kolumn do Cebulak Express.
 * Uruchomienie z katalogu repo: node public/assets/obstacles/generate-assets.mjs
 * Bez dodatkowych zależności. PNG indeksowane (sRGB, @3x).
 */

function buildAssets() {
  const W = 240;
  const END = 192;
  const TILE = 96;
  const CORE_L = 24;
  const CORE_R = 216;
  const paletteHex = [
    '#000000', // przezroczystość
    '#232c40', '#34435a', '#56677a', '#8490a0',
    '#a9b1b5', '#d8d6cf', '#f8e9cf', '#ffffff',
    '#a19a8a', '#c2b69e', '#e3d2ae', '#786b62',
    '#2b796b', '#146153', '#0b4e4d', '#55b398', '#91d5b7',
    '#f7b733', '#f48b2c', '#d76a26', '#995227', '#fff3b8',
    '#d7473e', '#ed6751', '#ff9580', '#ffd8ba',
    '#2d6998', '#397cae', '#68b1cc', '#a2d5d9', '#173b63',
    '#617780', '#a2abb0', '#70818b', '#d4e2dc',
    '#576062', '#39454c', '#dc9168', '#9b543b',
    '#e2c46e', '#fbe19b', '#c3e0df', '#88aab7',
    '#b4b0a8', '#e56d39', '#b9a0a0', '#fbfbf2',
    '#f3c24b', '#b86b46', '#e4a98d', '#718b6d',
  ];
  const P = Object.fromEntries([
    ['clear',0],['ink',1],['ink2',2],['line',3],['steel',4],['grey',5],['cream',6],['paper',7],['white',8],
    ['stoneDark',9],['stone',10],['stoneLight',11],['wood',12],
    ['green',13],['greenDark',14],['greenDeep',15],['mint',16],['mintLight',17],
    ['yellow',18],['orange',19],['rust',20],['brown',21],['lemon',22],
    ['red',23],['coral',24],['salmon',25],['peach',26],
    ['blueDark',27],['blue',28],['sky',29],['ice',30],['navy',31],
    ['slate',32],['slateLight',33],['slateMid',34],['paleMint',35],
    ['greyDeep',36],['charcoal',37],['terracotta',38],['terracottaDark',39],
    ['goldDark',40],['goldLight',41],['fog',42],['steelLight',43],
    ['concrete',44],['orangeLight',45],['greyRose',46],['snow',47],
    ['amber',48],['orangeBrown',49],['skin',50],['olive',51]
  ]);

  const bytesOf = h => [1,3,5].map(i => parseInt(h.slice(i,i+2),16));
  const palette = paletteHex.flatMap(bytesOf);

  class Surface {
    constructor(w,h,clear=0) {
      this.w=w; this.h=h;
      this.p=new Uint8Array(w*h);
      if(clear) this.p.fill(clear);
    }
    rect(x,y,w,h,c) {
      const l=Math.max(0,Math.floor(x)), t=Math.max(0,Math.floor(y));
      const r=Math.min(this.w,Math.ceil(x+w)), b=Math.min(this.h,Math.ceil(y+h));
      if(l>=r||t>=b)return;
      for(let yy=t;yy<b;yy++)this.p.fill(c,yy*this.w+l,yy*this.w+r);
    }
    dot(cx,cy,rx,ry,c) {
      if(rx<=0||ry<=0)return;
      const l=Math.max(0,Math.floor(cx-rx)),r=Math.min(this.w,Math.ceil(cx+rx));
      const t=Math.max(0,Math.floor(cy-ry)),b=Math.min(this.h,Math.ceil(cy+ry));
      for(let yy=t;yy<b;yy++)for(let xx=l;xx<r;xx++){
        const dx=(xx+0.5-cx)/rx,dy=(yy+0.5-cy)/ry;
        if(dx*dx+dy*dy<=1)this.p[yy*this.w+xx]=c;
      }
    }
    round(x,y,w,h,r,c) {
      r=Math.min(r,w/2,h/2);if(r<=0){this.rect(x,y,w,h,c);return;}
      this.rect(x+r,y,w-2*r,h,c);
      this.rect(x,y+r,r,h-2*r,c);
      this.rect(x+w-r,y+r,r,h-2*r,c);
      for(const xx of [x+r,x+w-r])for(const yy of [y+r,y+h-r])this.dot(xx,yy,r,r,c);
    }
    poly(pts,c) {
      const yyMin=Math.max(0,Math.floor(Math.min(...pts.map(x=>x[1]))));
      const yyMax=Math.min(this.h,Math.ceil(Math.max(...pts.map(x=>x[1]))));
      for(let y=yyMin;y<yyMax;y++){
        const at=y+0.5,inter=[];
        for(let i=0;i<pts.length;i++){
          const [x1,y1]=pts[i], [x2,y2]=pts[(i+1)%pts.length];
          if((y1<=at&&y2>at)||(y2<=at&&y1>at))inter.push(x1+(at-y1)*(x2-x1)/(y2-y1));
        }
        inter.sort((a,b)=>a-b);
        for(let j=0;j+1<inter.length;j+=2)this.rect(inter[j],y,inter[j+1]-inter[j],1,c);
      }
    }
    line(x1,y1,x2,y2,width,c) {
      const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy)||1;
      const nx=-dy/len*width/2,ny=dx/len*width/2;
      this.poly([[x1+nx,y1+ny],[x2+nx,y2+ny],[x2-nx,y2-ny],[x1-nx,y1-ny]],c);
    }
    outline(x,y,w,h,r,outer,inner,stroke=5) {
      this.round(x,y,w,h,r,outer);
      this.round(x+stroke,y+stroke,w-2*stroke,h-2*stroke,Math.max(0,r-stroke),inner);
    }
    paste(other,x,y,scale=1) {
      if(scale===1){
        for(let yy=0;yy<other.h;yy++){
          const destY=y+yy;
          if(destY<0||destY>=this.h)continue;
          for(let xx=0;xx<other.w;xx++){
            const destX=x+xx;
            if(destX>=0&&destX<this.w){const v=other.p[yy*other.w+xx];if(v)this.p[destY*this.w+destX]=v;}
          }
        }
        return;
      }
      const w=Math.ceil(other.w*scale), h=Math.ceil(other.h*scale);
      for(let yy=0;yy<h;yy++){
        const destY=Math.floor(y+yy),sy=Math.min(other.h-1,Math.floor(yy/scale));
        if(destY<0||destY>=this.h)continue;
        for(let xx=0;xx<w;xx++){
          const destX=Math.floor(x+xx);
          if(destX<0||destX>=this.w)continue;
          const sx=Math.min(other.w-1,Math.floor(xx/scale));
          const v=other.p[sy*other.w+sx];if(v)this.p[destY*this.w+destX]=v;
        }
      }
    }
  }

  function rivet(s,x,y,color=P.paper) {
    s.dot(x+1,y+2,4,4,P.ink2);
    s.dot(x,y,2.5,2.5,color);
  }
  function stripes(s,x,y,w,h,a,b,step=26,down=true) {
    s.rect(x,y,w,h,a);
    for(let k=-h*2;k<w+h*2;k+=step*2){
      const tilt=down?1:-1;
      s.poly([[x+k,y],[x+k+step,y],[x+k+step+tilt*h,y+h],[x+k+tilt*h,y+h]],b);
    }
  }
  function chevron(s,x,y,w,h,color) {
    s.poly([[x,y],[x+w/2,y+h/2],[x,y+h],[x+w/5,y+h],[x+w*0.72,y+h/2],[x+w/5,y]],color);
  }
  function boltGrid(s,periodY,xs,col=P.cream) {
    for(const x of xs)for(let y=16;y<s.h;y+=periodY)rivet(s,x,y,col);
  }
  function body(kind,h) {
    const s=new Surface(W,h);
    // Pełny, nieprzezroczysty rdzeń 192 px: X=[24, 216).
    s.rect(CORE_L,0,CORE_R-CORE_L,h,P.ink);
    const box={
      viaduct:[P.stoneDark,P.stone,P.stoneLight,P.wood],
      sign:[P.charcoal,P.slate,P.slateLight,P.greyDeep],
      crane:[P.brown,P.yellow,P.goldLight,P.rust],
      roadworks:[P.stoneDark,P.concrete,P.paper,P.terracotta],
      barrier:[P.slate,P.blue,P.ice,P.blueDark],
      truck:[P.navy,P.blueDark,P.steelLight,P.navy]
    }[kind];
    const [dark,mid,light,right]=box;
    s.rect(30,0,180,h,mid);
    s.rect(35,0,20,h,light);
    s.rect(196,0,9,h,right);
    s.rect(30,0,4,h,P.ink2);
    s.rect(208,0,3,h,P.ink2);
    if(kind==='viaduct'){
      s.rect(63,0,8,h,dark);s.rect(150,0,8,h,dark);
      s.rect(70,0,3,h,light);s.rect(157,0,3,h,light);
      for(let y=0;y<h;y+=96){
        s.rect(32,y+75,176,7,P.ink2);s.rect(32,y+82,176,6,P.wood);
        s.rect(77,y+15,64,35,P.stoneLight);s.rect(80,y+19,58,3,P.paper);
        for(const x of [45,88,133,187])rivet(s,x,y+67,P.paper);
      }
    } else if(kind==='sign'){
      s.rect(53,0,14,h,P.ink2);s.rect(166,0,14,h,P.ink2);
      s.rect(69,0,93,h,P.slateMid);
      for(let y=0;y<h;y+=96){
        s.line(70,y+6,160,y+84,9,P.ink);
        s.line(70,y+6,160,y+84,4,P.steel);
        s.line(158,y+6,72,y+84,9,P.ink);
        s.line(158,y+6,72,y+84,4,P.steel);
        s.rect(48,y+78,138,8,P.ink);
        rivet(s,60,y+16,P.grey);rivet(s,174,y+80,P.grey);
      }
    } else if(kind==='crane'){
      s.rect(46,0,13,h,P.ink2);s.rect(182,0,13,h,P.ink2);
      s.rect(56,0,126,h,P.orange);s.rect(65,0,16,h,P.goldLight);
      for(let y=0;y<h;y+=96){
        s.line(53,y+6,186,y+88,12,P.ink2);s.line(58,y+8,179,y+82,6,P.goldLight);
        s.line(185,y+6,54,y+88,12,P.ink2);s.line(180,y+8,59,y+82,6,P.rust);
        for(const x of [51,191])rivet(s,x,y+48,P.lemon);
      }
    } else if(kind==='roadworks'){
      s.rect(60,0,10,h,P.stoneDark);s.rect(169,0,11,h,P.stoneDark);
      for(let y=0;y<h;y+=96){
        s.rect(32,y+71,176,8,P.ink2);s.rect(34,y+79,171,6,P.stoneLight);
        s.rect(75,y+22,82,22,P.paper);
        s.rect(80,y+28,70,3,P.snow);
        for(const x of [42,84,149,196])rivet(s,x,y+62,P.wood);
      }
    } else if(kind==='barrier'){
      s.rect(48,0,9,h,P.blueDark);s.rect(182,0,10,h,P.blueDark);
      s.rect(62,0,10,h,P.sky);s.rect(170,0,5,h,P.ice);
      for(let y=0;y<h;y+=96){
        s.round(79,y+22,81,43,7,P.ink2);
        s.round(85,y+27,69,30,5,P.ice);
        s.rect(88,y+31,35,5,P.sky);s.rect(88,y+41,53,4,P.blue);
        s.rect(32,y+79,176,6,P.ink2);
        rivet(s,41,y+62,P.cream);rivet(s,202,y+62,P.cream);
      }
    } else if(kind==='truck'){
      s.rect(57,0,9,h,P.navy);s.rect(169,0,8,h,P.navy);
      for(let x=78;x<=160;x+=15)s.rect(x,0,3,h,P.blue);
      for(let y=0;y<h;y+=96){
        s.rect(31,y+72,178,10,P.ink2);s.rect(31,y+83,178,4,P.sky);
        s.rect(82,y+19,74,42,P.terracotta);
        s.rect(89,y+25,59,5,P.peach);
        for(const x of [47,194])rivet(s,x,y+65,P.cream);
      }
    }
    return s;
  }
  function topCap(kind){
    const s=body(kind,END);
    if(kind==='viaduct'){
      s.outline(7,122,226,61,11,P.ink,P.stone,7);
      s.rect(18,130,201,9,P.stoneLight);
      for(let x=28;x<=198;x+=42){
        s.rect(x,145,31,14,P.stoneDark);
        s.rect(x+4,148,23,4,P.stoneLight);
      }
      s.rect(11,177,218,15,P.ink);
      stripes(s,18,178,203,9,P.goldLight,P.ink2,24);
      for(const x of [32,207])rivet(s,x,150,P.paper);
    }else if(kind==='sign'){
      s.rect(50,85,13,45,P.ink2);s.rect(175,85,13,45,P.ink2);
      s.outline(5,92,230,91,12,P.ink,P.greenDeep,6);
      s.round(13,100,213,75,6,P.green);
      s.rect(18,106,9,58,P.mint);
      s.round(29,111,184,54,4,P.greenDark);
      // Białe strzałki i piktogramy — celowo bez liter.
      s.line(71,149,71,124,10,P.paper);
      s.poly([[47,136],[71,112],[95,136],[84,136],[71,125],[58,136]],P.paper);
      s.line(153,142,181,142,10,P.paper);
      s.poly([[173,127],[198,142],[173,158],[173,149],[183,142],[173,135]],P.paper);
      s.rect(120,119,5,39,P.mintLight);
      s.rect(17,169,208,5,P.ink2);
      for(const x of [21,219])rivet(s,x,98,P.paper);
    } else if(kind==='crane'){
      s.line(12,107,215,149,32,P.ink);
      s.line(12,105,215,147,23,P.yellow);
      s.line(20,102,206,140,7,P.goldLight);
      for(let x=30;x<=194;x+=31){
        s.line(x,108+(x-12)*42/203,x+15,125+(x-12)*42/203,5,P.rust);
      }
      s.outline(78,151,130,41,8,P.ink,P.slate,5);
      s.rect(91,158,100,5,P.steelLight);
      s.rect(91,173,103,11,P.charcoal);
      stripes(s,97,178,92,8,P.yellow,P.ink2,18);
      s.rect(109,145,9,10,P.ink);
      s.rect(170,145,9,10,P.ink);
      rivet(s,88,168,P.cream);rivet(s,196,167,P.cream);
    }
    return s;
  }
  function beacon(s,cx,y){
    s.rect(cx-4,y+11,8,14,P.ink2);
    s.dot(cx,y+6,13,13,P.ink2);
    s.dot(cx-2,y+4,9,9,P.yellow);
    s.dot(cx-5,y+1,4,5,P.lemon);
  }
  function cone(s,x,y,scale=1){
    const ww=24*scale,hh=46*scale;
    s.poly([[x,y+hh],[x+ww/2,y],[x+ww,y+hh]],P.ink);
    s.poly([[x+5*scale,y+hh-5*scale],[x+ww/2,y+7*scale],[x+ww-5*scale,y+hh-5*scale]],P.orange);
    stripes(s,x+7*scale,y+23*scale,10*scale,7*scale,P.snow,P.orange,7*scale);
    s.round(x-6*scale,y+hh-4*scale,ww+12*scale,10*scale,3,P.ink);
    s.rect(x-1*scale,y+hh,ww+2*scale,4*scale,P.orangeLight);
  }
  function bottomCap(kind){
    const s=body(kind,END);
    if(kind==='roadworks'){
      // Górna krawędź: pachołki + ciągła barierka robót drogowych.
      cone(s,33,3,0.83);cone(s,182,3,0.83);
      beacon(s,83,16);beacon(s,166,16);
      s.outline(6,56,228,45,8,P.ink,P.snow,5);
      stripes(s,14,64,212,28,P.snow,P.red,29,false);
      s.rect(12,97,218,7,P.ink2);
      s.rect(42,105,21,60,P.ink2);s.rect(181,105,21,60,P.ink2);
      s.rect(46,110,11,50,P.grey);s.rect(185,110,11,50,P.grey);
      s.outline(28,144,184,37,5,P.ink,P.stone,4);
      s.rect(37,152,166,7,P.stoneLight);
      for(const x of [45,196])rivet(s,x,175,P.paper);
    }else if(kind==='barrier'){
      beacon(s,45,19);beacon(s,195,19);
      s.outline(7,37,226,36,8,P.ink,P.snow,5);
      stripes(s,12,42,217,25,P.snow,P.red,25,false);
      s.rect(14,71,212,6,P.ink2);
      s.outline(116,84,91,107,10,P.ink,P.blueDark,5);
      s.outline(125,93,72,49,6,P.slate,P.ice,5);
      s.rect(139,104,46,9,P.ice);
      s.rect(139,123,32,6,P.sky);
      s.dot(179,163,11,11,P.ink2);
      s.dot(179,163,5,5,P.yellow);
      s.rect(32,83,21,90,P.ink);
      s.rect(39,89,9,79,P.cream);
      s.rect(23,173,199,16,P.ink2);
      s.rect(30,176,182,7,P.steel);
    }else if(kind==='truck'){
      // Piętrowa laweta / stos kontenerów: wyłącznie generyczne sylwetki.
      s.outline(17,67,209,74,9,P.ink,P.terracotta,5);
      s.rect(24,75,194,8,P.peach);
      for(let x=38;x<208;x+=21)s.rect(x,88,4,39,P.terracottaDark);
      s.rect(24,132,199,11,P.ink2);
      s.outline(21,136,213,45,7,P.ink,P.blueDark,5);
      s.rect(30,149,194,10,P.steelLight);
      for(let x=43;x<=208;x+=23)s.rect(x,159,4,28,P.blue);
      // Dwa samochody ustawione jeden za drugim na górnej platformie.
      for(const v of [{x:27,c:P.yellow},{x:123,c:P.ice}]){
        s.outline(v.x,19,87,34,10,P.ink,v.c,5);
        s.poly([[v.x+13,21],[v.x+31,4],[v.x+63,4],[v.x+77,21]],P.ink);
        s.poly([[v.x+24,19],[v.x+37,9],[v.x+57,9],[v.x+68,19]],P.sky);
        s.rect(v.x+6,31,75,10,v.c);
        for(const wx of [v.x+19,v.x+69]){
          s.dot(wx,48,12,12,P.ink);
          s.dot(wx,48,5,5,P.steelLight);
        }
        s.rect(v.x+4,33,7,5,P.lemon);
      }
      s.rect(22,59,212,9,P.ink2);
      s.rect(31,61,190,3,P.grey);
    }
    return s;
  }
  const tops=['viaduct','sign','crane'];
  const bottoms=['roadworks','barrier','truck'];
  const all=[...tops,...bottoms];
  const sheets=new Map();
  const files=[];
  for(const kind of all){
    const end=tops.includes(kind)?topCap(kind):bottomCap(kind);
    const tile=body(kind,TILE);
    // W górnych end zaczyna się w fazie 0 (po 96px tile);
    // w dolnych tile zaczyna się po end (192px = wielokrotność 96).
    sheets.set(kind,{end,tile});
    files.push({path:`${kind}-end.png`,bytes:encodePng(end,palette)});
    files.push({path:`${kind}-tile.png`,bytes:encodePng(tile,palette)});
  }

  function font(s,txt,x,y,col=P.ink,sc=2){
    const glyphs={
      'A':['01110','10001','10001','11111','10001','10001','10001'],
      'B':['11110','10001','11110','10001','10001','10001','11110'],
      'C':['01111','10000','10000','10000','10000','10000','01111'],
      'D':['11110','10001','10001','10001','10001','10001','11110'],
      'E':['11111','10000','11110','10000','10000','10000','11111'],
      'F':['11111','10000','11110','10000','10000','10000','10000'],
      'G':['01111','10000','10000','10111','10001','10001','01110'],
      'H':['10001','10001','11111','10001','10001','10001','10001'],
      'I':['11111','00100','00100','00100','00100','00100','11111'],
      'K':['10001','10010','11100','10010','10010','10001','10001'],
      'L':['10000','10000','10000','10000','10000','10000','11111'],
      'M':['10001','11011','10101','10101','10001','10001','10001'],
      'N':['10001','11001','10101','10011','10001','10001','10001'],
      'O':['01110','10001','10001','10001','10001','10001','01110'],
      'P':['11110','10001','10001','11110','10000','10000','10000'],
      'R':['11110','10001','10001','11110','10100','10010','10001'],
      'S':['01111','10000','10000','01110','00001','00001','11110'],
      'T':['11111','00100','00100','00100','00100','00100','00100'],
      'U':['10001','10001','10001','10001','10001','10001','01110'],
      'V':['10001','10001','10001','10001','10001','01010','00100'],
      'W':['10001','10001','10001','10101','10101','10101','01010'],
      'X':['10001','01010','00100','00100','00100','01010','10001'],
      'Y':['10001','10001','01010','00100','00100','00100','00100'],
      '0':['01110','10001','10011','10101','11001','10001','01110'],
      '1':['00100','01100','00100','00100','00100','00100','01110'],
      '2':['01110','10001','00001','00010','00100','01000','11111'],
      '3':['11110','00001','00001','01110','00001','00001','11110'],
      '/':['00001','00001','00010','00100','01000','10000','10000'],
      '-':['00000','00000','00000','11111','00000','00000','00000'],
      ' ':['00000','00000','00000','00000','00000','00000','00000']
    };
    for(const ch of txt.toUpperCase()){
      const rows=glyphs[ch]||glyphs[' '];
      for(let yy=0;yy<7;yy++)for(let xx=0;xx<5;xx++)if(rows[yy][xx]==='1')s.rect(x+xx*sc,y+yy*sc,sc,sc,col);
      x+=6*sc;
    }
  }
  function preview(){
    const pw=810,ph=1606;
    const s=new Surface(pw,ph,P.paper);
    for(let y=0;y<ph;y+=20)for(let x=0;x<pw;x+=20)
      s.rect(x,y,20,20,(Math.floor(x/20)+Math.floor(y/20))%2?P.snow:P.cream);
    s.rect(0,0,pw,70,P.ink);
    font(s,'OBSTACLES / 03',29,18,P.paper,3);
    font(s,'3 HEIGHTS - 3 PAIRS',29,47,P.mintLight,2);
    const cW=254,cH=493,margin=12,top=83;
    const kindTitles=['VIADUCT/ROADWORKS','SIGN/BARRIER','CRANE/TRUCK'];
    const rowTitles=['LOW TOP','BALANCED','HIGH TOP'];
    for(let row=0;row<3;row++)for(let col=0;col<3;col++){
      const x=margin+col*(cW+12),y=top+row*(cH+12);
      s.rect(x-2,y-2,cW+4,cH+4,P.ink2);
      for(let yy=y;yy<y+cH;yy+=18)for(let xx=x;xx<x+cW;xx+=18)
        s.rect(xx,yy,Math.min(18,x+cW-xx),Math.min(18,y+cH-yy),((Math.floor((xx-x)/18)+Math.floor((yy-y)/18))%2?P.cream:P.snow));
      s.rect(x,y,cW,40,P.ink);
      font(s,rowTitles[row],x+8,y+5,P.lemon,2);
      font(s,kindTitles[col],x+8,y+21,P.paper,1);
      const topN=[1,2,3][row], bottomN=4-topN;
      const scale=0.51;
      const itemX=Math.floor(x+(cW-W*scale)/2);
      const itemY=y+43;
      const {tile:upTile,end:upEnd}=sheets.get(tops[col]);
      const {tile:downTile,end:downEnd}=sheets.get(bottoms[col]);
      let cursor=itemY;
      for(let n=0;n<topN;n++){
        s.paste(upTile,itemX,cursor,scale);cursor+=Math.ceil(TILE*scale);
      }
      s.paste(upEnd,itemX,cursor,scale);cursor+=Math.ceil(END*scale);
      const gapY=cursor;
      cursor+=36;
      s.paste(downEnd,itemX,cursor,scale);cursor+=Math.ceil(END*scale);
      for(let n=0;n<bottomN;n++){
        s.paste(downTile,itemX,cursor,scale);cursor+=Math.ceil(TILE*scale);
      }
      // Dwie cienkie kreski wskazują rzeczywistą szczelinę między krawędziami.
      s.rect(itemX-26,gapY,19,2,P.green);
      s.rect(itemX+W*scale+7,gapY,19,2,P.green);
      s.rect(itemX-26,gapY+35,19,2,P.red);
      s.rect(itemX+W*scale+7,gapY+35,19,2,P.red);
      s.rect(x+8,y+cH-19,cW-16,1,P.line);
      font(s,`T${topN}/B${bottomN}`,x+10,y+cH-16,P.ink,1);
    }
    return s;
  }
  const prev=preview();
  files.push({path:'preview.png',bytes:encodePng(prev,palette)});

  const manifest={
    schemaVersion:1,
    units:'physical-pixels',
    scale:3,
    logicalCollisionWidth:64,
    collisionWidth:192,
    canvasWidth:240,
    collisionInsetLeft:24,
    collisionInsetRight:24,
    offsetX:-24,
    offsetXLogical:-8,
    tileRepeatHeight:96,
    spriteColorSpace:'sRGB',
    alpha:'indexed PNG; transparent outside artwork, completely opaque within collision core',
    obstacles:Object.fromEntries(all.map(kind=>[
      kind,{
        position:tops.includes(kind)?'top':'bottom',
        offsetX:-24,
        end:{file:`${kind}-end.png`,width:240,height:192,
          attachY:tops.includes(kind)?0:192,gapEdgeY:tops.includes(kind)?192:0},
        tile:{file:`${kind}-tile.png`,width:240,height:96,
          attachY:tops.includes(kind)?96:0},
        collisionCoreX:[24,216],
        repeat:'vertical, no scaling of individual segments'
      }
    ]))
  };
  const metadata=JSON.stringify(manifest,null,2)+'\n';
  const note=`# Przeszkody drogowe — zasoby 03\n\n`+
`Sześć rodzajów: górne \`viaduct\`, \`sign\`, \`crane\`; dolne \`roadworks\`, \`barrier\`, \`truck\`. Grafika to **autorskie ilustracje geometryczne**, bez logotypów i tekstu. Ciepłe światło od lewej góry; mocny granatowy kontur. Grafiki nie korzystają z zasobów stron trzecich.\n\n`+
`## Pochodzenie i licencja\n\n`+
`| Plik | Źródło/narzędzie | Licencja | Autor/uwagi |\n|---|---|---|---|\n`+
all.flatMap(kind=>[
 `| \`${kind}-end.png\` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Krawędź szczeliny, 240×192 px, PNG sRGB @3x |`,
 `| \`${kind}-tile.png\` | ChatGPT, autorskie kształty wektorowe rasteryzowane skryptem JS | Materiał przygotowany do wykorzystania w projekcie | Powtarzalny pionowo, 240×96 px, PNG sRGB @3x |`
]).join('\n')+'\n'+
`| \`preview.png\` | Skład automatyczny w \`generate-assets.mjs\` | Materiał przygotowany do wykorzystania w projekcie | 3 pary × 3 wysokości; na szachownicy |\n`+
`| \`obstacles.json\` | Autorski opis metadanych | Materiał przygotowany do wykorzystania w projekcie | Rozmiary i punkty styku |\n`+
`| \`generate-assets.mjs\` | Autorski skrypt JavaScript bez bibliotek | Materiał przygotowany do wykorzystania w projekcie | Odtwarza wszystkie PNG i JSON; bez nowych zależności |\n\n`+
`## Integracja z rendererem (dla koordynatora)\n\n`+
`- **Nie zmieniano** \`src/core/*\` ani \`src/render/renderer.ts\`. W zleceniu własność tych plików jest zastrzeżona koordynatorowi.\n`+
`- Wymiary PNG są **fizyczne**: dzielić przez 3 w \`ctx.drawImage\`. Wspólny offset X to **-8 px logicznych** względem \`obstacle.x\`. Pas kolizji zajmuje zakres PNG \`x=[24,216)\` (192 fizyczne = 64 logiczne); przeźroczyste ozdobniki mogą wystawać max 8 logicznych w bok.\n`+
`- Górny end: dół obrazka równo z \`topH = gapY-gapH/2\`. Sposób: \`drawImage(end, x - 8, topH - 64, 80, 64)\`. Następnie tile w górę po **32 logiczne px**, od \`topH - 64 - 32\`; przyciąć canvasem/screenem.\n`+
`- Dolny end: góra obrazka równo z \`bottomY = gapY+gapH/2\`: \`drawImage(end, x - 8, bottomY, 80, 64)\`. Tile w dół od \`bottomY + 64\` po **32 logiczne px**, do \`WORLD.groundY\`.\n`+
`- **Kolejność**: kafle przed końcówką (aby dekoracja krawędzi była na wierzchu). Kafel i końcówka nie mają szczelin w pasie kolizji. Przycinanie do obszaru gry i asfaltu realizuje koordynator.\n`+
`- \`sign\`: tylko graficzne strzałki. \`crane\`: ładunek ma szerokość wewnątrz pasa kolizji, nie dynda poza nim. \`truck\`: samochody generyczne, bez marek.\n\n`+
`## Walidacja\n\n`+
`- Każda kolumna ma 240 px szerokości; end ma 192 px wysokości, tile 96 px. Wszystkie PNG mają kanał przezroczystości i wyłącznie indeksowane kolory sRGB.\n`+
`- \`preview.png\` zawiera 3 rodzaje par (viaduct/roadworks, sign/barrier, crane/truck), każdą w 3 wysokościach. Krawędzie góra/dół szczeliny są rozdzielone i ostre.\n`+
`- Dla każdego sprite'a wszystkie piksele z x 24..215 są nieprzezroczyste (brak „dziur do nieba”). Wysokości kafli są wielokrotnością fazy graficznej 96 px.\n`+
`- Regeneracja: \`node public/assets/obstacles/generate-assets.mjs\` z katalogu repo. Nie trzeba \`npm install\`.\n`;
  return {files,metadata,note,manifest,preview:prev,palette};

  function encodePng(surface,colors){
    const w=surface.w,h=surface.h;
    const data=new Uint8Array((w+1)*h);
    for(let y=0;y<h;y++)data.set(surface.p.subarray(y*w,(y+1)*w),y*(w+1)+1);
    const chunks=[];
    const u32=n=>new Uint8Array([(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255]);
    const cat=arr=>{const len=arr.reduce((a,b)=>a+b.length,0),out=new Uint8Array(len);let p=0;for(const a of arr){out.set(a,p);p+=a.length;}return out;};
    const adler=bytes=>{let a=1,b=0;for(let i=0;i<bytes.length;i++){a=(a+bytes[i])%65521;b=(b+a)%65521;}return ((b<<16)|a)>>>0;};
    const table=new Uint32Array(256);
    for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);table[n]=c>>>0;}
    const crc=bytes=>{let c=0xffffffff;for(let i=0;i<bytes.length;i++)c=table[(c^bytes[i])&255]^(c>>>8);return(c^0xffffffff)>>>0;};
    const chunk=(label,body)=>{
      const tag=new Uint8Array(label.split('').map(x=>x.charCodeAt(0)));
      const payload=cat([tag,body]);
      chunks.push(u32(body.length),payload,u32(crc(payload)));
    };
    const ihdr=cat([u32(w),u32(h),new Uint8Array([8,3,0,0,0])]);
    chunk('IHDR',ihdr);
    chunk('PLTE',new Uint8Array(colors));
    chunk('tRNS',new Uint8Array([0]));
    chunk('sRGB',new Uint8Array([0]));
    // Prosty, bezstratny DEFLATE (fixed Huffman + LZ77 RLE, distance=1).
    // Dzięki niemu sprite'y nie potrzebują zewnętrznego optymalizatora PNG.
    const stream=[];
    let buffer=0, bits=0;
    const putBits=(value,count)=>{
      for(let n=0;n<count;n++){
        buffer|=((value>>>n)&1)<<bits;
        if(++bits===8){stream.push(buffer);buffer=0;bits=0;}
      }
    };
    const rev=(x,n)=>{let r=0;while(n--){r=(r<<1)|(x&1);x>>>=1;}return r;};
    const huff=(sym)=>{
      let code,n;
      if(sym<=143){code=sym+0x30;n=8;}
      else if(sym<=255){code=sym-144+0x190;n=9;}
      else if(sym<=279){code=sym-256;n=7;}
      else {code=sym-280+0xc0;n=8;}
      putBits(rev(code,n),n);
    };
    const lb=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
    const le=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
    // 1 ostatni blok, 01 fixed Huffman.
    putBits(1,1);putBits(1,2);
    for(let i=0;i<data.length;){
      if(i>0&&data[i]===data[i-1]){
        let run=0;
        while(run<258&&i+run<data.length&&data[i+run]===data[i-1])run++;
        if(run>=3){
          let k=28;
          for(let t=0;t<28;t++)if(run<lb[t+1]){k=t;break;}
          huff(257+k);putBits(run-lb[k],le[k]);
          putBits(0,5); // kod odległości 0 = 1 bajt
          i+=run;continue;
        }
      }
      huff(data[i++]);
    }
    huff(256);
    if(bits)stream.push(buffer);
    const z=cat([new Uint8Array([0x78,0x01]),new Uint8Array(stream),u32(adler(data))]);
    chunk('IDAT',z);
    chunk('IEND',new Uint8Array(0));
    return cat([new Uint8Array([137,80,78,71,13,10,26,10]),...chunks]);
  }
}

// Wywołanie lokalne z katalogu projektu, bez instalowania zależności.
if(typeof process!=='undefined'&&process.versions&&process.versions.node){
  import('node:fs').then(({mkdirSync,writeFileSync})=>{
    const target='public/assets/obstacles';
    mkdirSync(target,{recursive:true});
    const out=buildAssets();
    for(const file of out.files)writeFileSync(`${target}/${file.path}`,file.bytes);
    writeFileSync(`${target}/obstacles.json`,out.metadata);
    writeFileSync(`${target}/ASSETS.md`,out.note);
    console.log(`Wygenerowano ${out.files.length} PNG + obstacles.json + ASSETS.md`);
  }).catch(err=>{console.error(err);process.exitCode=1;});
}

// Zwraca funkcję, dzięki czemu te same bajty mogą trafić bezpośrednio do repo przez GitHub API.
buildAssets;