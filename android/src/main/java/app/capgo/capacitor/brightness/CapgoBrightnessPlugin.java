package app.capgo.capacitor.brightness;

import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;
import android.view.WindowManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

@CapacitorPlugin(name = "CapgoBrightness", permissions = {})
public class CapgoBrightnessPlugin extends Plugin {

    private final String pluginVersion = "0.0.2";
    private float savedBrightness = -1f;

    @PluginMethod
    public void getBrightness(final PluginCall call) {
        try {
            final float brightness = getActivityBrightness();
            final JSObject ret = new JSObject();
            ret.put("brightness", brightness);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Failed to get brightness", e);
        }
    }

    @PluginMethod
    public void setBrightness(final PluginCall call) {
        final Float brightness = call.getFloat("brightness");
        if (brightness == null) {
            call.reject("brightness is required");
            return;
        }

        try {
            final float clampedBrightness = Math.max(0.0f, Math.min(1.0f, brightness));

            // Save current brightness if not already saved
            if (savedBrightness < 0) {
                savedBrightness = getActivityBrightness();
            }

            getActivity().runOnUiThread(() -> {
                final WindowManager.LayoutParams layoutParams = getActivity().getWindow().getAttributes();
                layoutParams.screenBrightness = clampedBrightness;
                getActivity().getWindow().setAttributes(layoutParams);
            });

            call.resolve();
        } catch (final Exception e) {
            call.reject("Failed to set brightness", e);
        }
    }

    @PluginMethod
    public void getSystemBrightness(final PluginCall call) {
        try {
            final int brightnessInt = Settings.System.getInt(getContext().getContentResolver(), Settings.System.SCREEN_BRIGHTNESS);
            // Convert from 0-255 to 0-1
            final float brightness = brightnessInt / 255.0f;
            final JSObject ret = new JSObject();
            ret.put("brightness", brightness);
            call.resolve(ret);
        } catch (final Settings.SettingNotFoundException e) {
            call.reject("Failed to get system brightness", e);
        }
    }

    @PluginMethod
    public void setSystemBrightness(final PluginCall call) {
        final Float brightness = call.getFloat("brightness");
        if (brightness == null) {
            call.reject("brightness is required");
            return;
        }

        if (!Settings.System.canWrite(getContext())) {
            call.reject("WRITE_SETTINGS permission not granted");
            return;
        }

        try {
            final float clampedBrightness = Math.max(0.0f, Math.min(1.0f, brightness));
            // Convert from 0-1 to 0-255
            final int brightnessInt = Math.round(clampedBrightness * 255);

            // Set manual mode first
            Settings.System.putInt(
                getContext().getContentResolver(),
                Settings.System.SCREEN_BRIGHTNESS_MODE,
                Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL
            );

            Settings.System.putInt(getContext().getContentResolver(), Settings.System.SCREEN_BRIGHTNESS, brightnessInt);

            call.resolve();
        } catch (final Exception e) {
            call.reject("Failed to set system brightness", e);
        }
    }

    @PluginMethod
    public void getSystemBrightnessMode(final PluginCall call) {
        if (!Settings.System.canWrite(getContext())) {
            call.reject("WRITE_SETTINGS permission not granted");
            return;
        }

        try {
            final int mode = Settings.System.getInt(getContext().getContentResolver(), Settings.System.SCREEN_BRIGHTNESS_MODE);

            int result;
            if (mode == Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC) {
                result = 1; // AUTOMATIC
            } else if (mode == Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL) {
                result = 2; // MANUAL
            } else {
                result = 0; // UNKNOWN
            }

            final JSObject ret = new JSObject();
            ret.put("mode", result);
            call.resolve(ret);
        } catch (final Settings.SettingNotFoundException e) {
            call.reject("Failed to get brightness mode", e);
        }
    }

    @PluginMethod
    public void setSystemBrightnessMode(final PluginCall call) {
        final Integer mode = call.getInt("mode");
        if (mode == null) {
            call.reject("mode is required");
            return;
        }

        if (mode == 0) {
            call.reject("Cannot set brightness mode to UNKNOWN");
            return;
        }

        if (!Settings.System.canWrite(getContext())) {
            call.reject("WRITE_SETTINGS permission not granted");
            return;
        }

        try {
            final int systemMode;
            if (mode == 1) {
                systemMode = Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC;
            } else {
                systemMode = Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL;
            }

            Settings.System.putInt(getContext().getContentResolver(), Settings.System.SCREEN_BRIGHTNESS_MODE, systemMode);

            call.resolve();
        } catch (final Exception e) {
            call.reject("Failed to set brightness mode", e);
        }
    }

    @PluginMethod
    public void isUsingSystemBrightness(final PluginCall call) {
        try {
            final WindowManager.LayoutParams layoutParams = getActivity().getWindow().getAttributes();
            final boolean isUsing = layoutParams.screenBrightness < 0;
            final JSObject ret = new JSObject();
            ret.put("isUsing", isUsing);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Failed to check brightness mode", e);
        }
    }

    @PluginMethod
    public void restoreSystemBrightness(final PluginCall call) {
        try {
            getActivity().runOnUiThread(() -> {
                final WindowManager.LayoutParams layoutParams = getActivity().getWindow().getAttributes();
                // Setting to negative value means use system brightness
                layoutParams.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE;
                getActivity().getWindow().setAttributes(layoutParams);
            });

            savedBrightness = -1f;
            call.resolve();
        } catch (final Exception e) {
            call.reject("Failed to restore system brightness", e);
        }
    }

    @PluginMethod
    public void isAvailable(final PluginCall call) {
        final JSObject ret = new JSObject();
        ret.put("available", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void checkPermissions(final PluginCall call) {
        final JSObject ret = new JSObject();
        if (Settings.System.canWrite(getContext())) {
            ret.put("brightness", "granted");
        } else {
            ret.put("brightness", "prompt");
        }
        call.resolve(ret);
    }

    @PluginMethod
    public void requestPermissions(final PluginCall call) {
        if (Settings.System.canWrite(getContext())) {
            final JSObject ret = new JSObject();
            ret.put("brightness", "granted");
            call.resolve(ret);
            return;
        }

        // Open system settings to grant WRITE_SETTINGS permission
        final Intent intent = new Intent(Settings.ACTION_MANAGE_WRITE_SETTINGS);
        intent.setData(Uri.parse("package:" + getContext().getPackageName()));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getContext().startActivity(intent);

        // We can't wait for the result, so return prompt status
        final JSObject ret = new JSObject();
        ret.put("brightness", "prompt");
        call.resolve(ret);
    }

    @PluginMethod
    public void getPluginVersion(final PluginCall call) {
        try {
            final JSObject ret = new JSObject();
            ret.put("version", this.pluginVersion);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Could not get plugin version", e);
        }
    }

    private float getActivityBrightness() {
        final WindowManager.LayoutParams layoutParams = getActivity().getWindow().getAttributes();
        if (layoutParams.screenBrightness < 0) {
            // Using system brightness, get system value
            try {
                final int brightnessInt = Settings.System.getInt(getContext().getContentResolver(), Settings.System.SCREEN_BRIGHTNESS);
                return brightnessInt / 255.0f;
            } catch (final Settings.SettingNotFoundException e) {
                return 0.5f; // Default fallback
            }
        }
        return layoutParams.screenBrightness;
    }
}
