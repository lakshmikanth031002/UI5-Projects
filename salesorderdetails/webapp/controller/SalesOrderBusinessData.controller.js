sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (BaseController) => {
    "use strict";

    return BaseController.extend("salesorderdetails.controller.SalesOrderBusinessData", {
        onInit() {

            var businessDataModel = new sap.ui.model.json.JSONModel("model/SalesOrderBusinessData.json");
            this.getView().setModel(businessDataModel);

        },

// Navigation Business View to Partner View

        onNavPartnerView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderPartnerData");
        },

// Back Navigation Business view to Item View      

        onNavBackItemView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderItem");
        }

    });
});