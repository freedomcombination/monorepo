# Freedom Combination Turborepo

<div style="display:flex;gap:30px;">
<img  height="150px" width="150px" src="https://raw.githubusercontent.com/freedomcombination/monorepo/main/apps/foundation/public/images/foundation-logo.svg" />
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
- `lib`: `@fc/lib` Fetchers
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

### Install Bun

| Platform | Command                                         |
| -------- | ----------------------------------------------- |
| Linux    | `curl -fsSL https://bun.sh/install`             |
| macOS    | `curl -fsSL https://bun.sh/install`             |
| Windows  | `powershell -c "irm bun.sh/install.ps1 \| iex"` |

### Start Project

```bash
bun install
# Start all apps
bun run dev

# Start Individual App
bun run dashboard
bun run foundation
bun run kunsthalte
bun run trend-rights
bun run storybook
# The backend (api) will always be accessible via localhost:1337 for dev mode.
```

### Scripts

```bash
bun run lint # Checks lint issues
bun run clean # Deletes node_module and build folders
bun run format # Formats all files
```

### Install Packages

```bash
bun add <package-name>
```
