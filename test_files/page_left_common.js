
var userAjax = null;
function resetAbleMoney()
{
	if(userAjax==null)
		userAjax = new Bajax();
	
	var url = "get_user_info.do?oper_type=GET_USER_ACC";
	userAjax.post(url, null, resetAbleMoneyCB);
}

function resetAbleMoneyCB(req) //刷新可用金额回调函数
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
			var resultList = resultStr.split("##");
			
			//result = "%1%##"+userSet+"##"+creditAmount+"##"+ableAmount+"##";
			var temObj = document.getElementById("td_user_set");
			if(temObj!=null)
			{
				temObj.innerHTML = resultList[1];
			}
			
			temObj = document.getElementById("td_credit_amount");
			if(temObj!=null)
			{
				temObj.innerHTML = resultList[2];
			}
			
			temObj = document.getElementById("td_able_amount");
			if(temObj!=null)
			{
				temObj.innerHTML = resultList[3];
			}
		}
	}
}
