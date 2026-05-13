/* Delays main() until IDBFS is synced from IndexedDB (persistent FT2.CFG, etc.) */
if (typeof Module === 'undefined') {
  var Module = {};
}

var FT2_BASE_W = 632;
var FT2_BASE_H = 400;
var FT2_DISPLAY_SCALE_STORAGE = 'ft2_display_scale';
var FT2_TOOLBAR_ID = 'ft2-web-toolbar';
var FT2_KEYMAP_STORAGE = 'ft2_keymap_bindings_v1';

var FT2_KEYMAP_MOD_CTRL = 1;
var FT2_KEYMAP_MOD_ALT = 2;
var FT2_KEYMAP_MOD_SHIFT = 4;
var FT2_KEYMAP_MOD_CMD = 8;

var FT2_KEY_ACTIONS = [
  { id: 0, keycode: 97, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Advanced Edit' },
  { id: 1, keycode: 98, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show About' },
  { id: 2, keycode: 99, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Config' },
  { id: 3, keycode: 100, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Disk Op' },
  { id: 4, keycode: 104, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Help' },
  { id: 5, keycode: 105, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Instrument Editor' },
  { id: 6, keycode: 109, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Instrument Editor Ext' },
  { id: 7, keycode: 110, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Nibbles' },
  { id: 8, keycode: 112, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Pattern Editor' },
  { id: 9, keycode: 101, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Sample Editor Ext' },
  { id: 10, keycode: 116, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Transpose' },
  { id: 11, keycode: 49, mods: FT2_KEYMAP_MOD_CTRL, label: 'Config Tab: Audio' },
  { id: 12, keycode: 50, mods: FT2_KEYMAP_MOD_CTRL, label: 'Config Tab: Layout' },
  { id: 13, keycode: 51, mods: FT2_KEYMAP_MOD_CTRL, label: 'Config Tab: Misc' },
  { id: 14, keycode: 52, mods: FT2_KEYMAP_MOD_CTRL, label: 'Config Tab: MIDI' },
  { id: 15, keycode: 114, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Trim' },
  { id: 16, keycode: 115, mods: FT2_KEYMAP_MOD_CTRL, label: 'Show Sample Editor' },
  { id: 17, keycode: 122, mods: FT2_KEYMAP_MOD_CTRL, label: 'Toggle Extended Pattern' },
  { id: 18, keycode: 120, mods: FT2_KEYMAP_MOD_CTRL, label: 'Close To Pattern Editor' },
  { id: 19, keycode: 13, mods: FT2_KEYMAP_MOD_ALT, label: 'Toggle Fullscreen' },
  { id: 20, keycode: 1073741890, mods: FT2_KEYMAP_MOD_CTRL, label: 'Play From Jump 1' },
  { id: 21, keycode: 1073741891, mods: FT2_KEYMAP_MOD_CTRL, label: 'Play From Jump 2' },
  { id: 22, keycode: 1073741892, mods: FT2_KEYMAP_MOD_CTRL, label: 'Play From Jump 3' },
  { id: 23, keycode: 1073741893, mods: FT2_KEYMAP_MOD_CTRL, label: 'Play From Jump 4' },
  { id: 24, keycode: 1073741890, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Set Jump 1 To Current Row' },
  { id: 25, keycode: 1073741891, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Set Jump 2 To Current Row' },
  { id: 26, keycode: 1073741892, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Set Jump 3 To Current Row' },
  { id: 27, keycode: 1073741893, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Set Jump 4 To Current Row' },
  { id: 28, keycode: 113, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 0' },
  { id: 29, keycode: 119, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 1' },
  { id: 30, keycode: 101, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 2' },
  { id: 31, keycode: 114, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 3' },
  { id: 32, keycode: 116, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 4' },
  { id: 33, keycode: 121, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 5' },
  { id: 34, keycode: 117, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 6' },
  { id: 35, keycode: 105, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 7' },
  { id: 36, keycode: 97, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 8' },
  { id: 37, keycode: 115, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 9' },
  { id: 38, keycode: 100, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 10' },
  { id: 39, keycode: 102, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 11' },
  { id: 40, keycode: 103, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 12' },
  { id: 41, keycode: 104, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 13' },
  { id: 42, keycode: 106, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 14' },
  { id: 43, keycode: 107, mods: FT2_KEYMAP_MOD_ALT, label: 'Jump To Channel 15' },
  { id: 44, keycode: 99, mods: FT2_KEYMAP_MOD_ALT, label: 'Alt+C Context (Sample Copy / Mark Track)' },
  { id: 45, keycode: 118, mods: FT2_KEYMAP_MOD_ALT, label: 'Alt+V Context (Sample Paste / Volume Block)' },
  { id: 46, keycode: 120, mods: FT2_KEYMAP_MOD_ALT, label: 'Sample Cut (Alt+X)' },
  { id: 47, keycode: 122, mods: FT2_KEYMAP_MOD_ALT, label: 'Sample Zoom Out (Alt+Z)' },
  { id: 48, keycode: 118, mods: FT2_KEYMAP_MOD_CTRL, label: 'Ctrl+V Context (Sample Paste / Volume Pattern)' },
  { id: 49, keycode: 118, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Track Volume Scale/Fade (Shift+V)' },
  { id: 50, keycode: 49, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 1 (Alt+1)' },
  { id: 51, keycode: 50, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 2 (Alt+2)' },
  { id: 52, keycode: 51, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 3 (Alt+3)' },
  { id: 53, keycode: 52, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 4 (Alt+4)' },
  { id: 54, keycode: 53, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 5 (Alt+5)' },
  { id: 55, keycode: 54, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 6 (Alt+6)' },
  { id: 56, keycode: 55, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 7 (Alt+7)' },
  { id: 57, keycode: 56, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 8 (Alt+8)' },
  { id: 58, keycode: 57, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 9 (Alt+9)' },
  { id: 59, keycode: 48, mods: FT2_KEYMAP_MOD_ALT, label: 'Macro Read Slot 10 (Alt+0)' },
  { id: 60, keycode: 49, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 1 (Alt+Shift+1)' },
  { id: 61, keycode: 50, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 2 (Alt+Shift+2)' },
  { id: 62, keycode: 51, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 3 (Alt+Shift+3)' },
  { id: 63, keycode: 52, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 4 (Alt+Shift+4)' },
  { id: 64, keycode: 53, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 5 (Alt+Shift+5)' },
  { id: 65, keycode: 54, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 6 (Alt+Shift+6)' },
  { id: 66, keycode: 55, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 7 (Alt+Shift+7)' },
  { id: 67, keycode: 56, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 8 (Alt+Shift+8)' },
  { id: 68, keycode: 57, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 9 (Alt+Shift+9)' },
  { id: 69, keycode: 48, mods: FT2_KEYMAP_MOD_ALT | FT2_KEYMAP_MOD_SHIFT, label: 'Macro Write Slot 10 (Alt+Shift+0)' },
  { id: 70, keycode: 1073741882, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Transpose All (Track) Down' },
  { id: 71, keycode: 1073741882, mods: FT2_KEYMAP_MOD_CTRL, label: 'Transpose All (Pattern) Down' },
  { id: 72, keycode: 1073741882, mods: FT2_KEYMAP_MOD_ALT, label: 'Transpose All (Block) Down' },
  { id: 73, keycode: 1073741883, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Transpose All (Track) Up' },
  { id: 74, keycode: 1073741883, mods: FT2_KEYMAP_MOD_CTRL, label: 'Transpose All (Pattern) Up' },
  { id: 75, keycode: 1073741883, mods: FT2_KEYMAP_MOD_ALT, label: 'Transpose All (Block) Up' },
  { id: 76, keycode: 1073741888, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Transpose Current (Track) Down' },
  { id: 77, keycode: 1073741888, mods: FT2_KEYMAP_MOD_CTRL, label: 'Transpose Current (Pattern) Down' },
  { id: 78, keycode: 1073741888, mods: FT2_KEYMAP_MOD_ALT, label: 'Transpose Current (Block) Down' },
  { id: 79, keycode: 1073741889, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Transpose Current (Track) Up' },
  { id: 80, keycode: 1073741889, mods: FT2_KEYMAP_MOD_CTRL, label: 'Transpose Current (Pattern) Up' },
  { id: 81, keycode: 1073741889, mods: FT2_KEYMAP_MOD_ALT, label: 'Transpose Current (Block) Up' },
  { id: 82, keycode: 1073741882, mods: 0, label: 'Set Octave 0 (F1)' },
  { id: 83, keycode: 1073741883, mods: 0, label: 'Set Octave 1 (F2)' },
  { id: 84, keycode: 1073741884, mods: 0, label: 'Set Octave 2 (F3)' },
  { id: 85, keycode: 1073741885, mods: 0, label: 'Set Octave 3 (F4)' },
  { id: 86, keycode: 1073741886, mods: 0, label: 'Set Octave 4 (F5)' },
  { id: 87, keycode: 1073741887, mods: 0, label: 'Set Octave 5 (F6)' },
  { id: 88, keycode: 1073741888, mods: 0, label: 'Set Octave 6 (F7)' },
  { id: 89, keycode: 1073741889, mods: 0, label: 'Set Octave 6 (F8)' },
  { id: 90, keycode: 1073741890, mods: 0, label: 'Jump To Stored Row 1 (F9)' },
  { id: 91, keycode: 1073741891, mods: 0, label: 'Jump To Stored Row 2 (F10)' },
  { id: 92, keycode: 1073741892, mods: 0, label: 'Jump To Stored Row 3 (F11)' },
  { id: 93, keycode: 1073741893, mods: 0, label: 'Jump To Stored Row 4 (F12)' },
  { id: 94, keycode: 1073741884, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Cut Track (Shift+F3)' },
  { id: 95, keycode: 1073741884, mods: FT2_KEYMAP_MOD_CTRL, label: 'Cut Pattern (Ctrl+F3)' },
  { id: 96, keycode: 1073741884, mods: FT2_KEYMAP_MOD_ALT, label: 'Cut Block (Alt+F3)' },
  { id: 97, keycode: 1073741885, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Copy Track (Shift+F4)' },
  { id: 98, keycode: 1073741885, mods: FT2_KEYMAP_MOD_CTRL, label: 'Copy Pattern (Ctrl+F4)' },
  { id: 99, keycode: 1073741885, mods: FT2_KEYMAP_MOD_ALT, label: 'Copy Block (Alt+F4)' },
  { id: 100, keycode: 1073741886, mods: FT2_KEYMAP_MOD_SHIFT, label: 'Paste Track (Shift+F5)' },
  { id: 101, keycode: 1073741886, mods: FT2_KEYMAP_MOD_CTRL, label: 'Paste Pattern (Ctrl+F5)' },
  { id: 102, keycode: 1073741886, mods: FT2_KEYMAP_MOD_ALT, label: 'Paste Block (Alt+F5)' }
];

var FT2_SUPPORTED_KEYS = [
  { code: 13, label: 'Enter' },
  { code: 49, label: '1' }, { code: 50, label: '2' }, { code: 51, label: '3' },
  { code: 52, label: '4' }, { code: 53, label: '5' }, { code: 54, label: '6' },
  { code: 55, label: '7' }, { code: 56, label: '8' }, { code: 57, label: '9' },
  { code: 48, label: '0' },
  { code: 1073741882, label: 'F1' }, { code: 1073741883, label: 'F2' },
  { code: 1073741884, label: 'F3' }, { code: 1073741885, label: 'F4' },
  { code: 1073741886, label: 'F5' }, { code: 1073741887, label: 'F6' },
  { code: 1073741888, label: 'F7' }, { code: 1073741889, label: 'F8' },
  { code: 1073741890, label: 'F9' }, { code: 1073741891, label: 'F10' },
  { code: 1073741892, label: 'F11' }, { code: 1073741893, label: 'F12' },
  { code: 97, label: 'A' }, { code: 98, label: 'B' }, { code: 99, label: 'C' },
  { code: 100, label: 'D' }, { code: 101, label: 'E' }, { code: 102, label: 'F' },
  { code: 103, label: 'G' }, { code: 104, label: 'H' }, { code: 105, label: 'I' },
  { code: 106, label: 'J' }, { code: 107, label: 'K' }, { code: 108, label: 'L' },
  { code: 109, label: 'M' }, { code: 110, label: 'N' }, { code: 111, label: 'O' },
  { code: 112, label: 'P' }, { code: 113, label: 'Q' }, { code: 114, label: 'R' },
  { code: 115, label: 'S' }, { code: 116, label: 'T' }, { code: 117, label: 'U' },
  { code: 118, label: 'V' }, { code: 119, label: 'W' }, { code: 120, label: 'X' },
  { code: 121, label: 'Y' }, { code: 122, label: 'Z' }
];

function ft2DefaultBindingMap() {
  var out = {};
  for (var i = 0; i < FT2_KEY_ACTIONS.length; i++) {
    out[String(FT2_KEY_ACTIONS[i].id)] = {
      keycode: FT2_KEY_ACTIONS[i].keycode,
      mods: FT2_KEY_ACTIONS[i].mods
    };
  }
  return out;
}

function ft2NormalizeBindingMap(obj) {
  var defaults = ft2DefaultBindingMap();
  if (!obj || typeof obj !== 'object') return defaults;

  for (var i = 0; i < FT2_KEY_ACTIONS.length; i++) {
    var id = String(FT2_KEY_ACTIONS[i].id);
    var e = obj[id];
    if (!e || typeof e !== 'object') continue;
    var keycode = parseInt(e.keycode, 10);
    var mods = parseInt(e.mods, 10) & 0xFF;
    if (!isFinite(keycode) || !isFinite(mods)) continue;
    defaults[id] = { keycode: keycode, mods: mods };
  }

  return defaults;
}

function ft2GetStoredKeymap() {
  try {
    var raw = localStorage.getItem(FT2_KEYMAP_STORAGE);
    if (!raw) return ft2DefaultBindingMap();
    return ft2NormalizeBindingMap(JSON.parse(raw));
  } catch (e) {
    return ft2DefaultBindingMap();
  }
}

function ft2SetStoredKeymap(mapObj) {
  try {
    localStorage.setItem(FT2_KEYMAP_STORAGE, JSON.stringify(ft2NormalizeBindingMap(mapObj)));
  } catch (e) { /* private mode */ }
}

function ft2ModsToText(mods) {
  var out = [];
  if (mods & FT2_KEYMAP_MOD_CTRL) out.push('Ctrl');
  if (mods & FT2_KEYMAP_MOD_ALT) out.push('Alt');
  if (mods & FT2_KEYMAP_MOD_SHIFT) out.push('Shift');
  if (mods & FT2_KEYMAP_MOD_CMD) out.push('Cmd');
  return out.join('+');
}

function ft2KeycodeToText(code) {
  for (var i = 0; i < FT2_SUPPORTED_KEYS.length; i++) {
    if (FT2_SUPPORTED_KEYS[i].code === code) return FT2_SUPPORTED_KEYS[i].label;
  }
  return 'Key(' + code + ')';
}

function ft2ApplyKeymap(bindings) {
  if (typeof Module === 'undefined') return false;
  if (typeof Module._ft2_keymap_reset_defaults !== 'function' || typeof Module._ft2_keymap_set_binding !== 'function') {
    return false;
  }

  var normalized = ft2NormalizeBindingMap(bindings);
  for (var i = 0; i < FT2_KEY_ACTIONS.length; i++) {
    var id = String(FT2_KEY_ACTIONS[i].id);
    var e = normalized[id];
    if (!e || !isFinite(e.keycode) || !isFinite(e.mods)) return false;
  }

  Module._ft2_keymap_reset_defaults();
  for (var j = 0; j < FT2_KEY_ACTIONS.length; j++) {
    var action = FT2_KEY_ACTIONS[j];
    var en = normalized[String(action.id)];
    var ok = Module._ft2_keymap_set_binding(action.id, en.keycode, en.mods);
    if (ok !== 1) return false;
  }

  return true;
}

function ft2GetStoredDisplayScale() {
  try {
    var raw = localStorage.getItem(FT2_DISPLAY_SCALE_STORAGE) || '2';
    if (raw === 'fit') return 'fit';
    var s = parseInt(raw, 10);
    if (s === 1 || s === 2 || s === 3) return s;
    return 2;
  } catch (e) {
    return 2;
  }
}

function ft2SetDisplayScale(scale) {
  if (scale !== 'fit' && scale !== 1 && scale !== 2 && scale !== 3) {
    scale = 2;
  }
  try {
    localStorage.setItem(FT2_DISPLAY_SCALE_STORAGE, String(scale));
  } catch (e) { /* private mode */ }
  ft2ApplyCanvasLayout();
  if (typeof Module !== 'undefined' && typeof Module._ft2_ems_set_display_scale === 'function') {
    Module._ft2_ems_set_display_scale(scale === 'fit' ? 2 : scale);
  }
  if (typeof window.ft2RefreshDisplayScaleButtons === 'function') {
    window.ft2RefreshDisplayScaleButtons();
  }
}

// SDL2 Emscripten port expects a canvas element. Provide it explicitly.
try {
  if (!Module.canvas) {
    var c0 = document.getElementById('canvas');
    if (c0) Module.canvas = c0;
  }
} catch (e) {}

function ft2ToolbarHeightPx() {
  var t = document.getElementById(FT2_TOOLBAR_ID);
  return t ? t.offsetHeight : 0;
}

function ft2EnsureWebToolbar() {
  var bar = document.getElementById(FT2_TOOLBAR_ID);
  if (bar) return bar;
  bar = document.createElement('div');
  bar.id = FT2_TOOLBAR_ID;
  bar.setAttribute('role', 'toolbar');
  bar.setAttribute('aria-label', 'Web controls');
  bar.style.cssText =
    'position:fixed;left:0;top:0;right:0;z-index:1001;display:flex;flex-wrap:wrap;' +
    'align-items:center;justify-content:flex-start;gap:12px;padding:6px 10px;' +
    'font:12px system-ui,sans-serif;background:#1a1a1a;border-bottom:1px solid #444;' +
    'box-sizing:border-box;';
  if (document.body.firstChild) {
    document.body.insertBefore(bar, document.body.firstChild);
  } else {
    document.body.appendChild(bar);
  }
  return bar;
}

function ft2EnsureToolbarBrand(bar) {
  try {
    if (document.getElementById('ft2-toolbar-brand')) return;
    var brand = document.createElement('div');
    brand.id = 'ft2-toolbar-brand';
    brand.style.cssText =
      'display:flex;align-items:center;gap:10px;flex-shrink:0;margin-right:4px;';

    var img = document.createElement('img');
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.draggable = false;
    img.width = 28;
    img.height = 28;
    img.style.cssText =
      'display:block;width:28px;height:28px;object-fit:contain;image-rendering:auto;';
    img.src = 'ft2-web-toolbar-icon.png';

    var title = document.createElement('span');
    title.textContent = 'Fasttracker II clone';
    title.style.cssText =
      'color:#e8e8e8;font-weight:600;font-size:14px;line-height:1.2;white-space:nowrap;margin:0;';

    brand.appendChild(img);
    brand.appendChild(title);
    bar.insertBefore(brand, bar.firstChild);
  } catch (e) {
    console.warn('ft2-clone: toolbar brand', e);
  }
}

function ft2ApplyCanvasLayout() {
  try {
    var c = Module.canvas || document.getElementById('canvas');
    if (!c) return;
    Module.canvas = c;
    var storedScale = ft2GetStoredDisplayScale();
    var sc = storedScale;
    var th = ft2ToolbarHeightPx();
    if (storedScale === 'fit') {
      var availW = Math.max(1, window.innerWidth);
      var availH = Math.max(1, window.innerHeight - th);
      sc = Math.max(0.25, Math.min(availW / FT2_BASE_W, availH / FT2_BASE_H));
    }
    c.style.position = 'fixed';
    c.style.left = '0px';
    c.style.top = th + 'px';
    c.style.margin = '0';
    c.style.width = (FT2_BASE_W * sc) + 'px';
    c.style.height = (FT2_BASE_H * sc) + 'px';
    c.style.display = 'block';
    c.width = FT2_BASE_W;
    c.height = FT2_BASE_H;
  } catch (e) {}
}

function ft2InstallLayoutReapplyHooks() {
  try {
    if (window.__ft2LayoutHooksInstalled) return;
    window.__ft2LayoutHooksInstalled = true;

    var reapply = function () {
      // Fullscreen transitions are async in browsers; apply twice to stabilize.
      ft2ApplyCanvasLayout();
      setTimeout(ft2ApplyCanvasLayout, 120);
    };

    window.addEventListener('resize', reapply);
    window.addEventListener('orientationchange', reapply);
    document.addEventListener('fullscreenchange', reapply);
    document.addEventListener('webkitfullscreenchange', reapply);
  } catch (e) {}
}

ft2ApplyCanvasLayout();
ft2InstallLayoutReapplyHooks();
Module.preRun = Module.preRun || [];
Module.preRun.push(ft2ApplyCanvasLayout);

function ft2SetupDisplayScaleUI() {
  try {
    if (document.getElementById('ft2-display-scale-wrap')) return;

    var bar = ft2EnsureWebToolbar();
    ft2EnsureToolbarBrand(bar);

    var wrap = document.createElement('div');
    wrap.id = 'ft2-display-scale-wrap';
    wrap.setAttribute('aria-label', 'Display zoom');
    wrap.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;';

    var lab = document.createElement('span');
    lab.textContent = 'Display size';
    lab.style.cssText = 'color:#aaa;margin:0;white-space:nowrap;';

    var row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:4px;';

    function mkBtn(n, label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.dataset.scale = String(n);
      b.style.cssText =
        'padding:2px 8px;cursor:pointer;background:#222;color:#eee;border:1px solid #555;border-radius:3px;min-width:2.2em;';
      b.addEventListener('click', function () {
        ft2SetDisplayScale(n);
      });
      return b;
    }

    row.appendChild(mkBtn(1, '1×'));
    row.appendChild(mkBtn(2, '2×'));
    row.appendChild(mkBtn(3, '3×'));
    row.appendChild(mkBtn('fit', 'Fit'));

    wrap.appendChild(lab);
    wrap.appendChild(row);
    bar.appendChild(wrap);

    window.ft2RefreshDisplayScaleButtons = function () {
      var cur = ft2GetStoredDisplayScale();
      var buttons = row.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        var raw = buttons[i].dataset.scale;
        var bn = raw === 'fit' ? 'fit' : parseInt(raw, 10);
        var on = bn === cur;
        buttons[i].style.background = on ? '#3a4a6a' : '#222';
        buttons[i].style.borderColor = on ? '#7a9acd' : '#555';
      }
    };
    window.ft2RefreshDisplayScaleButtons();
    ft2ApplyCanvasLayout();
  } catch (e) {
    console.warn('ft2-clone: display scale UI', e);
  }
}

ft2SetupDisplayScaleUI();

function ft2SetupKeybindUI() {
  try {
    if (document.getElementById('ft2-keybind-open')) return;
    var bar = ft2EnsureWebToolbar();

    var wrap = document.createElement('div');
    wrap.id = 'ft2-keybind-wrap';
    wrap.style.cssText = 'display:flex;align-items:center;';

    var btn = document.createElement('button');
    btn.id = 'ft2-keybind-open';
    btn.type = 'button';
    btn.textContent = 'Keybinds';
    btn.style.cssText = 'padding:4px 8px;cursor:pointer;background:#222;color:#eee;border:1px solid #555;border-radius:3px;';

    function closeModal() {
      var m = document.getElementById('ft2-keybind-modal');
      if (m) m.remove();
    }

    function openModal() {
      closeModal();

      var modal = document.createElement('div');
      modal.id = 'ft2-keybind-modal';
      modal.style.cssText =
        'position:fixed;inset:0;z-index:1500;background:rgba(0,0,0,0.55);display:flex;align-items:flex-start;justify-content:center;padding:48px 16px;';

      var panel = document.createElement('div');
      panel.style.cssText =
        'width:min(980px,96vw);max-height:85vh;overflow:auto;background:#1f1f1f;border:1px solid #555;border-radius:6px;' +
        'color:#e8e8e8;font:13px system-ui,sans-serif;padding:14px;box-sizing:border-box;';

      var title = document.createElement('div');
      title.textContent = 'Shortcut Key Remap (Web)';
      title.style.cssText = 'font-size:16px;font-weight:700;margin-bottom:4px;';
      panel.appendChild(title);

      var note = document.createElement('div');
      note.textContent = 'No duplicate assignments. Function-key actions may use no modifier.';
      note.style.cssText = 'color:#bbb;margin-bottom:10px;';
      panel.appendChild(note);

      var table = document.createElement('table');
      table.style.cssText = 'width:100%;border-collapse:collapse;';

      var thead = document.createElement('thead');
      thead.innerHTML = '<tr><th style="text-align:left;padding:6px;border-bottom:1px solid #444;">Action</th>' +
        '<th style="text-align:left;padding:6px;border-bottom:1px solid #444;">Key</th>' +
        '<th style="text-align:left;padding:6px;border-bottom:1px solid #444;">Modifiers</th>' +
        '<th style="text-align:left;padding:6px;border-bottom:1px solid #444;">Default</th></tr>';
      table.appendChild(thead);

      var tbody = document.createElement('tbody');
      var current = ft2GetStoredKeymap();

      function mkModCheck(label, bit, checked) {
        var l = document.createElement('label');
        l.style.cssText = 'margin-right:8px;white-space:nowrap;';
        var c = document.createElement('input');
        c.type = 'checkbox';
        c.dataset.bit = String(bit);
        c.checked = checked;
        c.style.marginRight = '4px';
        l.appendChild(c);
        l.appendChild(document.createTextNode(label));
        return l;
      }

      for (var i = 0; i < FT2_KEY_ACTIONS.length; i++) {
        var a = FT2_KEY_ACTIONS[i];
        var row = document.createElement('tr');
        row.dataset.action = String(a.id);
        row.dataset.actionLabel = a.label;

        var e = current[String(a.id)] || { keycode: a.keycode, mods: a.mods };

        var tdA = document.createElement('td');
        tdA.style.cssText = 'padding:6px;border-bottom:1px solid #333;';
        var actionLabel = document.createElement('div');
        actionLabel.textContent = a.label;
        actionLabel.style.cssText = 'font-weight:600;';
        var defaultLabel = document.createElement('div');
        defaultLabel.textContent = 'Default: ' + ft2ModsToText(a.mods) + '+' + ft2KeycodeToText(a.keycode);
        defaultLabel.style.cssText = 'color:#aaa;font-size:12px;margin-top:2px;';
        tdA.appendChild(actionLabel);
        tdA.appendChild(defaultLabel);

        var tdK = document.createElement('td');
        tdK.style.cssText = 'padding:6px;border-bottom:1px solid #333;';
        var sel = document.createElement('select');
        sel.style.cssText = 'padding:3px 4px;background:#111;color:#eee;border:1px solid #555;';
        for (var k = 0; k < FT2_SUPPORTED_KEYS.length; k++) {
          var o = document.createElement('option');
          o.value = String(FT2_SUPPORTED_KEYS[k].code);
          o.textContent = FT2_SUPPORTED_KEYS[k].label;
          if (FT2_SUPPORTED_KEYS[k].code === e.keycode) o.selected = true;
          sel.appendChild(o);
        }
        tdK.appendChild(sel);

        var tdM = document.createElement('td');
        tdM.style.cssText = 'padding:6px;border-bottom:1px solid #333;';
        tdM.appendChild(mkModCheck('Ctrl', FT2_KEYMAP_MOD_CTRL, !!(e.mods & FT2_KEYMAP_MOD_CTRL)));
        tdM.appendChild(mkModCheck('Alt', FT2_KEYMAP_MOD_ALT, !!(e.mods & FT2_KEYMAP_MOD_ALT)));
        tdM.appendChild(mkModCheck('Shift', FT2_KEYMAP_MOD_SHIFT, !!(e.mods & FT2_KEYMAP_MOD_SHIFT)));
        tdM.appendChild(mkModCheck('Cmd', FT2_KEYMAP_MOD_CMD, !!(e.mods & FT2_KEYMAP_MOD_CMD)));

        row.appendChild(tdA);
        row.appendChild(tdK);
        row.appendChild(tdM);
        var tdD = document.createElement('td');
        tdD.style.cssText = 'padding:6px;border-bottom:1px solid #333;';
        var btnRowDefault = document.createElement('button');
        btnRowDefault.type = 'button';
        btnRowDefault.textContent = 'Default';
        btnRowDefault.style.cssText = 'padding:2px 8px;cursor:pointer;background:#222;color:#eee;border:1px solid #555;border-radius:3px;';
        (function (rowEl, actionDef) {
          btnRowDefault.addEventListener('click', function () {
            var selEl = rowEl.querySelector('select');
            if (selEl) selEl.value = String(actionDef.keycode);
            var checksEl = rowEl.querySelectorAll('input[type="checkbox"]');
            for (var ci = 0; ci < checksEl.length; ci++) {
              var bit = parseInt(checksEl[ci].dataset.bit, 10);
              checksEl[ci].checked = !!(actionDef.mods & bit);
            }
          });
        })(row, a);
        tdD.appendChild(btnRowDefault);
        row.appendChild(tdD);
        tbody.appendChild(row);
      }

      table.appendChild(tbody);
      panel.appendChild(table);

      var status = document.createElement('div');
      status.style.cssText = 'margin-top:8px;min-height:18px;color:#f7c77a;';
      panel.appendChild(status);

      var footer = document.createElement('div');
      footer.style.cssText = 'margin-top:10px;display:flex;gap:8px;justify-content:flex-end;';

      function mkButton(label) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = label;
        b.style.cssText = 'padding:4px 10px;cursor:pointer;background:#222;color:#eee;border:1px solid #555;border-radius:3px;';
        return b;
      }

      var btnSave = mkButton('Save');
      var btnReset = mkButton('Reset Defaults');
      var btnClose = mkButton('Close');

      btnSave.addEventListener('click', function () {
        var out = {};
        var seen = {};
        var duplicateMessages = [];
        var rows = tbody.querySelectorAll('tr');

        for (var r = 0; r < rows.length; r++) {
          var rid = rows[r].dataset.action;
          var keycode = parseInt(rows[r].querySelector('select').value, 10);
          var mods = 0;
          var checks = rows[r].querySelectorAll('input[type="checkbox"]');
          for (var c = 0; c < checks.length; c++) {
            if (checks[c].checked) mods |= parseInt(checks[c].dataset.bit, 10);
          }

          var key = String(keycode) + ':' + String(mods);
          if (seen[key]) {
            var first = seen[key];
            duplicateMessages.push(first.label + ' and ' + rows[r].dataset.actionLabel +
              ' share ' + ft2ModsToText(mods) + '+' + ft2KeycodeToText(keycode));
          }
          seen[key] = { label: rows[r].dataset.actionLabel };
          out[rid] = { keycode: keycode, mods: mods };
        }

        if (!ft2ApplyKeymap(out)) {
          status.textContent = 'Failed to apply bindings (conflict or invalid data).';
          status.style.color = '#f7a0a0';
          return;
        }

        ft2SetStoredKeymap(out);
        if (duplicateMessages.length > 0) {
          status.textContent = 'Saved with warnings: ' + duplicateMessages.join(' | ');
          status.style.color = '#f7c77a';
        } else {
          status.textContent = 'Saved. New shortcuts are active now.';
          status.style.color = '#9be39b';
        }
      });

      btnReset.addEventListener('click', function () {
        var defs = ft2DefaultBindingMap();
        if (!ft2ApplyKeymap(defs)) {
          status.textContent = 'Failed to reset defaults.';
          status.style.color = '#f7a0a0';
          return;
        }
        ft2SetStoredKeymap(defs);
        closeModal();
        openModal();
      });

      btnClose.addEventListener('click', closeModal);
      modal.addEventListener('click', function (ev) {
        if (ev.target === modal) closeModal();
      });

      footer.appendChild(btnReset);
      footer.appendChild(btnClose);
      footer.appendChild(btnSave);
      panel.appendChild(footer);
      modal.appendChild(panel);
      document.body.appendChild(modal);
    }

    btn.addEventListener('click', openModal);
    wrap.appendChild(btn);
    bar.appendChild(wrap);
  } catch (e) {
    console.warn('ft2-clone: keybind UI', e);
  }
}

function ft2SetupImportButton() {
  try {
    if (document.getElementById('ft2-import-wrap')) return;
    if (typeof Module.FS === 'undefined') return;

    var bar = ft2EnsureWebToolbar();

    var wrap = document.createElement('div');
    wrap.id = 'ft2-import-wrap';
    wrap.setAttribute('aria-label', 'Import files for Disk op.');
    wrap.style.cssText = 'display:flex;align-items:center;';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Import to Disk op.';
    btn.style.cssText = 'padding:4px 8px;cursor:pointer;background:#222;color:#eee;border:1px solid #555;border-radius:3px;';

    var input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.style.display = 'none';

    btn.addEventListener('click', function () {
      input.click();
    });

    input.addEventListener('change', function () {
      var files = input.files;
      if (!files || !files.length) {
        input.value = '';
        return;
      }

      var pending = files.length;
      var syncAndNotify = function () {
        try {
          Module.FS.syncfs(false, function (err) {
            if (err) console.warn('ft2-clone: import IDBFS save', err);
            if (typeof Module._ft2_ems_after_import === 'function') {
              Module._ft2_ems_after_import();
            }
          });
        } catch (e) {
          console.warn('ft2-clone: import sync', e);
        }
      };

      var onDoneOne = function () {
        pending--;
        if (pending <= 0) {
          input.value = '';
          syncAndNotify();
        }
      };

      for (var i = 0; i < files.length; i++) {
        (function (file) {
          var reader = new FileReader();
          reader.onload = function () {
            try {
              var cwd = Module.FS.cwd();
              var sep = cwd.length && cwd[cwd.length - 1] === '/' ? '' : '/';
              var u8 = new Uint8Array(reader.result);
              Module.FS.writeFile(cwd + sep + file.name, u8);
            } catch (e) {
              console.warn('ft2-clone: import write', file.name, e);
            }
            onDoneOne();
          };
          reader.onerror = function () {
            console.warn('ft2-clone: import read', file.name);
            onDoneOne();
          };
          reader.readAsArrayBuffer(file);
        })(files[i]);
      }
    });

    wrap.appendChild(btn);
    wrap.appendChild(input);

    var disp = document.getElementById('ft2-display-scale-wrap');
    if (disp && disp.parentNode === bar) {
      bar.insertBefore(wrap, disp);
    } else {
      bar.appendChild(wrap);
    }

    ft2ApplyCanvasLayout();
  } catch (e) {
    console.warn('ft2-clone: import UI', e);
  }
}

Module.onRuntimeInitialized = function () {
  ft2ApplyCanvasLayout();
  if (typeof Module._ft2_ems_set_display_scale === 'function') {
    Module._ft2_ems_set_display_scale(ft2GetStoredDisplayScale());
  }

  // apply keymap from persistent web storage
  ft2ApplyKeymap(ft2GetStoredKeymap());

  if (typeof window.ft2RefreshDisplayScaleButtons === 'function') {
    window.ft2RefreshDisplayScaleButtons();
  }
  ft2SetupImportButton();
  ft2SetupKeybindUI();
};

(function () {
  var pre = Module.preRun || [];
  Module.preRun = pre;
  Module.preRun.push(function () {
    if (typeof ENVIRONMENT_IS_PTHREAD !== 'undefined' && ENVIRONMENT_IS_PTHREAD) {
      return;
    }
    addRunDependency('ft2_idbfs');
    var done = false;
    function releaseDepOnce() {
      if (done) return;
      done = true;
      removeRunDependency('ft2_idbfs');
    }
    try {
      FS.mkdir('/ft2_persistent');
    } catch (e) { /* already exists */ }
    try {
      FS.mount(IDBFS, {}, '/ft2_persistent');
    } catch (e) {
      console.warn('ft2-clone: IDBFS mount', e);
      releaseDepOnce();
      return;
    }

    // Some browser/privacy modes can stall IDBFS callback forever.
    // Don't block startup indefinitely.
    setTimeout(function () {
      if (!done) {
        console.warn('ft2-clone: IDBFS sync timeout, continuing startup');
        releaseDepOnce();
      }
    }, 5000);

    FS.syncfs(true, function (err) {
      if (err) {
        console.warn('ft2-clone: IDBFS load', err);
      }
      releaseDepOnce();
    });
  });
})();
