sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("c.g.ui5prac.controller.Root", {
        onInit() {
            console.log("Root controller initialized");
        },

        showToast: function(){
            MessageToast.show("Button clicked");
        }
    });
});