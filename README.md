# Pilot Study Simulator

User facing companies run a lot of pilot study to gauge interests in a product before spending resources to build it. 

Typically, a pilot study is a preliminary experiment (or set of such experiments) to test the feasibility, effectiveness, and potential challenges of a new idea, product, process, or policy before making the next decisions about it.

At a very basic level, I think of a pilot as: 
``given a product idea, will a user adopt the product if we actually build it?``

To answer this question, an important component is user responses. 
E.g., What do potential users of this product feel about it?

Typically, companies gauge this by interviewing or surveying a representative set of users (or non-representative depending on use case). Expensive! Time-consuming! *Soon redundant?*

Recent research has shown that LLMs can predict user responses (if I were being obtuse, I'd say "adopt their persona").   
Example, see [Generative Agent Simulations of 1,000 People](https://arxiv.org/abs/2411.10109).

So why don't companies just use LLMs to simulate their pilot studies? *Startup Idea?*

Well, here is my first stab at it. I must acknowledge co-pilot for "teaching" me javascript overnight. 

It is very unpolished but I'm listing out a bunch of things I'd like to improve on

- Make parallel/batch LLM calls
- More insights that just percentage of users who will adopt. Example, chart of which demographic will adopt?
- Improve UX (duh)