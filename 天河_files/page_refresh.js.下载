
var _refreshSedcond = 1000;
var _noGetMax = 100;
var _noGetCount1 = 0;
var _noGetCount2 = 0;
var _noGetCount3 = 0;

/**start**/
function refreshLastIssue() //刷新开奖结果
{
	if(lastIssueAjax==null)
		lastIssueAjax  = new Bajax();
	
	var url = "get_issue_data.do?oper_type=GET_RESULT&game_type="+gameType+"&issue_id="+lastIssueID;
	lastIssueAjax.post(url, null, refreshLastIssueCB);
}

var awardArr;
function refreshLastIssueCB(req) //刷新开奖回调函数
{
	var resultStr = req.responseText;
	if(resultStr.indexOf("%#A.E01%#") >= 0)
	{
		window.top.open('public/error.do?error=A.E01&forward='+_loginOutPage, '_self');
		return;
	}
	else
	{
		var topage = false;
		if(resultStr.indexOf("%1%##") >= 0)//更新开奖结果
		{
			_noGetCount1 = 0;
			
			var resultList = resultStr.split("##");
			
			//	      是否更新  #0#   今日盈亏  # 最近一期的期数  # 最近一期的结算天  # 最近一期的结果
			//	     0     1       2          3                4                5       
			
			if(lastIssueID!="")
			{
				playSound();//开奖声音
				
				parent.frames["leftFrame"].resetAbleMoney();//刷新左侧可用金额
				if(document.getElementById("Foot_Div")!=null)
				{
					refreshFootResult();  	//刷新底部排行
				}
				if(document.getElementById("Result_Top_Div")!=null)
				{
					refreshResultTop(); 	//刷新排行榜
				}
			}
			lastIssueID = resultList[3];
			document.getElementById("UserSurplus").innerHTML = resultList[2];//今日盈亏
			document.getElementById("Cur_Award_Issue").innerHTML = resultList[3];//期数
			
			if(resultList[6]!="")
			{
				userSet = resultList[6];//给最新的盘口
			}
			
			//alert(resultList[5])
			//设定结果
			if(resultList[5]!=null && resultList[5]!="")
			{
				awardArr = resultList[5].split(",");
				for(var i=0; i<awardArr.length; i++)
				{
					document.getElementById("BaLL_No"+(i+1)).className = "No_"+awardArr[i];
				}
			}
			
			if(parseInt(resultList[1],10) - parseInt(lastIssueID,10)==2)
			{
				setTimeout("refreshLastIssue()", _resultSecond); //初始化页面时处于未开奖状态，且不属于封盘的情况
			}
			
			topage = true;
		}
		else
		{
			if(_noGetCount1 <= _noGetMax)//无取到开奖结果
			{
				_noGetCount1++;
				setTimeout("refreshLastIssue()", _resultSecond); //开奖
			}
			else
			{
				topage = true;
			}
		}
		
		if(isLastIssue && topage)
		{
			setTimeout("toStatePage()", 60000); //一分钟后跳转
		}
	}
}

function refreshIssue() //刷新当前期数
{
	if(issueAjax==null)
		issueAjax  = new Bajax();
	
	var url = "get_issue_data.do?oper_type=GET_ISSUE&game_type="+gameType+"&issue_id="+curIssueID;
	issueAjax.post(url, null, refreshIssueCB);	
}

function refreshIssueCB(req) //刷新期数回调函数
{
	var resultStr = req.responseText;
	if(resultStr.indexOf("%#A.E01%#") >= 0)
	{
		window.top.open('public/error.do?error=A.E01&forward='+_loginOutPage, '_self');
		return;
	}
	else
	{
		if(resultStr.indexOf("%1%##") >= 0)//更新下一期数据
		{
			_noGetCount2 = 0;
			
			var resultList = resultStr.split("##");
			
			//	       是否更新#0# 当前期数 # 服务器当前时间 # 开盘时间 # 距收盘几秒 # 营业时间(分钟)# 开始营业时间 #  结束营业时间
			//        0    1     2            3           4         5           6               7             8
			
			curIssueID = resultList[2];
			document.getElementById("Cur_Issue").innerHTML = resultList[2];//期数
			
			setOpenServelMsTime(resultList[3], resultList[4], parseInt(resultList[6],10));//设定距離開獎
			setCloseServelMsTime(resultList[3], resultList[4], parseInt(resultList[6],10), parseInt(resultList[5],10));//设定距離封盤
		}
		else
		{
			if(_noGetCount2 <= _noGetMax)//无更新期数
			{
				_noGetCount2++;
				setTimeout("refreshIssue()", _refreshSedcond); //开奖
			}
		}
	}
}
/**end**/

function refreshRateVal() //刷新最新赔率信息
{
	if(rateAjax==null)
		rateAjax  = new Bajax();
	
	if(_isCloseTxt==0)//如果封盘状态不需要取赔率
	{
		var url = "get_"+gameType.toLowerCase()+"_rate_data.do?oper_type=GET_"+pageType+"_RATE&game_type="+gameType+"&issue_id="+curIssueID+"&user_set="+userSet+"&ball_idx="+ballIdx+"&is_detail_rate="+isDetailRate;
		rateAjax.post(url, null, refreshRateValCB);
	}
}

var rateTdObj;
var rateKsObj;
var moneyTdObj;
var moneyObj;
var trObj;
var radioObj;
var temList;
var temArr;
var rateList;
var isView = "";
var rateVal = "";
var keyStr = "";
var rateHtml = "";
var moneyHtml = "";
var gProTypeMap = {};//产品类型属性参数

function refreshRateValCB(req) //刷新最新赔率信息回调函数
{
	var resultStr = req.responseText;
	
	if(resultStr.indexOf("%#A.E01%#") >= 0)
	{
		window.top.open('public/error.do?error=A.E01&forward='+_loginOutPage, '_self');
		return;
	}
	else
	{
		if(resultStr.indexOf("%1%##") >= 0)//更新赔率
		{
			_noGetCount3 = 0;
			
			//	      是否更新  # type上参数  #   赔率
			//        0         1           2    
			var resultList = resultStr.split("##");
			
			if(resultList[1]!=null && resultList[1]!="")
			{
				temList = resultList[1].split("%%");
				for(var i=0; i<temList.length; i++)
				{
					temArr = temList[i].split(";");
					gProTypeMap[temArr[0]] = temArr;
				}
				//zProType,stakeMin,stakeMax,ballMax,issueMax,winMax
				//   0        1         2        3       4       5
			}
			
			if(resultList[2]!=null && resultList[2]!="")
			{
				keyStr = ""; //proType - ball
				rateHtml = "";
				moneyHtml = "";
				
				isView = "0";
				rateVal = "";
				rateList = resultList[2].split("%%");
				
				if(pageType=="LM")//连码  特殊
				{
					for(var i=0; i<rateList.length; i++)
					{
						temArr = rateList[i].split(";");
						keyStr 	= temArr[0];
						isView 	= temArr[1];
						rateVal = temArr[2];
						
						rateTdObj = document.getElementById("radio-" + keyStr + ".rate_td");
						if(rateTdObj!=null)
						{
							radioObj = document.getElementById("radio-"+keyStr);
							
							if(isView=="1")
							{
								rateTdObj.innerHTML = "<span id='"+gameType+"-"+keyStr+".rate' class='multiple_Red'>"+rateVal+"</span>";
								radioObj.style.display = "";
							}
							else
							{
								rateTdObj.innerHTML = "<span class='multiple_Red'>-</span>";
								radioObj.style.display = "none";
							}
						}
					}
				}
				else //公用
				{
					for(var i=0; i<rateList.length; i++)
					{
						temArr = rateList[i].split(";");
						keyStr 	= temArr[0];
						isView 	= temArr[1];
						rateVal = temArr[2];
						
						rateTdObj = document.getElementById(gameType + "-" + keyStr + ".rate_td");
						if(rateTdObj!=null)
						{
							moneyTdObj = document.getElementById(gameType + "-" + keyStr + ".money_td");
							rateKsObj = document.getElementById(gameType + "-" + keyStr + ".rate_ks");
							trObj = document.getElementById(gameType + "-" + keyStr + ".tr");
							
							if(isView=="1")
							{
								rateKsObj.innerHTML = rateVal;//快速栏位的赔率
								
								rateHtml = "<a onfocus='this.blur()' title='"+zTipStr+"' onclick='Left_Jeu(\""+gameType+"-"+keyStr+"\")' href='javascript:void(0)'>"
						 		 		 + "<span id='"+gameType+"-"+keyStr+".rate' class='multiple_Red'>"+rateVal+"</span>"
						 		 		 + "</a>";
								
								moneyObj = document.getElementById(gameType + "-" + keyStr + ".money");
								if(moneyObj==null)//避免文本框已经有填值被刷新替换掉
								{
									moneyTdObj.innerHTML = "<input type='text' id='"+gameType+"-"+keyStr+".money' name='"+gameType+"-"+keyStr+".money' onblur=\"this.className='inp1';\" class='inp1' onfocus=\"this.className='inp1m'\" onkeypress='digitOnly(event)' onkeyup='digitOnly_Up(event,this)' maxlength='9' size='6' />";
								}
								trObj.setAttribute("isClosed", "0");
							}
							else
							{
								rateKsObj.innerHTML = "-";//快速栏位的赔率
								
								rateHtml = "<span class='multiple_Red'>-</span>";
								moneyTdObj.innerHTML = zTxtStr; //封盘
								
								//封盘时，快速下单已选中要回置
								trObj.setAttribute("isSeled", "0");
								trObj.className = "Ball_tr_H_h";
								trObj.setAttribute("isClosed", "1");
							}
							rateTdObj.innerHTML = rateHtml;
						}
					}
				}
			}
		}
		else
		{
			if(_noGetCount3 <= _noGetMax)//无更新赔率
			{
				_noGetCount3++;
				setTimeout("refreshRateVal()", _refreshSedcond);
			}
		}
	}
}

function refreshFootResult() //刷新Foot结果
{
	if(otherAjax==null)
		otherAjax  = new Bajax();
	
	var url = "get_"+gameType.toLowerCase()+"_result_data.do?oper_type=GET_"+pageType+"_RESULT&game_type="+gameType+"&ball_idx="+ballIdx;
	otherAjax.post(url, null, refreshFootResultCB);
}

function refreshFootResultCB(req) //刷新Foot结果回调函数
{
	var resultStr = req.responseText;
	if(resultStr.indexOf("%#A.E01%#") >= 0)
	{
		window.top.open('public/error.do?error=A.E01&forward='+_loginOutPage, '_self');
		return;
	}
	else
	{
		resultStr = resultStr.substr(resultStr.indexOf("<"));
		document.getElementById("Foot_Div").innerHTML = resultStr;
	}
}

function refreshFootZHResult() //刷新Foot_ZH_DIV结果
{
	if(otherAjax==null)
		otherAjax  = new Bajax();
	
	var url = "get_"+gameType.toLowerCase()+"_result_data.do?oper_type=GET_"+pageType+"_RESULT&game_type="+gameType+"&ball_idxs="+ballIds;
	otherAjax.post(url, null, refreshFootZHResultCB);
}

function refreshFootZHResultCB(req) //刷新Foot_ZH_DIV结果回调函数
{
	var resultStr = req.responseText;
	if(resultStr.indexOf("%#A.E01%#") >= 0)
	{
		window.top.open('public/error.do?error=A.E01&forward='+_loginOutPage, '_self');
		return;
	}
	else
	{
		resultStr = resultStr.substr(resultStr.indexOf("<"));
		document.getElementById("Foot_Div").innerHTML = resultStr;
	}
}

function refreshResultZHDIV(id)
{
	
	if(otherAjax==null)
		otherAjax  = new Bajax();
	
	var url = "get_"+gameType.toLowerCase()+"_result_data.do?oper_type=GET_"+pageType+"_RESULT&game_type="+gameType+"&ball_idxs="+id;
	otherAjax.post(url, null, refreshFootResultCB);
}

function refreshResultTop() //刷新排行榜
{
	if(otherAjax==null)
		otherAjax  = new Bajax();
	
	var url = "get_result_top_data.do?oper_type=GET_"+pageType+"_RESULT&game_type="+gameType+"&ball_idx="+ballIdx;
	otherAjax.post(url, null, refreshResultTopCB);
}

function refreshResultTopCB(req) //刷新排行榜回调函数
{
	var resultStr = req.responseText;
	if(resultStr.indexOf("%#A.E01%#") >= 0)
	{
		window.top.open('public/error.do?error=A.E01&forward='+_loginOutPage, '_self');
		return;
	}
	else
	{
		resultStr = resultStr.substr(resultStr.indexOf("<"));
		document.getElementById("Result_Top_Div").innerHTML = resultStr;
	}
}
