# Freedom Combination Turborepo

<div style="display:flex;gap:30px;">
<img  height="150px" width="150px" src="https://www.freedomcombination.com/images/foundation-logo.svg" />
<img  height="150px" width="150px" src="https://user-images.githubusercontent.com/4060187/196936104-5797972c-ab10-4834-bd61-0d1e5f442c9c.png" />
</div>

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `api`: Strapi Backend
- `dashboard`: https://dashboard.freedomcombination.com
- `foundation`: https://freedomcombination.com
- `kunsthalte`: https://kunsthalte.com
- `trend-rights`: https://trendrights.com

### Packages

- `config`: `@fc/config` Menus, Seo, Theme, Constants
- `context`: `@fc/context` AuthContext
- `eslint-config-fc`: Eslint
- `mocks`: `@fc/mocks` Strapi Mock Data
- `stripe`: `@fc/stripe` Stripe
- `secrets`: `@fc/secrets` Secret Env Variables
- `services`: `@fc/services` Queries, Mutations, Fetch Functions
- `tsconfig`: Tsconfig
- `types`: `@fc/types` All Strapi Model Types
- `ui`: `@fc/ui` Components, Storybook
- `utils`: `@fc/utils` Utility Functions

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Postgres

You need to have a running [PostgreSQL](https://www.postgresql.org/download/) server locally on port 5432

### Start Project

```bash
yarn install

# Seed database
yarn import

# Start all apps
yarn dev

# Start Individual App
yarn dashboard
yarn foundation
yarn kunsthalte
yarn trend-rights
yarn storybook
# The backend (api) will always be accessible via localhost:1337 for dev mode.
```

### Scripts

```bash
yarn lint # Checks lint issues
yarn clean # Deletes node_module and build folders
yarn format # Formats all files
```

### Install Packages

```bash
yarn add <package-name>
```

See [i18n-help](https://github.com/myniqx/i18n-help) for command-line translation tool usage details.
