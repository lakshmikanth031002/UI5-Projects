/*global QUnit*/

sap.ui.define([
	"project1/controller/ProductData.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ProductData Controller");

	QUnit.test("I should test the ProductData controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
