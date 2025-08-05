sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("purchaseorder.controller.PoSchedule", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RoutePoSchedule").attachPatternMatched(this._objPatternMatched,this);
        },
// Get the Po Number and Item Number
_objPatternMatched:function(oEvent){
    var that = this;
    var passedPONumber = oEvent.getParameter("arguments").PONumber;
    var passedPOItemNumber = oEvent.getParameter("arguments").POItemNumber;
    var oBusyDialog = new sap.m.BusyDialog({
        title: "Loading Data",
        text: "Please Wait...",
        customIcon: "./css/loading.png"
    })
    oBusyDialog.open();
    this.getOwnerComponent().getModel().read("/PurchasingDocumentItemSet",{
        urlParameters:{
            "$expand":"Nav_ItemToSchedule"
        },
        filters:[new sap.ui.model.Filter("Ponumber","EQ","000"+passedPONumber),
                 new sap.ui.model.Filter("Poitem", "EQ",passedPOItemNumber)],
        success:function(odata,results){
        var ScheduleModel = new sap.ui.model.json.JSONModel([odata.results[0].Nav_ItemToSchedule.results[0]]);
        that.getView().byId("ScheduleTable").setModel(ScheduleModel,"oScheduleJson");
        oBusyDialog.close();
        },
        error:function(oError){
            MessageBox.error(JSON.parse(oError.responseText).error.message.value);
        }
    })
   
},

// Navigation Back to Header View

    onNavBackPOHeaderView: function(){
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RoutePoHeader");
    }


    });
});