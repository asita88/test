// JavaScript Document
/***********************************************************************************************
*function isNumber(str) 判断是否是整型数据 str是传入元素的值
*function trim(strText) 去掉前后空字符 strText是传入元素的值
*function IsDemical(AValue, Afrac) //判断是否是小数，直到确定多少位 AValue是传入元素的值, Afrac是小数位数,可以为负
*function GoPage(id, formName, jspName)//转到第几页//ID是到第几页//formName是form的id//jspName是跳转的页面名称
*function isDate(AFormat, AValue)//判断输入是否是日期型AFormat日期样式，目前只能是"yyyymmdd",AValue是需要检测的值
*function OpenWindow(ALuJing)  打开新窗口，ALuJing 是路径，传入字符串
*function HideObj(AName)隐藏对象，传入字符串


//function GoPage(id, formName, jspName)
/*
 if (!IsDemical(sProjectNum, 3))
   {
     window.alert("计划量请输入数字,注意小数位最多为三位!");
	 form.ProjectNum.focus();
	 form.ProjectNum.select();
	 form.Submit.disabled = false;
	 return;
   }

//捕获页面的keydown事件
document.onkeydown=keyListener;

function keyListener()
{
  //屏蔽 Ctrl+n
  if (event.ctrlKey && event.keyCode==78)
  {
     event.returnValue=false;
  }

  try
  {

   //回车键
    if(event.keyCode==13 && event.srcElement.type.toLowerCase()!='textarea' && event.srcElement.type.toLowerCase()!='button' && event.srcElement.type.toLowerCase()!='submit' && event.srcElement.type.toLowerCase()!='reset' && event.srcElement.type!='')
    {
      if(event.srcElement.submitButton != null)
      {
        var submitButton=event.srcElement.submitButton;
        var obj=document.getElementById(submitButton);
        if(obj.type == 'submit' || obj.type == 'button')
        {
          obj.focus();
        }
      }
      else
      {
        event.keyCode=9;
      }
    }
  }
  catch (e)
  {
  }
}
*/
//***********************************************************************************************
document.onkeydown = function(evt)
{
  catchKeyDown(evt);
}
//***********************************************************************************************
function catchKeyDown(evt)
{
    var isIe = (document.all) ? true : false;
    evt = (evt) ? evt : ((window.event) ? window.event : "");
    var key = isIe ? evt.keyCode : evt.which;
    
    if (evt.keyCode == 13)
    {
        var el = evt.srcElement || evt.target;
        //tab_on_off=0 为不要跳转的对象          
        if (el.tab_on_off != "0" && el.type != undefined && el.type.toLowerCase() != 'textarea'
            && el.type.toLowerCase() != 'button' && el.type.toLowerCase() != 'submit' && el.type.toLowerCase() != 'hidden'
            && el.type.toLowerCase() != 'reset' && el.type != '')
        {
            if (isIe)
            {   
                if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9.")
                { 
                    //如果你使用框架，则一定有更好的提取表单元素的方法
                    try
                    {
                        var inputs = el.form.elements;
                        var idx = -1;

                        for (var i = 0; i < inputs.length; i++)
                        {
                            //alert(inputs[i].tabIndex+"  "+inputs[i].name);
                            if (el.type.toLowerCase() == 'radio' && el.name == inputs[i].name)
                            {
                                idx = i + document.getElementsByName(el.name).length - 1;
                                break;
                            }
                            else if (inputs[i] == el)
                            {
                                idx = i;
                                break;
                            }
                        }

                        if (idx >= 0 && idx < inputs.length)
                        {
                            if (evt.preventDefault) 
                            { 
                               evt.preventDefault(); 
                            } 
                            else 
                            { 
                               evt.returnValue = false; 
                            }

                            for (var i = idx + 1; i < inputs.length; i++)
                            {
                                if (inputs[i].type.toLowerCase() == 'radio')
                                {
                                    if (inputs[i].checked == true)
                                    {
                                        inputs[i].focus();
                                        break;
                                    }
                                }
                                else if (inputs[i].type.toLowerCase() != 'hidden')
                                {
                                    inputs[i].focus();
                                    break;
                                }
                            }
                        }
                    }
                    catch(e)
                    {
                    }
                }else if(document.documentMode==10)
                {  
                	 nextCtl(el).focus();
                }
                else
                {   
                	evt.keyCode = 9;
                }
            }
            else
            {
                nextCtl(el).focus();
                evt.preventDefault();
            }
        }
    }
}
//***********************************************************************************************
function nextCtl(ctl) 
{
  var form = ctl.form;
  
  for (var i = 0; i < form.elements.length - 1; i++)
  {
    if(ctl == form.elements[i])    
    {
      return form.elements[i + 1];
    }
  }
  return ctl;
}
//***********************************************************************************************
//打开新窗口
function OpenWindow(AWindowName,APath){
	var iWidth = 780;
	var iHeight = 520;
	if (screen.width >= 1024){
		iWidth = 900;
		iHeight = 600;
	}
	var newWindowNo = Math.random();
   	var fTemp = newWindowNo * 100;
   	var i = Math.round(fTemp);
	if (APath != "")
  	window.open(APath,AWindowName,"toolbar=no, status = yes,width="+iWidth+", height="+ iHeight +",left=0,top=0, scrollbars=yes, resizable = 1");
}
//判断输入是否是日期型
function isDate(AFormat, AValue){
	var iAddSubWei = 0, iYYYY = -1, iMM = -1 , iDD = -1, iPos = -1;
	var sConvertedStr, sYYYY, sMM, sDD;
	//格式搜索
	iPos = AFormat.indexOf("yyyy");
	if (iPos > -1){
		iYYYY = iPos;
	}
	iPos = AFormat.indexOf("mm");
	if (iPos > -1){
		iMM = iPos;
	}
	iPos = AFormat.indexOf("dd");
	if (iPos > -1){
		iDD = iPos;
	}
	//判断长度是否相等
	if ((AFormat.length+iAddSubWei) != AValue.length){
		return false;
	}
	var dTest = new Date();
	var iTemp, iDay;
	//判断年
	if (iYYYY > -1){
		sYYYY = AValue.substring(iYYYY, iYYYY+4);

		iTemp = parseInt(sYYYY);
		if ((iTemp < 1900) || (iTemp > 2070))
			return false;
		dTest.setYear(iTemp);
	}
	//判断月
	if (iMM > -1){
		sMM = AValue.substring(iMM, iMM+2);
		iTemp = parseInt(sMM, 10);
		if ((iTemp < 1) || (iTemp > 12))
			return false;
		dTest.setMonth(iTemp - 1);
		dTest.setDate(40);
		iDay = dTest.getDate();
		iDay = 40 - iDay;
		//判断天
		sDD = AValue.substring(iDD, iDD+2);
		iTemp = parseInt(sDD,10);
		if ((iTemp < 1) || (iTemp > iDay)){
			return false;
		}
	}
	return true;
}

//字符串替换
function replace(inputString, fromString, toString) {
   var temp = inputString;
   if (fromString == "") {
      return inputString;
   }
   if (toString.indexOf(fromString) == -1) {
      while (temp.indexOf(fromString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }
   } else {
      var midStrings = new Array("~", "`", "_", "^", "#");
      var midStringLen = 1;
      var midString = "";
      while (midString == "") {
         for (var i=0; i < midStrings.length; i++) {
            var tempMidString = "";
            for (var j=0; j < midStringLen; j++) { tempMidString += midStrings; }
            if (fromString.indexOf(tempMidString) == -1) {
               midString = tempMidString;
               i = midStrings.length + 1;
            }
         }
      }
      while (temp.indexOf(fromString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + midString + toTheRight;
      }
      while (temp.indexOf(midString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(midString));
         var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }
   }
   return temp;
}

//替换所有
function replaceAll(strOrg,strFind,strReplace)
{
  var index = 0;
  while(strOrg.indexOf(strFind,index) != -1)
  {
    strOrg = strOrg.replace(strFind,strReplace);
    index = strOrg.indexOf(strFind,index);
  }
  return strOrg;
}

//判断是否是整型数据
 function isNumber(str){
  if (str.length == 0) return true;
  for(var loc = 0; loc < str.length; loc++)
  {
     if ((str.charAt(loc)< "0") || (str.charAt(loc) > "9"))
	 return false;
  }
  return true;
}
//限制整数输入位数
function limiNum(num1,num2){
   num = num2 == "" ? "0" : num2;
   n1 = num1.length;        //实际输入数字的位数
   n2 = parseInt(num,10);   //整数的位数
   if(n1>n2){
     return false;
   }
   return true;
}
//去掉前后空字符
function trim(strText){
  while(strText.substring(0,1) == " ")
    strText = strText.substring(1, strText.length);
  while (strText.substring(strText.length-1, strText.length)== " ")
    strText = strText.substring(0, strText.length - 1);
  return strText;
}
function RightFill(AStrValue, ALength, ACharFill)
{
  if (AStrValue.length > ALength) return AStrValue.substring(0, 9);
  var ilast = ALength - AStrValue.length;
  var sResult = AStrValue;
  for (var i = 1; i <= ilast; i++)
  {
    sResult = sResult + ACharFill;
  }
  return sResult;
}
//判断是否是小数，直到确定多少位，可以为负
function IsDemical(AValue, Afrac)
{
  if (AValue.length == 0)
    return true;
  var bInDot = false;
  for (var i=0; i < AValue.length; i++)
  {
     //只运行一个小数点
    if (AValue.charAt(i) == ".")
	{
	   if (bInDot)
	     return false;
	   else
	   {
	      bInDot = true;
		  //小数位只允许两位
		  //alert(i);
		  //alert(AValue.length);
		  if ((AValue.length-i)>(Afrac+1))
		   return false;
	    }
	}
	else if (AValue.charAt(i) == "-")
	{
	   if (i != 0)
	     return false;
	}
	else if (((AValue.charAt(i) <"0") || (AValue.charAt(i) >"9")))
	  return false;
  }
  return true;
}
//判断是否是小数，直到确定多少位,不可以为负
function IsNegDemical(AValue, Afrac)
{
  if (AValue.length == 0)
    return true;
  var bInDot = false;
  for (var i=0; i < AValue.length; i++)
  {
     //只运行一个小数点
    if (AValue.charAt(i) == ".")
	{
	   if (bInDot)
	     return false;
	   else
	   {
	      bInDot = true;
		  //小数位只允许两位
		  //alert(i);
		  //alert(AValue.length);
		  if ((AValue.length-i)>(Afrac+1))
		   return false;
	    }
	}
	else if (((AValue.charAt(i) <"0") || (AValue.charAt(i) >"9")))
	  return false;
  }
  return true;
}
//判断单选不能为空；false:  空
  function isRadioChecked(whichRadio){
		var which=whichRadio;
		if(which==null){
			//不存在这个元素
		}
		else if(which.length==null)  {
			//只存在一个,可以用which.checked
			return which.checked;
		}
		else{
			//loginType是一个数组,要遍历which[i].checked
			for(var i=0;i<which.length;i++){
				if(which[i].checked){
					return true;
				}
			}
		}
		return false;
  }

//转换为大写钱
function floatToMoneyCN(n) 
{
	var strOutput = "";
    var strUnit = lang["N.011"];//千百拾亿千百拾万千百拾元角分
    n += "00";
    var intPos = n.indexOf('.');
    if (intPos >= 0)
        n = n.substring(0, intPos) + n.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - n.length);
    for (var i=0; i < n.length; i++)
        strOutput += lang["N.012"].substr(n.substr(i,1),1) + strUnit.substr(i,1);//零壹贰叁肆伍陆柒捌玖
    return strOutput;
}
//**********************************************************
//修改表格选中和不选中行的颜色
//rowStart从哪一行开始变色
//rowEmptyEnd尾部空多少行
//就是去掉表头和表尾不变色
//tr是对应表中点中行的tr对象
//表的id值
//<tr bgcolor="E6DADA" id="tr<%=i%>" onclick="ModColor(1, 1, this, 'tblDataList')">
//对每一行给一个id值,注意不能重复
//<table id = "tblDataList" width="1800" border="0" cellpadding="3" cellspacing="1" bgcolor="#999999">
//给显示数据的表格一个id值
//************************************************************
/**
function ModColor(rowStart, rowEmptyEnd, tr, tblName){
	//alert("ok");
	var tbl = document.getElementById(tblName);

	for (i = rowStart; i < tbl.rows.length - rowEmptyEnd; i++){
		if (tbl.rows[i].id == tr.id)
			tbl.rows[i].style.backgroundColor = "#EBE2E2";
	}
}
function MoveColor(rowStart, rowEmptyEnd, tr, tblName,Color){
	//alert("ok");
	var tbl = document.getElementById(tblName);

	for (i = rowStart; i < tbl.rows.length - rowEmptyEnd; i++){
		if (tbl.rows[i].id == tr.id)
			tbl.rows[i].style.backgroundColor = Color;
	}
}
*/
//**************2005-6-22加入********************************
//修改表格行颜色;使用onMouseOver方法
//记录每一个单元格的着色,在OUT事件的时候重新赋值
//用于一行当中各个单元格颜色不一样的情况
//**********************************************************
var colorArray;//全局变量，用来记录原来的色
function ModColor(tr, color)
{
  var td = tr.cells;
  colorArray = new Array(td.length); 
  var lineColor=getCssBackColor("td_c");
   
  for(var i=0; i<td.length; i++)
  {    
    //记录原来的着色
    colorArray[i] = td[i].style.backgroundColor;
    if(color == null)
      td[i].style.backgroundColor = lineColor;
    else
      td[i].style.backgroundColor = color;

  }
}
//鼠标移开换色
function MoveColor(tr,className)
{
  var td = tr.cells;
  for(var j=0; j<td.length; j++)
  {
    td[j].style.backgroundColor = colorArray[j];
  }
}


//**************2005-7-26加入********************************
//修改鼠标移动行的颜色onMouseOver方法
//不记录原来的着色
//****************onMouseMove方法******************
function ModColor1(tr, color)
{
  var td = tr.cells;
  for(var i=0; i<td.length; i++)
  {
    if(color == null)
      td[i].style.backgroundColor = "#ffffff";
    else
      td[i].style.backgroundColor = color;

  }
}
//鼠标移开换色
function MoveColor1(tr,className)
{
  var td = tr.cells;
  for(var j=0; j<td.length; j++)
  {
    td[j].style.backgroundColor = '';
  }
}

//******************2010-03-31加入*********************//
//修改表格行样式;使用onMouseOver方法
//记录每一个单元格的样式，根据传入的td样式(class),改变整行样式
//用于鼠标移动改变该行的所有单元格的class,如果td中有style，该td样式没办法改变
var classArray;//全局变量，用來记录原来的tdclass
var lineColor;//提取td_c里面的背景色
var oldColor;
function ModColor2(tr, color)
{
	  oldColor = tr.style.backgroundColor;
	  if(lineColor==null)
		  lineColor=getCssBackColor("td_c");
	  
	  if(color == null)
	    tr.style.backgroundColor = lineColor;
	  else 
		  tr.style.backgroundColor = color;
 
}
//鼠标移开换样式
function MoveColor2(tr)
{    
	tr.style.backgroundColor = oldColor; 
}
//取某css风格的背景色
function getCssBackColor(cssId)
{
   var cSSs = document.styleSheets;
   var sRet = "";
   var cRules = "";
   if(cssId.indexOf(".")<0) cssId="."+cssId;
   for(var i=0; i < cSSs.length; i++)
   {
       if(cSSs[i].cssRules)
       {
    	   cRules = cSSs[i].cssRules;
       }
       else
       { 
    	   cRules = cSSs[i].rules;
       }
       
	   for(var j=0; j<cRules.length; j++)
       {
		   if(cRules[j].selectorText==cssId)
		   {
		      sRet=cRules[j].style.backgroundColor;    //cRules[j].style.cssText子符串全称
			  break;
		   }
	   }
   }
   //---------------------//
   return sRet;
}
//****************onMouseMove方法end******************


//**********************************************************
//查询数据和翻页
//ID是到第几页
//formName是form的id
//jspName是跳转的页面名称
//************************************************************
function QueryData(ID, formName, jspName){
	//获得form对象
	var form = document.getElementById(formName);
	//检查分页数
	var srcPage = trim(form.rcPage.value);
	if (srcPage == ""){
		alert(lang["N.013"]);//请输入每页的页数
		form.rcPage.focus();
		return;
	}
	if (!isNumber(srcPage)){
		alert(lang["N.013"]);//请输入每页的页数
		form.rcPage.focus();
		form.rcPage.select();
		return;
	}
	form.APage.value = ID;
	form.action = jspName;
	form.submit();
}

//**********************************************************
//转到第几页
//ID是到第几页
//formName是form的id
//jspName是跳转的页面名称
//************************************************************
function GoPage(id, formName, jspName){
	//获得form对象
	var form = document.getElementById(formName);
	//id 是输入到哪一页的edit
	var objGoToPage = document.getElementById(id);
	var sGoToPage = trim(objGoToPage.value);
	if (sGoToPage == ""){
		alert(lang["N.014"]);//请输入要到页
		objGoToPage.focus();
		return;
	}
	if (!isNumber(sGoToPage)){
		alert(lang["N.015"]);//请输入数字
		objGoToPage.focus();
		objGoToPage.select();
		return;
	}
	form.APage.value = sGoToPage;
	form.action = jspName;
	form.submit();
}
//隐藏对象
function HideObj(AName){
	var obj = document.getElementById(AName);
	obj.style.display = "none";
}
//四舍五入
function douRound(ADouble, AWei){
	var iWei = Math.pow(10, AWei);
	var fTemp = ADouble * iWei;
	if (isNaN(fTemp))
		fTemp = 0;
	var dResult = fTemp / iWei;
	var sResult = String(dResult);
	return sResult;
}


/*
 *描述：选择所有复选框
 *itemName：复选框名
*/
var isAllChecked = false;
function checkAll(str)
{
  var a = document.getElementsByName(str);
  var n = a.length;
  isAllChecked = !isAllChecked;
  for (var i=0; i<n; i++)
  a[i].checked = isAllChecked;
}
function checkItem(str)
{
  var e = window.event.srcElement;
  var all = eval("document.all.item(\""+ str+"\")");
  if (e.checked)
  {
    var a = document.getElementsByName(e.name);
    all.checked = true;
    for (var i=0; i<a.length; i++)
    {
      if (!a[i].checked){ all.checked = false; break;}
    }
  }
  else all.checked = false;
}

/**
* 改变td样式
*/
function changeTD(trID,i,style1,style2)
{
  var td = trID.getElementsByTagName("TD"); 
  //alert(childTagName + "::::" + td.length);
  for(var j=0; j<td.length; j++)
  {
    if(j==i)
    {
      td[j].className = style2;
    }
    else
    {
      if(td[j].className != style1)
      {
        td[j].className = style1;
      }
    }
  }
}
/**
* 改变div样式
*/
function changeDIV(divID,i,style1,style2)
{
  var div = divID.getElementsByTagName('DIV');
  //alert(div.length);
  for(var j=0; j<div.length; j++)
  {
    if(j==i)
    {
      div[j].className = style2;
    }
    else
    {
      if(div[j].className != style1)
      {
        div[j].className = style1;
      }
    }
  }
}
/**
 * 判断是否跨月
 */
function isOverMonth(value1,value2){

	var sMM1,sMM2;
	if(value1.length>=8&&value2.length>=8){
		sMM1 = value1.substring(4,6);
		sMM2 = value2.substring(4,6);
		if(sMM1!=sMM2)
		{
			alert(lang["N.016"]);//查询日期不可以跨月
			return false;
		}
		sMM1 = value1.substring(0,4);
		sMM2 = value2.substring(0,4);
		if(sMM1!=sMM2)
		{
			alert(lang["N.017"]);//查询日期不可以跨年
			return false;
		}
	}
	return true;
}


/**
*校验字符串是否为中文
*返回值：
*如果为空，定义校验通过，           返回true
*如果字串为中文，校验通过，         返回true
*如果字串为非中文，             返回false    参考提示信息：必须为中文！
*/
function checkIsChinese(str)
{
  //如果值为空，通过校验
  if (str == "")
    return true;

  var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;

  return pattern.test(str);
}

function checkIsEmail(str)
{
  //如果值为空，通过校验
  if (str == "")
    return true;

  var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/gi;

  return pattern.test(str);
}

function checkIsURL(str)
{
  //如果值为空，通过校验
  if (str == "")
    return true;

  var pattern = "^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$";//检查URL的正则表达式

  var r = new RegExp(pattern, "g");
  return r.test(str);
}

function checkIsFormat(regexp,str)
{
  //如果值为空，通过校验
  if (str == "")
    return true;

  //var pattern = "^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$";//检查URL的正则表达式

  var r = new RegExp(regexp, "g");
  return r.test(str);
}

//验证表单
/**************************************   验证表单  *********************************************/
//注：notValidateTag：代表不需要校验的标签标识, validateTag需要校验的标识
function validateForm(fromObj, notValidateTag, validateTag)
{
  var input = fromObj.getElementsByTagName("input");

  var text;
  var textValue;
  var digits;
  var min = 0;
  var max = 0;
  
  for(var i=0;i<input.length;i = i+1)
  {
    if(input[i].type == "text" || input[i].type == "password")
    {
       text = input[i];
       textValue = trim(text.value);
       
       if(notValidateTag!=null && text.name!=null && text.name.indexOf(notValidateTag)==0)
       {
    	   continue;
       }
       
       if(text.getAttribute('NULLABLE') != null && text.getAttribute('NULLABLE') == "0" && textValue == "")
       {
          alert(text.getAttribute('SHOW_NAME') + lang["N.001"]);//不能为空
          setObjFocus(text);
          return false;
       }
       
       if(text.getAttribute('REQEXP') != null && !checkIsFormat(text.getAttribute('REQEXP'),textValue))
       {
          alert(text.getAttribute('SHOW_NAME') + lang["N.003"]);//格式错误!
          setObjFocus(text);
          return false;
       }

       if(text.getAttribute('CHINESE') != null && !checkIsChinese(textValue))
       {
          alert(text.getAttribute('SHOW_NAME') + lang["N.004"]);//必须是中文字符！
          setObjFocus(text);
          return false;
       }

       if(text.getAttribute('EMAIL') != null && !checkIsEmail(textValue))
       {
          alert(text.getAttribute('SHOW_NAME') + lang["N.003"]);//格式错误!
          setObjFocus(text);
          return false;
       }
       
       if(text.getAttribute('NUMBER') != null  && (!isNumber(textValue)))
       {
          alert(text.getAttribute('SHOW_NAME') + lang["N.006"]);//必须是整数！
          setObjFocus(text);
          return false;
       }

       if(text.getAttribute('INTEGER') != null  && ((!isNumber(textValue)) || (!limiNum(textValue,text.getAttribute('INTEGER')))))
       {
          num = text.getAttribute('INTEGER') == "" ? "0" : text.getAttribute('INTEGER');
          alert(getText(lang["N.007"], new Array(text.getAttribute('SHOW_NAME'), num)));//{0}必须是整数{1}的整数!
          setObjFocus(text);
          return false;
       }
       
       if(text.getAttribute('DEMICAL') != null)
       {
          digits = text.getAttribute('DEMICAL') == "" ? "0" : text.getAttribute('DEMICAL');
          if(!IsDemical(textValue,parseInt(digits,10)))
          {//必须是整数! : {0}的小数位必须是{1}位!
            alert(digits == "0" ? text.getAttribute('SHOW_NAME') + lang["N.006"] : getText(lang["N.008"], new Array(text.getAttribute('SHOW_NAME'), digits)));
            setObjFocus(text);
            return false;
          }
       }
       
       if(validateTag!=null && text.name!=null && text.name.indexOf(validateTag) < 0)//如有指定标签标识，需校验名称
       {
    	   continue;
       }
       
       if(text.getAttribute('LIKE') != null)
       {
          var obj = eval('fromObj.'+text.getAttribute('LIKE'));// document.getElementById(text.LIKE);

          if(textValue != trim(obj.value))
          {
            alert(getText(lang["N.002"], new Array(text.getAttribute('SHOW_NAME'), obj.getAttribute('SHOW_NAME'))));//{0}与{1}不一致
            setObjFocus(text);
            return false;
          }
       }

       if(textValue == "")
       {
         continue;
       }

       if(text.getAttribute('MIN') != null && textValue.length < parseInt(text.getAttribute('MIN'),10))
       {
          alert(getText(lang["N.005"], new Array(text.getAttribute('SHOW_NAME'), text.getAttribute('MIN'))));//{0}不能小于{1}字符!
          setObjFocus(text);
          return false;
       }

       /*
       if(text.NUMBER != null && text.NUMBER != "")
       {
          alert(text.getAttribute('SHOW_NAME') + "必须小于" +  + "！");
          text.focus();
          return false;
       }*/

       if(text.getAttribute('MIN_VALUE') != null ||  text.getAttribute('MAX_VALUE') != null)
       {
          min = parseFloat(text.getAttribute('MIN_VALUE'));
          max = parseFloat(text.getAttribute('MAX_VALUE'));
          if(text.getAttribute('MODULUS') != null)
          {
              min = min * parseInt(text.getAttribute('MODULUS'),10);
              max = max * parseInt(text.getAttribute('MODULUS'),10)
          }

          if(text.getAttribute('EXCHANGE') != null)
          {
              min = min * parseFloat(text.getAttribute('EXCHANGE'));
              max = max * parseFloat(text.getAttribute('EXCHANGE'));
          }

          if(parseFloat(textValue) < min)
          {
             alert(getText(lang["N.009"], new Array(text.getAttribute('SHOW_NAME'), min)));//{0}必须大于{1}
             setObjFocus(text);
             return false;
          }

          if(parseFloat(textValue) > max)
          {
             alert(getText(lang["N.010"], new Array(text.getAttribute('SHOW_NAME'), max)));//{0}必须小于{1}
             setObjFocus(text);
             return false;
          }
       }
    }
  }
  
  return true;
}

//设置焦点,忽略错误
function setObjFocus(obj)
{
  try
  {
  	obj.focus();
  }
  catch (e)
  {
  }
}
/**************************************   验证表单  *********************************************/

//格式化数据
function formatData(fromObj)
{
  var input = fromObj.getElementsByTagName("input");
  var text;

  for(var i=0;i<input.length;i = i+1)
  {
    if(input[i].type == "text")
    {
      text = input[i];

      if(text.MODULUS != null)
      {
         text.value = parseFloat(text.value) / parseInt(text.MODULUS);
      }

      if( text.EXCHANGE != null)
      {
         text.value = parseFloat(text.value) / parseFloat(text.EXCHANGE);
      }
    }
  }
}

//****************实现表头与表身分离2005-7-14************************************

//动态设置DIV的高度(根据屏幕自动调整高度)
//<div id='tbdiv' style="overflow:auto; width: 100% ;height: expression(setDivHeigth(this)) ">
//overflow-y:scroll;永远出滚动条
function setDivHeigth(tbdiv)
{
	return document.body.clientHeight - tbdiv.getBoundingClientRect().top;
}

//页面加载之后,重设tb1,tb2的单元格宽度,使两个表格对齐
var _tb2;//全局变量,数据表
var _cs;//表的cellspacing的值
var _isSingle = true;
function setWidth(_tb1,isPercent,isAdd)
{
  //取得TB1的最后一行作为抬头
  var rowIndex;
  if(_tb2 != null)
    _isSingle = false;

  _tb2 = document.getElementById(_tb1.data_tb);
  if(_tb2 != null && _tb2.rows.length > 0 && _tb2.rows[0].cells.length == _tb1.rows[_tb1.rows.length -1].cells.length)
  {
    _cs = _tb1.cellSpacing;
    if(_cs == '')
      _cs = 1;

    var str = "";
    var tb1_width = 0;
    var tb2_width = 0;
    var tb_width = 0;

    if( isPercent == null)
      isPercent = false;

    if( isAdd == null)
      isAdd = false;

    rowIndex = _tb1.rows.length -1;
    for(var i=0;i<_tb1.rows[rowIndex].cells.length-1;i++)
    {
      tb1_width = _tb1.rows[rowIndex].cells[i].clientWidth - _cs*2;
      tb2_width = _tb2.rows[0].cells[i].clientWidth - _cs*2;
      tb_width = tb1_width;

      if(tb1_width < tb2_width)
        tb_width = tb2_width;

      if(isPercent == true)
      {
        _tb1.rows[rowIndex].cells[i]._tb_id = _tb2.id||_tb2.name;
        //设置多个class,td_width为自适应
        _tb1.rows[rowIndex].cells[i].className = _tb1.rows[rowIndex].cells[i].className+" td_width";
        _tb2.rows[0].cells[i].width = Math.round(tb_width/tbdiv.clientWidth*100) + "%";
      }
      else
      {
        if(rowIndex <= _tb2.rows.length)
          _tb2.rows[0].cells[i].width = tb_width;
        else
          _tb2.rows[rowIndex].cells[i].width = tb_width;
        _tb1.rows[rowIndex].cells[i].width = tb_width;
        //alert(tb_width);
      }
    }

    //加一个空行
    if(isAdd == true)
    {
      //加一行
      _tb2.insertRow();
      //设置为底色
      _tb2.rows[_tb2.rows.length-1].className = "body_color";
      for (var i=0; i<_tb1.rows[rowIndex].cells.length; i++)
      {
        _tb2.rows[_tb2.rows.length-1].insertCell(i);
        _tb2.rows[_tb2.rows.length-1].cells[i].style.border = "0px";
        for(var j=0;j<_tb1.rows[rowIndex].cells[i].innerHTML.length;j++)
        {
          str = str + "&nbsp;&nbsp;&nbsp;";
        }
        _tb2.rows[_tb2.rows.length-1].cells[i].innerHTML = str;
        str = "";
      }
    }
  }
  else
  {
    if(_tb1.rows.length > 0 )
    {
      rowIndex = _tb1.rows.length -1;
      for(var i=0;i<_tb1.rows[rowIndex].cells.length;i++)
        _tb1.rows[rowIndex].cells[i].width = '';
    }
  }

}

//参照tb表,动态设置自已列的宽,用于取百分比时的微调
//使用方法:style='width:expression(setTdWidth(this));'
//data_tb为参照表,需要在页面中设置

function setTdWidth(td)
{
  if(!_isSingle)
  {
    _tb = document.getElementById(td._tb_id);
    return _tb.rows[0].cells[td.cellIndex].clientWidth - _cs*2;
  }
  return _tb2.rows[0].cells[td.cellIndex].clientWidth - _cs*2;
}

//动态设置层是否出滚动条
function ifShowScroll(div)
{
  //得到tb的高度
  var tb = div.getElementsByTagName("table")[0];
  if(tb != null)
  {
    var tb_height = tb.clientHeight;
    var div_height = div.clientHeight;
    if(tb_height > div_height)
      return "auto";
  }
  return "hidden";
}


//****************实现表头与表身分离2005-7-14************************************


//****************实现树型复选框的选择 chexkbox 2005-11-09************************************
//检查所有的子节点是否全选或全不选
function lookChildCheckAll(obj,boolValue)
{
  if(obj.child != null && obj.child != "")
  {
    var childStr = obj.child.split(",");

    for(var i=0;i<childStr.length;i++)
    {

       if(document.getElementById(childStr[i]).checked == !boolValue)
       {
         return false;
       }
    }
  }
  else
  {
    for(var i=0;i<document.all.length;i++)
    {
      if(document.all[i].type == 'checkbox' && ("," + document.all[i].parent + ",").indexOf("," + obj.id + ",") >= 0 && document.all[i].checked == !boolValue)
      {
         return false;
      }
    }
  }

  return true;
}

//根据child属性选择
function checkByChild(obj,type)
{
  type = type == null ? 0 : 1;
  //选择子孙
  if(obj.child != null)
  {
	var childStr = obj.child.split(",");

	for(var i=0;i < childStr.length;i++)
	{
	  document.getElementById(childStr[i]).checked = obj.checked;
	}

	for(var i=0;i<document.all.length;i++)
	{
	   if(document.all[i].type != 'checkbox' || document.all[i].child == null || document.all[i].child == obj.child)
	   {
		  continue;
	   }

	   if(type == 1)
	   {
	     document.all[i].checked = lookChildCheckAll(document.all[i],true);
	     continue;
	   }

	   var children = document.all[i].child.split(",");

	   for(var j=0;j<children.length;j++)
	   {

		 document.all[i].checked = false;

		 if(document.getElementById(children[j]).checked == true)
		 {
		   document.all[i].checked = true;
		   break;
		 }
	   }
	}
	
	return;
  }

  //选择父亲
  for(var i=0;i<document.all.length;i++)
  {
     if(document.all[i].type != 'checkbox' || ("," + document.all[i].child + ",").indexOf("," + obj.id + ",") < 0)
     {
       continue;
     }

     if(type == 1)
     {
       document.all[i].checked = lookChildCheckAll(document.all[i],true);
       continue;
     }

     if(obj.checked)
     {
       document.all[i].checked = true;
     }
     else if(lookChildCheckAll(document.all[i],false))
     {
       document.all[i].checked = false;
     }
  }
}

//根据parent属性选择
function checkByParent(obj,type)
{
  type = type == null ? 0 : 1;

  //选择子孙
  var tempParentStr = "";
  for(var i=0;i<document.all.length;i++)
  {

    if(document.all[i].type != 'checkbox')
    {
       continue;
    }

    if(("," + document.all[i].parent + ",").indexOf("," + obj.id + ",") >= 0)
    {
      document.all[i].checked = obj.checked;

      var tempParent = document.all[i].parent.split(",");

      for(var j=0;j<tempParent.length;j++)
      {
        if(tempParent[j] != obj.id && tempParentStr.indexOf(tempParent[j]) < 0)
        {
           tempParentStr += "," + tempParent[j];
        }
      }
    }
  }

  var parentList = tempParentStr == "" ? new Array() : tempParentStr.substr(1).split(",");

  for(var i=0;i<parentList.length;i++)
  {
	  if(type == 1)
	  {
	    document.getElementById(parentList[i]).checked = lookChildCheckAll(document.getElementById(parentList[i]),true);
	    continue;
	  }

	  if(lookChildCheckAll(document.getElementById(parentList[i]),false))
	  {
		  document.getElementById(parentList[i]).checked = false;
	  }
	  else
	  {
		  document.getElementById(parentList[i]).checked = true;
	  }
  }

  //选择父亲
  var parentStr = obj.parent == null ? new Array() : obj.parent.split(",");

  for(var i=0;i<parentStr.length;i++)
  {
      if(type == 1)
	  {
	    document.getElementById(parentStr[i]).checked = lookChildCheckAll(document.getElementById(parentStr[i]),true);
	    continue;
	  }
	
	  if(document.getElementById(parentStr[i]).parent == null || document.getElementById(parentStr[i]).parent == "")
	  {
	    continue;
	  }
	
	  if(lookChildCheckAll(document.getElementById(parentStr[i]),false))
	  {
	    document.getElementById(parentStr[i]).checked = false;
	  }
	  else
	  {
	    document.getElementById(parentStr[i]).checked = true;
	  }
  }

  for(var i=0;type == 0 && i<parentStr.length;i++)
  {
	  if(document.getElementById(parentStr[i]).parent != null && document.getElementById(parentStr[i]).parent != "")
	  {
	    continue;
	  }
	
	  if(lookChildCheckAll(document.getElementById(parentStr[i]),false))
	  {
	    document.getElementById(parentStr[i]).checked = false;
	  }
	  else
	  {
	    document.getElementById(parentStr[i]).checked = true;
	  }
  }
}

//全选
function checkAll2()
{
  var checkLength = 0;
  var boxLength = 0;

  for(i=0;i<document.all.length;i++)
  {
    if(document.all[i].type != 'checkbox')
    {
       continue;
    }

    boxLength++;

    if(document.all[i].checked == false)
    {
       document.all[i].checked = true;
    }
    else
    {
       checkLength++;
    }
  }

  if(boxLength == checkLength)
  {
    for(i=0;i<document.all.length;i++)
    {
      if(document.all[i].type != 'checkbox')
      {
         continue;
      }

      document.all[i].checked = false;
    }
  }
}
//****************实现树型复选框的选择 chexkbox 2005-11-09************************************

//数组复制
function arrayCopy(arr1)
{
  var arr2 = new Array(arr1.length);
  for(var i = 0; i < arr1.length; i++)
    arr2[i] = arr1[i];
  return arr2;
}

//阶乘
function fac(n)
{
  if(n == 0 || n == 1)
    return 1;
  else
    return fac(n-1)*n;
}

//单纯计算nPr
function nPr(n,r)
{
  if(r > n || r <=0)
    return 0;
  var result = n;
  for(var i=n-r+1; i<=n-1; i++)
    result = result * i;

  return result;
}

//单纯计算nCr
function nCr(n,r)
{
  if(r > n || r <=0)
    return 0;

  if(n == r)
    return 1;
  else if(r > n/2)
    return nPr(n, n-r) / fac(n - r);
  else
    return nPr(n, r) / fac(r);
}

//****************后台取数据 2007-05-12************************************
function getServerData(url,xmlhttpStatic)
{
  var xmlhttp = xmlhttpStatic;

  if(xmlhttp == null)
  {
	if(window.ActiveXObject)
	{
	  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest)
	{
	  xmlhttp = new XMLHttpRequest();
	}   
  }

  xmlhttp.open("POST", url, false);
 
  var str = "error";

  try
  {    
    xmlhttp.send(null);

    str = xmlhttp.responseText;
  }
  catch(e)
  {
  }

  return str;
}
//****************后台取数据 2007-05-12************************************
//参数说明：num 要格式化的数字 n 保留小数位
function formatNum(num,n)
{
  num = String(num.toFixed(n));
  var re = /(-?\d+)(\d{3})/;
  while(re.test(num)) num = num.replace(re,"$1,$2")
  return num;
}
//****************2009-07-01************************************************ 
  
