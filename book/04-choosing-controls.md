---
type: chapter
title: Choosing controls
---

# Choosing controls

Pick by **contract**, not appearance. Two controls that look alike can bind different value shapes or have different limitations.

## A repeatable method

1. Name the interaction, including loading, empty, error, and disabled states.
2. Find it in the capability map below and compare the listed alternatives.
3. In each candidate's page, read **When to use**, **Setup**, **Behavior**, and **Limitations** first; read the props table only for what you use.
4. Prefer the highest-level existing control. Compose before building custom.
5. If several controls must work together, use a recipe ([[05-recipes]]).

![[../docs/guides/component-overview#Choose by task]]

> [!tip] Date inputs are not schedulers
> DatePicker and friends enter a value. Calendar, Gantt, Organizer, and ResourceManager lay out events and resources.
