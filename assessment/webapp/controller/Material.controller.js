sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("assessment.controller.Material", {
        onInit() {
        //  var getData = new sap.ui.model.json.JSONModel("model/Material.json");
        //  this.getView().setModel(getData);

        if(!this.addMaterial){
            // fragment calling
            this.addMaterial = new sap.ui.xmlfragment("assessment.view.Sort",this);
            this.getView().addDependent(this.addMaterial);
        }    

        },

/////////////////////////// LiveChange For Table 

        // onLiveChangeTable : function(oEvent) {

        //  var searchValue = oEvent.getParameter("newValue");
        //  var filtervalues = new sap.ui.model.Filter("materialName","Contains",searchValue);
        //  this.getView().byId("MaterialTable").getBinding("items").filter(filtervalues); 

        // },

/////////////////////////// Change Filter

onChangeTable : function(oEvent) {

    var searchValue = oEvent.getParameter("value");
    var filtervalues = new sap.ui.model.Filter("materialName","Contains",searchValue);
    this.getView().byId("MaterialTable").getBinding("items").filter(filtervalues); 

   },

/////////////////////////// LiveChange Filter

        // onLiveChangeList : function(oEvent) {

        //  var searchValue = oEvent.getParameter("newValue");
        //  var filterValue = new sap.ui.model.Filter("vendor_name","Contains",searchValue);
        //  this.getView().byId("VendorList").getBinding("items").filter(filterValue);

        // },

/////////////////////////// Navigation Material To Vendor

        onNavigationToVendor : function(evt) {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteVendor" ,
                { "MaterialId": evt.getSource().getBindingContext("MaterialValue").getProperty().materialId} )

        },

/////////////////////////// Selected Filed for Sort Fragment   

    onSelectionChange: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this.sKey = oSelectedItem.getKey();
                this.sText = oSelectedItem.getText();
            }
    },
    
/////////////////////////// SELECTED SORT FRAGMENT ( Ascending or Descending ) 

onAddSort : function () {
        if(!this.addSort){
            // fragment calling
            this.addSort = new sap.ui.xmlfragment("assessment.view.Sort",this);
            this.getView().addDependent(this.addSort);
        }    
        this.addSort.open();        
},        


/////////////////////////// Sort Fragment Ok Button  

        onOk : function () {
    
            var sortAsc = sap.ui.getCore().byId("Asc").getSelected();
            var sortDesc = sap.ui.getCore().byId("Desc").getSelected();
            if (sortAsc) {
    
                var oSorterAsc = new sap.ui.model.Sorter(this.sText, false);
                this.getView().byId("MaterialTable").getBinding("items").sort(oSorterAsc);
                this.addSort.close();
            } 
            else if (sortDesc) {
    
                var oSorterDesc = new sap.ui.model.Sorter(this.sText, true);
                this.getView().byId("MaterialTable").getBinding("items").sort(oSorterDesc);
                this.addSort.close();
            }
        },

/////////////////////////// Sort Fragment Cancel Button   
     
    onCancel : function () {
        this.addSort.close();
    },

/////////////////////////// ADD MATERIAL FRAGMENT 

onAddMaterialPress:function(){
    this.mode = "ADD";

        if(!this.addMaterial){
            // fragment calling
            this.addMaterial = new sap.ui.xmlfragment("assessment.view.AddMaterial",this);
            this.getView().addDependent(this.addMaterial);
        }  
        this.addMaterial.open();

    var newMaterialObj = {
        "materialId": this.getView().getModel("MaterialValue").oData.length + 1,
        "materialName": "",
        "description": "",
        "unitOfMeasure": "",
        "category": "",
        "currentStock": "",
        "minStockLevel": "",
        "maxStockLevel": "",
    };
    var materialObj = new sap.ui.model.json.JSONModel(newMaterialObj);
    this.getView().setModel(materialObj,"materialObj");
    this.addMaterial.open();
},

/////////////////////////// ADD MATERIAL FRAGMENT SAVE BUTTON

onSaveProduct:function(){

    if(this.mode == "ADD"){
        this.getView().getModel().oData.MaterialValue.push(this.getView().getModel("materialObj").oData);
        sap.m.MessageToast.show("New Material is added");
    }else{
        sap.m.MessageToast.show("Product is Updated");
    }
        this.getView().getModel().updateBindings(true);
        this.addMaterial.close();
},


    });
});
