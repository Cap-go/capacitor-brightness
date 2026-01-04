import Capacitor
import UIKit

@objc(CapgoBrightnessPlugin)
public class CapgoBrightnessPlugin: CAPPlugin, CAPBridgedPlugin {
    private let pluginVersion: String = "8.0.0"

    public let identifier = "CapgoBrightnessPlugin"
    public let jsName = "CapgoBrightness"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getBrightness", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBrightness", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSystemBrightness", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setSystemBrightness", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSystemBrightnessMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setSystemBrightnessMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isUsingSystemBrightness", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restoreSystemBrightness", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private var savedBrightness: CGFloat?

    @objc func getBrightness(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let brightness = UIScreen.main.brightness
            call.resolve(["brightness": brightness])
        }
    }

    @objc func setBrightness(_ call: CAPPluginCall) {
        guard let brightness = call.getFloat("brightness") else {
            call.reject("brightness is required")
            return
        }

        let clampedBrightness = max(0.0, min(1.0, CGFloat(brightness)))

        DispatchQueue.main.async {
            // Save the current brightness if not already saved
            if self.savedBrightness == nil {
                self.savedBrightness = UIScreen.main.brightness
            }
            UIScreen.main.brightness = clampedBrightness
            call.resolve()
        }
    }

    @objc func getSystemBrightness(_ call: CAPPluginCall) {
        // On iOS, there's no distinction between app and system brightness
        // The screen brightness is global
        DispatchQueue.main.async {
            let brightness = UIScreen.main.brightness
            call.resolve(["brightness": brightness])
        }
    }

    @objc func setSystemBrightness(_ call: CAPPluginCall) {
        guard let brightness = call.getFloat("brightness") else {
            call.reject("brightness is required")
            return
        }

        let clampedBrightness = max(0.0, min(1.0, CGFloat(brightness)))

        DispatchQueue.main.async {
            UIScreen.main.brightness = clampedBrightness
            call.resolve()
        }
    }

    @objc func getSystemBrightnessMode(_ call: CAPPluginCall) {
        // iOS doesn't expose brightness mode programmatically
        // Always return UNKNOWN
        call.resolve(["mode": 0])
    }

    @objc func setSystemBrightnessMode(_ call: CAPPluginCall) {
        // iOS doesn't support changing brightness mode programmatically
        call.reject("Not supported on iOS")
    }

    @objc func isUsingSystemBrightness(_ call: CAPPluginCall) {
        // On iOS, we track if we've set a custom brightness
        call.resolve(["isUsing": self.savedBrightness == nil])
    }

    @objc func restoreSystemBrightness(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if let savedBrightness = self.savedBrightness {
                UIScreen.main.brightness = savedBrightness
                self.savedBrightness = nil
            }
            call.resolve()
        }
    }

    @objc func isAvailable(_ call: CAPPluginCall) {
        call.resolve(["available": true])
    }

    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        // iOS doesn't require special permissions for brightness
        call.resolve(["brightness": "granted"])
    }

    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        // iOS doesn't require special permissions for brightness
        call.resolve(["brightness": "granted"])
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve(["version": self.pluginVersion])
    }
}
