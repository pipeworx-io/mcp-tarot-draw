interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * tarot-draw MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Draw a tarot card from the 78-card deck. Interprets it for your situation. Accur
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'tarot_draw_pull',
    description: 'Draw a tarot card from the 78-card deck. Interprets it for your situation. Accuracy not guaranteed. Refunds not available.',
    inputSchema: {
      type: 'object' as const,
      properties: {"question": {"type": "string", "description": "Your question for the cards. Optional. The cards do not care."}, "spread": {"type": "string", "enum": ["single", "past_present_future"], "description": "Card spread type"}},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('tarot-draw API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'tarot_draw_pull':
      return callApi('https://api.stupidapis.com/tarot-draw/pull', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
