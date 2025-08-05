sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("purchaseorder.controller.PoItem", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RoutePoItem").attachPatternMatched(this._objPatternMatched,this);
        },
        
// Get PO Number 
        _objPatternMatched:function(oEvent){
            var that = this;
            var passedPONumber = oEvent.getParameter("arguments").PONumber;
            var oBusyDialog = new sap.m.BusyDialog({
                title: "Loading Data",
                text: "Please Wait...",
                customIcon: "./css/loading.png"
            })
            oBusyDialog.open();
            this.getOwnerComponent().getModel().read("/PurchasingDocumentHeaderSet",{
                urlParameters:{
                    "$expand":"Nav_HeaderToItem"
                },
                filters:[new sap.ui.model.Filter("Ponumber","EQ","000"+passedPONumber)],
                success:function(odata,results){
                var ItemModel = new sap.ui.model.json.JSONModel([odata.results[0].Nav_HeaderToItem.results[0]]);
                that.getView().byId("ItemTable").setModel(ItemModel,"oItemJson");
                oBusyDialog.close();
                },
                error:function(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            })
           
        },


// Navigation to Schedule view

    onNavPOScheduleView: function(oEvent){
        var SelectedPONumber = oEvent.getSource().getBindingContext("oItemJson").getProperty("Ponumber");
        var SelectedPOItemNumber = oEvent.getSource().getBindingContext("oItemJson").getProperty("Poitem");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RoutePoSchedule", {
            "PONumber" : SelectedPONumber,
            "POItemNumber" : SelectedPOItemNumber});
    },

// Navigation Back to Header View

        onNavBackPOHeaderView: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePoHeader");
        }




    });
});