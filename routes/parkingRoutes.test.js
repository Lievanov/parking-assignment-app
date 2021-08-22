const parkingRoutes = require("./parkingRoutes")
// @ponicode
describe("parkingRoutes", () => {
    test("0", () => {
        let callFunction = () => {
            parkingRoutes("https://")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            parkingRoutes("https://twitter.com/path?abc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            parkingRoutes("http://www.croplands.org/account/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            parkingRoutes("www.google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            parkingRoutes("https://croplands.org/app/a/reset?token=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            parkingRoutes(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
