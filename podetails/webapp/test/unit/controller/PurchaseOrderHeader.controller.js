/*global QUnit*/

sap.ui.define([
	"podetails/controller/PurchaseOrderHeader.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PurchaseOrderHeader Controller");

	QUnit.test("I should test the PurchaseOrderHeader controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
