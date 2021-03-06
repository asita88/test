
var Jeu_Order_Str=""; 	//下註串
var Order_Str = ""; 	//订单串

function confirm_Left_Order_Tip(tagName) //左侧下单确认框提示
{
	if(Jeu_Order_Str != "")
	{
		var Order_Str = ""; //订单串
		
		var tipHtml = "";
		var errorHtml = "";
		var stakeMin = "";
		var stakeMax = "";
		var proName = "";
		var ball = "";
		var proType = "";
		var ballProName = "";
		var keyName = "";
		var rateVal = "";
		var moneyVal = "";
		var totalMoney = 0;
		var totalCount = 0;
		var keyArr = null;
		var temArr = null;
		var tagNameArr = Jeu_Order_Str.substring(1, Jeu_Order_Str.length-1).split(")(");		
		for(var i=0; i<tagNameArr.length; i++)
		{
			keyName = tagNameArr[i];
			keyArr = keyName.split("-");
			
			var rateObj = document.getElementById(keyName + ".rate");
			if(rateObj!=null)
			{
				var moneyTdObj = document.getElementById(keyName + ".money_td");
				
				ball = keyArr[2]; //球号
				proType = keyArr[1]; //产品类型
				proName = moneyTdObj.getAttribute("proName");
				ballProName = moneyTdObj.getAttribute("ballProName");
				stakeMin = moneyTdObj.getAttribute("stakeMin");
				stakeMax = moneyTdObj.getAttribute("stakeMax");
				
				var moneyObj = document.getElementById(keyName + ".money");
				moneyVal = moneyObj.value;
				
				if(parseInt(moneyVal, 10) < parseInt(stakeMin, 10))
				{
					IsViewLimitTr(true);//显示限制条件
					
					errorHtml = lang["32A.004"]+"\n\n\n" //'下注金额' 低于单注最低限额，请更改。
							  + proName+"\n\n"
							  + lang["32A.006"]+"："+stakeMin+"\n" //单注最低限额
							  + lang["32A.007"]+"："+stakeMax+"\n";//单注最高限额
					
					alert(errorHtml);
					moneyObj.focus();
					return;
				}
				if(parseInt(moneyVal, 10) > parseInt(stakeMax, 10))
				{
					IsViewLimitTr(true);//显示限制条件
					
					errorHtml = lang["32A.005"]+"\n\n\n" //'下注金额' 超过单注最高限额，请更改。
							  + proName+"\n\n"
							  + lang["32A.006"]+"："+stakeMin+"\n"//单注最低限额
							  + lang["32A.007"]+"："+stakeMax+"\n";//单注最高限额
					
					alert(errorHtml);
					moneyObj.focus();
					return;
				}
				rateVal = rateObj.innerHTML;
				if(rateVal=="" || rateVal=="-" || parseFloat(rateVal) <= 0) //挡住赔率异常的情况
				{
					alert(lang["32A.022"]);//赔率不正确!
					return;
				}
				totalMoney += parseInt(moneyVal, 10);
				totalCount += 1;
				
				//order_info格式：ball1,ball2...;rate;stake@ball1;rate;stake....
				Order_Str += "@"+proType+";"+ball+";"+rateVal+";"+moneyVal+";0";//拼接下单串
				
				tipHtml += ballProName + " @ "+rateVal+" X ￥"+moneyVal+"\n";
			}
		}
		
		if(tipHtml!="")
		{
			tipHtml = getText(lang["32A.008"], new Array(totalMoney, totalCount)) + "\n\n\n" + tipHtml; //共 ￥ {0} / {1} 笔，确定下注吗？
			if(confirm(tipHtml))
			{
				//setLoveDiv(true);//弹出遮罩层
				Order_Str = Order_Str.substring(1);
				
				Order(Order_Str); //下单
			}
		}
		
		//清理数据
		tipHtml = "";
		errorHtml = "";
		stakeMin = "";
		stakeMax = "";
		proName = "";
		ball = "";
		proType = "";
		ballProName = "";
		keyName = "";
		rateVal = "";
		moneyVal = "";
		totalMoney = 0;
		totalCount = 0;
		keyArr = null;
		temArr = null;
		tagNameArr = null;
	}
	else
	{
		if(_isCloseTxt==1)//封盘
			alert(lang["32A.015"]);//當前已封盤,请稍候下单!
		else
			alert(lang["32A.009"]);//请填写下注金额！
		
		if(document.getElementById(tagName)!=null)
			document.getElementById(tagName).focus();
	}
}

function confirm_lm_Order_Tip(keyName)//连码左侧下注
{
	var moneyObj = document.getElementById(keyName + ".money");
	moneyVal = moneyObj.value;
	
	if(moneyVal != "")
	{
		var keyArr = keyName.split("-");
		var proType = keyArr[1]; //产品类型
		
		var stake = document.getElementById(keyName + ".stake").value;
		var stakeMin = document.getElementById(keyName + ".stakeMin").value;
		var stakeMax = document.getElementById(keyName + ".stakeMax").value;
		
		if(parseInt(moneyVal, 10) < parseInt(stakeMin, 10))
		{
			IsViewLimitTr(true);//显示限制条件
			
			errorHtml = getText(lang["32A.010"], new Array(stakeMin));//'下注金额' 低于单注最小限额（{0}），请更改。
			alert(errorHtml);
			moneyObj.focus();
			return;
		}
		if(parseInt(moneyVal, 10) > parseInt(stakeMax, 10))
		{
			IsViewLimitTr(true);//显示限制条件
			
			errorHtml = getText(lang["32A.011"], new Array(stakeMax));//'下注金额' 低于单注最高限额（{0}），请更改。
			alert(errorHtml);
			moneyObj.focus();
			return;
		}
		if(parseInt(moneyVal, 10) > parseInt(stake, 10))
		{
			errorHtml = lang["32A.012"];//'下注金额' 超过每组最高可下注限额，请更改!
			alert(errorHtml);
			moneyObj.focus();
			return;
		}
		var rateVal = document.getElementById(keyName + ".rate").innerHTML;
		if(rateVal=="" || rateVal=="-" || parseFloat(rateVal) <= 0) //挡住赔率异常的情况
		{
			alert(lang["32A.022"]);//赔率不正确!
			return;
		}
		var ball = document.getElementById(keyName + ".ball").value;
		var group = document.getElementById(keyName + ".group").value;
		
		var tipHtml = lang["32A.013"];//确定下注吗？
		if(confirm(tipHtml))
		{
			//setLoveDiv(true);//弹出遮罩层
			//order_info格式：ball1,ball2...;rate;stake@ball1;rate;stake....
			var Order_Str = proType+";"+ball+";"+rateVal+";"+moneyVal+";"+group;//拼接下单串
			Order(Order_Str); //下单
		}
	}
	else
	{
		if(_isCloseTxt==1)//封盘
			alert(lang["32A.015"]);//當前已封盤,请稍候下单!
		else
			alert(lang["32A.009"]);//请填写下注金额！
		
		moneyObj.focus();
	}
}

function resetOrder()//左侧确认下注
{
	var Order_Str = document.getElementById("reset_order_str").value;
	
	if(Order_Str!="")
	{
		Order(Order_Str); //下单
	}
}

function confirm_Order_Tip(type) //下单确认框提示
{
	if(_isCloseTxt==1)//封盘
	{
		alert(lang["32A.015"]);//當前已封盤,请稍候下单!
	}
	else
	{
		var ksMoneyVal = "";
		if(_isShortcut=="1")//快捷
		{
			var temObj = document.getElementById("shortcut_money_"+type);
			ksMoneyVal = temObj.value;
			if(ksMoneyVal=="")
			{
				alert(lang["32A.009"]);//请填写下注金额！
				temObj.focus();
				return;
			}
		}
		var divWidth = 408;
		var divHeight = 120;
		var groupHtml = "";
		var tipHtml = "";
		var errorHtml = "";
		var stakeMin = "";
		var stakeMax = "";
		var proName = "";
		var ball = "";
		var proType = "";
		var ballProName = "";
		var keyName = "";
		var rateVal = "";
		var moneyVal = "";
		var totalMoney = 0;
		var totalCount = 0;
		var keyArr;
		var temArr;
		var moneyObj;
		var moneyTdObj;
		Order_Str="";
		for(var i=0; i<zBallTagList.length; i++)
		{
			keyName = zBallTagList[i];
			
			if(_isShortcut=="1")
			{
				temTrObj = document.getElementById(keyName+".tr");
				if(temTrObj.getAttribute("isSeled")=="0")//未选中的情况，继续下一步
				{
					continue;
				}
				moneyVal = ksMoneyVal;
			}
			else
			{
				moneyObj = document.getElementById(keyName + ".money");
				moneyVal = moneyObj.value;
				
				if(moneyVal=="")
				{
					continue;
				}
			}
			keyArr = keyName.split("-");
			ball = keyArr[2]; //球号
			proType = keyArr[1]; //产品类型
			
			temArr = gProTypeMap[proType];
			stakeMin = temArr[1];//单注最小
			stakeMax = temArr[2];//单注最大
			
			moneyTdObj = document.getElementById(keyName + ".money_td");
			proName = moneyTdObj.getAttribute("proName");
			ballProName = moneyTdObj.getAttribute("ballProName");
			
			if(parseInt(moneyVal, 10) < parseInt(stakeMin, 10))
			{
				errorHtml = lang["32A.004"]+"\n\n\n" //'下注金额' 低于单注最低限额，请更改。
						  + proName+"\n\n"
						  + lang["32A.006"]+"："+stakeMin+"\n" //单注最低限额
						  + lang["32A.007"]+"："+stakeMax+"\n";//单注最高限额
				
				alert(errorHtml);
				
				if(_isShortcut=="1")//快捷
					document.getElementById("shortcut_money_"+type).focus();
				else
					moneyObj.focus();
				
				return;
			}
			if(parseInt(moneyVal, 10) > parseInt(stakeMax, 10))
			{
				errorHtml = lang["32A.005"]+"\n\n\n" //'下注金额' 超过单注最高限额，请更改。
						  + proName+"\n\n"
						  + lang["32A.006"]+"："+stakeMin+"\n"//单注最低限额
						  + lang["32A.007"]+"："+stakeMax+"\n";//单注最高限额
				
				alert(errorHtml);
				
				if(_isShortcut=="1")//快捷
					document.getElementById("shortcut_money_"+type).focus();
				else
					moneyObj.focus();
				
				return;
			}
			rateVal = document.getElementById(keyName + ".rate").innerHTML;
			if(rateVal=="" || rateVal=="-" || parseFloat(rateVal) <= 0) //挡住赔率异常的情况
			{
				alert(lang["32A.022"]);//赔率不正确!
				return;
			}
			totalMoney += parseInt(moneyVal, 10);
			totalCount += 1;
			
			//order_info格式：ball1,ball2...;rate;stake@ball1;rate;stake....
			Order_Str += "@"+proType+";"+ball+";"+rateVal+";"+moneyVal+";0";//拼接下单串
			
			tipHtml += ballProName + " @ "+rateVal+" X ￥"+moneyVal+"\n";
			
			/*
			tipHtml += "<tr class='w_Ball_tr_H'>"
					+  "<td class='w_Jut_caption_1'>"+ballProName+"</td>"
					+  "<td class='w_Jut_caption_1'>"+rateVal+"</td>"
					+  "<td class='w_Jut_caption_1'>"+moneyVal+"</td>"
					+  "</tr>";
			
			divHeight += 28;
			*/
		}
		
		if(totalCount>0)
		{
			tipHtml = getText(lang["32A.008"], new Array(totalMoney, totalCount))+"\n\n\n" + tipHtml;
			
			if(confirm(tipHtml))
			{
				//setLoveDiv(true);//弹出遮罩层
				Order_Str = Order_Str.substring(1);
				
				Order(Order_Str); //下单
			}
			
			/*
			Order_Str = Order_Str.substring(1);
			
			tipHtml = "<table class='w_Ball_List' border='0' cellspacing='1' cellpadding='0' width='98%'>"
				+  "<tbody>"
				+  "<tr>"
				+  "<td class='w_td_caption_1' width='40%'>"+lang["32A.016"]+"</td>"
				+  "<td class='w_td_caption_1' width='30%'>"+lang["32A.017"]+"</td>"
				+  "<td class='w_td_caption_1' width='30%'>"+lang["32A.018"]+"</td>"
				+  "</tr>"
				+  tipHtml
				+  "</tbody>"
				+  "</table>";
			
			groupHtml = "<table class='w_Ball_List' border='0' cellspacing='1' cellpadding='0' width='98%'>"
				+  "<tbody>"
				+  "<tr class='w_Ball_tr_H'>"
				+  "<td class='w_Jut_caption_1' width='40%'>"+lang["32A.019"]+"："+totalCount+"</td>"
				+  "<td class='w_Jut_caption_1' width='60%'>"+lang["32A.020"]+"："+totalMoney+"</td>"
				+  "</tr>"
				+  "</tbody>"
				+  "</table>";
			
			if(divHeight>345)
			{
				divHeight = 345;
			}
			//弹出下单div
			ShowOrderDiv(lang["32A.021"], tipHtml, groupHtml, divWidth, divHeight, localType=="LEFT"?true:false);
			*/
		}
		else if(_isShortcut=="0")
		{
			alert(lang["32A.009"]);//请填写下注金额！
		}
		
		//清理垃圾
		ksMoneyVal = "";
		divWidth = null;
		divHeight = null;
		groupHtml = "";
		tipHtml = "";
		errorHtml = "";
		stakeMin = "";
		stakeMax = "";
		proName = "";
		ball = "";
		proType = "";
		ballProName = "";
		keyName = "";
		rateVal = "";
		moneyVal = "";
		totalMoney = 0;
		totalCount = 0;
		keyArr=null;
		temArr=null;
		moneyObj=null;
		moneyTdObj=null;
	}
}

function DivConfirmOrder()
{
	Order(Order_Str);
}

function Order(orderStr)//下单
{
	if(_isCloseTxt==1)//封盘
	{
		alert(lang["32A.015"]);//當前已封盤,请稍候下单!
	}
	else
	{
		if(orderStr == "")
	    {
			alert(lang["32A.009"]);//请填写下注金额！
	    	return;
	    }
		var attach = Math.floor(Math.random()*1000)+""+Math.floor(Math.random()*1000);

		var url = 'orderServlet?oper_type=ORDER&game_type=' + gameType 
				+ '&issue_id=' + curIssueID
				+ '&order_info=' + orderStr
			    + '&order_attach=' + attach;
		
		(new Bajax()).post(url, null, orderCB);
	}
}

function orderCB(req)//下单返回消息
{
	var returnVal = req.responseText;
    
    //alert(returnVal)
    if(returnVal.indexOf('ORDER_SUCCESS') == 0) //下单成功
    {
    	Order_Str = "";
    	
    	if(localType=="LEFT")
		{
    		parent.frames["mainFrame"].document.getElementById("btn_order_tr").style.display = "";
    		parent.frames["mainFrame"].document.getElementById("btn_order_hid_tr").style.display = "none";
    		if(returnVal.indexOf('ORDER_SUCCESS#1') == 0){
    			parent.frames["mainFrame"].refreshRateVal();
    		}
		}
    	else
		{
    		eliminate_jeu();//清空文本框
    		
    		document.getElementById("btn_order_tr").style.display = "";
    		document.getElementById("btn_order_hid_tr").style.display = "none";
    		if(returnVal.indexOf('ORDER_SUCCESS#1') == 0){
    			refreshRateVal();
    		}
		}
    	//parent.frames["leftFrame"].location = "left_order_tip.do?is_success=1&issue_id="+curIssueID+"&game_type="+gameType; //下单提示界面
    }
    else if(returnVal.indexOf('ORDER_ERROR') == 0) //下单失败
	{
    	if(localType=="LEFT")
		{
    		parent.frames["mainFrame"].document.getElementById("btn_order_tr").style.display = "none";
    		parent.frames["mainFrame"].document.getElementById("btn_order_hid_tr").style.display = "";    		
    		parent.frames["mainFrame"].refreshRateVal();
    		
		}
    	else
		{
    		eliminate_jeu();//清空文本框
    		
    		document.getElementById("btn_order_tr").style.display = "none";
    		document.getElementById("btn_order_hid_tr").style.display = "";    		
    		refreshRateVal();
    		
		}
    	//parent.frames["leftFrame"].location = "left_order_tip.do?is_success=0&issue_id="+curIssueID+"&game_type="+gameType; //下单提示界面
	}
}

//增、减下註串
function ADD_Jeu_S(t_this) 
{
	var t_Str = Jeu_Order_Str;
	
	var t_Name = t_this.id;
	t_Name = "(" + t_Name.substr(0,(t_Name.length-6)) + ")";
	Jeu_Order_Str=t_Str.replace(t_Name,"");//减
	
	if (t_this.value!="") {
		if (eval(t_this.value)==0) {
			t_this.value="";
		} else {
			Jeu_Order_Str+=t_Name;//增
		}
	}
}

//清空下註串
function eliminate_jeu()
{
	if(pageType=="LM")
	{
		eliminate_jeu_lm();
	}
	else
	{
		Order_Str = ""; 	//清空订单串
		
		/*
		if(Jeu_Order_Str != "")
		{
			Jeu_Order_Str = Jeu_Order_Str.substring(1, Jeu_Order_Str.length-1);
			
			var tagNameArr = Jeu_Order_Str.split(")(");
			for(var i=0; i<tagNameArr.length; i++)
			{
				var keyName = tagNameArr[i];
				
				document.getElementById(keyName + ".money").value = "";
			}
			Jeu_Order_Str = "";
		}
		*/
		if(_isCloseTxt==0)//未封盘才需要做
		{
			for(var i=0; i<zBallTagList.length; i++)
			{
				curIdName = zBallTagList[i];
				
				temTrObj = document.getElementById(curIdName+".tr");
				temTrObj.setAttribute("isSeled", "0");
				if(_isShortcut=="1")
					temTrObj.className = "Ball_tr_H_h";
				else
					temTrObj.className = "Ball_tr_H";
				
				document.getElementById(curIdName+".money").value = "";
			}
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

//左侧下单限制条件提示
function IsViewLimitTr(isView)
{
	if(isView)
	{
		document.getElementById("min_limit_tr").style.display = "";
		document.getElementById("max_limit_tr").style.display = "";
		document.getElementById("ball_limit_tr").style.display = "";
		document.getElementById("issue_limit_tr").style.display = "";
	}
	else
	{
		document.getElementById("min_limit_tr").style.display = "none";
		document.getElementById("max_limit_tr").style.display = "none";
		document.getElementById("ball_limit_tr").style.display = "none";
		document.getElementById("issue_limit_tr").style.display = "none";
	}
}
