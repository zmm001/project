function preLoad() {
	if (!this.support.loading) {
		alert("You need the Flash Player 9.028 or above to use SWFUpload.");
		return false;
	}
}
function loadFailed() {
	alert("上传控件加载失败，清除浏览器缓存再试试。");
}
function fileQueued(file) {
    try {
        var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setStatus("\u51c6\u5907\u4e0a\u4f20....."); //准备上传
        progress.toggleCancel(true, this);
    } catch (ex) {
        this.debug(ex);
    }
}
function fileQueueError(file, errorCode, message) {
    try {
        if (this.getStats().successful_uploads == 4) {
            this.setButtonDisabled(true);
            this.setButtonTextStyle('.button { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #b5b5b5 }');
        } else {
            this.setButtonDisabled(false);
            this.setButtonTextStyle('.button { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #000 }');
        }
        
		var imageName = "http://res.edushi.com/swfupload/error.gif";
		var errorName = "";
		
		switch (errorCode) {
		    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		        errorName = "您要上传的文件内容为空，请重新选择。";
		        break;
		    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		        errorName = "您要上传的文件超出了最大限制，文件大小不能超过512K，请重新选择！";
		        break;
		    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		        errorName = "您选择的文件太多了，最多上传4张图片。";
		        break;
		    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		        errorName = "您要上传的图片格式不对，仅支持.jpg、.gif、.png，请重新选择！";
		        break;
		    default:
		        alert(message);
		        break;
		}
		if (errorName !== "") {
		    alert(errorName);
		    return;
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
	    if (numFilesQueued == 0) {
	        this.setButtonDisabled(false);
	        this.setButtonTextStyle('.button { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #000 }');
	    }

	    if (numFilesQueued > 0) {
	        // 选择文件之后，自动开始。
	        this.startUpload();
	    }
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadStart(file) {
    try {
        /* I don't want to do any file validation or anything,  I'll just update the UI and
        return true to indicate that the upload should start.
        It's important to update the UI here because in Linux no uploadProgress events are called. The best
        we can do is say we are uploading.
        */
        var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setStatus("上传中");
        progress.toggleCancel(true, this);
    }
    catch (ex) { }
    return true;
}

function uploadProgress(file, bytesLoaded) {
    try {
        var percent = Math.ceil((bytesLoaded / file.size) * 100);

        var progress = new FileProgress(file, this.customSettings.upload_target);
        progress.setProgress(percent);
        if (percent === 100) {
            progress.setStatus("处理中");
            progress.toggleCancel(false, this);
        } else {
            percent += '%';
            progress.setStatus(percent);
            progress.toggleCancel(true, this);
        }
    } catch(ex) {
        this.debug(ex);
    }
}

function uploadSuccess(file, serverData) {
    //=======
    try {
        var result = $.parseJSON(serverData);
        var progress = new FileProgress(file, this.customSettings.upload_target);
        if (result.State == '200') {
            addImage(eimage + result.FileName, progress);
            //progress.setStatus("Thumbnail Created.");
            progress.toggleCancel(true);
        } else {
            progress.setStatus("Error.");
            progress.toggleCancel(true);
            $("#" + progress.fileProgressID).remove();
            alert(result.Msg);
        }
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
	    /*  I want the next upload to continue automatically so I'll call startUpload here */
	    var image_num = $('.thumbnail').length;
		if (this.getStats().files_queued > 0) {
			this.startUpload();
} else {
    if (this.getStats().successful_uploads == 4 && image_num == 4) {
        this.setButtonDisabled(true);
        this.setButtonTextStyle('.button { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #b5b5b5 }');
    } else {
        this.setButtonDisabled(false);
        this.setButtonTextStyle('.button { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #000 }');
    }

//    var progress = new FileProgress(file, this.customSettings.progressTarget);
//			progress.setComplete();
//			progress.setStatus("上传完毕");
//			progress.toggleCancel(false);
		}
	} catch (ex) {
		this.debug(ex);
	}
}
function fileDialogStart(file) {
    var $stat = this.getStats();
    var image_num = $('.progressContainer').length;
    $stat.successful_uploads = image_num;
    this.setStats($stat);

    this.setButtonDisabled(true);
    this.setButtonTextStyle('.button { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #b5b5b5 }');
}

function uploadError(file, errorCode, message) {
    var msg = "上传错误";
	var imageName =  "error.gif";
	var progress;
	try {
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("取消上传。");
				msg = "取消上传";
				progress.toggleCancel(false);
			}
			catch (ex1) {
				this.debug(ex1);
			}
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("上传终止");
				msg = "上传终止";
				progress.toggleCancel(true);
			}
			catch (ex2) {
				this.debug(ex2);
			}
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
		    imageName = "uploadlimit.gif";
		    msg = "文件大小超过限制";
			break;
		default:
			alert(message);
			break;
		}
	    alert(msg);
		//addImage("images/" + imageName);

	} catch (ex3) {
		this.debug(ex3);
	}
}


function addImage(src, obj) {
    var obj_ = document.getElementById(obj.fileProgressID);
    obj_.innerHTML = '';
    
    var imgdir = src.substring(src.lastIndexOf("/") + 1);
    var newImg = document.createElement("img");
    var newHidden = document.createElement("input");
    var newA = document.createElement("a");
    var newDiv = document.createElement("div");

    newDiv.className = "progressContainer";
    newHidden.setAttribute("type", "hidden");
    newHidden.setAttribute("name", "bimage");
    newHidden.setAttribute("value", imgdir);
    newA.className = 'progressCancel';
    newA.href = "javascript:void(0)";
    newA.title = "\u5220\u9664";
    newA.onclick = function () {
        swfu.setButtonDisabled(false);
        swfu.setButtonTextStyle('.button { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #000000 }');
        $(this).parent().remove();
    };
    newDiv.appendChild(newImg);
    //newDiv.appendChild(newA);
    newDiv.appendChild(newHidden);
    obj_.appendChild(newDiv);
    obj_.appendChild(newA);
    //document.getElementById("thumbnails").appendChild(newDiv);
   

    if (newImg.filters) {
        try {
            newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
        } catch (e) {
            // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
            newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
        }
    } else {
        newImg.style.opacity = 0;
    }

    newImg.onload = function () {
        fadeIn(newImg, 0);
    };
    newImg.src = src;
}

function fadeIn(element, opacity) {
	var reduceOpacityBy = 5;
	var rate = 30;	// 15 fps


	if (opacity < 100) {
		opacity += reduceOpacityBy;
		if (opacity > 100) {
			opacity = 100;
		}

		if (element.filters) {
			try {
				element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				//element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
			}
		} else {
			element.style.opacity = opacity / 100;
		}
	}

	if (opacity < 100) {
		setTimeout(function () {
			fadeIn(element, opacity);
		}, rate);
	}
}



/* ******************************************
 *	FileProgress Object
 *	Control object for displaying file info
 * ****************************************** */
function FileProgress(file, targetID) {
    this.fileProgressID = file.id;

    this.opacity = 100;
    this.height = 0;


    this.fileProgressWrapper = document.getElementById(this.fileProgressID);
    if (!this.fileProgressWrapper) {
        this.fileProgressWrapper = document.createElement("div");
        this.fileProgressWrapper.className = "progressWrapper";
        this.fileProgressWrapper.id = this.fileProgressID;

        this.fileProgressElement = document.createElement("div");
        this.fileProgressElement.className = "progressContainer";

        var progressCancel = document.createElement("a");
        progressCancel.className = "progressCancel";
        progressCancel.href = "#";
        progressCancel.style.visibility = "hidden";
        progressCancel.appendChild(document.createTextNode(" "));

        var progressText = document.createElement("div");
        progressText.className = "progressName";
        progressText.appendChild(document.createTextNode(file.name));

        var progressBar = document.createElement("div");
        progressBar.className = "progressBarInProgress";

        var progressStatus = document.createElement("div");
        progressStatus.className = "progressBarStatus";
        progressStatus.innerHTML = "&nbsp;";

        this.fileProgressElement.appendChild(progressCancel);
        this.fileProgressElement.appendChild(progressText);
        this.fileProgressElement.appendChild(progressStatus);
        this.fileProgressElement.appendChild(progressBar);

        this.fileProgressWrapper.appendChild(this.fileProgressElement);

        document.getElementById(targetID).appendChild(this.fileProgressWrapper);
    } else {
        this.fileProgressElement = this.fileProgressWrapper.firstChild;
        this.reset();
    }

    this.height = this.fileProgressWrapper.offsetHeight;
    this.setTimer(null);
}

FileProgress.prototype.setTimer = function (timer) {
    this.fileProgressElement["FP_TIMER"] = timer;
};
FileProgress.prototype.getTimer = function (timer) {
    return this.fileProgressElement["FP_TIMER"] || null;
};

FileProgress.prototype.reset = function () {
    this.fileProgressElement.className = "progressContainer";

    this.fileProgressElement.childNodes[2].innerHTML = "&nbsp;";
    this.fileProgressElement.childNodes[2].className = "progressBarStatus";

    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = "0%";

    this.appear();
};

FileProgress.prototype.setProgress = function (percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = percentage + "%";

    this.appear();
};
FileProgress.prototype.setComplete = function () {
//	this.fileProgressElement.className = "progressContainer blue";
//	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
//	this.fileProgressElement.childNodes[3].style.width = "";

//	var oSelf = this;
//	this.setTimer(setTimeout(function () {
//		oSelf.disappear();
//	}, 10000));
};
FileProgress.prototype.setError = function () {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

    var oSelf = this;
    this.setTimer(setTimeout(function () {
        oSelf.disappear();
    }, 5000));
};
FileProgress.prototype.setCancelled = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

    var oSelf = this;
    this.disappear();
    //	this.setTimer(setTimeout(function () {
    //		oSelf.disappear();
    //	}, 10));
};
FileProgress.prototype.setStatus = function (status) {
    this.fileProgressElement.childNodes[2].innerHTML = status;
};

// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
    if (swfUploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function () {
            swfUploadInstance.cancelUpload(fileID);
            return false;
        };
    }
};

FileProgress.prototype.appear = function () {
    if (this.getTimer() !== null) {
        clearTimeout(this.getTimer());
        this.setTimer(null);
    }

    if (this.fileProgressWrapper.filters) {
        try {
            this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
        } catch (e) {
            // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
            this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
        }
    } else {
        this.fileProgressWrapper.style.opacity = 1;
    }

    this.fileProgressWrapper.style.height = "";

    this.height = this.fileProgressWrapper.offsetHeight;
    this.opacity = 100;
    this.fileProgressWrapper.style.display = "";

};

// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {

    var reduceOpacityBy = 15;
    var reduceHeightBy = 4;
    var rate = 30; // 15 fps

    if (this.opacity > 0) {
        this.opacity -= reduceOpacityBy;
        if (this.opacity < 0) {
            this.opacity = 0;
        }

        if (this.fileProgressWrapper.filters) {
            try {
                this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
            } catch (e) {
                // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
                this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
            }
        } else {
            this.fileProgressWrapper.style.opacity = this.opacity / 100;
        }
    }

    if (this.height > 0) {
        this.height -= reduceHeightBy;
        if (this.height < 0) {
            this.height = 0;
        }

        this.fileProgressWrapper.style.height = this.height + "px";
    }

    if (this.height > 0 || this.opacity > 0) {
        var oSelf = this;
        this.setTimer(setTimeout(function () {
            oSelf.disappear();
        }, rate));
    } else {
        //this.fileProgressWrapper.style.display = "none";

        $(this.fileProgressWrapper).remove();
        this.setTimer(null);
    }
};
