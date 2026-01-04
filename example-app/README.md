# @capgo/capacitor-brightness Example App

This is a minimal example app demonstrating the usage of the `@capgo/capacitor-brightness` plugin.

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Build the web app:
   ```bash
   bun run build
   ```

3. Add platforms:
   ```bash
   npx cap add ios
   npx cap add android
   ```

4. Sync the plugin:
   ```bash
   npx cap sync
   ```

5. Run on a device or simulator:
   ```bash
   npx cap open ios
   npx cap open android
   ```

## Available Actions

- **Get brightness**: Get the current screen brightness
- **Set brightness**: Set the screen brightness (0-1)
- **Get system brightness**: Get the system-wide brightness (Android)
- **Set system brightness**: Set the system-wide brightness (Android)
- **Get brightness mode**: Get auto/manual mode (Android)
- **Set brightness mode**: Set auto/manual mode (Android)
- **Restore system brightness**: Reset to system value
- **Check/Request permissions**: Handle WRITE_SETTINGS permission (Android)
