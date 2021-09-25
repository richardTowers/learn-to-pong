(this["webpackJsonplearn-to-pong"]=this["webpackJsonplearn-to-pong"]||[]).push([[0],{11:function(e,t,i){e.exports=i(29)},16:function(e,t,i){},25:function(e,t,i){},29:function(e,t,i){"use strict";i.r(t);var n=i(0),a=i.n(n),s=i(4),o=i.n(s),d=(i(16),i(10)),l=i(7),r=i(8),c=i.n(r),h=function(e){return a.a.createElement(c.a,{value:e.value,onChange:e.onChange,options:{mode:"javascript",theme:"cobalt",tabSize:2,lineNumbers:!0,viewportMargin:1/0}})},u=i(1),p=i(9),g=function(){function e(t,i){Object(u.a)(this,e),this.areaWidth=t,this.areaHeight=i}return Object(p.a)(e,[{key:"drawBall",value:function(e,t){t.beginPath(),t.arc(e.position.x,e.position.y,e.radius,0,2*Math.PI,!1),t.fill()}},{key:"drawPaddle",value:function(e,t){t.rect(e.position.x-e.width/2,e.position.y-e.height/2,e.width,e.height),t.fill()}},{key:"drawScores",value:function(e,t){t.font="48px sans-serif",t.fillText(e.scores.left.toString(),48,48),t.fillText(e.scores.right.toString(),this.areaWidth-96,48)}},{key:"draw",value:function(e,t){t.clearRect(0,0,this.areaWidth,this.areaHeight),t.fillStyle="white",this.drawScores(e,t),this.drawBall(e.ball,t),this.drawPaddle(e.paddles.left,t),this.drawPaddle(e.paddles.right,t)}}]),e}(),v=function e(t,i,n,a){Object(u.a)(this,e),this.radius=void 0,this.velocity=void 0,this.position=void 0,this.radius=10,this.velocity={x:n*Math.cos(a),y:n*Math.sin(a)},this.position={x:t/2,y:i/2}},f=function e(t,i){Object(u.a)(this,e),this.velocity=void 0,this.position=void 0,this.width=void 0,this.height=void 0,this.velocity={x:0,y:0},this.position={x:i,y:t/2},this.width=10,this.height=t/5},y=function e(t,i,n,a){Object(u.a)(this,e),this.previousTime=void 0,this.ball=void 0,this.paddles=void 0,this.scores=void 0,this.areaWidth=void 0,this.areaHeight=void 0,this.paddlesSpeed=void 0,this.paddlesSpeed=i/50,this.areaWidth=t,this.areaHeight=i,this.previousTime=a,this.ball=new v(t,i,n,Math.PI/2),this.paddles={left:new f(i,20),right:new f(i,t-20)},this.scores={left:0,right:0}};var m=function(e){var t=Object(n.useRef)();return Object(n.useEffect)((function(){var i=t.current,n=window.devicePixelRatio;return i.width=i.clientWidth*n,i.height=i.clientHeight*n,function(e,t){var i=new g(e.width,e.height),n=e.getContext("2d");if(!n)throw new Error("Could not get 2d context");var a=e.width/500,s=new y(e.width,e.height,a,performance.now());return i.draw(s,n),t.postMessage({type:"tick",state:s}),e.parentElement.addEventListener("keyup",(function(e){"qwertasdfg".includes(e.key)?s.paddles.left.velocity.y=0:"yuiophjkl;".includes(e.key)&&(s.paddles.right.velocity.y=0)})),e.parentElement.addEventListener("keydown",(function(e){"qwert".includes(e.key)?s.paddles.left.velocity.y=-s.paddlesSpeed:"asdfg".includes(e.key)?s.paddles.left.velocity.y=s.paddlesSpeed:"yuiop".includes(e.key)?s.paddles.right.velocity.y=-s.paddlesSpeed:"hjkl;".includes(e.key)&&(s.paddles.right.velocity.y=s.paddlesSpeed)})),t.addEventListener("message",(function(e){"tock"===e.data.type&&requestAnimationFrame((function(a){i.draw(e.data.state,n),e.data.state.paddles.left.velocity=s.paddles.left.velocity,e.data.state.paddles.right.velocity=s.paddles.right.velocity,t.postMessage({type:"tick",state:e.data.state,time:a}),[]}))})),function(){return console.log("TODO: cleanup")}}(i,e.worker)}),[t]),a.a.createElement("canvas",{ref:t})},w=function(e){return a.a.createElement("div",{className:"testResults"},e.tests.map((function(e){return a.a.createElement("details",{key:e.id,className:e.state+" testResult"},a.a.createElement("summary",null,e.message),a.a.createElement("div",{className:"detailsBody"},e.details))})))},b=(i(25),i(26),i(27),i(28),localStorage.getItem("pong-code")||'function init(width, height, time) {\n  // You can probably leave this code more or less as it is. It\'s here to show\n  // you what the "state" object looks like at the beginning.\n\n  const ballSpeed = width / 500\n  return {\n    previousTime: time,\n    paddlesSpeed: height / 50,\n    areaWidth: width,\n    areaHeight: height,\n    ball: {\n      radius: 10,\n      velocity: { x: ballSpeed * Math.PI / 2, y: ballSpeed * Math.PI / 2 },\n      position: { x: width / 2, y: height / 2 },\n    },\n    paddles: {\n      left: {\n        velocity: { x: 0, y: 0 },\n        position: { x: 20, y: height / 2 },\n        width: 5,\n        height: height / 5,\n      },\n      right: {\n        velocity: { x: 0, y: 0 },\n        position: { x: width - 20, y: height / 2 },\n        width: 5,\n        height: height / 5,\n      },\n    },\n  }\n}\n\nfunction moveBall(ball, dt) {\n\n}\n\nfunction bounceWall(state, dt) {\n\n}\n\nfunction movePaddles(paddles, dt) {\n\n}\n\nfunction clampPaddles(state, dt) {\n\n}\n\nfunction bouncePaddles(state, dt) {\n\n}\n\nfunction scoreGoal(state, dt) {\n\n}'),k=new Worker("./sandbox.js"),E=function(){var e=Object(n.useState)([]),t=Object(d.a)(e,2),i=t[0],s=t[1];return Object(n.useEffect)((function(){k.postMessage({type:"codeChange",code:b}),k.addEventListener("message",(function(e){"testResults"===e.data.type&&(s(e.data.testState),"success"===e.data.testState[0].state&&localStorage.setItem("pong-code",e.data.code))}))}),[]),a.a.createElement("div",{className:"App"},a.a.createElement("div",{className:"pong-editor"},a.a.createElement(h,{value:b,onChange:Object(l.debounce)((function(e){return k.postMessage({type:"codeChange",code:e})}),300)})),a.a.createElement("div",{className:"pong-game",tabIndex:-1},a.a.createElement(m,{worker:k})),a.a.createElement("div",{className:"pong-tests"},a.a.createElement(w,{tests:i})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[11,1,2]]]);
//# sourceMappingURL=main.91b7c1cd.chunk.js.map