# @capgo/capacitor-brightness
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_brightness"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_brightness"> Missing a feature? We'll build the plugin for you 💪</a></h2>
</div>

Control screen brightness on iOS and Android.

## Why Capacitor Brightness?

The only Capacitor plugin providing **complete brightness control** for both iOS and Android:

- **App-level brightness** - Control brightness for your activity without affecting system settings
- **System-level brightness** - Modify the global device brightness (Android)
- **Auto/Manual mode** - Switch between automatic and manual brightness modes (Android)
- **Permission handling** - Built-in support for WRITE_SETTINGS permission flow
- **Cross-platform** - Consistent API across iOS and Android

Essential for reading apps, video players, camera apps, and any app needing screen brightness control.

## Documentation

Full documentation available at: https://capgo.app/docs/plugins/brightness/

## Install

```bash
npm install @capgo/capacitor-brightness
npx cap sync
```

## Android Configuration

For Android, if you want to modify the system brightness (not just the app brightness), you need to add the `WRITE_SETTINGS` permission to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
```

Note: This permission requires user confirmation through system settings on Android 6.0+.

## Requirements

- iOS: iOS 15+ (uses UIScreen.brightness)
- Android: API 24+ (uses WindowManager for app brightness, Settings.System for system brightness)

## API

<docgen-index>

* [`getBrightness()`](#getbrightness)
* [`setBrightness(...)`](#setbrightness)
* [`getSystemBrightness()`](#getsystembrightness)
* [`setSystemBrightness(...)`](#setsystembrightness)
* [`getSystemBrightnessMode()`](#getsystembrightnessmode)
* [`setSystemBrightnessMode(...)`](#setsystembrightnessmode)
* [`isUsingSystemBrightness()`](#isusingsystembrightness)
* [`restoreSystemBrightness()`](#restoresystembrightness)
* [`isAvailable()`](#isavailable)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getBrightness()

```typescript
getBrightness() => Promise<GetBrightnessResult>
```

Get the current brightness level of the device's main screen.

**Returns:** <code>Promise&lt;<a href="#getbrightnessresult">GetBrightnessResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### setBrightness(...)

```typescript
setBrightness(options: SetBrightnessOptions) => Promise<void>
```

Set the brightness level of the device's main screen.

On iOS, the brightness will persist until the device is locked.
On Android, the brightness only applies to the current activity.

| Param         | Type                                                                  | Description               |
| ------------- | --------------------------------------------------------------------- | ------------------------- |
| **`options`** | <code><a href="#setbrightnessoptions">SetBrightnessOptions</a></code> | - The brightness options. |

**Since:** 8.0.0

--------------------


### getSystemBrightness()

```typescript
getSystemBrightness() => Promise<GetBrightnessResult>
```

Get the system-wide screen brightness.

**Returns:** <code>Promise&lt;<a href="#getbrightnessresult">GetBrightnessResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### setSystemBrightness(...)

```typescript
setSystemBrightness(options: SetBrightnessOptions) => Promise<void>
```

Set the system-wide screen brightness.
Requires WRITE_SETTINGS permission on Android.
This also changes the brightness mode to MANUAL.

| Param         | Type                                                                  | Description               |
| ------------- | --------------------------------------------------------------------- | ------------------------- |
| **`options`** | <code><a href="#setbrightnessoptions">SetBrightnessOptions</a></code> | - The brightness options. |

**Since:** 8.0.0

--------------------


### getSystemBrightnessMode()

```typescript
getSystemBrightnessMode() => Promise<GetBrightnessModeResult>
```

Get the current system brightness mode (automatic or manual).
Requires WRITE_SETTINGS permission on Android.

**Returns:** <code>Promise&lt;<a href="#getbrightnessmoderesult">GetBrightnessModeResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### setSystemBrightnessMode(...)

```typescript
setSystemBrightnessMode(options: SetBrightnessModeOptions) => Promise<void>
```

Set the system brightness mode (automatic or manual).
Requires WRITE_SETTINGS permission on Android.

| Param         | Type                                                                          | Description                    |
| ------------- | ----------------------------------------------------------------------------- | ------------------------------ |
| **`options`** | <code><a href="#setbrightnessmodeoptions">SetBrightnessModeOptions</a></code> | - The brightness mode options. |

**Since:** 8.0.0

--------------------


### isUsingSystemBrightness()

```typescript
isUsingSystemBrightness() => Promise<IsUsingSystemBrightnessResult>
```

Check if the current activity is using the system-wide brightness value.

**Returns:** <code>Promise&lt;<a href="#isusingsystembrightnessresult">IsUsingSystemBrightnessResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### restoreSystemBrightness()

```typescript
restoreSystemBrightness() => Promise<void>
```

Reset the brightness setting of the current activity to use the system-wide value.

**Since:** 8.0.0

--------------------


### isAvailable()

```typescript
isAvailable() => Promise<IsAvailableResult>
```

Check if the Brightness API is available on the current device.

**Returns:** <code>Promise&lt;<a href="#isavailableresult">IsAvailableResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check user's permissions for accessing system brightness.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 8.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request permissions for accessing system brightness.
On Android, this opens the system settings to grant WRITE_SETTINGS permission.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 8.0.0

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<GetPluginVersionResult>
```

Get the native plugin version.

**Returns:** <code>Promise&lt;<a href="#getpluginversionresult">GetPluginVersionResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### Interfaces


#### GetBrightnessResult

Result of getBrightness or getSystemBrightness.

| Prop             | Type                | Description                                                                                 | Since |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| **`brightness`** | <code>number</code> | The brightness value from 0 to 1. 0 is the minimum brightness, 1 is the maximum brightness. | 8.0.0 |


#### SetBrightnessOptions

Options for setBrightness or setSystemBrightness.

| Prop             | Type                | Description                                                                                 | Since |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| **`brightness`** | <code>number</code> | The brightness value from 0 to 1. 0 is the minimum brightness, 1 is the maximum brightness. | 8.0.0 |


#### GetBrightnessModeResult

Result of getSystemBrightnessMode.

| Prop       | Type                                                      | Description                  | Since |
| ---------- | --------------------------------------------------------- | ---------------------------- | ----- |
| **`mode`** | <code><a href="#brightnessmode">BrightnessMode</a></code> | The current brightness mode. | 8.0.0 |


#### SetBrightnessModeOptions

Options for setSystemBrightnessMode.

| Prop       | Type                                                      | Description                                           | Since |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------- | ----- |
| **`mode`** | <code><a href="#brightnessmode">BrightnessMode</a></code> | The brightness mode to set. Cannot be set to UNKNOWN. | 8.0.0 |


#### IsUsingSystemBrightnessResult

Result of isUsingSystemBrightness.

| Prop          | Type                 | Description                                                             | Since |
| ------------- | -------------------- | ----------------------------------------------------------------------- | ----- |
| **`isUsing`** | <code>boolean</code> | Whether the current activity is using the system-wide brightness value. | 8.0.0 |


#### IsAvailableResult

Result of isAvailable.

| Prop            | Type                 | Description                                                    | Since |
| --------------- | -------------------- | -------------------------------------------------------------- | ----- |
| **`available`** | <code>boolean</code> | Whether the Brightness API is available on the current device. | 8.0.0 |


#### PermissionStatus

Permission status result.

| Prop             | Type                                                        | Description                                                    | Since |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------- | ----- |
| **`brightness`** | <code><a href="#permissionstate">PermissionState</a></code> | Whether the permission to modify system brightness is granted. | 8.0.0 |


#### GetPluginVersionResult

Result of getPluginVersion.

| Prop          | Type                | Description                | Since |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | The native plugin version. | 8.0.0 |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


### Enums


#### BrightnessMode

| Members         | Value          | Description                                             | Since |
| --------------- | -------------- | ------------------------------------------------------- | ----- |
| **`UNKNOWN`**   | <code>0</code> | The brightness mode is unknown.                         | 8.0.0 |
| **`AUTOMATIC`** | <code>1</code> | The brightness is automatically adjusted by the system. | 8.0.0 |
| **`MANUAL`**    | <code>2</code> | The brightness is manually set by the user.             | 8.0.0 |

</docgen-api>
