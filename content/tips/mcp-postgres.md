---
title: "Postgres MCP server"
summary: "Learn how to use Cursor's MCP server to connect to and query your Postgres database directly from the editor"
date: 2025-03-31
author:
  name: "Deepak Garasangi"
  x: "https://x.com/soulblissX"
feature: "Postgres MCP server"
difficulty: "intermediate"
media:
  video: "https://cdn.diligenceai.dev/assets/cursor_postgres.mp4"
categories: ["mcp_servers"]
tools: ["postgres"]
---

## Introduction

The MCP protocol allows cursor agent to interact with your postgres server in a read only mode.

You can utlize it query and analyze your Postgres database right within Cursor.

## Installation

<Installation url="https://cursorintro.com/mcp-rules/r/postgres.json" />

## Getting Started

1. Once you run the above command, you will see a `.cursor` folder created in your project repo
2. Within it you will see a `mcp.json` file
3. Open the file and update your postgres connection details.
4. Open Cursor settings by going Settings > Cursor settings > MCP 
5. You should click on "Enabled" button and click on refresh
6. You should see a green circle beside Posgres 
7. It means the connection is ready and your Cursor agent can talk with your database

### Resources

1. [Postgres MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) open source code internals to check how it's built