sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], (Controller,MessageBox,Fragment) => {
    "use strict";

    return Controller.extend("purchaseorder.controller.PoHeader", {
        onInit() {

        },

// Search Field

    onChangeTable: function(evt){
        var oDataModel = this.getOwnerComponent().getModel();
        var searchValue = evt.getParameter("value");
        var filtervalue= new sap.ui.model.Filter("Ponumber","Contains",searchValue);
        this.getView().byId("HeaderTable").getBinding("items").filter(filtervalue); 
        console.log(filtervalue);

    },

// Row Selection 
    onRowSelect: function(oEvent) {
        var oTable = this.getView().byId("SmartTable").getTable();
        var aSelectedIndices = oTable.getSelectedIndices();
        if (aSelectedIndices.length > 0) {
            var oSelectedContext = oTable.getContextByIndex(aSelectedIndices[0]);
            var sPONumber = oSelectedContext.getProperty("Ponumber");
            this._selectedPONumber = sPONumber; // Store for button press
        }
    },
// Navigation Header To Item
    onNavPOItemView: function(oEvent) {
        var SelectedPONumber = this._selectedPONumber;
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RoutePoItem", {"PONumber" : SelectedPONumber});
    },

// Create New Purchase Order
    onCreatePO: function(oEvent){

        if (!this.NewPO) {
            console.log("Attempting to load fragment: purchaseorder.view.CreatePO"); // Debug log
            Fragment.load({
                id: this.getView().getId(),
                name: "purchaseorder.view.CreatePO",
                controller: this
            }).then(oDialog => {
                this.NewPO = oDialog;
                this.getView().addDependent(this.NewPO);
                console.log("Dialog loaded successfully:", this.NewPO); // Debug log
                this.NewPO.open();
            }).catch(oError => {
                console.error("Fragment load error:", oError); // Detailed error log
                MessageBox.error("Failed to load dialog: " + oError.message + ". Check console for details.");
            });
        } else {
            console.log("Reusing existing dialog:", this.NewPO); // Debug log
            this.NewPO.open();
        }

    },

// Save PO create fragment
        onSavePO: function(){
            var oDataModel = this.getOwnerComponent().getModel();
            var oView = this.getView();

            // Collect input values
            var headerData = {
                "Ponumber": "",
                "Compcode": oView.byId("CCInput").getValue(),
                "Doctype": oView.byId("DTInput").getValue(),
                "Status":"",
                "Creatdate": "2025-12-06T00:00:00",
                "Createdby":"",
                "Itemintvl":"",
                "Vendor": oView.byId("SUInput").getValue(),
                "Pmnttrms":"",
                "Purchorg": oView.byId("POInput").getValue(),
                "Purgroup": oView.byId("PGInput").getValue(),
                "Currency": oView.byId("CUInput").getValue(),
                "Exchrate":"0.00",
                "Docdate":"2025-12-06T00:00:00",
                "Subitemint":"",
                Nav_HeaderToItem: [
                        {
                        "Ponumber": "",
                        "Poitem": oView.byId("INInput").getValue(),
                        "Shorttext": "Sample Item",
                        "Material": oView.byId("MAInput").getValue(),
                        "Ematerial":"",
                        "Plant": oView.byId("PInput").getValue(),
                        "Stgeloc": oView.byId("SLInput").getValue(),
                        "Matlgroup":"",
                        "Inforec":"",
                        "Quantity": oView.byId("QInput").getValue(),
                        // "Quantity": parseFloat(oView.byId("QInput").getValue()), //this is helps to convert string to numeric
                        "Pounit": oView.byId("PUInput").getValue(),
                        "Netprice": oView.byId("NPInput").getValue()
                        // "Netprice": parseFloat(oView.byId("NPInput").getValue()) //this is helps to convert string to numeric
                    }]
            };
            // Validation
            var requiredFields = [
                headerData.Compcode, headerData.Doctype, headerData.Vendor, headerData.Purchorg,
                headerData.Purgroup, headerData.Currency, headerData.Nav_HeaderToItem[0].Poitem,
                headerData.Nav_HeaderToItem[0].Material, headerData.Nav_HeaderToItem[0].Plant,
                headerData.Nav_HeaderToItem[0].Stgeloc, headerData.Nav_HeaderToItem[0].Quantity,
                headerData.Nav_HeaderToItem[0].Pounit, headerData.Nav_HeaderToItem[0].Netprice
            ];
            if (requiredFields.some(field => !field && field !== 0)) {
                MessageBox.error("Please fill all required fields.");
                return;
            }
            oDataModel.create("/PurchasingDocumentHeaderSet", headerData, {
                success: function (oData, response) {
                    MessageBox.success("Purchase Order"+" "+oData.Ponumber+" "+"created successfully.");
                    this.NewPO.close();
                    // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    // oRouter.navTo("RoutePoItem", { "PONumber": oData.Ponumber });
                    // this.getView().byId("SamrtTable").rebindTable();
                }.bind(this),
                error: function (oError) {
                    MessageBox.error("Error creating Purchase Order: " + oError.message);
                }
            });
        },

// Cancel PO create fragment
        onCancelPO: function(){
            this.NewPO.close();
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