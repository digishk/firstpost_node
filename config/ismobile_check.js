module.exports = async function(app,constant) {
    
/*==========================isMobile Parameter & device name==============================*/
    constant.isMobile = 0;
    if (constant.reqheaders['x-akamai-device-characteristics'] != undefined) {
        deviceChar = constant.reqheaders['x-akamai-device-characteristics'];
        deviceChracterizaionArr = deviceChar.split("=");
        isMobile = deviceChracterizaionArr[1];
        if (isMobile == 'true') {
            constant.isMobile = 1;
        } else {
            constant.isMobile = 0;
        }
    }
    if (constant.isMobile == 1) {
        constant.device = 'mobile';
    } else {
        constant.device = 'desktop';
    }    
    /*==========================End of isMobile Parameter & device name==============================*/
}