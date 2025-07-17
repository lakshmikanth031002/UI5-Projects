sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("salesorderdetails.controller.SalesOrderHeader", {
        
        onInit() {
            var headerModel = new sap.ui.model.json.JSONModel("model/SalesOrderHeader.json");
            this.getView().setModel(headerModel);    
        },

// Navigation Header View To Item View      

        onNavItemView:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSalesOrderItem");
        }
    });
});