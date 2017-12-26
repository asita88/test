//选择下註类型
var s_LT=null;

function MF_URL(url) 
{
	//alert(url)
	if(s_LT!=null){
		url=url.replace("%%SETGAMETYPE%%",s_LT);
	}
	parent.frames["mainFrame"].location=url;
}

var oldMCId = "";
function Select_MC(MC_ID) 
{
	var s_obj = document.getElementById("MC_"+oldMCId);
	if(s_obj!=null)
		s_obj.className="";
	
	s_obj = document.getElementById("MC_"+MC_ID);
    if (s_obj!=null)
	{
    	s_obj.className="Font_R";
    	oldMCId = MC_ID;
	}
}

var oldMId = "";
function Select_M(M_ID) 
{
	var s_obj = document.getElementById("M_"+oldMId);
	if(s_obj!=null)
	{
		s_obj.className = "T_a";
	}
	s_obj = document.getElementById("MC_"+oldMCId);
	if(s_obj!=null)
	{
		s_obj.className = "";
		oldMCId = "";
	}
	s_obj=document.getElementById("M_"+M_ID);
    if(s_obj!=null)
	{
    	s_obj.className="Font_V";
    	oldMId = M_ID;
	}
    //if(parent.frames["leftFrame"].location.toString().indexOf("game/user_info.") < 0)
    {
    	//parent.frames["leftFrame"].location = "game/user_info.do?s="+Math.floor(Math.random()*1000)+"&d="+new Date().getMilliseconds();//默认指定到用户信息界面
    }
}
