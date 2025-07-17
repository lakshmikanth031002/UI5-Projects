/*global QUnit*/

sap.ui.define([
	"newassessment/controller/MaterialData.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MaterialData Controller");

	QUnit.test("I should test the MaterialData controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
