sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("ladera.expandentity.controller.OrderDrillDownItem", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RouteOrderDrillDownItem").attachPatternMatched(this._objPatternMatched,this);
            
        },
// Get the Passed Key field Value Function
        _objPatternMatched:function(oEvent){
            var that = this;
            var passedOrderId = oEvent.getParameter("arguments").OrderId;
            this.getOwnerComponent().getModel().read("/Orders",{
                urlParameters:{
                    "$expand":"Customer,Order_Details"
                },
                filters:[new sap.ui.model.Filter("OrderID","EQ",passedOrderId)],
                success:function(oData,results){
                    var JSONModel = new sap.ui.model.json.JSONModel(oData.results[0]);
                    that.getView().setModel(JSONModel, "OrderDrill");
                    console.log(oData);

                },
                error:function(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            })

        },
        onNavBackOrderDetails: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteOrderDetails");
        }
    });
});