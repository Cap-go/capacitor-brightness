import XCTest
@testable import CapgoBrightnessPlugin

final class CapgoBrightnessPluginTests: XCTestCase {
    func testPluginVersion() {
        let plugin = CapgoBrightnessPlugin()
        XCTAssertNotNil(plugin.pluginVersion)
    }
}
