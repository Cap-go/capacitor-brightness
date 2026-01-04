# @capgo/capacitor-brightness

Control screen brightness on iOS and Android.

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

**Since:** 0.0.1

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

**Since:** 0.0.1

--------------------


### getSystemBrightness()

```typescript
getSystemBrightness() => Promise<GetBrightnessResult>
```

Get the system-wide screen brightness.

**Returns:** <code>Promise&lt;<a href="#getbrightnessresult">GetBrightnessResult</a>&gt;</code>

**Since:** 0.0.1

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

**Since:** 0.0.1

--------------------


### getSystemBrightnessMode()

```typescript
getSystemBrightnessMode() => Promise<GetBrightnessModeResult>
```

Get the current system brightness mode (automatic or manual).
Requires WRITE_SETTINGS permission on Android.

**Returns:** <code>Promise&lt;<a href="#getbrightnessmoderesult">GetBrightnessModeResult</a>&gt;</code>

**Since:** 0.0.1

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

**Since:** 0.0.1

--------------------


### isUsingSystemBrightness()

```typescript
isUsingSystemBrightness() => Promise<IsUsingSystemBrightnessResult>
```

Check if the current activity is using the system-wide brightness value.

**Returns:** <code>Promise&lt;<a href="#isusingsystembrightnessresult">IsUsingSystemBrightnessResult</a>&gt;</code>

**Since:** 0.0.1

--------------------


### restoreSystemBrightness()

```typescript
restoreSystemBrightness() => Promise<void>
```

Reset the brightness setting of the current activity to use the system-wide value.

**Since:** 0.0.1

--------------------


### isAvailable()

```typescript
isAvailable() => Promise<IsAvailableResult>
```

Check if the Brightness API is available on the current device.

**Returns:** <code>Promise&lt;<a href="#isavailableresult">IsAvailableResult</a>&gt;</code>

**Since:** 0.0.1

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check user's permissions for accessing system brightness.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 0.0.1

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request permissions for accessing system brightness.
On Android, this opens the system settings to grant WRITE_SETTINGS permission.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 0.0.1

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<GetPluginVersionResult>
```

Get the native plugin version.

**Returns:** <code>Promise&lt;<a href="#getpluginversionresult">GetPluginVersionResult</a>&gt;</code>

**Since:** 0.0.1

--------------------


### Interfaces


#### GetBrightnessResult

Result of getBrightness or getSystemBrightness.

| Prop             | Type                | Description                                                                                 | Since |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| **`brightness`** | <code>number</code> | The brightness value from 0 to 1. 0 is the minimum brightness, 1 is the maximum brightness. | 0.0.1 |


#### SetBrightnessOptions

Options for setBrightness or setSystemBrightness.

| Prop             | Type                | Description                                                                                 | Since |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| **`brightness`** | <code>number</code> | The brightness value from 0 to 1. 0 is the minimum brightness, 1 is the maximum brightness. | 0.0.1 |


#### GetBrightnessModeResult

Result of getSystemBrightnessMode.

| Prop       | Type                                                      | Description                  | Since |
| ---------- | --------------------------------------------------------- | ---------------------------- | ----- |
| **`mode`** | <code><a href="#brightnessmode">BrightnessMode</a></code> | The current brightness mode. | 0.0.1 |


#### SetBrightnessModeOptions

Options for setSystemBrightnessMode.

| Prop       | Type                                                      | Description                                           | Since |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------- | ----- |
| **`mode`** | <code><a href="#brightnessmode">BrightnessMode</a></code> | The brightness mode to set. Cannot be set to UNKNOWN. | 0.0.1 |


#### IsUsingSystemBrightnessResult

Result of isUsingSystemBrightness.

| Prop          | Type                 | Description                                                             | Since |
| ------------- | -------------------- | ----------------------------------------------------------------------- | ----- |
| **`isUsing`** | <code>boolean</code> | Whether the current activity is using the system-wide brightness value. | 0.0.1 |


#### IsAvailableResult

Result of isAvailable.

| Prop            | Type                 | Description                                                    | Since |
| --------------- | -------------------- | -------------------------------------------------------------- | ----- |
| **`available`** | <code>boolean</code> | Whether the Brightness API is available on the current device. | 0.0.1 |


#### PermissionStatus

Permission status result.

| Prop             | Type                                                        | Description                                                    | Since |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------- | ----- |
| **`brightness`** | <code><a href="#permissionstate">PermissionState</a></code> | Whether the permission to modify system brightness is granted. | 0.0.1 |


#### GetPluginVersionResult

Result of getPluginVersion.

| Prop          | Type                | Description                | Since |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | The native plugin version. | 0.0.1 |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


### Enums


#### BrightnessMode

| Members         | Value          | Description                                             | Since |
| --------------- | -------------- | ------------------------------------------------------- | ----- |
| **`UNKNOWN`**   | <code>0</code> | The brightness mode is unknown.                         | 0.0.1 |
| **`AUTOMATIC`** | <code>1</code> | The brightness is automatically adjusted by the system. | 0.0.1 |
| **`MANUAL`**    | <code>2</code> | The brightness is manually set by the user.             | 0.0.1 |

</docgen-api>
