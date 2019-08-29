(window["webpackJsonplearn-to-pong"]=window["webpackJsonplearn-to-pong"]||[]).push([[0],{11:function(e,t,a){e.exports=a(31)},16:function(e,t,a){},27:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),s=a(4),o=a.n(s),d=(a(16),a(10)),l=a(7),c=a(8),r=a.n(c),h=function(e){return n.a.createElement(r.a,{value:e.value,onChange:e.onChange,options:{mode:"javascript",theme:"cobalt",tabSize:2,lineNumbers:!0,viewportMargin:1/0}})},u=a(1),p=a(9),v=function(){function e(t,a){Object(u.a)(this,e),this.areaWidth=t,this.areaHeight=a}return Object(p.a)(e,[{key:"drawBall",value:function(e,t){t.beginPath(),t.arc(e.position.x,e.position.y,e.radius,0,2*Math.PI,!1),t.fill()}},{key:"drawPaddle",value:function(e,t){t.rect(e.position.x-e.width/2,e.position.y-e.height/2,e.width,e.height),t.fill()}},{key:"drawScores",value:function(e,t){t.font="48px sans-serif",t.fillText(e.scores.left.toString(),48,48),t.fillText(e.scores.right.toString(),this.areaWidth-96,48)}},{key:"draw",value:function(e,t){t.clearRect(0,0,this.areaWidth,this.areaHeight),t.fillStyle="white",this.drawScores(e,t),this.drawBall(e.ball,t),this.drawPaddle(e.paddles.left,t),this.drawPaddle(e.paddles.right,t)}}]),e}(),f=function e(t,a,i,n){Object(u.a)(this,e),this.radius=void 0,this.velocity=void 0,this.position=void 0,this.radius=10,this.velocity={x:i*Math.cos(n),y:i*Math.sin(n)},this.position={x:t/2,y:a/2}},g=function e(t,a){Object(u.a)(this,e),this.velocity=void 0,this.position=void 0,this.width=void 0,this.height=void 0,this.velocity={x:0,y:0},this.position={x:a,y:t/2},this.width=10,this.height=t/5},y=function e(t,a,i,n){Object(u.a)(this,e),this.previousTime=void 0,this.ball=void 0,this.paddles=void 0,this.scores=void 0,this.areaWidth=void 0,this.areaHeight=void 0,this.paddlesSpeed=void 0,this.paddlesSpeed=a/50,this.areaWidth=t,this.areaHeight=a,this.previousTime=n,this.ball=new f(t,a,i,Math.PI/2),this.paddles={left:new g(a,20),right:new g(a,t-20)},this.scores={left:0,right:0}};var m=function(e){var t=Object(i.useRef)();return Object(i.useEffect)(function(){var a=t.current,i=window.devicePixelRatio;return a.width=a.clientWidth*i,a.height=a.clientHeight*i,function(e,t){var a=new v(e.width,e.height),i=e.getContext("2d");if(!i)throw new Error("Could not get 2d context");var n=e.width/500,s=new y(e.width,e.height,n,performance.now());return a.draw(s,i),t.postMessage({type:"tick",state:s}),e.parentElement.addEventListener("keyup",function(e){"qwertasdfg".includes(e.key)?s.paddles.left.velocity.y=0:"yuiophjkl;".includes(e.key)&&(s.paddles.right.velocity.y=0)}),e.parentElement.addEventListener("keydown",function(e){"qwert".includes(e.key)?s.paddles.left.velocity.y=-s.paddlesSpeed:"asdfg".includes(e.key)?s.paddles.left.velocity.y=s.paddlesSpeed:"yuiop".includes(e.key)?s.paddles.right.velocity.y=-s.paddlesSpeed:"hjkl;".includes(e.key)&&(s.paddles.right.velocity.y=s.paddlesSpeed)}),t.addEventListener("message",function(e){"tock"===e.data.type&&requestAnimationFrame(function(n){a.draw(e.data.state,i),e.data.state.paddles.left.velocity=s.paddles.left.velocity,e.data.state.paddles.right.velocity=s.paddles.right.velocity,t.postMessage({type:"tick",state:e.data.state,time:n}),[]})}),function(){return console.log("TODO: cleanup")}}(a,e.worker)},[t]),n.a.createElement("canvas",{ref:t})},w=function(e){return n.a.createElement("div",{className:"testResults"},e.tests.map(function(e){return n.a.createElement("details",{key:e.id,className:e.state+" testResult"},n.a.createElement("summary",null,e.message),n.a.createElement("div",{className:"detailsBody"},e.details))}))},b=(a(27),a(28),a(29),a(30),localStorage.getItem("pong-code")||"function init(state) {\n\n}\n\nfunction moveBall(ball, dt) {\n\n}\n\nfunction bounceWall(state, dt) {\n\n}\n\nfunction movePaddles(paddles, dt) {\n\n}\n\nfunction clampPaddles(paddles, dt) {\n\n}\n\nfunction bouncePaddles(state, dt) {\n\n}\n\nfunction scoreGoal(state, dt) {\n\n}"),k=new Worker("./sandbox.js"),E=function(){var e=Object(i.useState)([]),t=Object(d.a)(e,2),a=t[0],s=t[1];return Object(i.useEffect)(function(){k.postMessage({type:"codeChange",code:b}),k.addEventListener("message",function(e){"testResults"===e.data.type&&(s(e.data.testState),"success"===e.data.testState[0].state&&localStorage.setItem("pong-code",e.data.code))})},[]),n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"pong-editor"},n.a.createElement(h,{value:b,onChange:Object(l.debounce)(function(e){return k.postMessage({type:"codeChange",code:e})},300)})),n.a.createElement("div",{className:"pong-game",tabIndex:-1},n.a.createElement(m,{worker:k})),n.a.createElement("div",{className:"pong-tests"},n.a.createElement(w,{tests:a})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[11,1,2]]]);
//# sourceMappingURL=main.e3ed3274.chunk.js.map