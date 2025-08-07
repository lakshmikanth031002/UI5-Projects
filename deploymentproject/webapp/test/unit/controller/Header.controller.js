/*global QUnit*/

sap.ui.define([
	"ladera/deploymentproject/controller/Header.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Header Controller");

	QUnit.test("I should test the Header controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
