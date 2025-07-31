sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("podetails.controller.PurchaseOrderItem", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RoutePurchaseOrderItem").attachPatternMatched(this._objPatternMatched,this);
        },

        _objPatternMatched:function(oEvent){
            var that = this;
            var passedPONumber = oEvent.getParameter("arguments").PONumber;
            var oBusyDialog = new sap.m.BusyDialog({
                title: "Loading Data",
                text: "Please Wait...",
                customIcon: "./css/loading.png"
            })
            oBusyDialog.open();
            this.getOwnerComponent().getModel().read("/PurchaseOrderHeaderSet",{
                urlParameters:{
                    "$expand":"Nav_PoItem"
                },
                filters:[new sap.ui.model.Filter("PurchasingDocumentNumber","EQ","000"+passedPONumber)],
                success:function(odata,results){
                var ItemModel = new sap.ui.model.json.JSONModel([odata.results[0].Nav_PoItem.results[0]]);
                that.getView().byId("ItemTable").setModel(ItemModel,"oItemJson");
                oBusyDialog.close();
                },
                error:function(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            })
           
          },

        onNavBackPOItemView: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePurchaseOrderHeader");
        }
    });
});