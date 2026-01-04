import { registerPlugin } from '@capacitor/core';

import type { CapgoBrightnessPlugin } from './definitions';

const CapgoBrightness = registerPlugin<CapgoBrightnessPlugin>('CapgoBrightness', {
  web: () => import('./web').then((m) => new m.CapgoBrightnessWeb()),
});

export * from './definitions';
export { CapgoBrightness };
