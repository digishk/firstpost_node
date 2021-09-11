module.exports = async function(app,constant) {
    
/*==========================hideJSforEU Parameter ==============================*/
    constant.hideJSforEU = 'no';
    var continent = '';
    var edge_scape_arr = [];
    if (constant.reqheaders['x-akamai-edgescape'] != undefined) {
        var regeionData = constant.reqheaders['x-akamai-edgescape'];
        var regeionDataArr = regeionData.split(",");
        for (const [regeionDataArr_key, regeionDataArr_val] of Object.entries(regeionDataArr)) {
            
            var temp = '';
            temp = regeionDataArr_val.split("=");
            if(temp.length == 2 && temp[0] == 'continent'){
                continent = temp[1].toLowerCase();
            }
        }
    }else if(constant.reqheaders['http_cf_ipcontinent'] != undefined){
        //HTTP_CF_IPCONTINENT
        continent = constant.reqheaders['http_cf_ipcontinent'].toLowerCase();
    }
    
    if(continent == 'eu'){
        constant.hideJSforEU = 'yes';
    } else {
        constant.hideJSforEU = 'no';
    }

    /*==========================End of hideJSforEU Parameter ==============================*/
}