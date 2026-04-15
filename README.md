# mcp-tarot-draw

tarot-draw MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `tarot_draw_pull` | Draw a tarot card from the 78-card deck. Interprets it for your situation. Accuracy not guaranteed. Refunds not available. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "tarot-draw": {
      "url": "https://gateway.pipeworx.io/tarot-draw/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use tarot-draw
```

## License

MIT
