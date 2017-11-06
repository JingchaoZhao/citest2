// 'process.env.NODE_ENV': '"production"'
var rootPortal = 'http://server.dev.kolibre.credit/';
var root = 'http://kc-fengniaowu-sf-test.chinaeast.cloudapp.chinacloudapi.cn/';
if (process.env.NODE_ENV === 'production') {
	// root = 'http://server-fengniaowutest.dev.kolibre.credit/';
	rootPortal = 'http://server.kolibre.credit/';
}

import axios from 'axios'
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filter_null(o) {
    for (var key in o) {
        if (o[key] == null) {
            delete o[key]
        }
        if (toType(o[key]) == 'string') {
            o[key] = o[key].trim()
            if (o[key].length == 0) {
                delete o[key]
            }
        }
    }
    return o
}

export default {
    uploadUri: root + 'api/File/UploadImages',
    downloadorderUrl: root + 'api/Order/DownloadOrders',
    downloadcontractUrl: root + 'api/Contract/DownloadContracts',
    downloadtransactionsUrl: root + 'api/Transaction/DownloadTransactions',
    get: function (url, success, failure, isPortal) {
        var urlRequest;
        if (isPortal) {
            urlRequest = rootPortal + url;
        }
        else {
            urlRequest = root + url;
        }
        // if (env == 'development' && !isPortal) {
        //     urlRequest = url;
        // }
        return axios.get(urlRequest)
            .then(function (r) {
                success(r);
            })
            .catch(function (r) {
                failure && failure(r)
            });
    },
    post: function (url, params, success, failure, isPortal) {
        if (params) {
            params = filter_null(params);
        }
        var urlRequest;
        if (isPortal) {
            urlRequest = rootPortal + url;
        }
        else {
            urlRequest = root + url;
        }
        // if (env == 'development' && !isPortal) {
        //     urlRequest = url;
        // }
        return axios.post(urlRequest, JSON.stringify(params))
            .then(function (r) {
                success(r);
            })
            .catch(function (r) {
                failure && failure(r)
            });
    },
    getWechat: function (success, failure, type, param) {
        var url = null;
        if (type == 1) {
            url = 'http://creditkolibre-dev-wechat-user.chinacloudsites.cn/Wechat/QRCode';
        }
        else {
            url = 'http://creditkolibre-dev-wechat-user.chinacloudsites.cn/Wechat/IsQRCodeUsed?token=' + param;
        }
        return axios.get(url)
            .then(function (r) {
                success(r);
            })
            .catch(function (r) {
                failure && failure(r)
            });
    }
    // 
}