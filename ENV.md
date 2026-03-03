# Environment variables

No API keys are required for local development. Storybook and build work out of the box.

| Variable                          | Purpose                                    | Required | Get key                                                                 |
| --------------------------------- | ------------------------------------------ | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_AG_GRID_LICENSE_KEY` | Removes AG Grid watermark; production use  | No       | [ag-grid.com](https://www.ag-grid.com/javascript-data-grid/licensing/)  |
| `CHROMATIC_PROJECT_TOKEN`         | Chromatic visual regression in CI          | No       | [chromatic.com](https://www.chromatic.com)                              |
| `ANTHROPIC_API_KEY`               | Claude Code GitHub Action (GitHub Secrets) | No       | [anthropic.com](https://www.anthropic.com) – only if keeping claude.yml |
