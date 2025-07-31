sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("podetails.controller.PurchaseOrderHeader", {
        onInit() {
            // this.onReadData();
        },

// Read Operation 
        // onReadData: function(){

        //     var oDataModel = this.getOwnerComponent().getModel();
        //     var oJSONModel = new sap.ui.model.json.JSONModel();
        //     // var oFilter =  new sap.ui.model.Filter({
        //     //     path: 'PurchasingDocumentNumber',
        //     //     operator: "EQ",
        //     //     value1: '0001000003'
        //     // })
        //     var oBusyDialog = new sap.m.BusyDialog({
        //         title: "Loading Data",
        //         text: "Please Wait...",
        //         customIcon: "./css/loading.png"
        //     })
        //     oBusyDialog.open();
        //     oDataModel.read( "/PurchaseOrderHeaderSet" ,{
        //         // filters: [oFilter],
        //         urlParameters: {
        //             "$expand": "Nav_PoItem"
        //         },
        //         success : function(oresponse) {
        //             var filteredResults = oresponse.results.find(item => item.PurchasingDocumentNumber === '1000003');
        //             oJSONModel.setProperty("/Header",filteredResults);
        //             this.getView().setModel(oJSONModel,"oHeaderJson");
        //             oBusyDialog.close();
        //         }.bind(this),
        //         error:function(oerror){
        //             debugger;
        //         }
        //     }
        //     )

        // },
        
// Navigation to Header to Item

        onNavPOItemView: function(oEvent) {
            var SelectedPONumber = oEvent.getSource().getBindingContext().getProperty().PurchasingDocumentNumber;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePurchaseOrderItem", {"PONumber" : SelectedPONumber});
        }
    });
});