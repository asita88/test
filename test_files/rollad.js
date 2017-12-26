
//初始化加载
function resetRollAd()
{
	//获得最新跑马灯信息
	if(memberOrSys !=null && memberOrSys !="")
	{
		(new Bajax()).post("../public/get_roll_ad.do?date="+new Date().getMilliseconds(), null, rollAdDataBack);
	}
	else
	{
		(new Bajax()).post("public/get_roll_ad.do?date="+new Date().getMilliseconds(), null, rollAdDataBack);
	}
}

var _hasAlerted = "0";
function rollAdDataBack(req)
{
	var result = req.responseText;
    result = result.replace(/(^\s*)|(\s*$)/g,'');

	if(result.indexOf('0#USER_NOT_EXIST')>=0)
	{
		if(memberOrSys !=null && memberOrSys !="")
			window.top.open('../member/public/error.do?error=A.E01&forward=../../login.do','_self');
		else
			window.top.open('public/error.do?error=A.E01&forward=../100','_self');
	  	return;
	}
	else
	{
        var str = result.replace(new RegExp('<LIST_ROW>', 'g'),'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        str = str.replace(new RegExp('<USE_TYPE_1>', 'g'),'').replace(new RegExp('<USE_TYPE_0>', 'g'),'');
		document.getElementById('roll_ad_text').innerHTML = str;

        if(_hasAlerted < 1)
        {
            var resultList = result.split("<LIST_ROW>");
            //result = result.replace(/(^\s*)|(\s*$)/g,'');

            for(var i=0;i<resultList.length;i++)
            {
                if(resultList[i].indexOf("<USE_TYPE_1>") >= 0)
                {
                    alert(resultList[i].substring(0,resultList[i].length-12));
                }
            }

            _hasAlerted = 1;
        }
	}
}

//初始化加载
function isOpenModInfo()
{
	//获得最新跑马灯信息
	if(memberOrSys !=null && memberOrSys !="")
	{
		(new Bajax()).post("../public/get_roll_ad.do?date="+new Date().getMilliseconds(), null, isOpenModInfoCB);
	}
	else
	{
		(new Bajax()).post("public/get_mod_user_info.do?date="+new Date().getMilliseconds(), null, isOpenModInfoCB);
	}
}

function isOpenModInfoCB(req)
{
	var result = req.responseText;
	if(result.indexOf('%0%##')>=0)
	{
		if(memberOrSys !=null && memberOrSys !="")
			window.top.open('../member/public/error.do?error=A.E01&forward=../../login.do','_self');
		else
			window.top.open('public/error.do?error=A.E01&forward=../100','_self');
	  	return;
	}
	else
	{
		var resultList = result.split("##");
		if(parseInt(resultList[1],10) > 0)
		{
			//代表当天登陆者的用户参数有被修改过，需要弹出新窗口显示
			window.open("log/seach_user_log.do");
		}
	}
}

//初始化加载
function startMsnInterval()
{
	if(typeof(openModLog) != "undefined" && openModLog=="1")
	{
		isOpenModInfo();//是否弹出今日修改的记录
	}
	resetRollAd();
	clearInterval(msnIntervalObj);//停掉上面的定时器
	msnIntervalObj = setInterval('resetRollAd()', interval_second); //启动定时刷新
}

//3分钟  取跑马灯和启用msn提示
var interval_second = (roll_interval || 3) * 60 * 1000;
var msnIntervalObj = setInterval('startMsnInterval()', 2000);//等待2000毫秒是防止有些js还没加载完就调用的话会报错


