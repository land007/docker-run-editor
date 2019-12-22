
var playProgressButton = function(data) {
	console.log(data);
	var method = data.method;
	var index = data.index;
	var progress = data.progress;
	if(instances[method] === undefined) {
//		instances[method] = [];
		console.log('progress=' + progress);
		return;
	}
	var instance = instances[method][index];
	instance._setProgress(progress)
	if(progress === 1) {
		instance._stop(1);
		switch (method) {
			case 'download':
				var fileName = data.fileName;
				onDownload('/download/' + fileName);
				break;
			case 'search_camera':
				var device_info_list = data.device_info_list;
				onSearchCamera(device_info_list);
				break;
			case 'search_net':
				//TODO
				break;
			default:
				break;
		}
	}
};
var onDownload = function(url) {
	window.location.href = url;
};
var onOpenRtspUrl = function(data) {
	var rtsp_url = data.rtsp_url;
	console.log(rtsp_url);
	var auth = data.username + ':' + data.password + '@';
	console.log(auth);
	var open_rtsp_url = rtsp_url.replace(/rtsp:\/\//g, 'rtsp://' + auth);
	console.log(open_rtsp_url);
	window.open('/show_video?rtsp=' + open_rtsp_url);
}
var onSearchCamera = function(device_info_list) {
	vue_data.device_info_list.splice(0, vue_data.device_info_list.length);
	for(var d in device_info_list) {
		var device_info = device_info_list[d];
		var xaddr = device_info.xaddrs[0];
		var url = new URL(xaddr);
		var ipaddress = url.hostname;
		vue_data.device_info_list.push({
			"urn": device_info.urn, //"urn:uuid:5cf28688-38ac-8301-ac36-5cf2868838ac",
			"name": device_info.name, //"IPCamera",
			"ipaddress" : ipaddress, //"192.168.0.27",
			"hardware": device_info.hardware, //"IPC-HW1306",
			"xaddrs": device_info.xaddrs //["http://192.168.0.27:2000/onvif/device_service"]
		});
	}
};
//var splitobj = Split(["#col1","#col2","#col3"], {
//         elementStyle: function (dimension, size, gutterSize) { 
//             $(window).trigger('resize'); // Optional
//             return {'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'}
//         },
//         gutterStyle: function (dimension, gutterSize) { return {'flex-basis':  gutterSize + 'px'} },
//         sizes: [30,30,30],
//         minSize: 50,
//         gutterSize: 6,
//         cursor: 'col-resize'
//     });
//console.log(splitobj);
//var mousedownFirst = false;
//var mousedownSecond = false;
var bs = '\x08'; for(var i = 0; i < 12; i++) {bs += bs;};
var timeout = null;	
var binContextmenu = function() {
//$('.margin').contextmenu(function() {
	$('.margin').click(function() {
		if(timeout != null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function() {
//		monacoEditor.getAction('editor.action.clipboardCopyAction').run().then(function(a){
//			alert('asdf' + a);
//		});
			var model = monacoEditor.getModel();
//		var selection = {
//				  startLineNumber: 1,
//				  startColumn: 2,
//				  endLineNumber: 3,
//				  endColumn: 10,
//				};
			var selection = monacoEditor.getSelection();
			var partOfTheText = model.getValueInRange(selection)
			console.log(partOfTheText);
			if(JASE != null) {
//			JASE.emit("data", '\x03\x0D');
//			JASE.emit("data", '\x08');
				console.log(bs.length);
				JASE.emit("data", bs);
//			JASE.emit("data", '\x0\r');//清命令 ctrl + u
//			JASE.emit("data", '\x0e\x0D');//清屏幕 ctrl + l
				setTimeout(function() {
					console.log(partOfTheText.length);
					if(partOfTheText.endsWith('\r')) {
						console.log('have r');
					}
					if(partOfTheText.endsWith('\n')) {
						console.log('have n');
					}
					JASE.emit("data", partOfTheText.replace(/\n|\r/g, '') + '\r');
				}, 500);
			}
			timeout = null;
		}, 1000);
	});
};
//$(document).ready(function() {
//binContextmenu();
//  $(".first").on("mousedown", function(e){
//    mousedownFirst = true;
//  });
//  $(".second").on("mousedown", function(e){
//    mousedownSecond = true;
//  });
//  $("#container").on("mouseup", function(e){
//    mousedownFirst = false;
//    mousedownSecond = false;
//  });
//  $("#container").on("mousemove", function(e){
//    parentOffset = $(this).offset();
//    if(mousedownFirst){
//      $(".first").css("left", e.pageX - parentOffset.left);
//      $("#col1").css("width", e.pageX - parentOffset.left);
//      $("#col2").css("left", e.pageX - parentOffset.left);      
//    }
//    if(mousedownSecond){
//      $(".second").css("left", e.pageX - parentOffset.left);
//      $("#col2").css("right", e.pageX - parentOffset.left);
//      $("#col3").css("left", e.pageX - parentOffset.left);
//    }
//  });
//});
var monacoEditor;
//init monaco
require
		.config({
			paths : {
//				'vs' : 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs'
				'vs' : '/ajax/libs/monaco-editor/0.15.6/min/vs'
			},
			'vs/nls' : {
				availableLanguages : {
					'*' : 'zh-cn'
				}
			}
		});

var editContent0 = '\
#北京眼神科技集团-人脸识别部署系统\r\n';
var editContent1 = '\
#运行MySQL服务2\r\n\
sudo docker kill eyecool-mysql; sudo docker rm eyecool-mysql; sudo docker run --restart=always -p 3306:3306 -v ~/docker/eyecool-mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234567 -d --name eyecool-mysql registry.eyecool.cn:5080/mysql:5.7.22\r\n\
\r\n\
#运行数据库管理工具(可忽略)\r\n\
sudo docker kill eyecool-phpmyadmin; sudo docker rm eyecool-phpmyadmin; sudo docker run --restart always --name eyecool-phpmyadmin --link eyecool-mysql -d -e PMA_HOST=eyecool-mysql -p 28080:80 phpmyadmin/phpmyadmin\r\n\
\r\n\
#运行C++核心服务\r\n\
sudo docker kill eyecool-cpp-grpc_release; sudo docker rm eyecool-cpp-grpc_release; sudo docker run -it --restart=always --privileged -v ~/docker/cpp-grpc:/cpp -p 22022:20022 -p 50050:50050 -p 50051:50051 -p 50052:50052 -e "APPLICATION_SERVICE_ADDRESS=172.17.0.1" -e "APPLICATION_SERVICE_PORT=50053" -e "RTSP_URL=rtsp://admin:123456@10.28.102.195:554/video1|rtsp://admin:123456@10.28.102.197:554/video1" -e "CodeMeter_Server=172.17.0.1" -e "FACE_THREADS_NUMBER=4" -e "MATCH_THREADS_NUMBER=4" -e "LIBRARY=Test" --name eyecool-cpp-grpc_release registry.eyecool.cn:5080/eyecool-cpp-grpc:v10\r\n\
\r\n\
#运行Golang辅助服务(新开一个shell)\r\n\
sudo docker kill eyecool-golang-grpc_release; sudo docker rm eyecool-golang-grpc_release; sudo docker run -it --restart=always -v /:/host --link eyecool-cpp-grpc_release:eyecool-cpp-grpc_release --link eyecool-mysql:eyecool-mysql --privileged -e "AdminPass=" -e "AlgoVersion=1030" -e "OldAlgoVersion=feature" -v ~/docker/node_release:/node -v ~/docker/golang_release:/golang -v ~/docker/golang-public_release:/public -e "FaceAddress=eyecool-cpp-grpc_release:50052" -e "FaceMatchAddress=eyecool-cpp-grpc_release:50051" -e "DbHost=eyecool-mysql" -e "DbPort=3306" -e "Database=io-grpc_release" -e "DbUsername=io-grpc" -e "DbPassword=io-grpc" -e "LEVEL=release" --name eyecool-golang-grpc_release --log-opt max-size=1m --log-opt max-file=1 -p 8018:8080 -p 8900:8899 -p 22222:20022 -e "REMOTE_SNAPSHOT_SERVER=eyecool-cpp-grpc_release:50050" -e "VIDEO_SOURCE_INDEX=0" -p 6101:6101 -p 50053:50053 -e "RTSPURLS=rtsp://admin:123456@10.28.102.195:554/video2|rtsp://admin:123456@10.28.102.197:554/video2" -e "VIDEO_SOURCE_INDEXS=0,1" -e "DOORMONITORS=http://10.20.73.118:8080/doorManager/b/monitor/openDoor?user_no={{user_no}}&device_no={{device_no}}|http://10.20.73.118:8080/doorManager/b/monitor/openDoor?user_no={{user_no}}&device_no={{device_no}}" -e "WH=1188:668" -e "QUALITY=10" -p 7101:7101 registry.eyecool.cn:5080/eyecool-golang-grpc:v9\r\n\
\r\n\
#运行Ubuntu人脸服务(新开一个shell)\r\n\
sudo docker kill eyecool-ubuntu_release; sudo docker rm eyecool-ubuntu_release; sudo rm -rf ~/docker/ubuntu-node_release; sudo rm -rf ~/docker/ubuntu-golang_release; sudo rm -rf ~/docker/ubuntu-cpp_release; sudo docker run --restart=always -it --label=com.centurylinklabs.watchtower.enable=true -p 8001:8000 --link eyecool-mysql:eyecool-mysql --privileged -e "AdminPass=" -e "AlgoVersion=1030" -e "OldAlgoVersion=feature" -v ~/docker/ubuntu-node_release:/node -v ~/docker/ubuntu-golang_release:/golang -v ~/docker/ubuntu-golang-public_release:/public -v ~/docker/ubuntu-cpp_release:/cpp -e "DbHost=eyecool-mysql" -e "Database=io-grpc_release" -e "DbUsername=root" -e "DbPassword=1234567" --name eyecool-ubuntu_release --log-opt max-size=1m --log-opt max-file=1 -p 8119:8080 -p 8889:8899 -p 20119:20022 -e "LIBRARY=Test" -p 50163:50053 -e "RTSPURLS=rtsp://admin:abcd1234@192.168.0.234:554/cam/realmonitor?channel=1&subtype=0|rtsp://admin:Admin123@192.168.0.241:554/ISAPI/streaming/channels/103|rtsp://admin:admin@192.168.0.27:554/video0" -e "RTSP_URL=rtsp://admin:abcd1234@192.168.0.234:554/cam/realmonitor?channel=1&subtype=0|rtsp://admin:Admin123@192.168.0.241:554/h264/ch1/main/av_stream|rtsp://admin:admin@192.168.0.27:554/video0" -e "DOORMONITORS=http://192.168.0.237:8088/doorManager/b/monitor/openDoor?user_no={{user_no}}&device_no={{device_no}}" -e "WH=1280x720" -e "QUALITY=1" -p 5501:5101 -p 6501:6101 -p 7501:7101 -e "CodeMeter_Server=10.2.0.109" -e "REDUCE_FRAME=16" -e "BLOCKSWITCHS=0" -e "VIDEOSWITCHS=0" -e "POST_TO_WEB_SERVER_URL=http://127.0.0.1:5101/supersecret0|http://127.0.0.1:5101/supersecret1|http://127.0.0.1:5101/supersecret2" -e "POST_TO_WEB_RESIZE_FRAME=2|2|2" registry.eyecool.cn:5080/eyecool-ubuntu:v11\r\n\
\r\n\
#运行Dockers管理工具(可忽略)\r\n\
sudo docker kill ui-for-docker; sudo docker rm ui-for-docker; sudo docker run --restart always -d -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock --name="ui-for-docker" registry.eyecool.cn:5080/ui-for-docker\r\n\
\r\n\
#运行Dockers管理远程工具(可忽略)\r\n\
sudo docker kill docker-remote-api; sudo docker rm docker-remote-api; sudo docker run --restart always -d -p 2375:2375 -v /var/run/docker.sock:/var/run/docker.sock --name="docker-remote-api" jarkt/docker-remote-api\r\n\
#设置自动更新(可忽略)\r\n\
#全部\r\n\
sudo docker kill watchtower; sudo docker rm watchtower; sudo docker run --restart -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock registry.eyecool.cn:5080/watchtower\r\n\
#部分\r\n\
sudo docker kill watchtower; sudo docker rm watchtower; sudo docker run --restart -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock -v ~/.docker/config.json:/config.json v2tec/watchtower --interval 30 --label-enable\r\n\
\r\n\
#X11转发(可忽略)\r\n\
sudo docker run --restart -d --name x11-bridge -e MODE="tcp" -e XPRA_HTML="yes" -e DISPLAY=:14 -p 10000:10000 registry.eyecool.cn:5080/x11-bridge\r\n\
sudo docker run -d --name emacs-1 --volumes-from x11-bridge -e DISPLAY=:14 jare/emacs emacs\r\n\
\r\n\
#自启动(可设置)\r\n\
sudo docker update --restart=always web\r\n\
sudo docker update --restart=no web\r\n\
';
var editContent2 = '\
# 安装Ubuntu镜像\r\n\
cd ~ && {{sudo}}docker load -i eyecool-ubuntu_latest.tar.gz\r\n\
\r\n\
# 安装Mysql镜像\r\n\
cd ~ && {{sudo}}docker load -i eyecool-mysql_5.7.22.tar.gz\r\n\
\r\n\
# 安装phpmyadmin镜像\r\n\
cd ~ && {{sudo}}docker load -i eyecool-phpmyadmin.tar.gz\r\n\
\r\n\
# 装载Mysql数据\r\n\
mkdir ~/docker ; {{sudo}}tar -zxvf eyecool-mysql_data.tar.gz -C ~/docker && ls ~/docker\r\n\
\r\n\
# 安装ui-for-docker镜像\r\n\
cd ~ && {{sudo}}docker load -i eyecool-ui-for-docker.tar.gz\r\n\
\r\n\
# 安装docker-remote-api镜像\r\n\
cd ~ && {{sudo}}docker load -i docker-remote-api.tar.gz\r\n\
\r\n\
# 安装watchtower镜像\r\n\
cd ~ && {{sudo}}docker load -i eyecool-watchtower.tar.gz\r\n\
\r\n\
# 安装x11-bridge镜像\r\n\
cd ~ && {{sudo}}docker load -i eyecool-x11-bridge.tar.gz\r\n\
\r\n\
# 安装samba镜像\r\n\
cd ~ && {{sudo}}docker load -i eyecool-samba.tar.gz\r\n\
';
var editContent3 = '\
# 检查操作系统\r\n\
lsb_release  -a\r\n\
#	Distributor ID: Ubuntu\r\n\
#	Description:    Ubuntu 16.04.5 LTS\r\n\
#	Release:        16.04\r\n\
#	Codename:       xenial\r\n\
\r\n\
# 检查docker版本\r\n\
{{sudo}}docker version\r\n\
#	Client:\r\n\
#	 Version:       18.03.0-ce\r\n\
#	 API version:   1.37\r\n\
#	 Go version:    go1.9.4\r\n\
#	 Git commit:    0520e24\r\n\
#	 Built: Wed Mar 21 23:10:01 2018\r\n\
#	 OS/Arch:       linux/amd64\r\n\
#	 Experimental:  false\r\n\
#	 Orchestrator:  swarm\r\n\
#\r\n\
#	Server:\r\n\
#	 Engine:\r\n\
#	  Version:      18.03.0-ce\r\n\
#	  API version:  1.37 (minimum version 1.12)\r\n\
#	  Go version:   go1.9.4\r\n\
#	  Git commit:   0520e24\r\n\
#	  Built:        Wed Mar 21 23:08:31 2018\r\n\
#	  OS/Arch:      linux/amd64\r\n\
#	  Experimental: false\r\n\
\r\n\
# 安装docker\r\n\
cd ~/ && {{sudo}}dpkg -i docker-ce_18.06.1_ce_3-0_ubuntu_amd64.deb\r\n\
rm -f docker-ce_18.06.1_ce_3-0_ubuntu_amd64.deb\r\n\
\r\n\
# 指定镜像服务器\r\n\
{{sudo}}vi /etc/docker/daemon.json\r\n\
#{\r\n\
#	"insecure-registries": ["registry.eyecool.cn:5080"]\r\n\
#}\r\n\
{{sudo}}service docker restart\r\n\
\r\n\
# 修改hosts\r\n\
{{sudo}}vi /etc/hosts\r\n\
#192.168.0.96 registry.eyecool.cn\r\n\
\r\n\
# 登录\r\n\
{{sudo}}docker login registry.eyecool.cn:5080\r\n\
';
var editContent4 = '\
# 安装codemeter\r\n\
cd ~/ && unzip codemeter_6.70.3152.500_amd64.deb && {{sudo}}dpkg -i codemeter_6.70.3152.500_amd64.deb\r\n\
\r\n\
# 检测版本\r\n\
cmu  --version\r\n\
\r\n\
# 导入预授权文件\r\n\
cd ~/ && {{sudo}}service codemeter start && cmu --import --file EyeCool_SW-5000704_20171107.wbb\r\n\
\r\n\
# 生成申请授权文件方法一\r\n\
cmu --context 5000704 --file LicenseRequest.WibuCmRaC\r\n\
\r\n\
# 生成申请授权文件方法二(serial后请跟加密锁编号Serial number)\r\n\
cmu --context 5000704 --serial 32767-53505 --file LicenseRequest.WibuCmRaC\r\n\
\r\n\
# 导入正式授权\r\n\
cmu --import --file LicenseRequest.WibuCmRaU\r\n\
\r\n\
# 检测授权状态\r\n\
cmu -l\r\n\
\r\n\
# 若 license 错误，删除已导入的许可文件(具体的Id号可以通过cmu -l看到)\r\n\
cmu --delete-cmact-license --serial 127-125387505\r\n\
\r\n\
# 打开网络授权\r\n\
curl -d "Action=ServerSettings&NetworkServerCheck=on&IsNetworkServer=1&CmWanServerCheck=on&IsWanServer=1&CmWANPort=22351&ApplyButton=Apply" http://127.0.0.1:22350/actions/ChangeConfiguration.html\r\n\
\r\n\
# 在浏览器中打开http://127.0.0.1:22352/configuration/server_access.html\r\n\
# 依次点击菜单：配置=》服务器=》服务器访问\r\n\
# 查看或设置网络服务器启用、CmWAN服务器启用\r\n\
';
require([ 'vs/editor/editor.main' ], function() {
	monacoEditor = monaco.editor.create(document
			.getElementById('container'), {
		value : editContent0,
		language : 'shell',
		wordWrap : "on", //自动换行，注意大小写
		wrappingIndent : "indent"
	});
	var didScrollChangeDisposable = monacoEditor.onDidScrollChange(function(event) {
		console.log('onload');
		binContextmenu();
//	    didScrollChangeDisposable.dispose();
//	    editor.getAction("editor.action.format").run();
	});
});
function ReCreateEditor(editContent) {
	$("#container").children().remove();
	require([ 'vs/editor/editor.main' ], function() {
		monacoEditor = monaco.editor.create(document
				.getElementById('container'), {
			value : editContent,
			language : 'shell',
			wordWrap : "on", //自动换行，注意大小写
			wrappingIndent : "indent"
		});
	});
}
function GetEditorValue() {
	alert(monacoEditor.getValue());
}
var parseString = function(str, obj) {
  Object.keys(obj).forEach(key => {
	  if (typeof(obj[key]) == 'string') {
		  str = str.replace(new RegExp(`{{${key}}}`,'g'), obj[key]);
	  }
  });
  return str;
}
var get_img_key_words = function(cmd_key_words, img) {
	for(var c in cmd_key_words) {
		if(cmd_key_words[c].image.startsWith(img)){
			return cmd_key_words[c];
		}
	}
};
var getP = function(img_key_words, port) {
	if(img_key_words === undefined) {
		return '';
	}
	var key = ':' + port;
	for(var i in img_key_words['-p']) {
		if(img_key_words['-p'][i].endsWith(key)) {
			return img_key_words['-p'][i].substring(0, img_key_words['-p'][i].lastIndexOf(key))
		}
	}
};
var getE = function(img_key_words, ename) {
	if(img_key_words === undefined) {
		return '';
	}
	var key = '"' + ename + '=';
	for(var i in img_key_words['-e']) {
		if(img_key_words['-e'][i].startsWith(key)) {
			return img_key_words['-e'][i].substring(key.length, img_key_words['-e'][i].lastIndexOf('"'))
		}
	}
};
var getV = function(img_key_words, vname) {
	if(img_key_words === undefined) {
		return '';
	}
	var key = ':' + vname;
	for(var i in img_key_words['-v']) {
		if(img_key_words['-v'][i].endsWith(key)) {
			return img_key_words['-v'][i].substring(0, img_key_words['-v'][i].lastIndexOf(key))
		}
	}
};
var getImageVersion = function(img_key_words) {
	if(img_key_words === undefined || img_key_words.image === undefined || img_key_words.image.lastIndexOf(':') <= 0) {
		return '';
	}
	return img_key_words.image.substring(img_key_words.image.lastIndexOf(':') + 1);
};
var getRegistry = function(img_key_words) {
	if(img_key_words === undefined || img_key_words.image === undefined || img_key_words.image.indexOf('/') <= 0) {
		return '';
	}
	return img_key_words.image.substring(0, img_key_words.image.indexOf('/'));
};
var vue_data = new Vue({
	el : '#container1',
	data : {
		value : '122',
		sudo_check : true,
		ssh_server: '192.168.0.96',
		level: 'release',
		codemeter_server: '172.17.0.1',
		face_server_port: '50052',
		match_server_port: '50051',
		snapshot_server_port: '50050',
		application_service_address: '172.17.0.1',
		application_service_port: '50053',
		face_threads_number: '4',
		match_threads_number: '4',
		docker_home: '~/docker',
		ubuntu_image_version: 'v11',
		cpp_image_version: 'v10',
		golang_image_version: 'v9',
		admin_pass: '',
		algo_version: '1030',
		old_algo_version: 'feature',
		db_host: 'eyecool-mysql',
		db_port: '3306',
		db_username: 'root',
		db_password: '1234567',
		database: 'io-grpc_release',
		library: 'Test',
		door_monitors: 'http://10.20.73.118:8080/doorManager/b/monitor/openDoor?user_no={{user_no}}&device_no={{device_no}}',
		wh: '1280x720',
		quality: '10',
		registry: 'registry.eyecool.cn:5080',
		ubuntu_ssh_port: '20119',
		cpp_ssh_port: '22022',
		golang_ssh_port: '22222',
		golang_port: '8119',
		golang_debug_port: '8889',
		mpeg1_port: '5501',
		video_port: '6501',
		video_websocket_port: '7501',
		reduce_frame: '16',
		blockswitchs: '0',
		videoswitchs: '0',
		post_to_web_server_url: 'http://127.0.0.1:5101/supersecret0|http://127.0.0.1:5101/supersecret1|http://127.0.0.1:5101/supersecret2',
		post_to_web_resize_frame: '2|2|2',
		ubuntu_image_version: '5101',
		item_list : [
			{
				"name": "上传Docker安装",
				"method" : "update",
				"index" : 0,
				"progress" : 1,
				"filepath": "upload\\docker_install\\docker-ce_18.06.1_ce_3-0_ubuntu_amd64.deb",
			},
			{
				"name": "上传Ubuntu镜像",
				"method" : "update",
				"index" : 1,
				"progress" : 1,
				"filepath": "upload\\docker_image\\eyecool-ubuntu_latest.tar.gz",
			},
			{
				"name": "上传MySQL镜像",
				"method" : "update",
				"index" : 2,
				"progress" : 1,
				"filepath": "upload\\docker_image\\eyecool-mysql_5.7.22.tar.gz",
			},
			{
				"name": "上传MySQL数据",
				"method" : "update",
				"index" : 3,
				"progress" : 1,
				"filepath": "upload\\docker_data\\eyecool-mysql_data.tar.gz",
			},
			{
				"name": "上传图库数据",
				"method" : "update",
				"index" : 4,
				"progress" : 1,
				"filepath": "upload\\docker_data\\eyecool-library_Test.tar.gz",
			},
			{
				"name": "上传CodeMeter安装",
				"method" : "update",
				"index" : 5,
				"progress" : 1,
				"filepath": "upload\\codemeter\\codemeter_6.70.3152.500_amd64.deb.zip",
			},
			{
				"name": "下载申请授权文件",
				"method" : "download",
				"index" : 0,
				"progress" : 1,
				"filepath": "LicenseRequest.WibuCmRaC",
			},
			{
				"name": "上传正式授权文件",
				"method" : "update",
				"index" : 6,
				"progress" : 1,
				"filepath": "LicenseResponse.WibuCmRaU",
			},
			{
				"name": "上传phpmyadmin管理工具",
				"method" : "update",
				"index" : 7,
				"progress" : 1,
				"filepath": "upload\\docker_manager\\eyecool-phpmyadmin.tar.gz",
			},
			{
				"name": "上传ui-for-docker管理工具",
				"method" : "update",
				"index" : 8,
				"progress" : 1,
				"filepath": "upload\\docker_manager\\eyecool-ui-for-docker.tar.gz",
			},
			{
				"name": "上传remote-api管理工具",
				"method" : "update",
				"index" : 9,
				"progress" : 1,
				"filepath": "upload\\docker_manager\\docker-remote-api.tar.gz",
			},
			{
				"name": "上传watchtower更新工具",
				"method" : "update",
				"index" : 10,
				"progress" : 1,
				"filepath": "upload\\docker_manager\\eyecool-watchtower.tar.gz",
			},
			{
				"name": "上传X11转发工具",
				"method" : "update",
				"index" : 11,
				"progress" : 1,
				"filepath": "upload\\docker_manager\\eyecool-x11-bridge.tar.gz",
			},
			{
				"name": "上传Samba共享工具",
				"method" : "update",
				"index" : 12,
				"progress" : 1,
				"filepath": "upload\\docker_manager\\eyecool-samba.tar.gz",
			},
			{
				"name": "上传Chrome安装",
				"method" : "update",
				"index" : 13,
				"progress" : 1,
				"filepath": "upload\\software_install\\google-chrome-stable_current_amd64.deb",
			}
		],
		device_info_list : [
//			{
//				"urn": "urn:uuid:5cf28688-38ac-8301-ac36-5cf2868838ac",
//				"name": "IPCamera",
//				"ipaddress" : "192.168.0.27",
//				"hardware": "IPC-HW1306",
//				"xaddrs": ["http://192.168.0.27:2000/onvif/device_service"],
//			}
		],
		rtsp_urls : [
			{
				value : 'rtsp://aaa:1',
				value2 : 'rtsp://bbb:1'
			}, {
				value : 'rtsp://aaa:2',
				value2 : 'rtsp://bbb:2'
			}, {
				value : 'rtsp://aaa:3',
				value2 : 'rtsp://bbb:3'
			}, {
				value : 'rtsp://aaa:4',
				value2 : 'rtsp://bbb:4'
			}
		],
		displayTxt: '显示高级选项',
		styleObject: {
			display: 'none',
			padding: '10px',
		    'background-color': 'slategray'
		},
		ip_segment: '192.168.0.'
	},
	created() {
//		fetch('/index.json')
//			.then(response => response.json())
//			.then(json => {
//				for(var j in json) {
// //					console.log(j + ' = ' + json[j])
//					this[j] = json[j];
//				}
//			});
	},
	computed : {
		sudo : function() {
			return this.sudo_check? 'sudo ': '';
		}
	},
	watch : {
		value : function(newQuestion, oldQuestion) {
			//console.log(newQuestion);
			//console.log(this.value);
			console.log(this.rtsp_urls);
			monacoEditor.setValue(newQuestion);
		},
		rtsp_urls : function(newQuestion, oldQuestion) {
//			console.log(newQuestion);
		},
		level : function(newQuestion, oldQuestion) {
			console.log(newQuestion);
			this.database = 'io-grpc_' + newQuestion;
		},
	},
	methods : {
		display: function() {
			if(this.displayTxt == '显示高级选项') {
				this.displayTxt = "隐藏高级选项";
				this.styleObject.display = '';
			} else {
				this.displayTxt = "显示高级选项";
				this.styleObject.display = 'none';
			}
		},
		blurTest: function() {
			alert(monacoEditor.getValue());
		},
		add : function() {//addRow
			console.log('add');
			//this.rtsp_urls[this.rtsp_urls.length] = {value:'rtsp://'}
			this.rtsp_urls.push({
				value : 'rtsp://',
				value2 : 'rtsp://'
			})
		},
		rm: function(index) {//removeRow
			this.rtsp_urls.splice(index, 1);
		},
		progress_method: function(method, index, value, event) {
//			switch (method) {
//			case 'update':
//				this.update(value);
//				break;
//			case 'download':
//				this.download(value);
//				break;
//			default:
//				break;
//			}
//			let method = event.target.getAttribute('method');
			JASE.emit("progress_method", {method: method, index: index, value: value});
		},
		file_change: function(event) {
			var value = event.target.value;
			event.target.value = '';
			this.progress_method('update_file', 0, value);
		},
		install_docker: function() {
			monacoEditor.setValue(parseString(editContent3, this));
		},
		install_codemeter: function() {
			monacoEditor.setValue(parseString(editContent4, this));
		},
		install_image: function() {
			monacoEditor.setValue(parseString(editContent2, this));
		},
		href: function(url) {
			if(gui != null){
				gui.Window.open(url, {}, function(new_win) {
		 			new_win.maximize();
		 		});
			} else {
				window.open(url);
			}
		},
		get_rtsp_url: function(xaddr, username, password) {
			JASE.emit("get_rtsp_url", {
				xaddr: xaddr,
				username: username,
				password: password
			});
		},
		analysis: function() {
			var cmd_key_words = [];
			this.rtsp_urls = [];
			var cmd_string = monacoEditor.getValue();
			var cmd_strings = cmd_string.split(/\r\n/g);
//			console.log(cmd_strings);
//			console.log(cmd_strings.length);
			for(var c in cmd_strings) {
				var cmds = cmd_strings[c].split(/;/g);
//				console.log(cmds);
				var key_words = {
						'-v': [],
						'--link': [],
						'-e': [],
						'-p': [],
						'--name': [],
						'image': ''
				};
				for(var cm = 0; cm < cmds.length; cm++) {
					var words = cmds[cm].split(/ /g);
//					console.log(words);
					for(var w = 0; w < words.length; w++) {
						var word = words[w];
						if(key_words[word] !== undefined) {
							w++;
							key_words[word][key_words[word].length] = words[w];
						}
					}
					key_words.image = words[words.length - 1];
				}
//				console.log(key_words);
				cmd_key_words[c] = key_words;
			}
//			console.log(cmd_key_words);
			
			var ubuntu_key_words = get_img_key_words(cmd_key_words, 'registry.eyecool.cn:5080/eyecool-ubuntu:');
//			console.log(ubuntu_key_words);
			this.registry = getRegistry(ubuntu_key_words);
//			registry: 'registry.eyecool.cn:5080',
//			docker_home: '~/docker',
			this.codemeter_server = getE(ubuntu_key_words, 'CodeMeter_Server');
			this.face_server_port = getP(ubuntu_key_words, '50052');
			this.match_server_port = getP(ubuntu_key_words, '50051');
			this.snapshot_server_port = getP(ubuntu_key_words, '50050');
			this.application_service_address = getE(ubuntu_key_words, 'APPLICATION_SERVICE_ADDRESS');
			this.application_service_port = getE(ubuntu_key_words, 'APPLICATION_SERVICE_PORT');
			this.face_threads_number = getE(ubuntu_key_words, 'FACE_THREADS_NUMBER');
			this.match_threads_number = getE(ubuntu_key_words, 'MATCH_THREADS_NUMBER');
			this.ubuntu_ssh_port = getP(ubuntu_key_words, '20022');
			this.library = getE(ubuntu_key_words, 'LIBRARY');
			var rtsp_urls = getE(ubuntu_key_words, 'RTSP_URL').split('|');
			for(var r in rtsp_urls) {
				var rtsp_url = rtsp_urls[r];
				if(this.rtsp_urls[r] === undefined) {
					this.rtsp_urls[r] = {};
				}
				this.rtsp_urls[r].value = rtsp_url;
			}
			this.level = getE(ubuntu_key_words, 'LEVEL');
			this.admin_pass = getE(ubuntu_key_words, 'AdminPass');
			this.algo_version = getE(ubuntu_key_words, 'AlgoVersion');
			this.old_algo_version = getE(ubuntu_key_words, 'OldAlgoVersion');
			this.db_host = getE(ubuntu_key_words, 'DbHost');
			this.db_port = getE(ubuntu_key_words, 'DbPort');
			this.db_username = getE(ubuntu_key_words, 'DbUsername');
			this.db_password = getE(ubuntu_key_words, 'DbPassword');
			this.database = getE(ubuntu_key_words, 'Database');
			this.video_port = getP(ubuntu_key_words, '6101');
			this.door_monitors = getE(ubuntu_key_words, 'DOORMONITORS');
			this.wh = getE(ubuntu_key_words, 'WH');
			this.quality = getE(ubuntu_key_words, 'QUALITY');
			this.golang_port = getP(ubuntu_key_words, '8080');
			this.golang_debug_port = getP(ubuntu_key_words, '8899');
			this.video_websocket_port = getP(ubuntu_key_words, '7101');
			var rtsp_urls = getE(ubuntu_key_words, 'RTSPURLS').split('|');
			for(var r in rtsp_urls) {
				var rtsp_url = rtsp_urls[r];
				if(this.rtsp_urls[r] === undefined) {
					this.rtsp_urls[r] = {};
				}
				this.rtsp_urls[r].value2 = rtsp_url;
			}
			this.mpeg1_port = getP(ubuntu_key_words, '5101');
			this.reduce_frame = getE(ubuntu_key_words, 'REDUCE_FRAME');
			this.blockswitchs = getE(ubuntu_key_words, 'BLOCKSWITCHS');
			this.videoswitchs = getE(ubuntu_key_words, 'VIDEOSWITCHS');
			this.post_to_web_server_url = getE(ubuntu_key_words, 'POST_TO_WEB_SERVER_URL');
			this.post_to_web_resize_frame = getE(ubuntu_key_words, 'POST_TO_WEB_RESIZE_FRAME');
			this.ubuntu_image_version = getImageVersion(ubuntu_key_words);
			
//			var cpp_key_words = get_img_key_words(cmd_key_words, 'registry.eyecool.cn:5080/eyecool-cpp-grpc:');
////			console.log(cpp_key_words);
//			this.registry = getRegistry(cpp_key_words);
////			registry: 'registry.eyecool.cn:5080',
////			docker_home: '~/docker',
//			this.codemeter_server = getE(cpp_key_words, 'CodeMeter_Server');
//			this.face_server_port = getP(cpp_key_words, '50052');
//			this.match_server_port = getP(cpp_key_words, '50051');
//			this.snapshot_server_port = getP(cpp_key_words, '50050');
//			this.application_service_address = getE(cpp_key_words, 'APPLICATION_SERVICE_ADDRESS');
//			this.application_service_port = getE(cpp_key_words, 'APPLICATION_SERVICE_PORT');
//			this.face_threads_number = getE(cpp_key_words, 'FACE_THREADS_NUMBER');
//			this.match_threads_number = getE(cpp_key_words, 'MATCH_THREADS_NUMBER');
//			this.cpp_ssh_port = getP(cpp_key_words, '20022');
//			this.library = getE(cpp_key_words, 'LIBRARY');
//			var rtsp_urls = getE(cpp_key_words, 'RTSP_URL').split('|');
//			for(var r in rtsp_urls) {
//				var rtsp_url = rtsp_urls[r];
//				if(this.rtsp_urls[r] === undefined) {
//					this.rtsp_urls[r] = {};
//				}
//				this.rtsp_urls[r].value = rtsp_url;
//			}
//			this.cpp_image_version = getImageVersion(cpp_key_words);
//
//			var golang_key_words = get_img_key_words(cmd_key_words, 'registry.eyecool.cn:5080/eyecool-golang-grpc:');
////			console.log(golang_key_words);
//			this.registry = getRegistry(golang_key_words);
//			this.level = getE(golang_key_words, 'LEVEL');
//			this.admin_pass = getE(golang_key_words, 'AdminPass');
//			this.algo_version = getE(golang_key_words, 'AlgoVersion');
//			this.old_algo_version = getE(golang_key_words, 'OldAlgoVersion');
//			this.db_host = getE(golang_key_words, 'DbHost');
//			this.db_port = getE(golang_key_words, 'DbPort');
//			this.db_username = getE(golang_key_words, 'DbUsername');
//			this.db_password = getE(golang_key_words, 'DbPassword');
//			this.database = getE(golang_key_words, 'Database');
//			this.video_port = getP(golang_key_words, '6101');
//			this.door_monitors = getE(golang_key_words, 'DOORMONITORS');
//			this.wh = getE(golang_key_words, 'WH');
//			this.quality = getE(golang_key_words, 'QUALITY');
//			this.golang_ssh_port = getP(golang_key_words, '20022');
//			this.golang_port = getP(golang_key_words, '8080');
//			this.golang_debug_port = getP(golang_key_words, '8899');
//			this.video_websocket_port = getP(golang_key_words, '7101');
//			var rtsp_urls = getE(golang_key_words, 'RTSPURLS').split('|');
//			for(var r in rtsp_urls) {
//				var rtsp_url = rtsp_urls[r];
//				if(this.rtsp_urls[r] === undefined) {
//					this.rtsp_urls[r] = {};
//				}
//				this.rtsp_urls[r].value2 = rtsp_url;
//			}
//			this.golang_image_version = getImageVersion(golang_key_words);
		},
		demo: function() {
			monacoEditor.setValue(parseString(editContent1, this));
			this.analysis();
		},
		generate: function() {
			if(this.level == '') {
				alert('没有level无法生成，系统将为你自动恢复初始设置。');						
				this.demo();
			} else {
				var str = '\
#修改docker运行命令\r\n\
vi ~/.bashrc\r\n\
#alias docker="sudo /usr/bin/docker"\r\n\
source ~/.bashrc\r\n\
#运行MySQL服务1\r\n\
{{sudo}}docker kill eyecool-mysql; {{sudo}}docker rm eyecool-mysql; {{sudo}}docker run --restart=always -p 3306:3306 -v {{docker_home}}/eyecool-mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234567 -d --name eyecool-mysql registry.eyecool.cn:5080/mysql:5.7.22\r\n\
\r\n\
#运行数据库管理工具(可忽略)\r\n\
{{sudo}}docker kill {{sudo}}eyecool-phpmyadmin; {{sudo}}docker rm eyecool-phpmyadmin; {{sudo}}docker run --restart always --name eyecool-phpmyadmin --link eyecool-mysql -d -e PMA_HOST=eyecool-mysql -p 28080:80 registry.eyecool.cn:5080/phpmyadmin:latest\r\n\
\r\n\
# 运行C++核心服务\r\n\
{{sudo}}docker kill eyecool-cpp-grpc_{{level}}; {{sudo}}docker rm eyecool-cpp-grpc_{{level}}; {{sudo}}docker run -it --restart=always --privileged -v {{docker_home}}/cpp-grpc:/cpp -p {{cpp_ssh_port}}:20022 -p {{snapshot_server_port}}:50050 -p {{match_server_port}}:50051 -p {{face_server_port}}:50052 -e "APPLICATION_SERVICE_ADDRESS={{application_service_address}}" -e "APPLICATION_SERVICE_PORT={{application_service_port}}" -e "RTSP_URL={{cpp_trsp_urls}}" -e "CodeMeter_Server={{codemeter_server}}" -e "FACE_THREADS_NUMBER={{face_threads_number}}" -e "MATCH_THREADS_NUMBER={{match_threads_number}}" -e "LIBRARY={{library}}" --name eyecool-cpp-grpc_{{level}} {{registry}}/eyecool-cpp-grpc:{{cpp_image_version}}\r\n\
\r\n\
# 运行Golang辅助服务(新开一个shell)\r\n\
{{sudo}}docker kill eyecool-golang-grpc_{{level}}; {{sudo}}docker rm eyecool-golang-grpc_{{level}}; {{sudo}}docker run -it --restart=always -v /:/host --link eyecool-cpp-grpc_{{level}}:eyecool-cpp-grpc_{{level}} --link {{db_host}}:{{db_host}} --privileged -e "AdminPass={{admin_pass}}" -e "AlgoVersion={{algo_version}}" -e "OldAlgoVersion={{old_algo_version}}" -v {{docker_home}}/node_{{level}}:/node -v {{docker_home}}/golang_{{level}}:/golang -v {{docker_home}}/golang-public_{{level}}:/public -e "FaceAddress=eyecool-cpp-grpc_{{level}}:{{face_server_port}}" -e "FaceMatchAddress=eyecool-cpp-grpc_{{level}}:{{match_server_port}}" -e "DbHost={{db_host}}" -e "DbPort={{db_port}}" -e "Database=io-grpc_{{level}}" -e "DbUsername={{db_username}}" -e "DbPassword={{db_password}}" -e "LEVEL={{level}}" --name eyecool-golang-grpc_{{level}} --log-opt max-size=1m --log-opt max-file=1 -p {{golang_port}}:8080 -p {{golang_debug_port}}:8899 -p {{golang_ssh_port}}:20022 -e "REMOTE_SNAPSHOT_SERVER=eyecool-cpp-grpc_{{level}}:{{snapshot_server_port}}" -p {{video_port}}:6101 -p {{application_service_port}}:50053 -e "RTSPURLS={{golang_rtsp_urls}}" -e "DOORMONITORS={{door_monitors}}" -e "WH={{wh}}" -e "QUALITY={{quality}}" -p {{video_websocket_port}}:7101 {{registry}}/eyecool-golang-grpc:{{golang_image_version}}\r\n\
\r\n\
#运行Ubuntu人脸服务(新开一个shell)\r\n\
{{sudo}}docker kill eyecool-ubuntu_{{level}}; {{sudo}}docker rm eyecool-ubuntu_{{level}}; {{sudo}}rm -rf {{docker_home}}/ubuntu-node_{{level}}; {{sudo}}rm -rf {{docker_home}}/ubuntu-golang_{{level}}; {{sudo}}rm -rf {{docker_home}}/ubuntu-cpp_{{level}}; {{sudo}}docker run --restart=always -it --label=com.centurylinklabs.watchtower.enable=true -p 8001:8000 --link {{db_host}}:{{db_host}} --privileged -e "AdminPass={{admin_pass}}" -e "AlgoVersion={{algo_version}}" -e "OldAlgoVersion={{old_algo_version}}" -v {{docker_home}}/ubuntu-node_{{level}}:/node -v {{docker_home}}/ubuntu-golang_{{level}}:/golang -v {{docker_home}}/ubuntu-golang-public_{{level}}:/public -v {{docker_home}}/ubuntu-cpp_{{level}}:/cpp -e "DbHost={{db_host}}" -e "DbPort={{db_port}}" -e "Database=io-grpc_{{level}}" -e "DbUsername={{db_username}}" -e "DbPassword={{db_password}}" --name eyecool-ubuntu_{{level}} --log-opt max-size=1m --log-opt max-file=1 -p {{golang_port}}:8080 -p {{golang_debug_port}}:8899 -p {{ubuntu_ssh_port}}:20022 -e "LIBRARY={{library}}" -p {{application_service_port}}:50053 -e "RTSPURLS={{golang_rtsp_urls}}" -e "RTSP_URL={{cpp_trsp_urls}}" -e "DOORMONITORS={{door_monitors}}" -e "WH={{wh}}" -e "QUALITY={{quality}}" -p {{mpeg1_port}}:5101 -p {{video_port}}:6101 -p {{video_websocket_port}}:7101 -e "CodeMeter_Server={{codemeter_server}}" -e "REDUCE_FRAME=16" -e "BLOCKSWITCHS=0" -e "VIDEOSWITCHS=0" -e "POST_TO_WEB_SERVER_URL=http://127.0.0.1:5101/supersecret0|http://127.0.0.1:5101/supersecret1|http://127.0.0.1:5101/supersecret2" -e "POST_TO_WEB_RESIZE_FRAME=2|2|2" registry.eyecool.cn:5080/eyecool-ubuntu:v11\r\n\
\r\n\
#运行Dockers管理工具(可忽略)\r\n\
{{sudo}}docker kill ui-for-docker; {{sudo}}docker rm ui-for-docker; {{sudo}}docker run --restart always -d -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock --name="ui-for-docker" registry.eyecool.cn:5080/ui-for-docker\r\n\
#运行Dockers管理远程工具(可忽略)\r\n\
{{sudo}}docker kill docker-remote-api; {{sudo}}docker rm docker-remote-api; {{sudo}}docker run --restart always -d -p 2375:2375 -v /var/run/docker.sock:/var/run/docker.sock --name="docker-remote-api" jarkt/docker-remote-api\r\n\
\r\n\
#自动更新(可忽略)\r\n\
#全部\r\n\
{{sudo}}docker kill watchtower; {{sudo}}docker rm watchtower; {{sudo}}docker run --restart -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock registry.eyecool.cn:5080/watchtower\r\n\
#部分\r\n\
{{sudo}}docker kill watchtower; {{sudo}}docker rm watchtower; {{sudo}}docker run --restart -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock -v ~/.docker/config.json:/config.json v2tec/watchtower --interval 30 --label-enable\r\n\
\r\n\
#X11转发(可忽略)\r\n\
{{sudo}}docker run --restart -d --name x11-bridge -e MODE="tcp" -e XPRA_HTML="yes" -e DISPLAY=:14 -p 10000:10000 registry.eyecool.cn:5080/x11-bridge\r\n\
{{sudo}}docker run -d --name emacs-1 --volumes-from x11-bridge -e DISPLAY=:14 jare/emacs emacs\r\n\
\r\n\
#samba共享\r\n\
{{sudo}}docker kill samba ; {{sudo}}docker rm samba ; {{sudo}}docker run -it --name samba -p 139:139 -p 445:445 -v "/media/user/Seagate Backup Plus Drive:/mount" -d registry.eyecool.cn:5080/samba:latest -u "www;1234567" -s "www;/mount/;yes;no;no;all;none"\r\n\
\r\n\
#安装google-chrome\r\n\
sudo dpkg -i google-chrome-stable_current_amd64.deb\r\n\
#google-chrome自启动\r\n\
vi ~/startup.sh\r\n\
#/bin/sleep 30 && /usr/bin/google-chrome http://127.0.0.1:6601/ms/ --start-fullscreen\r\n\
gnome-session-properties\r\n\
#添加~/startup.sh\r\n\
seahorse\r\n\
#删除默认密码密钥环\r\n\
#重启新建默认密码密钥环，密码为空，确认\r\n\
#设置中关闭google-chrome后继续运行后台应用\r\n\
\r\n\
#自启动(可设置)\r\n\
{{sudo}}docker update --restart=always web\r\n\
{{sudo}}docker update --restart=no web\r\n\
';
				var cpp_trsp_urls = [];
				var golang_rtsp_urls = [];
				for(var r in this.rtsp_urls) {
					cpp_trsp_urls[cpp_trsp_urls.length] = this.rtsp_urls[r].value;
					golang_rtsp_urls[golang_rtsp_urls.length] = this.rtsp_urls[r].value2;
				}
				this.cpp_trsp_urls = cpp_trsp_urls.join('|');
				this.golang_rtsp_urls = golang_rtsp_urls.join('|');
				var abc = parseString(str, this);
//			console.log(abc);
				monacoEditor.setValue(abc);
			}
		}
	}
});
var ProgressButtonCallback = function(instance) {
	var progress = 0,
	interval = setInterval( function() {
		progress = Math.min( progress + Math.random() * 0.1, 1);
		instance._setProgress(progress);
		if(progress === 1) {
			instance._stop(1);
			clearInterval(interval);
		}
	}, 200);
};
var instances = {update: [], download: [], search_camera: [], search_net: []};
var index = 0;
[].slice.call(document.querySelectorAll('button.progress-button')).forEach(function(bttn) {
	new function(bttn, index) {
		let method = bttn.getAttribute('method');
		console.log(method);
		let _index = instances[method].length;
		instances[method][_index] = null;
		new ProgressButton(bttn, {
			callback: function(instance) {
//				instances[method][index] = instance;
//				console.log('index = ' + index);
//				console.log('_index = ' + _index);
//				console.log('instances[method].length = ' + instances[method].length);
				instances[method][_index] = instance;
//				ProgressButtonCallback(instance);
			}
		});
	}(bttn, index);
	index++;
		});