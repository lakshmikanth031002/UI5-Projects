sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("newassessment.controller.MaterialData", {
        onInit() {

        },

// LiveChange 
        onLiveChangeMaterial : function(evt) {

            var searchstring = evt.getParameter("newValue");
            var filters  = new sap.ui.model.Filter("materialName","Contains",searchstring);
            this.getView().byId("MateiralTable").getBinding("items").filter(filters);


        },
        
// Navigation MaterialData view to VendorData view

        onNavigationToVendor : function(evt) {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteVendorData" ,
               { "MaterialId": evt.getSource().getBindingContext("MaterialValue").getProperty().materialId} )
        
        }
    });
});