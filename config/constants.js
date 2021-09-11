// var ip = require("ip");


var host_name = env_vars['HOST_NAME'];
var port = env_vars['PORT'];
var config_vars = {};
config_vars['SITE_URL'] = env_vars['SITE_URL'];
config_vars['STATIC_URL'] = env_vars['STATIC_URL'];
config_vars['HOST_NAME_PORT'] = env_vars['HOST_NAME_PORT'];
/*if(ip.address() == '172.18.4.168')
{
	host_name = "stg.firstpost.com";
	port = process.env.PORT || 8080;
	config_vars['SITE_URL'] = "https://"+host_name+'/';
	config_vars['STATIC_URL'] = "https://"+host_name+'/';
	config_vars['HOST_NAME_PORT'] = host_name;
}

*/
config_vars['AKAMAI_STATIC'] = config_vars['SITE_URL'];

/*Define Config Variables here*/
config_vars['HOST_NAME'] = host_name;
config_vars['PORT'] = port;
config_vars['MAIN_SITE_URL'] = "https://www.firstpost.com/";

config_vars['CSS_URL'] = config_vars['SITE_URL']+'css/';
config_vars['JS_URL'] = config_vars['SITE_URL']+'js/';
config_vars['IMG_URL'] = 'https://images.firstpost.com/';
// config_vars['FP_DESKTOP_LOGO'] = config_vars['SITE_URL']+"/images/FP-WhiteChristmas-Logo-2.png";
// config_vars['FP_DESKTOP_LOGO'] = config_vars['SITE_URL']+"images/fp-logo_new.png";
config_vars['PLACEHOLDER_IMG_120x120'] = config_vars['SITE_URL']+"static/images/fplogo_placeholder_120x120.jpg";
config_vars['PLACEHOLDER_IMG_192x104'] = config_vars['SITE_URL']+"static/images/fplogo_placeholder_192x104.jpg";
config_vars['PLACEHOLDER_IMG_300x375'] = config_vars['SITE_URL']+"static/images/fplogo_placeholder_300x375.jpg";
config_vars['PLACEHOLDER_IMG_320x180'] = config_vars['SITE_URL']+"static/images/fplogo_placeholder_320x180.jpg";
config_vars['PLACEHOLDER_IMG_640x362'] = config_vars['SITE_URL']+"static/images/fplogo_placeholder_640x362.jpg";
config_vars['PLACEHOLDER_IMG_320x50'] = config_vars['SITE_URL']+"static/images/fplogo_placeholder_320x50.jpg";
config_vars['PLACEHOLDER_IMG_300x100'] = config_vars['SITE_URL']+"static/images/fplogo_placeholder_300x100.jpg";
config_vars['WP_IMG_UPLOAD_URL'] = config_vars['IMG_URL']+'wp-content/uploads/'; 

config_vars['gadgetsNameArr'] = {};
config_vars['gadgetsNameArr'][0] = {'label':'Mobiles','label1':'Mobile Phones','slug':'mobiles'};
config_vars['gadgetsNameArr'][1] = {'label':'Laptops','label1':'Laptops','slug':'laptops'};
config_vars['gadgetsNameArr'][2] = {'label':'Tablets','label1':'Tablets','slug':'tablets'};

config_vars['monthS'] = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
config_vars['monthL'] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
config_vars['monthsWNos'] = {'01':'Jan', '02':'Feb', '03':'Mar', '04':'Apr', '05':'May', '06':'June', '07':'July', '08':'Aug', '09':'Sept', '10':'Oct', '11':'Nov', '12':'Dec'};

config_vars['IO_SCRIPT_FLAG'] = 0;
config_vars['whatsAppSubTxt_Enable'] = 1;


/*Akamai Video Player*/
config_vars['akamaiconfig'] = {};
config_vars['akamaiconfig']['algorithm'] = 'SHA256';
config_vars['akamaiconfig']['acl'] = '';
config_vars['akamaiconfig']['window'] = 3600;
config_vars['akamaiconfig']['key'] = "25ba0f0123a93ae326044714";
config_vars['akamaiconfig']['live_key'] = "DB7DC7D50D2DBCAF76D3AF62FEC1B494";
config_vars['akamaiconfig']['encoding'] = false;

/*Export Config Variables here*/
module.exports = config_vars;