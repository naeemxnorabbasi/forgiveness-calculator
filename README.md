# AuraForgive — Science-Backed Forgiveness Calculator & Journey

[![Deploy static content to Pages](https://github.com/naeemxnorabbasi/forgiveness-calculator/actions/workflows/static.yml/badge.svg)](https://github.com/naeemxnorabbasi/forgiveness-calculator/actions/workflows/static.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25_Offline_Ready-0f766e)](https://naeemxnorabbasi.github.io/forgiveness-calculator/)
[![Privacy Guaranteed](https://img.shields.io/badge/Privacy-100%25_Local_Only-10b981)](https://naeemxnorabbasi.github.io/forgiveness-calculator/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Live Application**: [https://naeemxnorabbasi.github.io/forgiveness-calculator/](https://naeemxnorabbasi.github.io/forgiveness-calculator/)

---

## Overview

**AuraForgive** transforms peer-reviewed restorative psychology and mathematical modeling into an elegant, private, cross-platform healing tool.

Unlike generic mood trackers or meditation timers, AuraForgive quantifies the balance between cognitive-affective unburdening (positive facilitators) and lingering neurotoxic hostility (negative friction), providing actionable psychotherapeutic roadmaps.

---

## The Mathematical Foundation

AuraForgive evaluates interpersonal and intrapersonal forgiveness through a **Dual-Process Cognitive-Affective Balance Equation**:

$$F = \frac{\sum_{n=1}^{8} w_n \cdot V_n}{\sum_{n=1}^{8} w_n \cdot V_n + \sum_{m=1}^{7} w_m \cdot V_m}$$

Where:
* $V_n, V_m \in [0, 10]$ represent factor intensities.
* $w_n, w_m \in [0, 1]$ represent clinical weights.
* **Positive Forces (Numerator)**: Pardon ($P$), Reconciliation ($R$), Release from Burden ($B$), Love/Goodwill ($L$), Compassion ($C$), Mindfulness ($M$), Self-Reflection ($SR$), Personal Growth ($PG$).
* **Negative Friction (Denominator Load)**: Retribution ($Re$), Resentment ($Rs$), Emotional Pain ($EP$), Self-Destruction ($SD$), Guilt ($Gu$), Shame ($Sh$), Suppressed Wounds ($FM$).
* **Emotional Burden**: $\text{Burden} = (1 - F) \times 100\%$.

---

## Core Features

* **⚡ Quick Assessment (Free Tier)**: 2-minute 5-dimension check mapped automatically to the 15 clinical dimensions.
* **🎛️ Master Cockpit (Pro)**: Full 15-factor granular intensity and weight controls.
* **📊 Multi-Factor Radar Map**: Interactive canvas visualization mapping strengths against emotional baggage.
* **💡 "What-If" Sensitivity Simulator**: Real-time modeling of how targeted interventions (e.g. reducing resentment by 2.0 points) directly raise your score.
* **🧭 Encrypted Journey Timeline**: Save, name, and compare past reflection entries locally.
* **🔒 100% Local-First & Private**: No cloud databases, no trackers, no third-party analytics. All data stays in your device's encrypted local storage.
* **🌙 Serene Day & Night Modes**: Designed for therapeutic evening reflection.

---

## Free Cross-Platform Installation (PWA)

AuraForgive is built as an offline-first **Progressive Web App**:

* **iPhone & iPad (iOS)**: Open in Safari &rarr; Tap **Share** &rarr; **Add to Home Screen**.
* **Android**: Open in Chrome/Firefox/Edge &rarr; Tap **Install AuraForgive** to create a native home screen WebAPK.
* **Windows / macOS / Linux**: Open in Chrome/Edge &rarr; Tap the **Install** icon in the address bar to run as a standalone desktop window.

---

## Architecture & Development

```bash
# Clone the repository
git clone https://github.com/naeemxnorabbasi/forgiveness-calculator.git
cd forgiveness-calculator

# Test locally with any static web server
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## References

1. Worthington, E. L., Jr. (2006). *Forgiving and Reconciling: Bridges to Retirement and Wholeness*. InterVarsity Press.
2. Enright, R. D., & Fitzgibbons, R. P. (2000). *Helping Clients Forgive: An Empirical Guide for Resolving Anger and Restoring Hope*. American Psychological Association.
