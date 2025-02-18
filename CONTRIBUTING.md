# Contributing to Cursor Intro Tips

Thank you for your interest in contributing to Cursor Tips! This guide will help you understand how to contribute new tips to our collection.

Tips should be:
- Short < 1 minute demonstrations prefferably
- Focused on one specific Cursor feature (e.g., Agent Chat, MCP Integration, Code Completion)
- Clear and practical examples of real-world usage
- Easily reproducible by others

## Tip Structure

Each tip should be a Markdown file (`.md`) in the `content/tips` directory. Here's the required structure:

```markdown
---
title: "Your Tip Title"
summary: "A brief, compelling summary of what your tip demonstrates (1-2 sentences)"
date: 2024-03-21
author:
  name: "Your Name"
  github: "https://github.com/yourusername"
  x: "https://twitter.com/yourusername"  # Optional
media:
  # You must include at least ONE of the following:
  video: "https://youtube.com/..." # YouTube URL
  tweetUrl: "https://twitter.com/..." # Twitter post URL
  screenshots:
    - url: "https://your-image-host.com/image.png"
      caption: "Optional caption describing the screenshot"
feature: "The specific Cursor feature being demonstrated"
categories: 
  - "productivity"  # Choose from predefined categories
difficulty: "beginner" # One of: beginner, intermediate, advanced
---

## Detailed Description

Provide a detailed explanation of your tip here. Include:
- What problem it solves
- How to use it
- Any relevant keyboard shortcuts
- Examples of when it's most useful

## Example Usage

Show concrete examples of how to use the feature, including:
- Step-by-step instructions
- Common use cases
- Best practices
```

## Media Guidelines

1. **Video**
   - YouTube videos should be high quality and focused
   - Keep videos under 2 minutes when possible
   - Include captions or text overlays for clarity

2. **Screenshots**
   - Use PNG format for screenshots
   - Ensure text is readable
   - Highlight relevant areas
   - Host images on a reliable service

3. **Tweets**
   - Tweets should be from your own account
   - Should demonstrate the feature clearly
   - Include any relevant context

## Categories

Choose from our predefined categories:
From the `/config/categories.json` file

## Difficulty Levels

- `beginner`: Basic features, suitable for new users
- `intermediate`: More advanced features requiring some familiarity
- `advanced`: Complex workflows and power user features

## Submission Process

1. Fork the repository
2. Create your tip in the `content/tips` directory
3. Test locally using `npm run dev`
4. Submit a Pull Request
5. Respond to any feedback

## Style Guidelines

- Use clear, concise language
- Include practical examples
- Focus on one feature/tip per submission
- Proofread for spelling and grammar
- Follow the Markdown template structure

## Questions?

If you have questions, please open an issue or reach out to the maintainers.

Thank you for contributing to making Cursor Intro Tips better for everyone! 