---
id: cohub.bp.board-export-and-playback
title: Master Board exports, playback policy, and live file nodes
type: playbook
audience: [builder, agent]
features: [board, cli, export, playback, pdf]
difficulty: intermediate
related:
  - cohub.concept.board-runtime
  - cohub.concept.space
sources:
  - https://cohub.run/changelog (v2.0-v2.4)
---

# Master Board exports, playback policy, and live file nodes

## When

You want to organize workspace files visually on a Board, configure autoplay loops for demos, or export high-resolution PNG/WebP images via CLI.

## Outcome

- Workspace files (PDFs, images, code, binaries) placed cleanly as interactive Board nodes  
- Autoplay sequence policies configured for unattended Board presentations  
- Clean headless PNG/JPEG/WebP renders exported via `cohub boards export`  

## Steps

### A. Place live files on a Board

1. In Chat or CLI, drag or reference any workspace file path onto a Board.
2. Binary and code files automatically generate path-based preview cards.
3. PDF files render continuous-scroll paginated previews.

### B. Configure Board Autoplay Policy

Add an autoplay policy to your Board metadata so viewers see animated playback immediately:

```json
{
  "autoplay": {
    "sequenceId": "demo-intro",
    "delayMs": 500,
    "loop": true
  }
}
```

### C. Headless Board Export via CLI

Export specific Board regions or full documents without opening a browser GUI:

```bash
# Export full board as 2x PNG
cohub boards export <boardId> -o out.png --scale 2

# Export specific items or frame rects
cohub boards export <boardId> --rect 0,0,1920,1080 --theme dark -o frame.webp
```

## Done when

- [ ] Workspace files display clear preview cards on the Board
- [ ] `cohub boards export` produces crisp renders matching the active space theme
- [ ] Board links in chat open directly in the Board preview surface

## See also

- Concept: [board-runtime](../concepts/board-runtime.md)

---

[中文](../zh/playbooks/board-export-and-playback.md)
