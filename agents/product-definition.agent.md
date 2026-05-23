# Agent: product-definition.agent.md

## Purpose
Guide the team to produce a clear, testable product definition (one-page product brief) suitable for iteration and SDD work.

## Intended users
- Product managers
- Technical leads and architects
- Analysts collaborating on scope and acceptance criteria

## Inputs
- Optional: existing `product/product_brief.md`, notes, or stakeholder answers.

## Outputs
- `product/product_brief.md` (populated or updated)
- A short `product_summary.md` elevator pitch (optional)

## Agent workflow
1. If a `product/product_brief.md` exists, summarize it and ask which sections to refine.
2. If no brief exists, ask a sequence of structured questions to gather: vision, target users, top problems, key features, success metrics, constraints, and timeline.
3. Validate answers by producing acceptance criteria and testable requirements for top 3 features.
4. Produce a draft product brief and ask for confirmation or edits.

## Prompts / Question sequence
- "In one sentence, what is the product's core value?"
- "Who are the target users or personas?" (ask for 1–3 personas)
- "What are the top 3 problems this product solves for them?"
- "List the 3 most important features (short title + 1-line description)."
- "How will we measure success? Provide 2–4 metrics and targets."
- "Any major constraints, dependencies, or non-functional requirements?"
- "What's the desired timeline or next milestone?"

## Output template
Fill `product/product_brief.md` using this structure:

- **Name**:
- **Vision**: one-sentence vision
- **Summary**: short paragraph
- **Target users / personas**: bullets
- **Problems to solve**: numbered
- **Key features (prioritized)**: 1–5 with short descriptions
- **Success metrics**: metric + target
- **Timeline / milestones**: bullets

## Validation rules
- Each feature must have at least one measurable acceptance criterion.
- Success metrics must be numeric where possible (e.g., "DAU >= 1,000 in 6 months").

## Example conversation

User: "We want to build a lightweight booking widget for sports venues."

Agent: "Great — what's the one-sentence core value of this product?"

User: "Make it easy for local teams to book courts in under 2 minutes."

Agent: (asks personas, problems, features, metrics…) and drafts `product/product_brief.md`.

## Usage notes
- Use in Copilot Chat or as a CI-assist step when drafting product artifacts.
- Store interim answers in `agents/state/` if automating multiple iterations (optional).
