sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("purchaseorder.controller.PoHeader", {
        onInit() {
        },

// Navigation Header To Item

        onNavPOItemView: function(oEvent) {
            var SelectedPONumber = oEvent.getSource().getBindingContext().getProperty().Ponumber;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePoItem", {"PONumber" : SelectedPONumber});
        },

// Sort Selection Field

    onSelectionChangeHeader: function(oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        if (oSelectedItem) {
            this.sKey = oSelectedItem.getKey();
            this.sText = oSelectedItem.getText();
        }
    },  
    
// Selected Sort Fragment ( Ascending or Descending ) 

    onAddSort : function () {
    if(!this.addSortHeader){
        // fragment calling
        this.addSortHeader = new sap.ui.xmlfragment("purchaseorder.view.HeaderSort",this);
        this.getView().addDependent(this.addSortHeader);
        }    
    this.addSortHeader.open();  

    },        

//Sort Fragment Ok Button  

    onOk : function () {
    
        var sortAsc = sap.ui.getCore().byId("Asc").getSelected();
        var sortDesc = sap.ui.getCore().byId("Desc").getSelected();
        if (sortAsc) {
            var oSorterAsc = new sap.ui.model.Sorter(this.sKey, false);
            this.getView().byId("HeaderTable").getBinding("items").sort(oSorterAsc);
            this.addSortHeader.close();
        } 
        else if (sortDesc) {
            var oSorterDesc = new sap.ui.model.Sorter(this.sKey, true);
            this.getView().byId("HeaderTable").getBinding("items").sort(oSorterDesc);
            this.addSortHeader.close();
        }
    },

// Sort Fragment Cancel Button   

    onCancel : function () {
        this.addSortHeader.close();
    },

    });
});