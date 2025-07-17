sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (BaseController) => {
    "use strict";

    return BaseController.extend("salesorderdetails.controller.SalesOrderPartner", {
        onInit() {

            var partnerDataModel = new sap.ui.model.json.JSONModel("model/SalesOrderPartnerData.json");
            this.getView().setModel(partnerDataModel);

        },

// Navigation Partner View to Scheduleline View

        onNavSlineView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderSlineData");
        },

// Back Navigation Partner View to Business View     
        onNavBackBusinessView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderBusinessData");
        }
    });
});