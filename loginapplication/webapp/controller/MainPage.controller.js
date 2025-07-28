sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("loginapplication.controller.MainPage", {
        onInit() {
            
        },

        onPurchaseOrderCreate : function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePurchaseOrderCreatePage")  
        }

});
});