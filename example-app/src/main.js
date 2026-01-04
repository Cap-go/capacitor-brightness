import './style.css';
import { CapgoBrightness, BrightnessMode } from '@capgo/capacitor-brightness';

const plugin = CapgoBrightness;

const actions = [
  {
    id: 'get-brightness',
    label: 'Get brightness',
    description: 'Gets the current brightness level of the device screen (0-1).',
    inputs: [],
    run: async () => {
      return await plugin.getBrightness();
    },
  },
  {
    id: 'set-brightness',
    label: 'Set brightness',
    description: 'Sets the screen brightness for the current activity. Value should be between 0 and 1.',
    inputs: [
      { name: 'brightness', label: 'Brightness (0-1)', type: 'number', value: 0.5, step: 0.1 },
    ],
    run: async (values) => {
      const brightness = Number(values.brightness);
      await plugin.setBrightness({ brightness });
      return { success: true, brightness };
    },
  },
  {
    id: 'get-system-brightness',
    label: 'Get system brightness',
    description: 'Gets the system-wide screen brightness (Android only).',
    inputs: [],
    run: async () => {
      return await plugin.getSystemBrightness();
    },
  },
  {
    id: 'set-system-brightness',
    label: 'Set system brightness',
    description: 'Sets the system-wide screen brightness (Android only). Requires WRITE_SETTINGS permission.',
    inputs: [
      { name: 'brightness', label: 'Brightness (0-1)', type: 'number', value: 0.5, step: 0.1 },
    ],
    run: async (values) => {
      const brightness = Number(values.brightness);
      await plugin.setSystemBrightness({ brightness });
      return { success: true, brightness };
    },
  },
  {
    id: 'get-brightness-mode',
    label: 'Get brightness mode',
    description: 'Gets the current system brightness mode (automatic or manual). Android only.',
    inputs: [],
    run: async () => {
      const result = await plugin.getSystemBrightnessMode();
      const modeNames = { 0: 'UNKNOWN', 1: 'AUTOMATIC', 2: 'MANUAL' };
      return { ...result, modeName: modeNames[result.mode] || 'UNKNOWN' };
    },
  },
  {
    id: 'set-brightness-mode',
    label: 'Set brightness mode',
    description: 'Sets the system brightness mode. Android only.',
    inputs: [
      {
        name: 'mode',
        label: 'Mode',
        type: 'select',
        value: '1',
        options: [
          { value: '1', label: 'Automatic' },
          { value: '2', label: 'Manual' },
        ],
      },
    ],
    run: async (values) => {
      const mode = Number(values.mode);
      await plugin.setSystemBrightnessMode({ mode });
      return { success: true, mode };
    },
  },
  {
    id: 'is-using-system-brightness',
    label: 'Is using system brightness',
    description: 'Checks if the current activity is using the system-wide brightness value. Android only.',
    inputs: [],
    run: async () => {
      return await plugin.isUsingSystemBrightness();
    },
  },
  {
    id: 'restore-system-brightness',
    label: 'Restore system brightness',
    description: 'Resets the brightness to use the system-wide value. Android only.',
    inputs: [],
    run: async () => {
      await plugin.restoreSystemBrightness();
      return { success: true };
    },
  },
  {
    id: 'is-available',
    label: 'Is available',
    description: 'Checks if the Brightness API is available on the current device.',
    inputs: [],
    run: async () => {
      return await plugin.isAvailable();
    },
  },
  {
    id: 'check-permissions',
    label: 'Check permissions',
    description: 'Checks the current permission status for modifying system brightness.',
    inputs: [],
    run: async () => {
      return await plugin.checkPermissions();
    },
  },
  {
    id: 'request-permissions',
    label: 'Request permissions',
    description: 'Requests permission to modify system brightness. On Android, opens system settings.',
    inputs: [],
    run: async () => {
      return await plugin.requestPermissions();
    },
  },
  {
    id: 'get-plugin-version',
    label: 'Get plugin version',
    description: 'Gets the native plugin version.',
    inputs: [],
    run: async () => {
      return await plugin.getPluginVersion();
    },
  },
];

const actionSelect = document.getElementById('action-select');
const formContainer = document.getElementById('action-form');
const descriptionBox = document.getElementById('action-description');
const runButton = document.getElementById('run-action');
const output = document.getElementById('plugin-output');

function buildForm(action) {
  formContainer.innerHTML = '';
  if (!action.inputs || !action.inputs.length) {
    const note = document.createElement('p');
    note.className = 'no-input-note';
    note.textContent = 'This action does not require any inputs.';
    formContainer.appendChild(note);
    return;
  }
  action.inputs.forEach((input) => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = input.type === 'checkbox' ? 'form-field inline' : 'form-field';

    const label = document.createElement('label');
    label.textContent = input.label;
    label.htmlFor = `field-${input.name}`;

    let field;
    switch (input.type) {
      case 'textarea': {
        field = document.createElement('textarea');
        field.rows = input.rows || 4;
        break;
      }
      case 'select': {
        field = document.createElement('select');
        (input.options || []).forEach((option) => {
          const opt = document.createElement('option');
          opt.value = option.value;
          opt.textContent = option.label;
          if (input.value !== undefined && option.value === input.value) {
            opt.selected = true;
          }
          field.appendChild(opt);
        });
        break;
      }
      case 'checkbox': {
        field = document.createElement('input');
        field.type = 'checkbox';
        field.checked = Boolean(input.value);
        break;
      }
      case 'number': {
        field = document.createElement('input');
        field.type = 'number';
        if (input.step) {
          field.step = String(input.step);
        }
        if (input.value !== undefined && input.value !== null) {
          field.value = String(input.value);
        }
        break;
      }
      default: {
        field = document.createElement('input');
        field.type = 'text';
        if (input.value !== undefined && input.value !== null) {
          field.value = String(input.value);
        }
      }
    }

    field.id = `field-${input.name}`;
    field.name = input.name;
    field.dataset.type = input.type || 'text';

    if (input.placeholder && input.type !== 'checkbox') {
      field.placeholder = input.placeholder;
    }

    if (input.type === 'checkbox') {
      fieldWrapper.appendChild(field);
      fieldWrapper.appendChild(label);
    } else {
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(field);
    }

    formContainer.appendChild(fieldWrapper);
  });
}

function getFormValues(action) {
  const values = {};
  (action.inputs || []).forEach((input) => {
    const field = document.getElementById(`field-${input.name}`);
    if (!field) return;
    switch (input.type) {
      case 'number': {
        values[input.name] = field.value === '' ? null : Number(field.value);
        break;
      }
      case 'checkbox': {
        values[input.name] = field.checked;
        break;
      }
      default: {
        values[input.name] = field.value;
      }
    }
  });
  return values;
}

function setAction(action) {
  descriptionBox.textContent = action.description || '';
  buildForm(action);
  output.textContent = 'Ready to run the selected action.';
}

function populateActions() {
  actionSelect.innerHTML = '';
  actions.forEach((action) => {
    const option = document.createElement('option');
    option.value = action.id;
    option.textContent = action.label;
    actionSelect.appendChild(option);
  });
  setAction(actions[0]);
}

actionSelect.addEventListener('change', () => {
  const action = actions.find((item) => item.id === actionSelect.value);
  if (action) {
    setAction(action);
  }
});

runButton.addEventListener('click', async () => {
  const action = actions.find((item) => item.id === actionSelect.value);
  if (!action) return;
  const values = getFormValues(action);
  try {
    const result = await action.run(values);
    if (result === undefined) {
      output.textContent = 'Action completed.';
    } else if (typeof result === 'string') {
      output.textContent = result;
    } else {
      output.textContent = JSON.stringify(result, null, 2);
    }
  } catch (error) {
    output.textContent = `Error: ${error?.message ?? error}`;
  }
});

populateActions();
