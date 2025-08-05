sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller) {
    "use strict";

    return Controller.extend("demo.employeelist.employeelist.controller.EmployeeList", {
        onInit() {

           var productsModel = new sap.ui.model.json.JSONModel("model/employee.json");
           this.getView().setModel(productsModel, "Employee");

           if(!this.addEmployee){
            // fragment calling
            this.addEmployee = new sap.ui.xmlfragment("demo.employeelist.employeelist.view.AddEmployee",this);
            this.getView().addDependent(this.addEmployee);
        }

        },  

// LIVECHANGE EVENT

        // onSearchEmployeeId: function(evt) {  
        //   var searchemployeeid = evt.getParameter("newValue");
        //   var filtersemployeeid  = new sap.ui.model.Filter("EmployeeId","Contains",searchemployeeid);
        //   this.getView().byId("ListId").getBinding("items").filter(filtersemployeeid);

        // } ,

        onSearchEmployeeName: function(evt) {

            var searchemployeename = evt.getParameter("newValue");
            var filtersemployeename  = new sap.ui.model.Filter("EmployeeName","Contains",searchemployeename);
            this.getView().byId("ListId").getBinding("items").filter(filtersemployeename);
  
          } ,

        //   onSearchEmployeeLocation: function(evt) {

        //     var searchemployeelocation = evt.getParameter("newValue");
        //     var filtersemployeelocation  = new sap.ui.model.Filter("Location","Contains",searchemployeelocation);
        //     this.getView().byId("ListId").getBinding("items").filter(filtersemployeelocation);
  
        //   } ,  


// CHANGE EVENT

        // OnChangeEventEmployeeName : function(evt) {

        //     var changeEmployeename = evt.getParameter("value");
        //     var filtersEmployeeName  = new sap.ui.model.Filter("EmployeeName","Contains",changeEmployeename);
        //     this.getView().byId("ListId").getBinding("items").filter(filtersEmployeeName);

        // },

        OnChangeEventEmployeeLocation : function(evt) {

            var changeEmployeeLocation = evt.getParameter("value");
            var filtersEmployeeLocation  = new sap.ui.model.Filter("Location","Contains",changeEmployeeLocation);
            this.getView().byId("ListId").getBinding("items").filter(filtersEmployeeLocation);

        },

// ADD EMPLOYEE DEATILS FRAGMENT 

onAddEmployeePress:function(){
this.mode="ADD";
    var newEmployeeObj = {
        "EmployeeId": this.getView().getModel("Employee").oData.EmployeeList.length + 1,
        "EmployeeName": "",
        "Team": "",
        "EmployeeRole": "",
    };
    var employeeObj = new sap.ui.model.json.JSONModel(newEmployeeObj);
    this.getView().setModel(employeeObj,"employeeObj");
    this.addEmployee.open();
},        

// EDIT PRODUCT FRAGMENT

onEditEmployee:function(){
    this.mode="EDIT";
    if(!this.getView().byId("ListId").getSelectedItem()){
        sap.m.MessageToast.show("Please select an item to edit!");
        return;
    }
    var editEmployeeObj = this.getView().byId("ListId").getSelectedItem().getBindingContext("Employee").getObject();
    var employeeObj = new sap.ui.model.json.JSONModel(editEmployeeObj);
    this.getView().setModel(employeeObj,"employeeObj");
    this.addEmployee.open();

},

// Add Employee Details Fragment Save Button        
onSaveEmployee:function(){
if (this.mode == "ADD") {

    this.getView().getModel("Employee").oData.EmployeeList.push(this.getView().getModel("employeeObj").oData);
    sap.m.MessageToast.show("New Employee is added");

} else {
    sap.m.MessageToast.show("Employee Detail is Updated");
}
this.getView().getModel("Employee").updateBindings(true);
this.addEmployee.close();

},

// Add Employee Details Fragment Cancel Button        
onCancelEmployee:function(){
    this.addEmployee.close();
    },

// DELETE EMPLOYEE RECORD
onDeleteEmployee:function(evt){

var selectedRow = this.byId("ListId").getSelectedItem().getBindingContext("Employee").getPath();    
this.getView().getModel("Employee").oData.EmployeeList.splice(selectedRow,1);
this.getView().getModel("Employee").updateBindings(true);

//// line 120 and 121 bref explanation
// var oModel = this.getView().getModel("Employee");
// var aEmployeeList = oModel.getProperty("/EmployeeList");

// var iIndex = parseInt(selectedRow.split("/").pop(), 10);
// aEmployeeList.splice(iIndex, 1);
// oModel.setProperty("/EmployeeList", aEmployeeList)
            
////  Show confirmation
  sap.m.MessageToast.show("Employee deleted successfully.");

},    


// SORTING ( Ascending or Descending )

        onSortAscending: function(){
            var oSorterAsc = new sap.ui.model.Sorter("EmployeeName", this._sortAescending);
            this.getView().byId("ListId").getBinding("items").sort(oSorterAsc);
        },
        onSortDescending: function(){

        if (!this._sortDescending) {
            this._sortDescending = !this._sortDescending;
        }
            var oSorterDesc = new sap.ui.model.Sorter("EmployeeName", this._sortDescending);
            this.getView().byId("ListId").getBinding("items").sort(oSorterDesc);
    },

// SORT FRAGMENT ( Ascending or Descending ) 

onAddSort : function () {
    if(!this.addSort){
        this.addSort = new sap.ui.xmlfragment("demo.employeelist.employeelist.view.AddSort",this);
        this.getView().addDependent(this.addSort);
        }    
        this.addSort.open();    
},

onSelectionChange: function(oEvent) {
    var oSelectedItem = oEvent.getParameter("selectedItem");
    if (oSelectedItem) {
        this.sKey = oSelectedItem.getKey();
        this.sText = oSelectedItem.getText();
    }

},

onOk : function (oEvent) {

var sortAsc = sap.ui.getCore().byId("Asc").getSelected();
var sortDesc = sap.ui.getCore().byId("Desc").getSelected();

if (sortAsc) {
    var oSorterAsc = new sap.ui.model.Sorter(this.sText, false);
    this.getView().byId("ListId").getBinding("items").sort(oSorterAsc);
    this.addSort.close();
} else {
    var oSorterDesc = new sap.ui.model.Sorter(this.sText, true);
    this.getView().byId("ListId").getBinding("items").sort(oSorterDesc);
    this.addSort.close();
}

},
onCancel : function () {

    this.addSort.close();
},

// Navigation EmployeeList View to EmployeePersonalInfo View

onNavEmployeePersonalInfo : function (oEvent) {

// Get the selected item
var oItem = oEvent.getSource();
var oContext = oItem.getBindingContext("Employee");
var sEmployeeName = oContext.getProperty("EmployeeName");

    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.navTo("RouteEmployeePersonalInfo", 
        { "EmployeeName": encodeURIComponent(sEmployeeName) })

}

    });
});