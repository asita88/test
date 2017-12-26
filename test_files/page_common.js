
var temRateObj;
var temKeyArr;
var temBall;
var temProType;
var temStakeMin;
var temStakeMax;
var temBallMax;
var temIssueMax;
var temWinMax;
var temRateVal;
var temUrl;

function Left_Jeu(keyStr) //点赔率跳转到左侧下单界面
{
	temRateObj = document.getElementById(keyStr + ".rate");
	if(temRateObj!=null)
	{
		temKeyArr = keyStr.split("-");
		temBall = temKeyArr[2]; //球号
		temProType = temKeyArr[1]; //产品类型
		
		//zProType,stakeMin,stakeMax,ballMax,issueMax,winMax
		//   0        1         2        3       4       5
		temArr = gProTypeMap[temProType];
		temStakeMin = temArr[1];
		temStakeMax = temArr[2];
		temBallMax  = temArr[3];
		temIssueMax = temArr[4];
		temWinMax   = temArr[5];
		temRateVal  = temRateObj.innerHTML; // 赔率
		
		temUrl = "left_order.do?game_type="+gameType
				+ "&pro_type="+temProType
				+ "&ball="+temBall
				+ "&rate="+temRateVal
				+ "&stake_min="+temStakeMin
				+ "&stake_max="+temStakeMax
				+ "&ball_max="+temBallMax
				+ "&issue_max="+temIssueMax
				+ "&win_max="+temWinMax;
		
		//parent.frames["leftFrame"].location = temUrl;
	}
}

var temCalMoney = "";
var temCalRate  = "";
var temCalWinMoney = "";
function Cal_Money(curObj) //计算可赢金额
{
	if(curObj.value!="")
	{
		temCalMoney = curObj.value;
		temCalRate = document.getElementById(curObj.id.replace(".money",".rate")).innerHTML;
		temCalWinMoney = parseInt(temCalMoney,10) * parseFloat(temCalRate) - parseInt(temCalMoney,10);
		
		document.getElementById("MayWinMoney").innerHTML = temCalWinMoney.toFixed(1);
	}
	else
		document.getElementById("MayWinMoney").innerHTML = "";
}

var curObj;
var curIdName = "";
var radioList;
var inputList;
function closeTxt()//封盘
{
	toleft_index_jeu(true);//左边栏目
	
	if(pageType=="LM")//特殊
	{
		radioList = document.getElementsByName("radio_lm");
		if(radioList!=null)
		{
			for(var i=0; i<radioList.length; i++)
			{
				radioList[i].checked = false;
				radioList[i].style.display = "none";
				document.getElementById(radioList[i].id+".rate_td").innerHTML = "<span class='multiple_Red'>-</span>";
			}
		}
		
		inputList = document.getElementById("tab_all_box").getElementsByTagName("input");
		if(inputList!=null)
		{
			for(var i=inputList.length-1; i>=0; i--)
		  	{
				curObj = inputList[i];
				
				if(curObj.type == "checkbox")
			    {
					curObj.style.display = "none";
					document.getElementById(curObj.id+"_td").className = "";
			    }
		  	}
		}
	}
	else
	{
		Jeu_Order_Str=""; //清空下註串
		
		for(var i=0; i<zBallTagList.length; i++)
		{
			curIdName = zBallTagList[i];
			
			if(_isShortcut=="1")
				document.getElementById(curIdName+".tr").className = "Ball_tr_H_h";
			else
				document.getElementById(curIdName+".tr").className = "Ball_tr_H";
			
			document.getElementById(curIdName+".tr").setAttribute("isSeled", "0");
			document.getElementById(curIdName+".rate_ks").innerHTML = "-";
			document.getElementById(curIdName+".rate_td").innerHTML = "<span class='multiple_Red'>-</span>";
			document.getElementById(curIdName+".money_td").innerHTML = zTxtStr;//封盘
		}
		if(shortcutTextList!=null && shortcutTextList.length>0)
		{
			for(var s=0; s<shortcutTextList.length; s++)
			{
				document.getElementById(shortcutTextList[s]).value = "";
			}
		}
	}
}

function toleft_index_jeu(isParent) //跳转左侧用户信息界面
{
	if(localType=="LEFT")
	{
		parent.frames["mainFrame"].document.getElementById("btn_order_tr").style.display = "";
		parent.frames["mainFrame"].document.getElementById("btn_order_hid_tr").style.display = "none";
	}
	else
	{
		document.getElementById("btn_order_tr").style.display = "";
		document.getElementById("btn_order_hid_tr").style.display = "none";
	}
	
	if(isParent)
	{
		//parent.frames["leftFrame"].location = "user_info.do?s="+Math.floor(Math.random()*1000)+"&d="+new Date().getMilliseconds();
	}
	else
	{
		location = "user_info.do?s="+Math.floor(Math.random()*1000)+"&d="+new Date().getMilliseconds();
	}
}

function Read_Foot_Result(curIdx, idxLength, class1, class2)
{
	for(var t=0; t<idxLength; t++)
	{
		if(t==curIdx)
		{
			document.getElementById("Foot-Top."+t).className = class2;
			document.getElementById("Foot-Tab."+t).style.display = "";
		}
		else
		{
			document.getElementById("Foot-Top."+t).className = class1;
			document.getElementById("Foot-Tab."+t).style.display = "none";
		}
	}
}

/**start**/
var openDiffTime = 0;
var openStopTime = 0;
var openIntervalObj;
function setOpenServelMsTime(servelNowTime, servelOpenTime, runMinute)//距離開獎
{
	//alert("open"+servelNowTime+":::"+servelOpenTime);
	//document.getElementById("Cur_Award_Issue").innerHTML = servelNowTime + "::::" + servelOpenTime;
	
	var servelTime = new Date(servelNowTime).getTime();
	var nowTime = new Date().getTime();
	openDiffTime = nowTime - servelTime;
	
	openStopTime = new Date(servelOpenTime).getTime();
	openStopTime = openStopTime + runMinute*60*1000;
	
	if(openIntervalObj!=null)
	{
		clearInterval(openIntervalObj);//停掉上一个定时器
	}
	openIntervalObj = setInterval("servelMsTime(\"ClockTime_O\", openDiffTime, openStopTime, 1)", 1000);
}

var closeDiffTime = 0;
var closeStopTime = 0;
var closeIntervalObj;
function setCloseServelMsTime(servelNowTime, servelOpenTime, runMinute, stopSecond)//距離封盤
{
	//alert("close"+servelNowTime+":::"+stopSecond);
	
	var servelTime = new Date(servelNowTime).getTime();
	var nowTime = new Date().getTime();
	closeDiffTime = nowTime - servelTime;
	
	closeStopTime = new Date(servelOpenTime).getTime();
	closeStopTime = closeStopTime + runMinute*60*1000;
	closeStopTime = closeStopTime - (stopSecond * 1000);
	
	if(closeIntervalObj!=null)
	{
		clearInterval(closeIntervalObj);//停掉上一个定时器
	}
	closeIntervalObj = setInterval("servelMsTime(\"ClockTime_C\", closeDiffTime, closeStopTime, 2)", 1000);
}

var isLastIssue = false; //是否当天最后一期，如果最后一期的话，只需取开奖结果
function servelMsTime(timeTagName, diffTime, stopTime, type)
{
	var dateTime = new Date();
	dateTime.setTime(stopTime - (dateTime.getTime() - diffTime));
	
	var minutes = "00";
	var seconds = "00";
	var Digital = dateTime;
	if(dateTime.getTime() >= 0)
	{
		minutes = Digital.getMinutes();
		seconds = Digital.getSeconds();
		
		if (minutes<=9)
			minutes = "0" + minutes;
		if (seconds <= 9)
			seconds = "0" + seconds;
	}
	document.getElementById(timeTagName).innerHTML = minutes + ":" + seconds;//设定倒计时
	
	if(dateTime.getTime() <= 0)
	{
		if(type==1)//开奖时间到了
		{
			if(openIntervalObj!=null)
			{
				clearInterval(openIntervalObj);//停掉上一个定时器
			}
			var temDateTime = new Date();
			temDateTime.setTime(stopTime);
			
			var temDigital = temDateTime;
			var temHours = temDigital.getHours();
			var temMinutes = temDigital.getMinutes();
			var temSeconds = temDigital.getSeconds();
			if (temMinutes<=9)
				temMinutes = "0" + temMinutes;
			if (temSeconds <= 9)
				temSeconds = "0" + temSeconds;
			
			var temCurTime = "" + temHours + temMinutes + temSeconds;
			
			if(gameType == "C" || gameType == "N")
			{
				if(parseInt(temCurTime, 10) < parseInt(_sysStartTime, 10) 
						&& parseInt(temCurTime, 10) > parseInt(_sysEndTime, 10))
				{
					isLastIssue = true;
				}
			}
			else
			{
				if(parseInt(temCurTime, 10) < parseInt(_sysStartTime, 10) 
						|| parseInt(temCurTime, 10) > parseInt(_sysEndTime, 10))
				{
					isLastIssue = true;
				}
			}
			
			if(!isLastIssue)
			{
				_isCloseTxt = 0;
				refreshIssue(); 	//取下一期参数  /**start**/
				refreshRateVal(); 	//取新赔率信息
			}
			//alert(4+":::"+_isCloseTxt)
			
			setTimeout("refreshLastIssue()", _resultSecond); //开奖
		}
		else//封盘时间到了
		{
			if(closeIntervalObj!=null)
			{
				clearInterval(closeIntervalObj);//停掉上一个定时器
			}
			_isCloseTxt = 1;
			closeTxt();//封盘  /**start**/
		}
	}
}

var _tipTimeNumNew = 0;
var closeTipIntervalObj;
function startPageInterval() //页面90秒定时器开关
{
	_tipTimeNumNew = _pageTimeNum;
	
	/*
	if(closeTipIntervalObj!=null)
	{
		clearInterval(closeTipIntervalObj);//停掉上一个定时器
	}
	closeTipIntervalObj = setInterval('setTipCountDownTime()', 1000);//启动页面定时器
	*/
	setTimeout("setTipCountDownTime()", 1000); //
}
function setTipCountDownTime()
{
	if(!isLastIssue)//过了最后一期的话需要把此刷新停止掉
	{
		document.getElementById("Update_Time").innerHTML = _tipTimeNumNew + "&nbsp;"+lang["32A.002"];//秒
		if(_tipTimeNumNew==1)
		{
			startPageInterval();//重新开启时间倒计时
			setTimeout("setTipLoading('Update_Time')", 500); //载入中...
			refreshRateVal();//重新取赔率 /**start**/
			return;
		}
		_tipTimeNumNew = _tipTimeNumNew - 1;
		
		setTimeout("setTipCountDownTime()", 1000); //
	}
	else
	{
		document.getElementById("Update_Time").innerHTML = "-&nbsp;";//停止页面刷新
	}
}
function setTipLoading(tagName)
{
	document.getElementById(tagName).innerHTML = "<span class='Font_B'>"+lang["32A.003"]+"</span>";//载入中...
}

var _soundObj = null;
function playSound() //开奖声音方法
{
	if(_soundObj==null)
		_soundObj = document.getElementById('sound_swf');
	
	_soundObj.innerHTML="<EMBED SRC='clarion.swf' LOOP='false' AUTOSTART='false' MASTERSOUND HIDDEN='true' WIDTH='0' HEIGHT='0'></EMBED>";
}
/**end**/

function setLoveDiv(isview) //遮罩层实现，暂无
{
	if(isview)
	{
		var pWidth = document.body.scrollLeft;
		var pHeight= document.body.scrollTop;
		if (document.body.offsetHeight)
		{
			//ns6 syntax 
			pWidth += document.body.scrollWidth;
			pHeight += document.body.offsetHeight;
		}
		else if (pTar.Document && pTar.Document.body.scrollHeight)
		{
			//ie5+ syntax 
			pWidth += document.body.scrollWidth;
			pHeight += document.body.scrollHeight;
		}
		document.getElementById("lovediv").style.height = pHeight+"px";
		document.getElementById("lovediv").style.width = pWidth+"px";
		document.getElementById("lovediv").style.display = "";
	}
	else
	{
		document.getElementById("lovediv").style.display = "none";
	}
}

var temTrObj;
function setShortcutType(type) //设置快速设定模式
{
	if(_isShortcut!=type)//有变化才需要执行
	{
		if(otherAjax==null)
			otherAjax  = new Bajax();
		
		temUrl = "set_shortcut_val.do?oper_type=SET_SHORTCUT&is_shortcut=" + type;
		otherAjax.post(temUrl, null, refreshShortcutCB, type);
	}
}

function refreshShortcutCB(req, type)
{
	var resultStr = req.responseText;
	
	if(resultStr.indexOf("%#A.E01%#") >= 0)
	{
		window.top.open('public/error.do?error=A.E01&forward='+_loginOutPage, '_self');
		return;
	}
	else
	{
		if(resultStr.indexOf("%1%##") >= 0)//已更新快捷模式
		{
			_isShortcut = type;//设置快捷模式
			
			if(type==1)//快捷
			{
				document.getElementById("span_shortcut_0").className = "shortcut_btn";
				document.getElementById("span_shortcut_1").className = "shortcut_btn_on";
				
				if(vShortcutList!=null && vShortcutList.length>0)
				{
					for(var s=0; s<vShortcutList.length; s++)
					{
						//if(document.getElementById(vShortcutList[s])!=null)
						    document.getElementById(vShortcutList[s]).style.display = "";
					}
				}
				if(hShortcutList!=null && hShortcutList.length>0)
				{
					for(var s=0; s<hShortcutList.length; s++)
					{
						if(document.getElementById(hShortcutList[s])!=null)
						  document.getElementById(hShortcutList[s]).style.display = "none";
					}
				}
				
				for(var i=0; i<zBallTagList.length; i++)
				{
					temTrObj = document.getElementById(zBallTagList[i]+".tr");
					temTrObj.className = "Ball_tr_H_h";
					temTrObj.setAttribute("isSeled", "0");
					
					document.getElementById(zBallTagList[i]+".rate_ks").style.display = "";
					document.getElementById(zBallTagList[i]+".rate_td").style.display = "none";
					document.getElementById(zBallTagList[i]+".money_td").style.display = "none";
				}
			}
			else//一般
			{
				document.getElementById("span_shortcut_0").className = "shortcut_btn_on";
				document.getElementById("span_shortcut_1").className = "shortcut_btn";
				
				if(vShortcutList!=null && vShortcutList.length>0)
				{
					for(var s=0; s<vShortcutList.length; s++)
					{
						//if(document.getElementById(vShortcutList[s])!=null)
						   document.getElementById(vShortcutList[s]).style.display = "none";
					}
				}
				if(hShortcutList!=null && hShortcutList.length>0)
				{
					for(var s=0; s<hShortcutList.length; s++)
					{
						if(document.getElementById(hShortcutList[s])!=null)
						   document.getElementById(hShortcutList[s]).style.display = "";
					}
				}
				
				for(var i=0; i<zBallTagList.length; i++)
				{
					document.getElementById(zBallTagList[i]+".tr").className = "Ball_tr_H";
					document.getElementById(zBallTagList[i]+".rate_ks").style.display = "none";
					document.getElementById(zBallTagList[i]+".rate_td").style.display = "";
					document.getElementById(zBallTagList[i]+".money_td").style.display = "";
				}
			}
		}
	}
}

function setKsSelTr(curObjtd, keyName) //设置单行快速设定样式
{
	var curObj=document.getElementById(keyName+".tr")
	if(_isCloseTxt==0 && _isShortcut==1)//快捷才有此设置
	{
		if(curObj.getAttribute("isClosed")!=null&&curObj.getAttribute("isClosed")==1){
			return;
		}
		if(curObj.getAttribute("isSeled")=="0")
		{
			curObj.setAttribute("isSeled", "1");
			curObj.className = "Ball_tr_H_h Ball_tr_H_bgc";
		}
		else
		{
			curObj.setAttribute("isSeled", "0");
			curObj.className = "Ball_tr_H_h";
		}
	}
}

//限制只能输入数字
var key = null;
function digitOnly(evt) 
{
	key = window.event ? evt.keyCode:evt.which;
	if (!(key>=48 && key<=57) )
	{
		if (evt && evt.preventDefault)
		{
			evt.preventDefault();
		}
		else
		{
			evt.returnValue=false;
		}
    }
}

function digitOnly_Up(evt, curObj)
{
	curObj.value = curObj.value.replace(/[^0-9\.]/g, '');
}

function TxtToBtnOrder(evt, curObj, tagName)
{
	if(tagName!=null)
	{
		key = window.event ? evt.keyCode:evt.which;
		if(key==13)//文本框按回车键跳到目标标签
		{
			document.getElementById(tagName).focus();
			if (evt && evt.preventDefault)
			{
				evt.preventDefault();
			}
			else
			{
				evt.returnValue=false;
			}
		}
	}
	curObj.value = curObj.value.replace(/[^0-9\.]/g, '');
}

function toStatePage()
{
	location = "../game/issue_state_tip.do?game_type="+gameType;
}


