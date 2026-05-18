---
name: "brand-guidelines"
description: "Applies Anthropic's official brand colors and typography to artifacts. Invoke when brand colors, style guidelines, visual formatting, or company design standards apply."
---

# Anthropic Brand Styling

## Overview

To access Anthropic's official brand identity and style resources, use this skill.

**Keywords:** branding, corporate identity, visual identity, post-processing, styling, brand colors, typography, Anthropic brand, visual formatting, visual design

## Brand Guidelines

### Colors

#### Main Colors:

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Dark | #141413 | RGB(20, 20, 19) | Primary text and dark backgrounds |
| Light | #faf9f5 | RGB(250, 249, 245) | Light backgrounds and text on dark |
| Mid Gray | #b0aea5 | RGB(176, 174, 165) | Secondary elements |
| Light Gray | #e8e6dc | RGB(232, 230, 220) | Subtle backgrounds |

#### Accent Colors:

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Orange | #d97757 | RGB(217, 119, 87) | Primary accent |
| Blue | #6a9bcc | RGB(106, 155, 204) | Secondary accent |
| Green | #788c5d | RGB(120, 140, 93) | Tertiary accent |

### Typography

- **Headings:** Poppins (with Arial fallback)
- **Body Text:** Lora (with Georgia fallback)
- **Note:** Fonts should be pre-installed in your environment for best results

## Features

### Smart Font Application

- Applies Poppins font to headings (24pt and larger)
- Applies Lora font to body text
- Automatically falls back to Arial/Georgia if custom fonts unavailable
- Preserves readability across all systems

### Text Styling

- Headings (24pt+): Poppins font
- Body text: Lora font
- Smart color selection based on background
- Preserves text hierarchy and formatting

### Shape and Accent Colors

- Non-text shapes use accent colors
- Cycles through orange, blue, and green accents
- Maintains visual interest while staying on-brand

## Technical Details

### Font Management

- Uses system-installed Poppins and Lora fonts when available
- Provides automatic fallback to Arial (headings) and Georgia (body)
- No font installation required - works with existing system fonts
- For best results, pre-install Poppins and Lora fonts in your environment

### Color Application

- Uses RGB color values for precise brand matching
- Applied via python-pptx's RGBColor class
- Maintains color fidelity across different systems

## Usage Examples

### Applying Brand Colors

When creating documents, presentations, or visual materials:

1. Use Dark (#141413) for primary text on light backgrounds
2. Use Light (#faf9f5) for backgrounds or text on dark backgrounds
3. Use Orange (#d97757) as the primary accent color for highlights
4. Use Blue (#6a9bcc) and Green (#788c5d) as secondary accents

### Applying Typography

```
Headings (24pt+):
- Font: Poppins
- Fallback: Arial

Body Text:
- Font: Lora  
- Fallback: Georgia
```

## When to Use This Skill

Invoke this skill when:

- Creating documents that need Anthropic branding
- Designing presentations with company styling
- Applying visual formatting to artifacts
- Ensuring consistency with Anthropic design standards
- Working on corporate identity or visual identity projects
