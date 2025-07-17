sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
], function (Controller) {
    "use strict";

    return Controller.extend("assessment.controller.Vendor", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RouteVendor").attachPatternMatched(this._onRouteVendor, this)
        },

        _onRouteVendor: function (oEvent) {

            // var passedMaterialId = oEvent.getParameter("arguments").MaterialId;
            this.passedMaterialId = oEvent.getParameter("arguments").MaterialId;
            
            var materials = this.getView().getModel("MaterialValue").oData;
            var selectedVendors = [];
       
            for (var i = 0; i < materials.length; i++) {
                if (materials[i].materialId === this.passedMaterialId) {
                    selectedVendors = materials[i].vendors;
                    break;
                }
            }
            // var selectedVendors = this.getView().getModel("MaterialValue").oData.find(material => material.materialId === this.passedMaterialId).vendors;
            var VendorDetailsModel = new sap.ui.model.json.JSONModel(selectedVendors);
            this.getView().byId("VendorTable").setModel(VendorDetailsModel, "Vendor");

        },
/////////////////////////// LiveChange 


/////////////////////////// Navigation Back to Material View

        onNavBackToMaterialView: function () {
            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.navTo("RouteMaterial")
            window.history.back();

        },

/////////////////////////// Navigation Vendor to Vendro Address

        onNavigationToVendorAddress: function (evt) {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteVendorAddress",
                {
                    "MaterialId": this.passedMaterialId,
                    "VendorId": evt.getSource().getBindingContext("Vendor").getProperty().vendorId
                }
            )
        }

    });
});            