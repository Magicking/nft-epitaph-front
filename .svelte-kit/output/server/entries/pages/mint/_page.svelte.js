import { c as create_ssr_component, a as subscribe, v as validate_component, m as missing_component, e as escape, b as add_attribute, d as each, h as createEventDispatcher, o as onDestroy } from "../../../chunks/index2.js";
import { c as contracts, g as signer, b as connected, e as chainId, f as chainData, d as defaultEvmStores, r as rgeConf, a as rgeAbi } from "../../../chunks/rge.abi.js";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { d as derived, w as writable } from "../../../chunks/index.js";
const keyPressed = writable({
  ArrowLeft: 0,
  ArrowUp: 0,
  ArrowRight: 0,
  ArrowDown: 0
});
const keyPressedCustom = derived(keyPressed, ($keyPressed) => {
  return {
    ...$keyPressed,
    ArrowV: $keyPressed.ArrowUp + $keyPressed.ArrowDown,
    ArrowH: $keyPressed.ArrowLeft + $keyPressed.ArrowRight,
    ArrowVH: $keyPressed.ArrowUp + $keyPressed.ArrowDown + $keyPressed.ArrowLeft + $keyPressed.ArrowRight
  };
});
const Picker_svelte_svelte_type_style_lang = "";
const css$d = {
  code: ".picker.svelte-uiwgvv{position:relative;width:100%;height:100%;background:linear-gradient(#ffffff00, #000000ff),\n			linear-gradient(0.25turn, #ffffffff, #00000000), var(--color-bg);outline:none;user-select:none}",
  map: null
};
const Picker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_keyPressed;
  let $$unsubscribe_keyPressedCustom;
  $$unsubscribe_keyPressed = subscribe(keyPressed, (value) => value);
  $$unsubscribe_keyPressedCustom = subscribe(keyPressedCustom, (value) => value);
  let { components } = $$props;
  let { h } = $$props;
  let { s } = $$props;
  let { v } = $$props;
  let { isOpen } = $$props;
  let { toRight } = $$props;
  let { isDark } = $$props;
  let picker;
  let focused = false;
  let colorBg;
  let pos = { x: 100, y: 0 };
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.h === void 0 && $$bindings.h && h !== void 0)
    $$bindings.h(h);
  if ($$props.s === void 0 && $$bindings.s && s !== void 0)
    $$bindings.s(s);
  if ($$props.v === void 0 && $$bindings.v && v !== void 0)
    $$bindings.v(v);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  if ($$props.isDark === void 0 && $$bindings.isDark && isDark !== void 0)
    $$bindings.isDark(isDark);
  $$result.css.add(css$d);
  {
    if (typeof h === "number")
      colorBg = colord({ h, s: 100, v: 100, a: 1 }).toHex();
  }
  {
    if (typeof s === "number" && typeof v === "number" && picker)
      pos = { x: s, y: 100 - v };
  }
  $$unsubscribe_keyPressed();
  $$unsubscribe_keyPressedCustom();
  return `

${validate_component(components.pickerWrapper || missing_component, "svelte:component").$$render($$result, { focused, toRight }, {}, {
    default: () => {
      return `
	<div class="picker svelte-uiwgvv" tabindex="0" style="${"--color-bg: " + escape(colorBg, true) + ";"}" aria-label="saturation and brightness picker (arrow keyboard navigation)"${add_attribute("aria-valuemin", 0, 0)}${add_attribute("aria-valuemax", 100, 0)} aria-valuetext="${"saturation " + escape(pos.x?.toFixed(), true) + "%, brightness " + escape(pos.y?.toFixed(), true) + "%"}"${add_attribute("this", picker, 0)}>${validate_component(components.pickerIndicator || missing_component, "svelte:component").$$render(
        $$result,
        {
          pos,
          isDark,
          hex: colord({ h, s, v, a: 1 }).toHex()
        },
        {},
        {}
      )}</div>`;
    }
  })}`;
});
const Slider_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".slider.svelte-14nweqy{--gradient:#ff0000, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%,\n			#0000ff 67.7%, #ff00ff 83.3%, #ff0000;position:relative;width:100%;height:100%;background:linear-gradient(var(--gradient));outline:none;user-select:none}.to-right.svelte-14nweqy{background:linear-gradient(0.25turn, var(--gradient))}",
  map: null
};
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_keyPressed;
  let $$unsubscribe_keyPressedCustom;
  $$unsubscribe_keyPressed = subscribe(keyPressed, (value) => value);
  $$unsubscribe_keyPressedCustom = subscribe(keyPressedCustom, (value) => value);
  let { components } = $$props;
  let { toRight } = $$props;
  let slider;
  let { h } = $$props;
  let pos = 0;
  let focused = false;
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  if ($$props.h === void 0 && $$bindings.h && h !== void 0)
    $$bindings.h(h);
  $$result.css.add(css$c);
  {
    if (typeof h === "number" && slider)
      pos = 100 * h / 360;
  }
  $$unsubscribe_keyPressed();
  $$unsubscribe_keyPressedCustom();
  return `

${validate_component(components.sliderWrapper || missing_component, "svelte:component").$$render($$result, { focused, toRight }, {}, {
    default: () => {
      return `
	<div class="${["slider svelte-14nweqy", toRight ? "to-right" : ""].join(" ").trim()}" tabindex="0" aria-label="hue picker (arrow keyboard navigation)"${add_attribute("aria-valuemin", 0, 0)}${add_attribute("aria-valuemax", 360, 0)}${add_attribute("aria-valuenow", Math.round(h), 0)}${add_attribute("this", slider, 0)}>${validate_component(components.sliderIndicator || missing_component, "svelte:component").$$render($$result, { pos, toRight }, {}, {})}</div>`;
    }
  })}`;
});
const Alpha_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".alpha.svelte-f2vq53:after{position:absolute;content:'';inset:0;background:linear-gradient(#00000000, var(--alpha-color));z-index:0}.to-right.svelte-f2vq53:after{background:linear-gradient(0.25turn, #00000000, var(--alpha-color))}.alpha.svelte-f2vq53{position:relative;width:100%;height:100%;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),\n			linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);background-size:var(--pattern-size-2x, 12px) var(--pattern-size-2x, 12px);background-position:0 0, var(--pattern-size, 6px) var(--pattern-size, 6px);outline:none;user-select:none}",
  map: null
};
const Alpha = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_keyPressed;
  let $$unsubscribe_keyPressedCustom;
  $$unsubscribe_keyPressed = subscribe(keyPressed, (value) => value);
  $$unsubscribe_keyPressedCustom = subscribe(keyPressedCustom, (value) => value);
  let { components } = $$props;
  let { isOpen } = $$props;
  let { a = 1 } = $$props;
  let { hex } = $$props;
  let { toRight } = $$props;
  let alpha;
  let focused = false;
  let pos;
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.a === void 0 && $$bindings.a && a !== void 0)
    $$bindings.a(a);
  if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0)
    $$bindings.hex(hex);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  $$result.css.add(css$b);
  {
    if (typeof a === "number" && alpha)
      pos = 100 * a;
  }
  $$unsubscribe_keyPressed();
  $$unsubscribe_keyPressedCustom();
  return `

${validate_component(components.alphaWrapper || missing_component, "svelte:component").$$render($$result, { focused, toRight }, {}, {
    default: () => {
      return `
	<div class="${["alpha svelte-f2vq53", toRight ? "to-right" : ""].join(" ").trim()}" tabindex="0" style="${"--alpha-color: " + escape(hex?.substring(0, 7), true)}" aria-label="transparency picker (arrow keyboard navigation)"${add_attribute("aria-valuemin", 0, 0)}${add_attribute("aria-valuemax", 100, 0)}${add_attribute("aria-valuenow", Math.round(pos), 0)} aria-valuetext="${escape(pos?.toFixed(), true) + "%"}"${add_attribute("this", alpha, 0)}>${validate_component(components.alphaIndicator || missing_component, "svelte:component").$$render($$result, { pos, toRight }, {}, {})}</div>`;
    }
  })}`;
});
const TextInput_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".text-input.svelte-11z4jba{display:flex;flex-direction:column;gap:10px;margin:10px 5px 5px}.input-container.svelte-11z4jba{display:flex;flex:1;gap:10px}input.svelte-11z4jba,button.svelte-11z4jba{flex:1;border:none;background-color:#eee;padding:0;border-radius:5px;height:30px;line-height:30px;text-align:center}input.svelte-11z4jba{width:5px}button.svelte-11z4jba{cursor:pointer;flex:1;margin:0;transition:background-color 0.2s}button.svelte-11z4jba:hover{background-color:#ccc}input.svelte-11z4jba:focus,button.svelte-11z4jba:focus{outline:none}input.svelte-11z4jba:focus-visible,button.svelte-11z4jba:focus-visible{outline:2px solid var(--focus-color, red);outline-offset:2px}",
  map: null
};
const TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let a;
  let { isAlpha } = $$props;
  let { rgb } = $$props;
  let { hsv } = $$props;
  let { hex } = $$props;
  let { canChangeMode } = $$props;
  const modes = ["HEX", "RGB", "HSV"];
  let mode = 0;
  if ($$props.isAlpha === void 0 && $$bindings.isAlpha && isAlpha !== void 0)
    $$bindings.isAlpha(isAlpha);
  if ($$props.rgb === void 0 && $$bindings.rgb && rgb !== void 0)
    $$bindings.rgb(rgb);
  if ($$props.hsv === void 0 && $$bindings.hsv && hsv !== void 0)
    $$bindings.hsv(hsv);
  if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0)
    $$bindings.hex(hex);
  if ($$props.canChangeMode === void 0 && $$bindings.canChangeMode && canChangeMode !== void 0)
    $$bindings.canChangeMode(canChangeMode);
  $$result.css.add(css$a);
  Math.round(hsv.h);
  Math.round(hsv.s);
  Math.round(hsv.v);
  a = hsv.a === void 0 ? 1 : Math.round(hsv.a * 100) / 100;
  return `<div class="text-input svelte-11z4jba">${`<div class="input-container svelte-11z4jba"><input${add_attribute("value", hex, 0)} style="flex: 3" class="svelte-11z4jba">
			${isAlpha ? `<input aria-label="hexadecimal color"${add_attribute("value", a, 0)} type="number" min="0" max="1" step="0.01" class="svelte-11z4jba">` : ``}</div>`}

	${canChangeMode ? `<button aria-label="${"change inputs to " + escape(modes[(mode + 1) % 3], true)}" class="svelte-11z4jba">${escape(modes[mode])}</button>` : ``}
</div>`;
});
const SliderIndicator_svelte_svelte_type_style_lang$1 = "";
const css$9 = {
  code: "div.svelte-13znx8u{position:absolute;width:9.5px;height:9.5px;background-color:white;border-radius:5px;margin-left:1.5px;pointer-events:none;z-index:1;border:1px solid black;box-sizing:border-box}",
  map: null
};
const SliderIndicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let top;
  let { pos } = $$props;
  let { toRight } = $$props;
  if ($$props.pos === void 0 && $$bindings.pos && pos !== void 0)
    $$bindings.pos(pos);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  $$result.css.add(css$9);
  top = `calc(${pos} * (var(--picker-height, 200px) - 14px) / 100 + 2px)`;
  return `<div class="slider-indicator svelte-13znx8u" style="${"top: " + escape(top, true)}"></div>`;
});
const PickerIndicator_svelte_svelte_type_style_lang$1 = "";
const css$8 = {
  code: "div.svelte-1nw247x{position:absolute;width:10px;height:10px;background-color:white;border-radius:5px;pointer-events:none;z-index:1;transition:box-shadow 0.2s}",
  map: null
};
const PickerIndicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let left;
  let top;
  let { pos } = $$props;
  let { hex } = $$props;
  let { isDark } = $$props;
  if ($$props.pos === void 0 && $$bindings.pos && pos !== void 0)
    $$bindings.pos(pos);
  if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0)
    $$bindings.hex(hex);
  if ($$props.isDark === void 0 && $$bindings.isDark && isDark !== void 0)
    $$bindings.isDark(isDark);
  $$result.css.add(css$8);
  left = `calc(${pos.x} * (var(--picker-width, 200px) - 14px) / 100 + 2px)`;
  top = `calc(${pos.y} * (var(--picker-height, 200px) - 14px) / 100 + 2px)`;
  return `<div class="picker-indicator svelte-1nw247x"${add_attribute("style", `left: ${left}; top: ${top}; box-shadow: 0 0 4px ${isDark ? "white" : "black"};`, 0)}></div>`;
});
const ArrowKeyHandler = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_keyPressed;
  $$unsubscribe_keyPressed = subscribe(keyPressed, (value) => value);
  $$unsubscribe_keyPressed();
  return ``;
});
const PickerWrapper_svelte_svelte_type_style_lang$1 = "";
const css$7 = {
  code: "div.svelte-1hhmcjg{display:inline-block;margin-right:5px;width:var(--picker-width, 200px);height:var(--picker-height, 200px);border-radius:8px;overflow:hidden;outline:2px solid transparent;outline-offset:3px;transition:outline 0.2s ease-in-out;user-select:none}div.focused.svelte-1hhmcjg{outline:2px solid var(--focus-color, red)}",
  map: null
};
const PickerWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { focused } = $$props;
  let { toRight } = $$props;
  if ($$props.focused === void 0 && $$bindings.focused && focused !== void 0)
    $$bindings.focused(focused);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  $$result.css.add(css$7);
  return `<div class="${["picker-wrapper svelte-1hhmcjg", focused ? "focused" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const SliderWrapper_svelte_svelte_type_style_lang$1 = "";
const css$6 = {
  code: "div.svelte-1udewng{display:inline-block;margin-right:5px;width:var(--slider-width, 12px);height:var(--picker-height, 200px);border-radius:6px;overflow:hidden;user-select:none;outline:2px solid transparent;outline-offset:3px;transition:outline 0.2s ease-in-out}div.focused.svelte-1udewng{outline:2px solid var(--focus-color, red)}",
  map: null
};
const SliderWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { focused } = $$props;
  let { toRight } = $$props;
  if ($$props.focused === void 0 && $$bindings.focused && focused !== void 0)
    $$bindings.focused(focused);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  $$result.css.add(css$6);
  return `<div class="${["slider-wrapper svelte-1udewng", focused ? "focused" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const Input_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "label.svelte-2ybi8r{display:flex;align-items:center;gap:8px;cursor:pointer;border-radius:3px;margin:4px}.container.svelte-2ybi8r{position:relative;display:block;display:flex;align-items:center;justify-content:center}input.svelte-2ybi8r{margin:0;padding:0;border:none;width:4px;height:4px;flex-shrink:0;cursor:pointer;border-radius:50%;margin:0 12px}.alpha.svelte-2ybi8r{clip-path:circle(50%);background-image:linear-gradient(\n				to right,\n				rgba(238, 238, 238, 0.75),\n				rgba(238, 238, 238, 0.75)\n			),\n			linear-gradient(to right, black 50%, white 50%),\n			linear-gradient(to bottom, black 50%, white 50%);background-blend-mode:normal, difference, normal;background-size:12px 12px}.alpha.svelte-2ybi8r,.color.svelte-2ybi8r{position:absolute;width:30px;height:30px;border-radius:15px;user-select:none}input.svelte-2ybi8r:focus{outline:2px solid var(--focus-color, red);outline-offset:15px}",
  map: null
};
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { labelWrapper } = $$props;
  let { hex } = $$props;
  let { label } = $$props;
  let { isOpen } = $$props;
  if ($$props.labelWrapper === void 0 && $$bindings.labelWrapper && labelWrapper !== void 0)
    $$bindings.labelWrapper(labelWrapper);
  if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0)
    $$bindings.hex(hex);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  $$result.css.add(css$5);
  return `
<label class="svelte-2ybi8r"${add_attribute("this", labelWrapper, 0)}><div class="container svelte-2ybi8r"><input type="color"${add_attribute("value", hex, 0)} aria-haspopup="dialog" class="svelte-2ybi8r">
		<div class="alpha svelte-2ybi8r"></div>
		<div class="color svelte-2ybi8r" style="${"background: " + escape(hex, true)}"></div></div>
	${escape(label)}
</label>`;
});
const Wrapper_svelte_svelte_type_style_lang$1 = "";
const css$4 = {
  code: "div.svelte-6lhts{padding:8px 5px 5px 8px;background-color:white;margin:0 10px 10px;border:1px solid black;border-radius:12px;display:none;width:max-content}.isOpen.svelte-6lhts{display:block}.isPopup.svelte-6lhts{position:absolute;top:30px;z-index:var(--picker-z-index, 2)}",
  map: null
};
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { wrapper } = $$props;
  let { isOpen } = $$props;
  let { isPopup } = $$props;
  let { toRight } = $$props;
  if ($$props.wrapper === void 0 && $$bindings.wrapper && wrapper !== void 0)
    $$bindings.wrapper(wrapper);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.isPopup === void 0 && $$bindings.isPopup && isPopup !== void 0)
    $$bindings.isPopup(isPopup);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  $$result.css.add(css$4);
  return `<div class="${[
    "wrapper svelte-6lhts",
    (isOpen ? "isOpen" : "") + " " + (isPopup ? "isPopup" : "")
  ].join(" ").trim()}"${add_attribute("role", isPopup ? "dialog" : void 0, 0)} aria-label="color picker"${add_attribute("this", wrapper, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const A11yNotice_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "details.svelte-1s4dluu.svelte-1s4dluu{width:245px;margin:8px auto}summary.svelte-1s4dluu.svelte-1s4dluu{margin-bottom:8px;cursor:pointer;transition:color 0.2s}summary.svelte-1s4dluu.svelte-1s4dluu:hover{color:blue}.not-closable.svelte-1s4dluu summary.svelte-1s4dluu{pointer-events:none}.not-closable.svelte-1s4dluu summary.svelte-1s4dluu{list-style:none}.svelte-1s4dluu.svelte-1s4dluu:focus-visible,span.svelte-1s4dluu :focus-visible{border-radius:2px;outline:2px solid var(--focus-color, red);outline-offset:2px}",
  map: null
};
const A11yNotice = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let closable;
  let _a11yColors;
  let { components } = $$props;
  let { a11yColors } = $$props;
  let { hex } = $$props;
  let { color } = $$props;
  let { a11yGuidelines } = $$props;
  let { isA11yOpen } = $$props;
  let { isA11yClosable } = $$props;
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.a11yColors === void 0 && $$bindings.a11yColors && a11yColors !== void 0)
    $$bindings.a11yColors(a11yColors);
  if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0)
    $$bindings.hex(hex);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.a11yGuidelines === void 0 && $$bindings.a11yGuidelines && a11yGuidelines !== void 0)
    $$bindings.a11yGuidelines(a11yGuidelines);
  if ($$props.isA11yOpen === void 0 && $$bindings.isA11yOpen && isA11yOpen !== void 0)
    $$bindings.isA11yOpen(isA11yOpen);
  if ($$props.isA11yClosable === void 0 && $$bindings.isA11yClosable && isA11yClosable !== void 0)
    $$bindings.isA11yClosable(isA11yClosable);
  $$result.css.add(css$3);
  closable = isA11yOpen && !isA11yClosable;
  _a11yColors = a11yColors.map((a11yColor) => ({
    ...a11yColor,
    contrast: color?.contrast(a11yColor.hex)
  }));
  return `<details class="${"a11y-notice " + escape(closable ? "not-closable" : "", true) + " svelte-1s4dluu"}" ${isA11yOpen ? "open" : ""}><summary${add_attribute("tabindex", closable ? -1 : void 0, 0)} class="svelte-1s4dluu">${validate_component(components.a11ySummary || missing_component, "svelte:component").$$render($$result, { a11yColors: _a11yColors, hex }, {}, {})}</summary>
	<div class="svelte-1s4dluu">${each(_a11yColors, ({ contrast, hex: a11yHex, placeholder, reverse, size }) => {
    return `${validate_component(components.a11ySingleNotice || missing_component, "svelte:component").$$render(
      $$result,
      {
        contrast,
        textColor: reverse ? a11yHex : hex,
        bgColor: reverse ? hex : a11yHex,
        placeholder,
        size
      },
      {},
      {}
    )}`;
  })}
		${a11yGuidelines ? `<span class="svelte-1s4dluu"><!-- HTML_TAG_START -->${a11yGuidelines}<!-- HTML_TAG_END --></span>` : ``}</div>
</details>`;
});
const A11ySingleNotice_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".a11y-single-notice.svelte-obnxge.svelte-obnxge{display:flex;align-items:center;margin:4px 0;gap:12px;height:48px}.large.svelte-obnxge.svelte-obnxge{font-size:22px}.score.svelte-obnxge.svelte-obnxge{width:95px;flex-shrink:0;margin-bottom:10px}.score.svelte-obnxge p.svelte-obnxge{margin-bottom:2px}.grade.svelte-obnxge.svelte-obnxge{border-radius:50px;padding:2px 8px;background-color:orange;font-weight:bold}.grade-ok.svelte-obnxge.svelte-obnxge{background-color:green;color:white}p.svelte-obnxge.svelte-obnxge{margin:0}.lorem.svelte-obnxge.svelte-obnxge{flex:1;text-align:center;padding:4px 8px;border-radius:4px;border:1px solid black;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}",
  map: null
};
const A11ySingleNotice = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { textColor } = $$props;
  let { bgColor } = $$props;
  let { placeholder = void 0 } = $$props;
  let { contrast = 1 } = $$props;
  let { size = void 0 } = $$props;
  if ($$props.textColor === void 0 && $$bindings.textColor && textColor !== void 0)
    $$bindings.textColor(textColor);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.contrast === void 0 && $$bindings.contrast && contrast !== void 0)
    $$bindings.contrast(contrast);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$2);
  return `<div class="a11y-single-notice svelte-obnxge"><p class="${"lorem " + escape(size === "large" && "large", true) + " svelte-obnxge"}" style="${"color: " + escape(textColor, true) + "; background-color: " + escape(bgColor, true)}">${escape(placeholder || "Lorem Ipsum")}</p>
	<div class="score svelte-obnxge"><p class="svelte-obnxge">contrast: ${escape(contrast >= 10 ? contrast.toFixed(1) : contrast)}</p>
		<span class="${[
    "grade svelte-obnxge",
    contrast > (size === "large" ? 3 : 4.5) ? "grade-ok" : ""
  ].join(" ").trim()}">AA</span>
		<span class="${[
    "grade svelte-obnxge",
    contrast > (size === "large" ? 4.5 : 7) ? "grade-ok" : ""
  ].join(" ").trim()}">AAA</span></div>
</div>`;
});
function getNumberOfGradeFailed({ contrast, size }) {
  if (!contrast) {
    return 1;
  }
  if (size === "large") {
    return contrast < 3 ? 2 : contrast < 4.5 ? 1 : 0;
  } else {
    return contrast < 4.5 ? 2 : contrast < 7 ? 1 : 0;
  }
}
const A11ySummary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let count;
  let message;
  let { a11yColors } = $$props;
  let { hex } = $$props;
  if ($$props.a11yColors === void 0 && $$bindings.a11yColors && a11yColors !== void 0)
    $$bindings.a11yColors(a11yColors);
  if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0)
    $$bindings.hex(hex);
  count = a11yColors.map(getNumberOfGradeFailed).reduce((acc, c) => acc + c);
  message = count ? `⚠️ ${count} contrast grade${count && "s"} fail` : "Contrast grade information";
  return `${escape(message)}`;
});
const ColorPicker_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "span.svelte-7ntk55{position:relative}",
  map: null
};
const ColorPicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  extend([a11yPlugin]);
  let { components = {} } = $$props;
  const dispatch = createEventDispatcher();
  let { label = "Choose a color" } = $$props;
  let { isAlpha = true } = $$props;
  let { isInput = true } = $$props;
  let { isTextInput = true } = $$props;
  let { canChangeMode = true } = $$props;
  let { isA11y = false } = $$props;
  let { a11yColors = [{ hex: "#ffffff" }] } = $$props;
  let { a11yGuidelines = '<p style="margin: 0; font-size: 12px;">Learn more at <a href="https://webaim.org/articles/contrast/" target="_blank">WebAIM contrast guide</a></p>' } = $$props;
  let { isA11yOpen = false } = $$props;
  let { isA11yClosable = true } = $$props;
  let { isPopup = isInput } = $$props;
  let { isOpen = !isInput } = $$props;
  let { toRight = false } = $$props;
  let { disableCloseClickOutside = false } = $$props;
  let { rgb = { r: 255, g: 0, b: 0, a: 1 } } = $$props;
  let { hsv = { h: 0, s: 100, v: 100, a: 1 } } = $$props;
  let { hex = "#ff0000" } = $$props;
  let { color = void 0 } = $$props;
  let { isDark = false } = $$props;
  let _rgb = { r: 255, g: 0, b: 0, a: 1 };
  let _hsv = { h: 0, s: 100, v: 100, a: 1 };
  let _hex = "#ff0000";
  let span;
  const default_components = {
    sliderIndicator: SliderIndicator,
    pickerIndicator: PickerIndicator,
    alphaIndicator: SliderIndicator,
    pickerWrapper: PickerWrapper,
    sliderWrapper: SliderWrapper,
    alphaWrapper: SliderWrapper,
    textInput: TextInput,
    a11yNotice: A11yNotice,
    a11ySingleNotice: A11ySingleNotice,
    a11ySummary: A11ySummary,
    input: Input,
    wrapper: Wrapper
  };
  function getComponents() {
    return { ...default_components, ...components };
  }
  let labelWrapper;
  let wrapper;
  function updateColor() {
    if (hsv.h === _hsv.h && hsv.s === _hsv.s && hsv.v === _hsv.v && hsv.a === _hsv.a && rgb.r === _rgb.r && rgb.g === _rgb.g && rgb.b === _rgb.b && rgb.a === _rgb.a && hex === _hex) {
      return;
    }
    if (hsv.a === void 0)
      hsv.a = 1;
    if (_hsv.a === void 0)
      _hsv.a = 1;
    if (rgb.a === void 0)
      rgb.a = 1;
    if (_rgb.a === void 0)
      _rgb.a = 1;
    if (hex?.substring(7) === "ff")
      hex = hex.substring(0, 7);
    if (hex?.substring(7) === "ff")
      hex = hex.substring(0, 7);
    if (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== _hsv.a) {
      color = colord(hsv);
      rgb = color.toRgb();
      hex = color.toHex();
    } else if (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a) {
      color = colord(rgb);
      hex = color.toHex();
      hsv = color.toHsv();
    } else if (hex !== _hex) {
      color = colord(hex);
      rgb = color.toRgb();
      hsv = color.toHsv();
    }
    if (color) {
      isDark = color.isDark();
    }
    _hsv = Object.assign({}, hsv);
    _rgb = Object.assign({}, rgb);
    _hex = hex;
    dispatch("input", { color, hsv, rgb, hex });
  }
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.isAlpha === void 0 && $$bindings.isAlpha && isAlpha !== void 0)
    $$bindings.isAlpha(isAlpha);
  if ($$props.isInput === void 0 && $$bindings.isInput && isInput !== void 0)
    $$bindings.isInput(isInput);
  if ($$props.isTextInput === void 0 && $$bindings.isTextInput && isTextInput !== void 0)
    $$bindings.isTextInput(isTextInput);
  if ($$props.canChangeMode === void 0 && $$bindings.canChangeMode && canChangeMode !== void 0)
    $$bindings.canChangeMode(canChangeMode);
  if ($$props.isA11y === void 0 && $$bindings.isA11y && isA11y !== void 0)
    $$bindings.isA11y(isA11y);
  if ($$props.a11yColors === void 0 && $$bindings.a11yColors && a11yColors !== void 0)
    $$bindings.a11yColors(a11yColors);
  if ($$props.a11yGuidelines === void 0 && $$bindings.a11yGuidelines && a11yGuidelines !== void 0)
    $$bindings.a11yGuidelines(a11yGuidelines);
  if ($$props.isA11yOpen === void 0 && $$bindings.isA11yOpen && isA11yOpen !== void 0)
    $$bindings.isA11yOpen(isA11yOpen);
  if ($$props.isA11yClosable === void 0 && $$bindings.isA11yClosable && isA11yClosable !== void 0)
    $$bindings.isA11yClosable(isA11yClosable);
  if ($$props.isPopup === void 0 && $$bindings.isPopup && isPopup !== void 0)
    $$bindings.isPopup(isPopup);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.toRight === void 0 && $$bindings.toRight && toRight !== void 0)
    $$bindings.toRight(toRight);
  if ($$props.disableCloseClickOutside === void 0 && $$bindings.disableCloseClickOutside && disableCloseClickOutside !== void 0)
    $$bindings.disableCloseClickOutside(disableCloseClickOutside);
  if ($$props.rgb === void 0 && $$bindings.rgb && rgb !== void 0)
    $$bindings.rgb(rgb);
  if ($$props.hsv === void 0 && $$bindings.hsv && hsv !== void 0)
    $$bindings.hsv(hsv);
  if ($$props.hex === void 0 && $$bindings.hex && hex !== void 0)
    $$bindings.hex(hex);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.isDark === void 0 && $$bindings.isDark && isDark !== void 0)
    $$bindings.isDark(isDark);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (hsv || rgb || hex) {
        updateColor();
      }
    }
    $$rendered = `${validate_component(ArrowKeyHandler, "ArrowKeyHandler").$$render($$result, {}, {}, {})}



<span class="color-picker svelte-7ntk55"${add_attribute("this", span, 0)}>${isInput ? `${validate_component(getComponents().input || missing_component, "svelte:component").$$render(
      $$result,
      { hex, label, labelWrapper, isOpen },
      {
        labelWrapper: ($$value) => {
          labelWrapper = $$value;
          $$settled = false;
        },
        isOpen: ($$value) => {
          isOpen = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `<input type="hidden"${add_attribute("value", hex, 0)}>`}

	${validate_component(getComponents().wrapper || missing_component, "svelte:component").$$render(
      $$result,
      { isOpen, isPopup, toRight, wrapper },
      {
        wrapper: ($$value) => {
          wrapper = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Picker, "Picker").$$render(
            $$result,
            {
              components: getComponents(),
              h: hsv.h,
              toRight,
              isDark,
              s: hsv.s,
              v: hsv.v,
              isOpen
            },
            {
              s: ($$value) => {
                hsv.s = $$value;
                $$settled = false;
              },
              v: ($$value) => {
                hsv.v = $$value;
                $$settled = false;
              },
              isOpen: ($$value) => {
                isOpen = $$value;
                $$settled = false;
              }
            },
            {}
          )}
		${validate_component(Slider, "Slider").$$render(
            $$result,
            {
              components: getComponents(),
              toRight,
              h: hsv.h
            },
            {
              h: ($$value) => {
                hsv.h = $$value;
                $$settled = false;
              }
            },
            {}
          )}
		${isAlpha ? `${validate_component(Alpha, "Alpha").$$render(
            $$result,
            {
              components: getComponents(),
              hex,
              toRight,
              a: hsv.a,
              isOpen
            },
            {
              a: ($$value) => {
                hsv.a = $$value;
                $$settled = false;
              },
              isOpen: ($$value) => {
                isOpen = $$value;
                $$settled = false;
              }
            },
            {}
          )}` : ``}
		${isTextInput ? `${validate_component(getComponents().textInput || missing_component, "svelte:component").$$render(
            $$result,
            { isAlpha, canChangeMode, hex, rgb, hsv },
            {
              hex: ($$value) => {
                hex = $$value;
                $$settled = false;
              },
              rgb: ($$value) => {
                rgb = $$value;
                $$settled = false;
              },
              hsv: ($$value) => {
                hsv = $$value;
                $$settled = false;
              }
            },
            {}
          )}` : ``}
		${isA11y ? `${validate_component(getComponents().a11yNotice || missing_component, "svelte:component").$$render(
            $$result,
            {
              components: getComponents(),
              a11yColors,
              color,
              hex,
              a11yGuidelines,
              isA11yOpen,
              isA11yClosable
            },
            {},
            {}
          )}` : ``}`;
        }
      }
    )}
</span>`;
  } while (!$$settled);
  return $$rendered;
});
const PickerIndicator_svelte_svelte_type_style_lang = "";
const PickerWrapper_svelte_svelte_type_style_lang = "";
const SliderIndicator_svelte_svelte_type_style_lang = "";
const SliderWrapper_svelte_svelte_type_style_lang = "";
const Wrapper_svelte_svelte_type_style_lang = "";
const A11yHorizontalWrapper_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".info-box.svelte-gy3wde.svelte-gy3wde{font-size:12px}.tool-tip.svelte-gy3wde.svelte-gy3wde{font-size:10px;display:flex;align-items:center;justify-content:center;width:200px;padding:10px 20px}.tooltip-svg.svelte-gy3wde.svelte-gy3wde{position:absolute;width:20px;height:10px;bottom:-5px;left:50%;transform:translateX(-50%);overflow:visible}.tooltip-svg.svelte-gy3wde path.svelte-gy3wde{fill:black}",
  map: null
};
function getRandomColor() {
  return {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  };
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_contracts;
  let $$unsubscribe_signer;
  let $connected, $$unsubscribe_connected;
  let $chainId, $$unsubscribe_chainId;
  let $chainData, $$unsubscribe_chainData;
  $$unsubscribe_contracts = subscribe(contracts, (value) => value);
  $$unsubscribe_signer = subscribe(signer, (value) => value);
  $$unsubscribe_connected = subscribe(connected, (value) => $connected = value);
  $$unsubscribe_chainId = subscribe(chainId, (value) => $chainId = value);
  $$unsubscribe_chainData = subscribe(chainData, (value) => $chainData = value);
  let priceText = "2.0 ETH";
  let destination = "";
  let coupon = "";
  let canvasWidth;
  function updateCanvasWidth() {
    canvasWidth = window.innerWidth >= 768 ? 896 : window.innerWidth;
  }
  onDestroy(async () => {
    window.removeEventListener("resize", updateCanvasWidth);
  });
  let rgb = getRandomColor();
  if ($connected) {
    defaultEvmStores.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="min-h-screen">${$connected ? `${$chainId !== 1 ? `<p>Your are connected to the wrong network (&quot;${escape($chainData.name)}&quot;)&quot;. Please
        connect to the mainnet
      </p>` : `<div class="flex flex-col"><div class="w-full flex items-center justify-evenly"><div class="flex flex-col text-white mt-5 p-6 gap-y-4 w-[50rem] my-0 md:my-20"><h1 class="text-green underline">Getting Started!</h1>
            <p class="info-box svelte-gy3wde">Draw your message on the canvas below, it will be stored on the
              Ethereum blockchain eternarly.
            </p>

            <p class="info-box svelte-gy3wde">Press down lightly your finger where you want to start drawing on
              the canvas. And move your finger in the direction you wish to
              draw.
            </p>

            <p class="info-box svelte-gy3wde">Use the erase button to gently erase pixel.</p></div>

          
          <div class="flex flex-col items-stretch md:items-center relative p-6">
            <div><label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">In memory of:
              </label>
              <input type="text" id="address" class="bg-gray-50 blue border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="0xDE2..." required${add_attribute("value", destination, 0)}></div>

            ${``}</div></div>

        <br>
        <div class="p-10"><h1 class="text-white">Your Canvas</h1>
          <div class="flex items-center justify-center flex-col md:flex-row-reverse"><div class="flex justify-center text-white text-sm">${validate_component(ColorPicker, "ColorPicker").$$render(
      $$result,
      {
        label: priceText,
        isPopup: true,
        isInput: true,
        isAlpha: false,
        isDark: true,
        rgb
      },
      {
        rgb: ($$value) => {
          rgb = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
            <div class=""><canvas id="canvas" class="block w-full border-2 my-4 justify-center items-center mx-auto" height="168px"${add_attribute("width", canvasWidth, 0)}></canvas></div></div></div>
        <div class="p-10 bg-black bottom-bar svelte-gy3wde"><br>
          <div class="flex justify-between flex-col md:flex-row gap-y-6 md:gap-y-0"><div><label for="coupon" class="block w-56 mb-2 text-sm font-medium text-gray-100 dark:text-white">Coupon</label>
              <input type="text" id="coupon" class="bg-gray-50 w-1/6 border text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0xDE2..."${add_attribute("value", coupon, 0)}></div>

            <div><div class="text-white">You can pay:
                <button id="price" class="w-full mt-4 neon-btn blue px-2 py-1 text-sm text-white rounded-md shadow-md focus:outline-none">Submit
                </button></div>
              <button id="eraseBtn" class="block w-full mt-4 px-4 py-2 text-base font-medium text-white bg-red-500 rounded-md shadow-md hover:bg-red-900 focus:outline-none focus:ring-red-500 focus:ring-offset-2">Erase</button></div></div></div></div>`}` : `<div class="h-[30vh] flex items-center justify-center p-20"><p class="text-white text-center">Please first <a href="/" class="">connect</a>
        to the mainnet network to be able to use this page!
      </p></div>`}
</div>`;
  } while (!$$settled);
  $$unsubscribe_contracts();
  $$unsubscribe_signer();
  $$unsubscribe_connected();
  $$unsubscribe_chainId();
  $$unsubscribe_chainData();
  return $$rendered;
});
export {
  Page as default
};
