var Lumi=function(){console.error("LumiJS: Lumi has no object to work with")};Lumi.canvas=document.createElement("CANVAS"),Lumi.canvas.id="canvas",document.body.appendChild(Lumi.canvas);const ctx=Lumi.canvas.getContext("2d");document.body.style.overflow="hidden",Lumi.canvasCheck={width:"normal",height:"normal"},Lumi.objects=[],Lumi.gravity=0,Lumi.random=function(i,t){return Math.random()*(t-i)+i},Lumi.checkCollision=function(i,t){if("block"==i.type&&"block"==t.type)return i.x<t.x+t.width&&i.x+i.width>t.x&&i.y<t.y+t.height&&i.y+i.height>t.y},Lumi.rect=function(i,t,e,o,s){s||(s={mass:1,maxVel:{x:100,y:100},restitution:.5,static:!1,collision:!0,color:"#000000"}),s.mass||(s.mass=1),s.maxVel||(s.maxVel={x:100,y:100}),s.maxVel.x||(s.maxVel.x=100),s.maxVel.y||(s.maxVel.y=100),s.restitution||(s.restitution=.5),s.static||(s.static=!1),s.collision||(s.collision=!0),s.color||(s.color="#000000"),this.type="block",this.x=i,this.y=t,this.width=e,this.height=o,this.halfWidth=this.width/2,this.halfHeight=this.height/2,this.color=s.color,this.restitution=s.restitution,this.static=s.static,this.collision=s.collision,this.mass=s.mass,this.velocity={x:0,y:0,increase:{x:0,y:0}},this.gravity=Lumi.gravity,this.maxVel={x:s.maxVel.x,y:s.maxVel.y},this.addXVel=function(i){this.velocity.x+=i},this.addYVel=function(i){this.velocity.y+=i},this.getMidX=function(){return this.halfWidth+this.x},this.getMidY=function(){return this.halfHeight+this.y},this.getTop=function(){return this.y},this.getLeft=function(){return this.x},this.getRight=function(){return this.x+this.width},this.getBottom=function(){return this.y+this.height},this.update=function(){this.halfWidth=.5*this.width,this.halfHeight=.5*this.height,this.x+=this.velocity.x,this.y+=this.velocity.y,this.y<=window.innerHeight-this.height?(this.gravity=Lumi.gravity,this.velocity.x>=this.maxVel.x&&(this.velocity.x=this.maxVel.x,this.velocity.increase.x=0),this.velocity.y>=this.maxVel.y?(this.velocity.y=this.maxVel.y,this.velocity.increase.y=0):this.static||(this.velocity.y=this.gravity*this.mass+this.velocity.increase.y,this.velocity.increase.y+=1)):(this.velocity.increase.y=0,this.gravity=0,this.y=window.innerHeight-this.height);for(var i=0;i<Lumi.objects.length;i++)this!=Lumi.objects[i]&&this.collision&&Lumi.objects[i].collision&&Lumi.checkCollision(this,Lumi.objects[i])&&(this.getMidY()<Lumi.objects[i].getMidY()&&(this.velocity.increase.y=0,this.gravity=0),Lumi.resolveCollision(this,Lumi.objects[i]))}},Lumi.addRect=function(i,t,e,o,s){return Lumi.objects.push(new Lumi.rect(i,t,e,o,s)),Lumi.objects[Lumi.objects.length-1]},Lumi.resolveCollision=function(i,t){if(Lumi.checkCollision(i,t)){var e=i.getMidX(),o=i.getMidY(),s=t.getMidX(),h=t.getMidY(),n=(s-e)/t.halfWidth,c=(h-o)/t.halfHeight,a=Math.abs(n),l=Math.abs(c);Math.abs(a-l)<.1?(i.x=n<0?t.getRight():t.getLeft()-i.width,i.y=c<0?t.getBottom():t.getTop()-i.height,Math.random()<.5?(i.velocity.x=-i.velocity.x*t.restitution,Math.abs(i.velocity.x)<4e-4&&(i.velocity.x=0)):(i.velocity.y=-i.velocity.y*t.restitution,Math.abs(i.velocity.y)<4e-4&&(i.velocity.y=0))):a>l?(i.x=n<0?t.getRight():t.getLeft()-i.width,i.velocity.x=-i.velocity.x*t.restitution,Math.abs(i.velocity.x)<4e-4&&(i.velocity.x=0)):(c<0?i.y=t.getBottom():(i.velocity.y=0,i.y=t.getTop()-i.height),i.velocity.y=-i.velocity.y*t.restitution,Math.abs(i.velocity.y)<4e-4&&(i.velocity.y=0))}else console.error("LumiJS: No Collision To Resolve")},Lumi.config=function(i,t,e){i||(i=400),"fitToWindow"==i&&(i=window.innerWidth,Lumi.canvasCheck.width="fitToWindow"),t||(t=400),"fitToWindow"==t&&(t=window.innerHeight,Lumi.canvasCheck.height="fitToWindow"),e||(e=0),Lumi.canvas.width=i,Lumi.canvas.height=t,Lumi.gravity=e},Lumi.resize=function(){"fitToWindow"==Lumi.canvasCheck.width&&(Lumi.canvas.width=window.innerWidth),"fitToWindow"==Lumi.canvasCheck.height&&(Lumi.canvas.height=window.innerHeight)},window.onresize=Lumi.resize,Lumi.renderFrame=function(){scrollTo(10,10),ctx.clearRect(0,0,window.innerWidth,window.innerHeight);for(var i=0;i<Lumi.objects.length;i++)"block"===Lumi.objects[i].type&&(ctx.fillStyle=Lumi.objects[i].color,ctx.fillRect(Lumi.objects[i].x,Lumi.objects[i].y,Lumi.objects[i].width,Lumi.objects[i].height),Lumi.objects[i].update(),ctx.fillStyle="#000000")},Lumi.init=function(){requestAnimationFrame(Lumi.init),Lumi.renderFrame()},Lumi.config("fitToWindow","fitToWindow",5),Lumi.init();var square1=Lumi.addRect(100,0,50,50),square2=Lumi.addRect(300,0,50,50),jump=0,keyDown=function(i){"Right"==i.key||"ArrowRight"==i.key?square1.addXVel(5):"Left"!=i.key&&"ArrowLeft"!=i.key||square1.addXVel(-5)},keyUp=function(i){"Right"==i.key||"ArrowRight"==i.key?square1.velocity.x=0:"Left"!=i.key&&"ArrowLeft"!=i.key||(square1.velocity.x=0)};document.addEventListener("keydown",keyDown),document.addEventListener("keyup",keyUp);var getRandomColor=function(){for(var i="#",t=0;t<6;t++)i+="0123456789ABCDEF"[Math.floor(16*Math.random())];return i};