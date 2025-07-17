sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("newassessment.controller.VendorData", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RouteVendorData").attachPatternMatched(this._objectRouteVendorData, this)
        },
        
        _objectRouteVendorData : function(oEvent) {

            var passedMaterialId = oEvent.getParameter("arguments").MaterialId;
            var AllMaterialData = this.getView().getModel("MaterialValue").oData;
            var selectedVendors = [];
       
            for (var i = 0; i < AllMaterialData.length; i++) {

                if (AllMaterialData[i].materialId === passedMaterialId) {

                    selectedVendors = AllMaterialData[i].vendors;
                }
            }

        var VendorDetailsModel = new sap.ui.model.json.JSONModel(selectedVendors);
        this.getView().byId("VendorList").setModel(VendorDetailsModel, "Vendor");
    },

    // LiveChange 
    onLiveChangeVendor : function(evt) {

        var searchstring = evt.getParameter("newValue");
        var filters  = new sap.ui.model.Filter("vendorName","Contains",searchstring);
        this.getView().byId("VendorList").getBinding("items").filter(filters);


    },
    
    });
});