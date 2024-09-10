import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    rules: {
        "no-unused-vars": "error",
        "no-undef": "error"
    }
  },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
];