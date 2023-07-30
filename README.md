# 📅 tw-daterange-fork 

> A modern, sleek DateRange picker created with the power of Tailwind CSS and date-fns.

![tw-daterange](https://raw.githubusercontent.com/SwapnilSoni1999/tw-daterange/main/screenshot.png)

---

## Table of Contents

- [📅 tw-daterange-fork](#-tw-daterange-fork)
  - [Table of Contents](#table-of-contents)
  - [🌟 Features ](#-features-)
  - [🛠️ Installation ](#️-installation-)
  - [📚 Usage ](#-usage-)
  - [🙋 Contributing ](#-contributing-)
  - [📜 License ](#-license-)

---

## 🌟 Features <a name="features"></a>

Here is the list of improvements over the original:

- **📦 Web Component:** Ready to integrate with popular frameworks such as React, Vue, Svelte, and many more.
- **⚡ Fully Optimized:** Minified and tree-shakable for the best performance.
- **✏️ Concise Code:** Clean and easy to understand or modify.

## 🛠️ Installation <a name="installation"></a>

Firstly, ensure [tailwind](https://tailwindcss.com) is installed and properly set up.

Then, add `tw-daterange-fork` to your project using the package manager of your choice:

<details>
  <summary>Npm</summary>

  ```shell
  npm install tw-daterange-fork
  ```
</details>
<details>
  <summary>Yarn</summary>

  ```shell
  yarn add tw-daterange-fork
  ```
</details>
<details>
  <summary>Pnpm</summary>

  ```shell
  pnpm add tw-daterange-fork
  ```
</details>

> The below part should be optional. Try without it first.

Finally, don't forget to add the following configuration to your tailwind.config.js:

```js
module.exports = {
  // ...
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-daterange-fork/dist/index.esm.js",
  ],
  // ...
}
```

## 📚 Usage <a name="usage"></a>

Here's a usage example:

```jsx
<tw-daterange is-open="true" />
```

Refer to [the component's documentation](./src/components/tw-daterange/readme.md) for more information.

## 🙋 Contributing <a name="contributing"></a>

Contributions are always welcome!

## 📜 License <a name="license"></a>

This project is licensed under the terms of the MIT license.

  * MIT © Olyno
  * MIT © Swapnil Soni