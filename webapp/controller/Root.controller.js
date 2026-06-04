sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/table/Table",
    "sap/ui/table/Column",
    "sap/ui/model/json/JSONModel",
    "sap/m/Text"
], (Controller, MessageToast, Table, Column, JSONModel, Text) => {
    "use strict";

    return Controller.extend("c.g.ui5prac.controller.Root", {
        onInit() {
            console.log("Root controller initialized");

            // initialize custom table.
            this.initializeCustomTable();
        },

        //  initialize custom data model for the table.
        initializeCustomDataModel: function () {
           
            const oModel = new JSONModel();
            const oModelDataPath = sap.ui.require.toUrl("c/g/ui5prac/model/data.json");
            oModel.loadData(oModelDataPath);

            oModel.attachRequestCompleted(() => {
                console.log("Data model loaded successfully" + oModel);
            });

            oModel.attachRequestFailed(() => {
                console.error("Failed to load data model");
            });

            return oModel;

        },

        // initialize custom table with data binding.
        initializeCustomTable: function () {

            const oModel = this.initializeCustomDataModel();

            // create product table with basic settings.
            const oTable = new Table({
                id: this.createId("productTable"),
                visibleRowCount: 10,
                alternateRowColors: true,
                enableBusyIndicator: true,
            })

            // Set the model to the table.
            oTable.setModel(oModel);

            // assign columns. 
            // add column for product batch number. 
            oTable.addColumn(
                new Column({
                    label: new Text({
                        text: "Batch"
                    }),
                    template: new Text({
                        text: "{product_batch_number}"
                    })
                })
            );

            // add column for product quantity. 
            oTable.addColumn(
                new Column({
                    label: new Text({
                        text: "Quantity"
                    }),
                    template: new Text({
                        text: "{quantity}"
                    })
                })
            );

            // add column for produced at date. 
            oTable.addColumn(
                new Column({
                    label: new Text({
                        text: "Produced At"
                    }),
                    template: new Text({
                        text: "{produced_at}"
                    })
                })
            );

            // add column for Produced by
            oTable.addColumn(
                new Column({
                    label: new Text({
                        text: "Produced By"
                    }),
                    template: new Text({
                        text: "{produced_by}"
                    })
                })
            );

            // add column for price. 
            oTable.addColumn(
                new Column({
                    label: new Text({
                        text: "Price"
                    }),
                    template: new Text({
                        text: "{price}"
                    })
                })
            );
            
            oTable.bindRows("/products");

            this.byId("productCustomTable").addItem(oTable);
        }



    });
});