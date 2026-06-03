describe("Root view E2E Tests", () => {
    it("should dislay a MessageToast when the button is pressed", async () => {
        // go to browser link.
        await browser.goTo("#/")

        // locate the UI5 button we need to test. 
        const oButton = await browser.asControl({
            selector: {
                id: "btn1",
                viewName: "c.g.ui5prac.view.Root"
            }
        })

        // click the button
        await oButton.press()

        // locate the messageToast now.
        // MessageToast are not tied to views, so we have to their css selector directly. 
        const oMessageToast = await $(".sapMMessageToast")

        // check if the Toast is displayed or not. 
        await expect(oMessageToast).toBeDisplayed();

        // check the message of the toast. 
        await expect(oMessageToast).toHaveText("Button clicked")
    })
})