// 初始化插件

// 全局保存当前选中窗口
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
$(function () {
    // 检查插件是否已经安装过
    if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
        alert("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
        return;
    }

    // 初始化插件参数及插入插件
    WebVideoCtrl.I_InitPlugin(1490, 800, {
        //窗口分割数
        iWndowType: 3,
        cbSelWnd: function (xmlDoc) {
            g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
            var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
            showCBInfo(szInfo);
        }
    });

    WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");

    // 登录
    clickLogin();

    // 检查插件是否最新
    if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
        alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
        return;
    }



    // 窗口事件绑定
    $(window).bind({
        resize: function () {
            var $Restart = $("#restartDiv");
            if ($Restart.length > 0) {
                var oSize = getWindowSize();
                $Restart.css({
                    width: oSize.width + "px",
                    height: oSize.height + "px"
                });
            }
        }
    });
    // 开始预览  定时器，以保证登录完成之后进行预览
    setTimeout(() => {
        //预览事件，传递参数为通道口
        clickStartRealPlay(1);
        console.log('预览成功');
    }, 900)
    $('#hideAttrs').hide();
    //初始化日期时间
    var szCurTime = dateFormat(new Date(), "yyyy-MM-dd");
    $("#starttime").val(szCurTime + " 00:00:00");
    $("#endtime").val(szCurTime + " 23:59:59");


});

// 显示操作信息
function showOPInfo(szInfo) {
    szInfo = "<div>" + dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</div>";
    $("#opinfo").html(szInfo + $("#opinfo").html());
}

// 显示回调信息
function showCBInfo(szInfo) {
    szInfo = "<div>" + dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</div>";
    $("#cbinfo").html(szInfo + $("#cbinfo").html());
}

// 格式化时间
function dateFormat(oDate, fmt) {
    var o = {
        "M+": oDate.getMonth() + 1, //月份
        "d+": oDate.getDate(), //日
        "h+": oDate.getHours(), //小时
        "m+": oDate.getMinutes(), //分
        "s+": oDate.getSeconds(), //秒
        "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
        "S": oDate.getMilliseconds()//毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

// 获取窗口尺寸
function getWindowSize() {
    var nWidth = $(this).width() + $(this).scrollLeft(),
        nHeight = $(this).height() + $(this).scrollTop();

    return {width: nWidth, height: nHeight};
}


// 获取本地参数
function clickGetLocalCfg() {
    var xmlDoc = WebVideoCtrl.I_GetLocalCfg();

    $("#netsPreach").val($(xmlDoc).find("BuffNumberType").eq(0).text());
    $("#wndSize").val($(xmlDoc).find("PlayWndType").eq(0).text());
    $("#rulesInfo").val($(xmlDoc).find("IVSMode").eq(0).text());
    $("#captureFileFormat").val($(xmlDoc).find("CaptureFileFormat").eq(0).text());
    $("#packSize").val($(xmlDoc).find("PackgeSize").eq(0).text());
    $("#recordPath").val($(xmlDoc).find("RecordPath").eq(0).text());
    $("#downloadPath").val($(xmlDoc).find("DownloadPath").eq(0).text());
    $("#previewPicPath").val($(xmlDoc).find("CapturePath").eq(0).text());
    $("#playbackPicPath").val($(xmlDoc).find("PlaybackPicPath").eq(0).text());
    $("#playbackFilePath").val($(xmlDoc).find("PlaybackFilePath").eq(0).text());
    $("#protocolType").val($(xmlDoc).find("ProtocolType").eq(0).text());

    showOPInfo("本地配置获取成功！");
}


// 窗口分割数
function changeWndNum(iType) {
    iType = parseInt(iType, 10);
    WebVideoCtrl.I_ChangeWndNum(iType);
}

// 登录
function clickLogin() {
    var szIP = $("#loginip").val(),
        szPort = $("#port").val(),
        szUsername = $("#username").val(),
        szPassword = $("#password").val();
    if ("" == szIP || "" == szPort) {
        return;
    }

    var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
        success: function (xmlDoc) {
            showOPInfo(szIP + " 登录成功！");

            $("#ip").prepend("<option value='" + szIP + "'>" + szIP + "</option>");
            setTimeout(function () {
                $("#ip").val(szIP);
                getChannelInfo();
            }, 10);
        },
        error: function () {
            showOPInfo(szIP + " 登录失败！");
        }
    });

    if (-1 == iRet) {
        showOPInfo(szIP + " 已登录过！");
    }
}

// 退出
function clickLogout() {
    var szIP = $("#ip").val(),
        szInfo = "";

    if (szIP == "") {
        return;
    }

    var iRet = WebVideoCtrl.I_Logout(szIP);
    if (0 == iRet) {
        szInfo = "退出成功！";

        $("#ip option[value='" + szIP + "']").remove();
        getChannelInfo();
    } else {
        szInfo = "退出失败！";
    }
    showOPInfo(szIP + " " + szInfo);
}

// 获取设备信息
function clickGetDeviceInfo() {
    var szIP = $("#ip").val();

    if ("" == szIP) {
        return;
    }

    WebVideoCtrl.I_GetDeviceInfo(szIP, {
        success: function (xmlDoc) {
            var arrStr = [];
            arrStr.push("设备名称：" + $(xmlDoc).find("deviceName").eq(0).text() + "\r\n");
            arrStr.push("设备ID：" + $(xmlDoc).find("deviceID").eq(0).text() + "\r\n");
            arrStr.push("型号：" + $(xmlDoc).find("model").eq(0).text() + "\r\n");
            arrStr.push("设备序列号：" + $(xmlDoc).find("serialNumber").eq(0).text() + "\r\n");
            arrStr.push("MAC地址：" + $(xmlDoc).find("macAddress").eq(0).text() + "\r\n");
            arrStr.push("主控版本：" + $(xmlDoc).find("firmwareVersion").eq(0).text() + " " + $(xmlDoc).find("firmwareReleasedDate").eq(0).text() + "\r\n");
            arrStr.push("编码版本：" + $(xmlDoc).find("encoderVersion").eq(0).text() + " " + $(xmlDoc).find("encoderReleasedDate").eq(0).text() + "\r\n");

            showOPInfo(szIP + " 获取设备信息成功！");
            alert(arrStr.join(""));
        },
        error: function () {
            showOPInfo(szIP + " 获取设备信息失败！");
        }
    });
}

// 获取通道
function getChannelInfo() {
    var szIP = $("#ip").val(),
        oSel = $("#channels").empty(),
        nAnalogChannel = 0;

    if ("" == szIP) {
        return;
    }

    // 模拟通道
    WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
        async: false,
        success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("VideoInputChannel");
            nAnalogChannel = oChannels.length;

            $.each(oChannels, function (i) {
                var id = parseInt($(this).find("id").eq(0).text(), 10),
                    name = $(this).find("name").eq(0).text();
                if ("" == name) {
                    name = "Camera " + (id < 9 ? "0" + id : id);
                }
                oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
            });
            showOPInfo(szIP + " 获取模拟通道成功！");
        },
        error: function () {
            showOPInfo(szIP + " 获取模拟通道失败！");
        }
    });
    // 数字通道
    WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
        async: false,
        success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

            $.each(oChannels, function (i) {
                var id = parseInt($(this).find("id").eq(0).text(), 10),
                    name = $(this).find("name").eq(0).text(),
                    online = $(this).find("online").eq(0).text();
                if ("false" == online) {// 过滤禁用的数字通道
                    return true;
                }
                if ("" == name) {
                    name = "IPCamera " + ((id - nAnalogChannel) < 9 ? "0" + (id - nAnalogChannel) : (id - nAnalogChannel));
                }
                oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
            });
            showOPInfo(szIP + " 获取数字通道成功！");
        },
        error: function () {
            showOPInfo(szIP + " 获取数字通道失败！");
        }
    });
    // 零通道
    WebVideoCtrl.I_GetZeroChannelInfo(szIP, {
        async: false,
        success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("ZeroVideoChannel");

            $.each(oChannels, function (i) {
                var id = parseInt($(this).find("id").eq(0).text(), 10),
                    name = $(this).find("name").eq(0).text();
                if ("" == name) {
                    name = "Zero Channel " + (id < 9 ? "0" + id : id);
                }
                if ("true" == $(this).find("enabled").eq(0).text()) {// 过滤禁用的零通道
                    oSel.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
                }
            });
            showOPInfo(szIP + " 获取零通道成功！");
        },
        error: function () {
            showOPInfo(szIP + " 获取零通道失败！");
        }
    });
}


// 开始预览
function clickStartRealPlay(channelVal) {
    console.log(channelVal);
    console.log('通道：', $("#channels").val());

    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szIP = $("#ip").val(),
        iStreamType = parseInt($("#streamtype").val(), 10),
        iChannelID = parseInt(channelVal, 10),
        bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
        szInfo = "";

    if ("" == szIP) {
        return;
    }

    if (oWndInfo != null) {// 已经在播放了，先停止
        WebVideoCtrl.I_Stop();
    }

    var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
        iStreamType: iStreamType,
        iChannelID: iChannelID,
        bZeroChannel: bZeroChannel
    });

    if (0 == iRet) {
        szInfo = "开始预览成功！";
    } else {
        szInfo = "开始预览失败！";
    }

    showOPInfo(szIP + " " + szInfo);
}

// 停止预览
function clickStopRealPlay() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szInfo = "";

    if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Stop();
        if (0 == iRet) {
            szInfo = "停止预览成功！";
        } else {
            szInfo = "停止预览失败！";
        }
        showOPInfo(oWndInfo.szIP + " " + szInfo);
    }
}

// 打开声音
function clickOpenSound() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szInfo = "";

    if (oWndInfo != null) {
        var allWndInfo = WebVideoCtrl.I_GetWindowStatus();
        // 循环遍历所有窗口，如果有窗口打开了声音，先关闭
        for (var i = 0, iLen = allWndInfo.length; i < iLen; i++) {
            oWndInfo = allWndInfo[i];
            if (oWndInfo.bSound) {
                WebVideoCtrl.I_CloseSound(oWndInfo.iIndex);
                break;
            }
        }

        var iRet = WebVideoCtrl.I_OpenSound();

        if (0 == iRet) {
            szInfo = "打开声音成功！";
        } else {
            szInfo = "打开声音失败！";
        }
        showOPInfo(oWndInfo.szIP + " " + szInfo);
    }
}

// 关闭声音
function clickCloseSound() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szInfo = "";

    if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_CloseSound();
        if (0 == iRet) {
            szInfo = "关闭声音成功！";
        } else {
            szInfo = "关闭声音失败！";
        }
        showOPInfo(oWndInfo.szIP + " " + szInfo);
    }
}

// 设置音量
function clickSetVolume() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        iVolume = parseInt($("#volume").val(), 10),
        szInfo = "";

    if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_SetVolume(iVolume);
        if (0 == iRet) {
            szInfo = "音量设置成功！";
        } else {
            szInfo = "音量设置失败！";
        }
        showOPInfo(oWndInfo.szIP + " " + szInfo);
    }
}


// 全屏
function clickFullScreen() {
    WebVideoCtrl.I_FullScreen(true);
}

// PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
var g_bPTZAuto = false;


// 单帧
function clickFrame() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szInfo = "";

    if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Frame();
        if (0 == iRet) {
            szInfo = "单帧播放成功！";
        } else {
            szInfo = "单帧播放失败！";
        }
        showOPInfo(oWndInfo.szIP + " " + szInfo);
    }
}


// 下载录像
var iDownloadID = -1;
var tDownloadProcess = 0;

function clickStartDownloadRecord(i) {
    var szIP = $("#ip").val(),
        szChannelID = $("#channels").val(),
        szFileName = szIP + "_" + szChannelID + "_" + new Date().getTime(),
        szPlaybackURI = $("#downloadTd" + i).data("playbackURI");

    if ("" == szIP) {
        return;
    }

    iDownloadID = WebVideoCtrl.I_StartDownloadRecord(szIP, szPlaybackURI, szFileName);

    if (iDownloadID < 0) {
        var iErrorValue = WebVideoCtrl.I_GetLastError();
        if (34 == iErrorValue) {
            showOPInfo(szIP + " 已下载！");
        } else if (33 == iErrorValue) {
            showOPInfo(szIP + " 空间不足！");
        } else {
            showOPInfo(szIP + " 下载失败！");
        }
    } else {
        $("<div id='downProcess' class='freeze'></div>").appendTo("body");
        tDownloadProcess = setInterval("downProcess(" + i + ")", 1000);
    }
}

// 下载进度
function downProcess() {
    var iStatus = WebVideoCtrl.I_GetDownloadStatus(iDownloadID);
    if (0 == iStatus) {
        $("#downProcess").css({
            width: $("#searchlist").width() + "px",
            height: "100px",
            lineHeight: "100px",
            left: $("#searchlist").offset().left + "px",
            top: $("#searchlist").offset().top + "px"
        });
        var iProcess = WebVideoCtrl.I_GetDownloadProgress(iDownloadID);
        if (iProcess < 0) {
            clearInterval(tDownloadProcess);
            tDownloadProcess = 0;
            m_iDownloadID = -1;
        } else if (iProcess < 100) {
            $("#downProcess").text(iProcess + "%");
        } else {
            $("#downProcess").text("100%");
            setTimeout(function () {
                $("#downProcess").remove();
            }, 1000);

            WebVideoCtrl.I_StopDownloadRecord(iDownloadID);

            showOPInfo("录像下载完成");
            clearInterval(tDownloadProcess);
            tDownloadProcess = 0;
            m_iDownloadID = -1;
        }
    } else {
        WebVideoCtrl.I_StopDownloadRecord(iDownloadID);

        clearInterval(tDownloadProcess);
        tDownloadProcess = 0;
        iDownloadID = -1;
    }
}


// 重连
function reconnect(szIP) {
    WebVideoCtrl.I_Reconnect(szIP, {
        success: function (xmlDoc) {
            $("#restartDiv").remove();
        },
        error: function () {
            setTimeout(function () {
                reconnect(szIP);
            }, 5000);
        }
    });
}

// 开始升级
m_tUpgrade = 0;

// 获取升级状态
function getUpgradeStatus(szIP) {
    var iStatus = WebVideoCtrl.I_UpgradeStatus();
    if (iStatus == 0) {
        var iProcess = WebVideoCtrl.I_UpgradeProgress();
        if (iProcess < 0) {
            clearInterval(m_tUpgrade);
            m_tUpgrade = 0;
            showOPInfo(szIP + " 获取进度失败！");
            return;
        } else if (iProcess < 100) {
            if (0 == $("#restartDiv").length) {
                $("<div id='restartDiv' class='freeze'></div>").appendTo("body");
                var oSize = getWindowSize();
                $("#restartDiv").css({
                    width: oSize.width + "px",
                    height: oSize.height + "px",
                    lineHeight: oSize.height + "px",
                    left: 0,
                    top: 0
                });
            }
            $("#restartDiv").text(iProcess + "%");
        } else {
            WebVideoCtrl.I_StopUpgrade();
            clearInterval(m_tUpgrade);
            m_tUpgrade = 0;

            $("#restartDiv").remove();

            WebVideoCtrl.I_Restart(szIP, {
                success: function (xmlDoc) {
                    $("<div id='restartDiv' class='freeze'>重启中...</div>").appendTo("body");
                    var oSize = getWindowSize();
                    $("#restartDiv").css({
                        width: oSize.width + "px",
                        height: oSize.height + "px",
                        lineHeight: oSize.height + "px",
                        left: 0,
                        top: 0
                    });
                    setTimeout("reconnect('" + szIP + "')", 20000);
                },
                error: function () {
                    showOPInfo(szIP + " 重启失败！");
                }
            });
        }
    } else if (iStatus == 1) {
        WebVideoCtrl.I_StopUpgrade();
        showOPInfo(szIP + " 升级失败！");
        clearInterval(m_tUpgrade);
        m_tUpgrade = 0;
    } else if (iStatus == 2) {
        mWebVideoCtrl.I_StopUpgrade();
        showOPInfo(szIP + " 语言不匹配！");
        clearInterval(m_tUpgrade);
        m_tUpgrade = 0;
    } else {
        mWebVideoCtrl.I_StopUpgrade();
        showOPInfo(szIP + " 获取状态失败！");
        clearInterval(m_tUpgrade);
        m_tUpgrade = 0;
    }
}


dateFormat = function (oDate, fmt) {
    var o = {
        "M+": oDate.getMonth() + 1, //月份
        "d+": oDate.getDate(), //日
        "h+": oDate.getHours(), //小时
        "m+": oDate.getMinutes(), //分
        "s+": oDate.getSeconds(), //秒
        "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
        "S": oDate.getMilliseconds()//毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

// 切换模式
function changeIPMode(iType) {
    var arrPort = [0, 7071, 80];

    $("#serverport").val(arrPort[iType]);
}

// 获取设备IP
function clickGetDeviceIP() {
    var iDeviceMode = parseInt($("#devicemode").val(), 10),
        szAddress = $("#serveraddress").val(),
        iPort = parseInt($("#serverport").val(), 10) || 0,
        szDeviceID = $("#deviceid").val(),
        szDeviceInfo = "";

    szDeviceInfo = WebVideoCtrl.I_GetIPInfoByMode(iDeviceMode, szAddress, iPort, szDeviceID);

    if ("" == szDeviceInfo) {
        showOPInfo("设备IP和端口解析失败！");
    } else {
        showOPInfo("设备IP和端口解析成功！");

        var arrTemp = szDeviceInfo.split("-");
        $("#loginip").val(arrTemp[0]);
        $("#deviceport").val(arrTemp[1]);
    }
}
