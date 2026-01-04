import { WebPlugin } from '@capacitor/core';

import type {
  CapgoBrightnessPlugin,
  GetBrightnessResult,
  SetBrightnessOptions,
  GetBrightnessModeResult,
  SetBrightnessModeOptions,
  IsUsingSystemBrightnessResult,
  IsAvailableResult,
  PermissionStatus,
  GetPluginVersionResult,
} from './definitions';
import { BrightnessMode } from './definitions';

export class CapgoBrightnessWeb extends WebPlugin implements CapgoBrightnessPlugin {
  async getBrightness(): Promise<GetBrightnessResult> {
    throw this.unimplemented('Not implemented on web.');
  }

  async setBrightness(_options: SetBrightnessOptions): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async getSystemBrightness(): Promise<GetBrightnessResult> {
    throw this.unimplemented('Not implemented on web.');
  }

  async setSystemBrightness(_options: SetBrightnessOptions): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async getSystemBrightnessMode(): Promise<GetBrightnessModeResult> {
    return { mode: BrightnessMode.UNKNOWN };
  }

  async setSystemBrightnessMode(_options: SetBrightnessModeOptions): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async isUsingSystemBrightness(): Promise<IsUsingSystemBrightnessResult> {
    return { isUsing: true };
  }

  async restoreSystemBrightness(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async isAvailable(): Promise<IsAvailableResult> {
    return { available: false };
  }

  async checkPermissions(): Promise<PermissionStatus> {
    return { brightness: 'granted' };
  }

  async requestPermissions(): Promise<PermissionStatus> {
    return { brightness: 'granted' };
  }

  async getPluginVersion(): Promise<GetPluginVersionResult> {
    return { version: 'web' };
  }
}
