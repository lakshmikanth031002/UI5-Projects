// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ], (Controller) => {
//     "use strict";

//     return Controller.extend("ladera.deploymentproject.controller.Header", {
//         onInit() {
//         },




        
//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ushell/library"
], function (Controller, ushellLib) {
    "use strict";

    return Controller.extend("ladera.deploymentproject.controller.Header", {
        onNavigate: async function () {
            // Get the CrossApplicationNavigation service
            const oCrossAppNavigator = await sap.ushell.Container.getServiceAsync("CrossApplicationNavigation");

            // Define the target intent
            const target = {
                semanticObject: "SalesOrder",
                action: "display",
                params: { // Optional: Pass parameters to the target app
                    orderId: "12345"
                }
            };

            // Perform navigation
            oCrossAppNavigator.toExternal({
                target: {
                    shellHash: oCrossAppNavigator.hrefForExternal({
                        target: target
                    })
                }
            });
        }
    });
});