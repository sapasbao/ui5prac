sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/table/Table",
    "sap/ui/table/Column",
    "sap/ui/model/json/JSONModel",
    "sap/m/Text",
    "sap/m/OverflowToolbar",
    "sap/m/Title",
    "sap/m/ToolbarSpacer"
], (Controller, MessageToast, Table, Column, JSONModel, Text, OverflowToolbar, Title, ToolbarSpacer) => {
    "use strict";

    return Controller.extend("c.g.ui5prac.controller.Root", {
        onInit() {
            console.log("Root controller initialized");

            // initialize custom table.
            this.initializeCustomTable();
        },

        //  initialize custom data model for the table.
        initializeCustomDataModel: function () {
           
            // initialize JSON model and load data from JSON file using sapui5 require.toUrl to get the correct path.
            // this is to make sure our urls dont break in flp and no-flp modes. 
            const oModel = new JSONModel();
            const oModelDataPath = sap.ui.require.toUrl("c/g/ui5prac/model/data.json");

            // load the model path and then attach request completed and failed handlers 
            // to log the status of the model loading.
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
            // fetch oModel with data from JSON file.
            const oModel = this.initializeCustomDataModel();

            // create product table with basic settings.
            const oTable = new Table({
                id: this.createId("productTable"),
                visibleRowCount: 10,
                alternateRowColors: true,
                enableBusyIndicator: true,
                toolbar: true
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
            
            // bind the rows to the products path in the model.
            oTable.bindRows("/products");

            // add the table to the view.
            this.byId("productCustomTable").addItem(oTable);

            // create overflow toolbar with title and spacer.
            const oToolbar = new OverflowToolbar({
                content: [
                    new Title({
                        text: "Products"
                    }),
                    new ToolbarSpacer()
                ]
            });

            // add the toolbar to the Table. 
            oTable.addExtension(oToolbar);

        }



    });
});