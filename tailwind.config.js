/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./style.css", "./**/*.php"],
  theme: {
    extend: {},
    goldenRatio: {
      // Custom configuration @see: https://github.com/truefrontier/tailwindcss-golden-ratio/tree/master#how-to-customize

      /**
       * Use a prefix instead of overwriting existing spacing utilities
       * @type {Boolean|String}
       * default: true|'gr-'
       * example: 'golden-ratio-' would generate classes like mt-golden-ratio-2);
       */
      prefix: true,

      /**
       * The spacing unit
       * @type {String}
       * default: 'rem'
       */
      spacerUnit: 'rem',

      /**
       * The starting point for spacing
       * @type {Number}
       * default: 1.5
       * 
       * There are 11 spacing values in this system.
       * That puts the 6 value in the middle, so it is the base.
       * Setting the spacerBase to `1.5` will make `m-gr-6` => `margin: 1.5rem`
       * 
       * Values 5-1 get exponentially smaller by the golden-ratio factor. 
       * eg. `m-gr-5` => `margin: 0.927051rem` // value comes from (1.5 / 1.61803)
       * eg. `m-gr-4` => `margin: 0.572949rem` // value comes from (1.5 / 1.61803 / 1.61803)
       * 
       * Values 7-11 get expontially larger by the golden-ratio factor. 
       * eg. `m-gr-7` => `margin: 2.42705rem` // value comes from (1.5 * 1.61803)
       * eg. `m-gr-8` => `margin: 3.92705rem` // value comes from (1.5 * 1.61803 * 1.61803)
       * 
       */
      spacerBase: 1.5,

      /**
       * The unit for fixed spacing
       * @type {String}
       * default: 'px'
       * 
       * This duplicates the golden ratio spacing but fixed.
       * This gives you more control when working with things like:
       *  - system font-size settings for accessiblility
       */
      fixedSpacerUnit: 'px',

      /**
       * How many fixed units are in 1 spacer base unit
       * @type {Number}
       * default: 16
       * 
       * example: `m-grf-6` => `24px` // value comes from (16 * 1.5) where 1.5 is the spacer unit
       */
      fixedUnitsPerSpacerUnit: 16,

      /**
       * Round to the nearest pixel
       * @type {Boolean}
       * default: true
       * 
       * If you want to use the fixed values, you probably don't want partial pixels. 
       * This gives you more control when working with things like:
       *  - not cutting off svgs on certain devices
       */
      roundFixedValues: true,

      /**
       * Use css variables for generated values
       * @type {Boolean}
       * 
       * This is useful if you ever want to use custom calc()
       * eg. -translate-y-[calc(100%+var(--golden-ratio-6))]
       */
      useCssVars: true


    },
  },
  plugins: [
    require('tailwindcss-golden-ratio'), 
  ],
}

module.exports = {
  // ...

  theme: {
    // ...
    
    goldenRatio: {
      /**
       * Use a prefix instead of overwriting existing spacing utilities
       * @type {Boolean|String}
       * default: true|'gr-'
       * example: 'golden-ratio-' would generate classes like mt-golden-ratio-2);
       */
      prefix: true,

      /**
       * The spacing unit
       * @type {String}
       * default: 'rem'
       */
      spacerUnit: 'rem',

      /**
       * The starting point for spacing
       * @type {Number}
       * default: 1.5
       * 
       * There are 11 spacing values in this system.
       * That puts the 6 value in the middle, so it is the base.
       * Setting the spacerBase to `1.5` will make `m-gr-6` => `margin: 1.5rem`
       * 
       * Values 5-1 get exponentially smaller by the golden-ratio factor. 
       * eg. `m-gr-5` => `margin: 0.927051rem` // value comes from (1.5 / 1.61803)
       * eg. `m-gr-4` => `margin: 0.572949rem` // value comes from (1.5 / 1.61803 / 1.61803)
       * 
       * Values 7-11 get expontially larger by the golden-ratio factor. 
       * eg. `m-gr-7` => `margin: 2.42705rem` // value comes from (1.5 * 1.61803)
       * eg. `m-gr-8` => `margin: 3.92705rem` // value comes from (1.5 * 1.61803 * 1.61803)
       * 
       */
      spacerBase: 1.5,

      /**
       * The unit for fixed spacing
       * @type {String}
       * default: 'px'
       * 
       * This duplicates the golden ratio spacing but fixed.
       * This gives you more control when working with things like:
       *  - system font-size settings for accessiblility
       */
      fixedSpacerUnit: 'px',

      /**
       * How many fixed units are in 1 spacer base unit
       * @type {Number}
       * default: 16
       * 
       * example: `m-grf-6` => `24px` // value comes from (16 * 1.5) where 1.5 is the spacer unit
       */
      fixedUnitsPerSpacerUnit: 16,

      /**
       * Round to the nearest pixel
       * @type {Boolean}
       * default: true
       * 
       * If you want to use the fixed values, you probably don't want partial pixels. 
       * This gives you more control when working with things like:
       *  - not cutting off svgs on certain devices
       */
      roundFixedValues: true,

      /**
       * Use css variables for generated values
       * @type {Boolean}
       * 
       * This is useful if you ever want to use custom calc()
       * eg. -translate-y-[calc(100%+var(--golden-ratio-6))]
       */
      useCssVars: true
    },
    
    // ...
  },

  plugins: [
    require('tailwindcss-golden-ratio'), 
  ],

  // ...
}