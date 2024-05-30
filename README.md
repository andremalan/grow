# Worklog

### May 27: 20:05-21:05 // 1

- Vite init
- Add repo
- Connect React Router, Apollo, Chakra UI and Framer with UI to show them all working

### May 29: 12:30 - 13:00 // 1.5

- Connect to dev version of seed graphQL Query.
- Flow data through to the right bits of UI.
- Add modal with the right data subset.

### May 29: 13:45 - 14:15 // 2

- Lay the components out in a reasonable way.

### May 30: 9:30 - 11:00 // 3.5

- Update seeds to add images and availability, implement those in front end.

### May 30: 13:00 - 13:20 // 4

- Add Framer Motion, deploy to Vercel, redeploy backend

### May 30: 18:00 - 19:00 // 5

- Working cart that can take items and modifiers

### May 30: 19:20 - 19:50 // 5.5

- Calculate quantities and totals in cart

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
