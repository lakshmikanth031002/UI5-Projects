sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
], function (Controller) {
    "use strict";

    return Controller.extend("assessment.controller.VendorAddress", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RouteVendorAddress").attachPatternMatched(this._onRouteVendorAddress,this)
        },

        _onRouteVendorAddress : function(oEvent) {

            var passmaterialId = oEvent.getParameter("arguments").MaterialId;
            var passedVendorId = oEvent.getParameter("arguments").VendorId;

            var AllMaterial = this.getView().getModel("MaterialValue").oData;
       
            for (var i = 0; i < AllMaterial.length; i++) {
                if (AllMaterial[i].materialId === passmaterialId) {
                    var selectedVendors = AllMaterial[i].vendors;
                }
            }
            for (var i = 0; i < selectedVendors.length; i++) {
                if (selectedVendors[i].vendorId === passedVendorId) {
                    var newselectedVendors = selectedVendors[i].address;
                }
            }

            // var selectedVendors = [this.getView().getModel("MaterialValue").oData.find(material=> material.materialId === passmaterialId).vendors.find(vendors=> vendors.vendorId === passedVendorId).address]
            var VendorDetailsModel = new sap.ui.model.json.JSONModel([newselectedVendors]);
            this.getView().byId("VendorAddressTable").setModel(VendorDetailsModel,"VendorAddress");

        },

// Navigation Back to Vendor View

onNavBackToVendorView : function() {

            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.navTo("RouteVendor" ,
            //     {"MaterialId" : 'MAT001'}
            // );

         window.history.back();

        }

        });
    });            