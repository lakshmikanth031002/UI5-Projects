sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
], function (Controller) {
    "use strict";
    return Controller.extend("demo.employeelist.employeelist.controller.EmployeePersonalInfo", {


    onInit() {

        var employeePersonal = new sap.ui.model.json.JSONModel("model/employeepersonalinfo.json");
        this.getView().setModel(employeePersonal);
        sap.ui.core.UIComponent.getRouterFor(this).getRoute("RouteEmployeePersonalInfo").attachPatternMatched(this._onRouteMatched,this)

    },

    _onRouteMatched:function(oEvent){

        var that = this;
        var passedEmployeeName = oEvent.getParameter("arguments").EmployeeName;
        if(!this.initialLoad) {
          this.initialLoad =true;
          window.setTimeout(function(){
            var FilterEmployeePersonalData = new sap.ui.model.json.JSONModel(that.getView().getModel().oData.EmployeePersonalData[passedEmployeeName]);
            that.getView().setModel(FilterEmployeePersonalData,"FilterEmployeePersonalData");
          },1500);
        }else{
          var FilterEmployeePersonalData = new sap.ui.model.json.JSONModel(that.getView().getModel().oData.EmployeePersonalData[passedEmployeeName]);
            that.getView().setModel(FilterEmployeePersonalData,"FilterEmployeePersonalData");
        }
       
      },


});
});