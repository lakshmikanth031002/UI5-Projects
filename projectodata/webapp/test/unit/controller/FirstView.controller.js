/*global QUnit*/

sap.ui.define([
	"projectodata/controller/FirstView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FirstView Controller");

	QUnit.test("I should test the FirstView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
