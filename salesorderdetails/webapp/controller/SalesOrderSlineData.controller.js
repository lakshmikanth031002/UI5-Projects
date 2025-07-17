sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (BaseController) => {
    "use strict";

    return BaseController.extend("salesorderdetails.controller.SalesOrderSlineData", {
        onInit() {

            var SlineDataModel = new sap.ui.model.json.JSONModel("model/SalesOrderSlineData.json");
            this.getView().setModel(SlineDataModel);

        },

// Back Navigation Scheduleline View to Partner View

        onNavBackPartnerView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderPartnerData");
        }
    });
});