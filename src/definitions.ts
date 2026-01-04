export interface CapgoBrightnessPlugin {
  /**
   * Get the current brightness level of the device's main screen.
   *
   * @since 0.0.1
   * @returns A promise that resolves with the current brightness value (0 to 1).
   */
  getBrightness(): Promise<GetBrightnessResult>;

  /**
   * Set the brightness level of the device's main screen.
   *
   * On iOS, the brightness will persist until the device is locked.
   * On Android, the brightness only applies to the current activity.
   *
   * @since 0.0.1
   * @param options - The brightness options.
   */
  setBrightness(options: SetBrightnessOptions): Promise<void>;

  /**
   * Get the system-wide screen brightness.
   *
   * @since 0.0.1
   * @platform Android
   * @returns A promise that resolves with the system brightness value (0 to 1).
   */
  getSystemBrightness(): Promise<GetBrightnessResult>;

  /**
   * Set the system-wide screen brightness.
   * Requires WRITE_SETTINGS permission on Android.
   * This also changes the brightness mode to MANUAL.
   *
   * @since 0.0.1
   * @platform Android
   * @param options - The brightness options.
   */
  setSystemBrightness(options: SetBrightnessOptions): Promise<void>;

  /**
   * Get the current system brightness mode (automatic or manual).
   * Requires WRITE_SETTINGS permission on Android.
   *
   * @since 0.0.1
   * @platform Android
   * @returns A promise that resolves with the current brightness mode.
   */
  getSystemBrightnessMode(): Promise<GetBrightnessModeResult>;

  /**
   * Set the system brightness mode (automatic or manual).
   * Requires WRITE_SETTINGS permission on Android.
   *
   * @since 0.0.1
   * @platform Android
   * @param options - The brightness mode options.
   */
  setSystemBrightnessMode(options: SetBrightnessModeOptions): Promise<void>;

  /**
   * Check if the current activity is using the system-wide brightness value.
   *
   * @since 0.0.1
   * @platform Android
   * @returns A promise that resolves with whether the activity is using system brightness.
   */
  isUsingSystemBrightness(): Promise<IsUsingSystemBrightnessResult>;

  /**
   * Reset the brightness setting of the current activity to use the system-wide value.
   *
   * @since 0.0.1
   * @platform Android
   */
  restoreSystemBrightness(): Promise<void>;

  /**
   * Check if the Brightness API is available on the current device.
   *
   * @since 0.0.1
   * @returns A promise that resolves with whether the API is available.
   */
  isAvailable(): Promise<IsAvailableResult>;

  /**
   * Check user's permissions for accessing system brightness.
   *
   * @since 0.0.1
   * @returns A promise that resolves with the permission status.
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Request permissions for accessing system brightness.
   * On Android, this opens the system settings to grant WRITE_SETTINGS permission.
   *
   * @since 0.0.1
   * @returns A promise that resolves with the permission status.
   */
  requestPermissions(): Promise<PermissionStatus>;

  /**
   * Get the native plugin version.
   *
   * @since 0.0.1
   * @returns A promise that resolves with the plugin version.
   */
  getPluginVersion(): Promise<GetPluginVersionResult>;
}

/**
 * Result of getBrightness or getSystemBrightness.
 *
 * @since 0.0.1
 */
export interface GetBrightnessResult {
  /**
   * The brightness value from 0 to 1.
   * 0 is the minimum brightness, 1 is the maximum brightness.
   *
   * @since 0.0.1
   */
  brightness: number;
}

/**
 * Options for setBrightness or setSystemBrightness.
 *
 * @since 0.0.1
 */
export interface SetBrightnessOptions {
  /**
   * The brightness value from 0 to 1.
   * 0 is the minimum brightness, 1 is the maximum brightness.
   *
   * @since 0.0.1
   */
  brightness: number;
}

/**
 * Result of getSystemBrightnessMode.
 *
 * @since 0.0.1
 */
export interface GetBrightnessModeResult {
  /**
   * The current brightness mode.
   *
   * @since 0.0.1
   */
  mode: BrightnessMode;
}

/**
 * Options for setSystemBrightnessMode.
 *
 * @since 0.0.1
 */
export interface SetBrightnessModeOptions {
  /**
   * The brightness mode to set.
   * Cannot be set to UNKNOWN.
   *
   * @since 0.0.1
   */
  mode: BrightnessMode;
}

/**
 * Result of isUsingSystemBrightness.
 *
 * @since 0.0.1
 */
export interface IsUsingSystemBrightnessResult {
  /**
   * Whether the current activity is using the system-wide brightness value.
   *
   * @since 0.0.1
   */
  isUsing: boolean;
}

/**
 * Result of isAvailable.
 *
 * @since 0.0.1
 */
export interface IsAvailableResult {
  /**
   * Whether the Brightness API is available on the current device.
   *
   * @since 0.0.1
   */
  available: boolean;
}

/**
 * Permission status result.
 *
 * @since 0.0.1
 */
export interface PermissionStatus {
  /**
   * Whether the permission to modify system brightness is granted.
   *
   * @since 0.0.1
   */
  brightness: PermissionState;
}

/**
 * Result of getPluginVersion.
 *
 * @since 0.0.1
 */
export interface GetPluginVersionResult {
  /**
   * The native plugin version.
   *
   * @since 0.0.1
   */
  version: string;
}

/**
 * The brightness mode.
 *
 * @since 0.0.1
 */
export enum BrightnessMode {
  /**
   * The brightness mode is unknown.
   *
   * @since 0.0.1
   */
  UNKNOWN = 0,
  /**
   * The brightness is automatically adjusted by the system.
   *
   * @since 0.0.1
   */
  AUTOMATIC = 1,
  /**
   * The brightness is manually set by the user.
   *
   * @since 0.0.1
   */
  MANUAL = 2,
}

/**
 * Permission state.
 *
 * @since 0.0.1
 */
export type PermissionState = 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';
