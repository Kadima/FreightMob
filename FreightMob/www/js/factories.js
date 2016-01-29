var appFactory = angular.module('MobileAPP.factories', [
    'MobileAPP.services'
]);

appFactory.factory('TRACKING_ORM' , function(){
    var TRACKING_ORM = {
        TRACKING_SEARCH : {
            FilterName:     '',
            FilterValue:    '',
            _set:   function(value1, value2) {
                TRACKING_ORM.TRACKING_SEARCH.FilterName =   value1;
                TRACKING_ORM.TRACKING_SEARCH.FilterValue =  value2;
            }
        },
        TRACKING_LIST : {
            CanLoadedMoreData:      true,
            Jmjm1s:                 {},
            Omtx1s:                 {},
            _setJmjm:   function(value) {
                TRACKING_ORM.TRACKING_LIST.Jmjm1s = value;
            },
            _setOmtx:   function(value) {
                TRACKING_ORM.TRACKING_LIST.Omtx1s = value;
            }
        },
        TRACKING_DETAIL : {
            Key :           '',
            ModuleCode :    '',
            Omtx1 :         {},
            Jmjm1 :         {},
            _set :      function(value1, value2) {
                TRACKING_ORM.TRACKING_DETAIL.Key =          value1;
                TRACKING_ORM.TRACKING_DETAIL.ModuleCode =   value2;
            },
            _setOmtx:   function(value) {
                TRACKING_ORM.TRACKING_DETAIL.Omtx1s = value;
            },
            _setJmjm:   function(value) {
                TRACKING_ORM.TRACKING_DETAIL.Jmjm1 = value;
            }
        }
    };
    TRACKING_ORM.init = function() {
        TRACKING_ORM.TRACKING_SEARCH.FilterName =       '';
        TRACKING_ORM.TRACKING_SEARCH.FilterValue =      '';
        TRACKING_ORM.TRACKING_LIST.CanLoadedMoreData =  true;
        TRACKING_ORM.TRACKING_LIST.Jmjm1s =             {};
        TRACKING_ORM.TRACKING_LIST.Omtx1s =             {};
        TRACKING_ORM.TRACKING_DETAIL.Key =              {};
        TRACKING_ORM.TRACKING_DETAIL.ModuleCode =       {};
        TRACKING_ORM.TRACKING_DETAIL.Omtx1 =            {};
        TRACKING_ORM.TRACKING_DETAIL.Jmjm1 =            {};
    };
    return TRACKING_ORM;
});
appFactory.factory('CONTACTS_ORM',function(){
    var CONTACTS_ORM = {
        CONTACTS_SEARCH : {
            BusinessPartyNameLike:  '',
            _set:   function(value) {
                CONTACTS_ORM.CONTACTS_SEARCH.BusinessPartyNameLike = value;
            }
        },
        CONTACTS_LIST : {
            CanLoadedMoreData:      true,
            Rcbp1s:                 {},
            _set:   function(value) {
                CONTACTS_ORM.CONTACTS_LIST.Rcbp1s = value;
            }
        },
        CONTACTS_DETAIL : {
            TrxNo:                  '',
            TabIndex:               0,
            Rcbp1:                  {},
            _setId:     function(value) {
                CONTACTS_ORM.CONTACTS_DETAIL.TrxNo = value;
            },
            _setTab:    function(value) {
                CONTACTS_ORM.CONTACTS_DETAIL.TabIndex = value;
            },
            _setObj:    function(value) {
                CONTACTS_ORM.CONTACTS_DETAIL.Rcbp1 = value;
            }
        },
        CONTACTS_SUBLIST : {
            BusinessPartyCode:      '',
            Rcbp3s:                 {},
            _setId:     function(value) {
                CONTACTS_ORM.CONTACTS_SUBLIST.BusinessPartyCode = value;
            },
            _setObj:    function(value) {
                CONTACTS_ORM.CONTACTS_SUBLIST.Rcbp3s = value;
            }
        },
        CONTACTS_SUBDETAIL : {
            Rcbp3:                  {},
            _setObj:    function(value) {
                CONTACTS_ORM.CONTACTS_SUBDETAIL.Rcbp3 = value;
            }
        }
    };
    CONTACTS_ORM.init = function() {
        CONTACTS_ORM.CONTACTS_SEARCH.BusinessPartyNameLike =    '';
        CONTACTS_ORM.CONTACTS_LIST.CanLoadedMoreData =          true;
        CONTACTS_ORM.CONTACTS_LIST.Rcbp1s =                     {};
        CONTACTS_ORM.CONTACTS_DETAIL.TrxNo =                    '';
        CONTACTS_ORM.CONTACTS_DETAIL.TabIndex =                 0;
        CONTACTS_ORM.CONTACTS_DETAIL.Rcbp1 =                    {};
        CONTACTS_ORM.CONTACTS_SUBLIST.BusinessPartyCode =       '';
        CONTACTS_ORM.CONTACTS_SUBLIST.Rcbp3s =                  {};
        CONTACTS_ORM.CONTACTS_SUBDETAIL.Rcbp3 =                  {};
    };
    return CONTACTS_ORM;
});
