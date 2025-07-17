/*global QUnit*/

sap.ui.define([
	"salesorderdetails/controller/SalesOrderHeader.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SalesOrderHeader Controller");

	QUnit.test("I should test the SalesOrderHeader controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
