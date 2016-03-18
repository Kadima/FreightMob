appControllers.controller('PaymentApprovalCtrl', ['$scope', '$state',
    function($scope, $state) {
        $scope.PA = {
            VoucherNo: '',
            VendorName: ''
        };
        $scope.returnMain = function() {
            $state.go('index.main', {}, {});
        };
        $scope.GoToList = function(TypeName) {
            var FilterName = '';
            var FilterValue = '';
            if (TypeName === 'Voucher No') {
                FilterValue = $scope.PA.VoucherNo;
                FilterName = 'VoucherNo'
            } else if (TypeName === 'Vendor Name') {
                FilterValue = $scope.PA.VendorName;
                FilterName = 'VendorName'
            }
            $state.go('paymentApprovalList', {
                'FilterName': FilterName,
                'FilterValue': FilterValue
            }, {
                reload: true
            });
        };
        $('#iVoucherNo').on('keydown', function(e) {
            if (e.which === 9 || e.which === 13) {
                $scope.GoToList('Voucher No');
            }
        });
        $('#iVendorName').on('keydown', function(e) {
            if (e.which === 9 || e.which === 13) {
                $scope.GoToList('Vendor Name');
            }
        });
    }
]);

appControllers.controller('PaymentApprovalListCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'WebApiService',
    function($scope, $state, $stateParams, $ionicPopup, WebApiService) {
        var RecordCount = 0;
        var dataResults = new Array();
        $scope.Filter = {
            FilterName: $stateParams.FilterName,
            FilterValue: $stateParams.FilterValue,
            CanLoadedMoreData: true,
            IsSelectAll: false
        };
        $scope.plviStatus = {
            text: "USE",
            checked: false
        };
        $scope.returnSearch = function() {
            $state.go('paymentApproval', {}, {});
        };
        $scope.funcShowDate = function(utc) {
            return moment(utc).format('DD-MMM-YYYY');
        };
        $scope.showApproval = function() {
            if ($scope.plviStatus.text === 'USE') {
                var appPlvi1 = [];
                for (var i = 0; i <= $scope.plvi1s.length - 1; i++) {
                    if ($scope.plvi1s[i].StatusCode === 'APP') {
                        appPlvi1.push($scope.plvi1s[i]);
                    }
                }
                if (appPlvi1.length > 0) {
                    var jsonData = {
                        "plvi1s": appPlvi1
                    };
                    var strUri = "/api/freight/plvi1/update";
                    WebApiService.Post(strUri, jsonData, true).then(function success(result) {
                        var removeApp = function(plvi1s) {
                            for (var i = 0; i <= plvi1s.length - 1; i++) {
                                if (plvi1s[i].StatusCode === 'APP') {
                                    $scope.plvi1s.splice(i, 1);
                                    removeApp($scope.plvi1s);
                                    break;
                                }
                            }
                        };
                        removeApp($scope.plvi1s);
                        var alertPopup = $ionicPopup.alert({
                            title: "Approval Successfully!",
                            okType: 'button-calm'
                        });
                    }, function error(error) {
                        var strError = '';
                        if (error === null) {
                            strError = 'Approval Failed! XHR Error 500.';
                        } else {
                            strError = 'Approval Failed! ' + error;
                        }
                        var alertPopup = $ionicPopup.alert({
                            title: strError,
                            okType: 'button-assertive'
                        });
                        alertPopup.then(function(res) {
                            console.log(strError);
                        });
                    });
                }
            }
        };
        $scope.plviStatusChange = function() {
            if ($scope.plviStatus.checked) {
                $scope.plviStatus.text = "APP";
            } else {
                $scope.plviStatus.text = "USE";
            }
            RecordCount = 0;
            dataResults = new Array();
            $scope.Filter.CanLoadedMoreData = true;
            $scope.plvi1s = dataResults;
            $scope.loadMore();
        };
        $scope.ClickSelect = function(Plvi1) {
            if ($scope.plviStatus.text != 'USE') {
                Plvi1.IsSelected = false;
            } else {
                if (Plvi1.IsSelected) {
                    Plvi1.StatusCode = 'APP';
                } else {
                    Plvi1.StatusCode = 'USE';
                }
            }
        };
        $scope.ClickSelectAll = function() {
            if ($scope.plvi1s != null && $scope.plvi1s.length > 0 && $scope.plviStatus.text === 'USE') {
                $scope.Filter.IsSelectAll = !$scope.Filter.IsSelectAll;
                if ($scope.Filter.IsSelectAll) {
                    for (var i = 0; i <= $scope.plvi1s.length - 1; i++) {
                        $scope.plvi1s[i].IsSelected = true;
                        $scope.plvi1s[i].StatusCode = 'APP';
                    }
                } else {
                    for (var i = 0; i <= $scope.plvi1s.length - 1; i++) {
                        $scope.plvi1s[i].IsSelected = false;
                        $scope.plvi1s[i].StatusCode = 'USE';
                    }
                }
            }
        };
        $scope.loadMore = function() {
            var strUri = "/api/freight/plvi1/sps?RecordCount=" + RecordCount + "&StatusCode=" + $scope.plviStatus.text
            if ($scope.Filter.FilterValue != null && $scope.Filter.FilterValue.length > 0) {
                if ($scope.Filter.FilterName === "VoucherNo") {
                    strUri = strUri + "&VoucherNo=" + $scope.Filter.FilterValue;
                } else {
                    strUri = strUri + "&VendorName=" + $scope.Filter.FilterValue;
                }
            }
            WebApiService.GetParam(strUri, false).then(function success(result) {
                if (result.data.results.length > 0) {
                    dataResults = dataResults.concat(result.data.results);
                    $scope.plvi1s = dataResults;
                    $scope.Filter.CanLoadedMoreData = true;
                    RecordCount = RecordCount + 20;
                } else {
                    $scope.Filter.CanLoadedMoreData = false;
                    RecordCount = 0;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
    }
]);

appControllers.controller('MemoCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'WebApiService',
    function($scope, $state, $stateParams, $ionicPopup, WebApiService) {
        $scope.Saus1 = {
            UserID: sessionStorage.getItem("UserId"),
            Memo: ''
        };
        if ($scope.Saus1.UserID === null) {
            $scope.Saus1.UserID = 's';
        }
        var alertPopup = null;
        $scope.returnMain = function() {
            $state.go('index.main', {}, {});
        };
        $scope.returnUpdateMemo = function() {
            if (alertPopup === null) {
                var jsonData = {
                    "saus1": $scope.Saus1
                };
                var strUri = "/api/freight/saus1/memo";
                WebApiService.Post(strUri, jsonData, true).then(function success(result) {
                    alertPopup = $ionicPopup.alert({
                        title: "Save Successfully!",
                        okType: 'button-calm'
                    });
                });
            } else {
                alertPopup.close();
                alertPopup = null;
            }
        };
        var GetSaus1 = function(uid) {
            var strUri = "/api/freight/saus1/memo?userID=" + uid;
            WebApiService.GetParam(strUri, true).then(function success(result) {
                $scope.Saus1.Memo = result.data.results;
            });
        };
        GetSaus1($scope.Saus1.UserID);
    }
]);

appControllers.controller('ReminderCtrl', ['$scope', '$state', '$stateParams', 'WebApiService',
    function($scope, $state, $stateParams, WebApiService) {
        $scope.returnMain = function() {
            $state.go('index.main', {}, {});
        };
        $scope.items = [{
            id: 1,
            Subject: 'Payment Voucher need Approve',
            Message: 'Please help to approve the ref no : PV15031841',
            CreateBy: 'S',
            UserID: 'S',
            DueDate: 'Nov 14,2015',
            DueTime: '11:20'
        }, {
            id: 2,
            Subject: 'Email to Henry',
            Message: 'Need email to henry for the new request for the mobile at the monring.',
            CreateBy: 'S',
            UserID: 'S',
            DueDate: 'Nov 16,2015',
            DueTime: '09:20'
        }];
    }
]);

appControllers.controller('DocumentScanCtrl', ['$scope', '$state', '$stateParams', 'WebApiService',
    function($scope, $state, $stateParams, WebApiService) {
        $scope.returnMain = function() {
            $state.go('index.main', {}, {});
        };

    }
]);