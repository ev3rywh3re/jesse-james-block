# jesse-james-block

This repository contains the code for the "Jesse James Block" WordPress theme.

This is an experimental WordPress Child Theme using the twentytwentyfour theme as a base with a focus on full site editing and customization.

## Installation

1. Download the theme files from this repository.
2. Upload the files to your WordPress website's `/wp-content/themes` directory.
3. Activate the theme from the Appearance > Themes page in your WordPress dashboard.

## License

This theme is licensed under the GPLv3 license.

## Contact

For any questions or support, please contact on Github for now.

### Notes

##### npm

This has the npm basic wordpress packages wp-scripts and elements for block building. Below are additions.

```
npm install -D tailwindcss
npx tailwindcss init
```

Watch stylesheet generation with tailwind:
npx tailwindcss -i ./tailwind.css -o ./style.css --watch

Here is the command to build the CSS:
npm run build:css

##### The golden ratio plugin notes

https://github.com/truefrontier/tailwindcss-golden-ratio

```
npm i -D tailwindcss-golden-ratio
```
