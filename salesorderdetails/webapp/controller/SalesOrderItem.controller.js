sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (BaseController) => {
    "use strict";

    return BaseController.extend("salesorderdetails.controller.SalesOrderItem", {
        onInit() {
            var itemModel = new sap.ui.model.json.JSONModel("model/SalesOrderItem.json");
            this.getView().setModel(itemModel);
        },

        // Navigation Item View To Business View      

        onNavBusinessView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderBusinessData");
        },

        // Back Navigation Business View To Item View

        onNavBackHeaderView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderHeader");
        }    
    });
});