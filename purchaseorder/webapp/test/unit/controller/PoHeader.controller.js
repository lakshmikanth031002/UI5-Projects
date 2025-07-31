/*global QUnit*/

sap.ui.define([
	"purchaseorder/controller/PoHeader.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PoHeader Controller");

	QUnit.test("I should test the PoHeader controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
