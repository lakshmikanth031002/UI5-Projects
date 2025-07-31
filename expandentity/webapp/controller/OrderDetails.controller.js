sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.expandentity.controller.OrderDetails", {
        onInit() {
            
        },
        onNavOrderItemView: function(oEvent){

           var SelectedOrderId = oEvent.getSource().getBindingContext().getProperty().OrderID;

           var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.navTo("RouteOrderDrillDownItem", 
               { "OrderId": SelectedOrderId })
    

        }
    });
});