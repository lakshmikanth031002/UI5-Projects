sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.EmployeeData", {
        onInit() {
        },

        onAfterRendering:function(){
            var that = this;
            this.getOwnerComponent().getModel().read("/Employees",{
                // filters:[new sap.ui.model.Filter("EmployeeID","EQ","1")],  HardCode the FilterValue
                success:function(oData, results){
                    var EmployeeData = new sap.ui.model.json.JSONModel(oData);
                    that.getView().setModel(EmployeeData,"EmployeeData")
                },
                error:function(error){
                    MessageBox.error(JSON.parse(error.responseText).error.message.value);
                }
            });
        },
        onChangeTable:function(evt){

            var GetValue =  evt.getParameter("value");
            var FilterValue = new sap.ui.model.Filter("FirstName","Contains",GetValue);
            this.getView().byId("EmployeeTable").getBinding("items").filter(FilterValue);

        },
        onAddAescending:function(){
            var SortAsc = new sap.ui.model.Sorter("FirstName",this._sortAescending);
            this.getView().byId("EmployeeTable").getBinding("items").sort(SortAsc);
        },

// Selected Field Sort 
        onSelectionChange: function(oEvent){
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this.sKey = oSelectedItem.getKey();
                this.sText = oSelectedItem.getText();
            }
        },

        onAddSort:function(){
            if(!this.addSort){
                this.addSort = new sap.ui.xmlfragment("project1.view.Sort",this);
                this.getView().addDependent(this.addSort);
                }    
                this.addSort.open();  
        },
        onOk : function (oEvent) {

            var sortAsc = sap.ui.getCore().byId("Asc").getSelected();
            var sortDesc = sap.ui.getCore().byId("Desc").getSelected();
            var sort = new sap.ui.model.Sorter(this.sText, sortAsc == true ? false : true)
            // if (sortAsc) {
            //     var oSorterAsc = new sap.ui.model.Sorter(this.sText, false);
            //     this.getView().byId("EmployeeTable").getBinding("items").sort(oSorterAsc);
            //     this.addSort.close();
            // } else {
            //     var oSorterDesc = new sap.ui.model.Sorter(this.sText, true);
            //     this.getView().byId("EmployeeTable").getBinding("items").sort(oSorterDesc);
            //     this.addSort.close();
            // }
            this.getView().byId("EmployeeTable").getBinding("items").sort(sort);
            this.addSort.close();
            
            },
            onCancel : function () {
            
                this.addSort.close();
            },

    });
});