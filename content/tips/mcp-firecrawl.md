---
title: "Clone Websites with Firecrawl MCP"
summary: "Learn how to use Cursor's MCP server with Firecrawl to instantly clone and analyze any website directly from the editor"
date: 2025-02-20
author:
  name: "Eric Ciarla"
  x: "https://x.com/ericciarla"
feature: "Firecrawl MCP"
difficulty: "beginner"
media:
  tweetUrl: "https://x.com/ericciarla/status/1892996534414811276"
categories: ["mcp_servers"]
tools: ["firecrawl"]
---

The Model Context Protocol (MCP) allows Cursor to connect directly to AI services. With the Firecrawl MCP integration, you can instantly clone and analyze any website right from within Cursor using natural language commands.

## Getting Started

To get started with Firecrawl MCP in Cursor:

1. Open Cursor Settings
2. Navigate to Features > MCP Servers
3. Click "+ Add New MCP Server"
4. Configure the server with:
   - Name: "firecrawl-mcp" (or any name you prefer)
   - Type: "command" 
   - Command: `env FIRECRAWL_API_KEY=your-api-key npx -y firecrawl-mcp`
5. Replace `your-api-key` with your actual Firecrawl API key
6. Click Save and refresh the MCP server list