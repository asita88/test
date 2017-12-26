var type=navigator.appName; 

//打开下单提示DIV
function ShowOrderDiv(title, msg, footMsg, width, height, isLeft, path)
{
	//用于屏蔽和显示div后面的内容
	document.getElementById("lovediv").style.display="";
	document.getElementById("lovediv").style.height=screen.availHeight;
	
	var divClose1 = "closeOrderDiv(1,"+isLeft+")";
	var divClose2 = "closeOrderDiv(0,"+isLeft+")";
	var imgPath = "";
	if(path != null && path == 1)
		imgPath = "../";
	else
		imgPath = "";	
	
	try
	{
		var obj=null;
		var pLeft,pTop;
		if(document.getElementById("order_div")!=null)
		{
			obj=document.getElementById("order_div");
			obj.style.display='';
			//pLeft=(screen.availWidth-width)/2;
			//pTop=(screen.availHeight-height)/2;
			if(document.all){
			  pLeft=document.body.scrollLeft+200 ;
			  pTop=(document.body.offsetHeight-height)/2+document.body.scrollTop ;
			}else{
				pLeft=document.body.scrollLeft+200 ;
				pTop=document.body.clientHeight/2+document.body.scrollTop ;
			}
			obj.style.width=width;
			obj.style.height=height;
			obj.style.left=pLeft;		
			obj.style.top=pTop;
			obj.style.zIndex=9999;
			document.getElementById("dialog_title").innerText = title;
			document.getElementById("dialog_title").className = "Sowdivtit";
			document.getElementById("order_msg").innerHTML = msg;
			document.getElementById("order_msg").style.height = (height-92)+"px";
			document.getElementById("order_foot_msg").innerHTML = footMsg;
			document.getElementById("ok").onclick = function(){closeOrderDiv(1,isLeft);};
			document.getElementById("cancel").onclick = function(){closeOrderDiv(0,isLeft);};
		}
		else
		{
			//imgPath先去掉
			obj= document.createElement('div');
			obj.id="order_div";
			obj.className="Sowdiv";
			obj.style.zIndex=9999;
			obj.innerHTML='<table class="wintablebox" border="0" cellspacing="0" cellpadding="0">'+
				'<tr class="wintablebox_titbg">'+
				'	<td class="Sowdivico"><div></div></td>'+
				'	<td class="Sowdivtit" id="dialog_title">'+title+'</td>'+
				'	<td class="Sowdivclose"><div onclick="closeOrderDiv(-1,'+isLeft+')"></div></td>'+
				'</tr>'+
	   			'<tr class="wintablebox_cot">'+
				'	<td colspan="3" align="center" valign="top">'+
				'	    <div id="order_msg" style="margin-top:5px;overflow:auto;width:100%;height:'+(height-92)+'px;">'+
				'       '+msg+'</div>'+
				'       <div id="order_foot_msg">'+footMsg+'</div>'+
				'   </td>'+
				'</tr>'+
				'<tr>'+
				'	<td colspan="3" height="40" align="center">'+
				'       <input type="button" name="ok" id="ok" onClick="'+divClose1+'" class="btn2" onmouseover=this.className="btn2m" onmouseout=this.className="btn2" value="确定" >&nbsp;&nbsp;'+
				'       <input type="button" name="cancel" onClick="'+divClose2+'" class="btn2" onmouseover=this.className="btn2m" onmouseout=this.className="btn2" value="取消">'+
				'	</td>'+
				'</tr>'+
	            '</table>';
			
			
			
			//pLeft=(screen.availWidth-width)/2;
			//pTop=(screen.availHeight-height)/2;
			if(document.all){
				  pLeft=document.body.scrollLeft+200 ;
				  pTop=(document.body.offsetHeight-height)/2+document.body.scrollTop ;
			}else{
					pLeft=document.body.scrollLeft+200 ;
					pTop=document.body.clientHeight/2+document.body.scrollTop ;
			}
			obj.style.width=width;
			obj.style.height=height;
			obj.style.left=pLeft;		
			obj.style.top=pTop;
			document.body.appendChild(obj);
			new neverDragDivision(obj);
		}
	}
	catch(e)
	{
		
	}
}

//关闭下单提示DIV
function closeOrderDiv(result, isLeft)
{
	document.getElementById("lovediv").style.display='none';
	try
	{
		document.getElementById("order_div").style.display='none';
		
		if(result==1)//确认下注
		{
			DivConfirmOrder();
		}
		else if(result==0)//取消
		{
			eliminate_jeu();//清空
		}
	}
	catch(e)
	{
	}
}


//DIV移动控制
function neverDragDivision(fObj)
{    
  with (this)
  {
    if (!fObj) return;
    this.bDraged = false;
    if(!document.all){//IE情况下
    	this.bDraged = true; 
    }
    this.oDragOrig = fObj||fObj.event;
    oDragOrig.style.cursor = "move";
    oDragOrig.onmousedown = function()
    {   
      var ofs = Offset(oDragOrig);
      oDragOrig.style.position = "absolute";
      oDragOrig.style.left = ofs.l+"px";
      oDragOrig.style.top = ofs.t+"px"; 
      oDragOrig.X = event.clientX - ofs.l;
      oDragOrig.Y = event.clientY - ofs.t;     
      bDraged = true;        
    };
    
    oDragOrig.onmousemove = function()
    {     	
      if(!bDraged) return;  
      if (oDragOrig.setCapture) { 
    	  oDragOrig.setCapture();         
      } else if(window.captureEvents){ 
    	  window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP); 
      }
      
      // oDragOrig.setCapture();  
      oDragOrig.style.left = (event.clientX - oDragOrig.X)+"px";
      oDragOrig.style.top = (event.clientY - oDragOrig.Y)+"px";   
      
    };
 
    oDragOrig.onmouseup = function()
    {    
    	bDraged = false; 
    	if(document.all){
    	  oDragOrig.releaseCapture();
    	}else{
    		oDragOrig.value="releaseCapture";    		
    	}
    };

    function Offset(e)
    {
      var t = parseInt(e.offsetTop);
      var l = parseInt(e.offsetLeft);
      var w = parseInt(e.offsetWidth);
      var h = parseInt(e.offsetHeight);
      while(e=e.offsetParent)
      {
        t+=parseInt(e.offsetTop);
        l+=parseInt(e.offsetLeft);
      }
      return { t:t, l:l, w:w, h:h }
    };
  }
};

//==================================================================================
//拖动鼠标时用到的JS
//==================================================================================
var oldX,oldY;    // 记录鼠标移动事件发生前鼠标的位置
var dragElem;    // 记录被拖曳的对象

function $(nodeId)
{  
  return document.getElementById(nodeId);
}

// 获得事件发生的主体
function getEventElement(evt)
{
  evt=evt||event;
  return evt.srcElement||evt.target;
}

// 获取结点的计算样式
function getStyle(node)
{
  return node.currentStyle||document.defaultView.getComputedStyle(node, null);
}

// 拖动的动作
function drag(evt)
{  
  evt=evt||event;    // 为了兼容IE和firefox，firefox执行evt，IE则执行evt=event
  var node=dragElem;
    
  if(node != null)  
  {     
    node.style.top=parseInt(getStyle(node).top||0)+evt.clientY-oldY+'px';
    node.style.left=parseInt(getStyle(node).left||0)+evt.clientX-oldX+'px'; 
    node.style.right=parseInt(getStyle(node).right||0)-evt.clientX+oldX+'px';
    //0px 越往左越小 930px
    oldX=evt.clientX, oldY=evt.clientY;
  }
}

// 拖动开始
// 注册拖曳结束时的执行函数
// 注册拖曳事件的执行函数
function drag_start(evt,nodeId)
{
  evt = evt||event;
  oldX = evt.clientX;
  oldY = evt.clientY;
  dragElem=$(nodeId);
  getEventElement(evt).onmouseup=drag_end;
  getEventElement(evt).onmousemove=drag;
}

// 对 drag_start 进行了改良
function drag_start2(evt,nodeId)
{  
  evt=evt||event; 
  oldX=evt.clientX;
  oldY=evt.clientY;
  dragElem=$(nodeId); 
  //drag(evt);
  document.body.onmousemove=drag; 
  document.body.onmouseup=drag_end;
}

// 拖曳结束，释放onmousemove事件执行函数
function drag_end(evt)
{   
  evt = evt||event;
  dragElem = null;
  getEventElement(evt).onmousemove = null;
  getEventElement(evt).onmouseup = null;
}

function  resizeDivOrderDiv(){
	try
	{
	  if(document.getElementById("order_div")!=null){
	    var rmObj=document.getElementById("order_div");	
	    rmObj.style.position = "absolute";
	    if(document.all){
		  rmObj.style.left==(parseInt(document.body.scrollLeft)+200)+"px";		
		  rmObj.style.top=((parseInt(document.body.offsetHeight)-parseInt(rmObj.style.height))/2+parseInt(document.body.scrollTop))+"px"; ;
	    }else{
	    	rmObj.style.left==(parseInt(document.body.scrollLeft)+200)+"px";		
			rmObj.style.top=(parseInt(document.body.clientHeight)/2+parseInt(document.body.scrollTop))+"px"; ;
	    }
		
	  }
	}
	catch(e)
	{
	}
}

window.onscroll=function (){
	resizeDivOrderDiv();
}



