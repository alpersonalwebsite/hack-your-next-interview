# FullStack and FrontEnd job interview quick notes

[![Greenkeeper badge](https://badges.greenkeeper.io/alpersonalwebsite/hack-your-next-interview.svg)](https://greenkeeper.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Intro](#intro)
- [Brief personal advice](#brief-personal-advice)
- [The Interview Process](#the-interview-process)
- [Red Flags](#red-flags)

- Technical resources
  * [Useful methods](./00_0_useful-methods.md)
  * [Reversing without reverse() method](./00_1_useful-methods-reversing.md)
  * [Sorting without sort() method](00_1_useful-methods-sorting.md)
  * [Basic ES2015 or ES6](./00_0_basic-es2015.md)
  * [Callbacks, Promises and Async/Await](./00_0_callbacks-promises-async_await.md)

  * Data Structures
    + [Queue and Stack](../../../data-structures-and-algorithms/blob/master/05_0_queue-and-stack.md)
    + [Linked List](../../../data-structures-and-algorithms/blob/master/04_0_linked-list.md)
    + [Hash Table](../../../data-structures-and-algorithms/blob/master/03_0_hash-table.md)

  * Code Challenges
    + [Fibonacci](./01_0_fibonacci.md)
    + [FizzBuzz](./02_0_fizzbuzz.md)
    + [Palindromes](./02_0_palindromes.md)
    + [Occurrences](./03_0_occurrences.md)
    + [Anagrams](./04_0_anagrams.md)
    + [Produce X output](./05_0_produce_x_output_with_operations.md)
    + [Recursion](./06_0_recursion.md)
    + [Flattening MD arrays](./07_0_flattening-multidimensional-arrays.md)

## Intro

A few days ago, I quit my job; after a weekend of pseudo-leisure, I started applying to different vacancies through LinkedIn.

In this repo, I will be sharing some recurrent topics, "code exercises/challenges" and experiences (including a few crazy ones as colorful anecdotes) to contribute to your Interview´s process and Job Hunt.

**Important note:** This is an ongoing work among several others... So... There´s no periodicity commitment.

---

## Brief personal advice

No matter HOW much you like the vacancy and your interviewers, and probably against the "wise general guidance", I strongly recommend you to generate some kind of "friction" or "conflict" with whom would be your co-workers during the `on-site meeting`. Please, `nothing too big` (if you want to obtain the job) nor persistent. You can over-speak once and check her reaction. Put particular attention to facial expressions and shoulder movement. 

Yes, yes... I´m pretty sure you are convinced that I finally went crazy, nonetheless, let me first explain the `why` before you pronounce sentence. 

We, `humans`, are complex and fluctuating beings. Accept it or perish!

That swing (when it's properly well-balanced) constitutes one of the central axes of Evolution: "change".

Sometimes we are happy, other sad...
Sometimes cheerful, sometimes grumpy... And, even when this concerns us all equally, from your side, you should carefully reflect: "I will spend at least 8 hours per day with these people. What will be their behavior(s) in adverse situations or just personal "bad days"...?"

Does this start to make sense...?

*Remember:* adversities always come; you cannot prevent them, yet, you can pre-set their scope or be prepared to react properly. 

When you start a new job, probably (and hopefully) the People who have been working there, are going to be "more proficient than you" in several aspects/tasks/situations. This is not strange: they scoped and built the applications, set the stack (workflows and pipelines), know the tricky parts of their environments and tools, even those that have a halo of mystery around them (aka, "we know it works, but we are not sure why"). Regardless how qualified you are, the TEAM is always going to have well-owned advantage (we should all be glad of this conjuncture inasmuch as it protects the whole from "mad managers" casting the legacy remark in sustainability).

In a regular interview process, good screeners will try to expose you to some bitter moments just to see how you handle both, positive and negative human feelings (for example, `frustration`). In fact, several challenges and "blackboard exercises" are not meant to be solved without assistance: they require you to ask questions and interact with your interviewer to find the proper solution.

But... When are you going to have the opportunity to test them equally..? 
Know how would they react when things are not going as expected and discomfort manifests in all its fullness.  

Once you have been hired...? 
Once you are sunk in bitterness typing a quickly 2-weeks-notice...? 

That´s too late! 

Fail is part of our human condition, although you must take certain precautions if you want to find a nice Human group, avoid toxic environments and develop a career.

---

## The Interview Process

I should start stating the obvious: each Company is a unique world, and in consequence, every process is different. However, usually you have 4 common steps:

1. **First approach**: vacancy presentation, highlight of "Core Values or Principles" (from both sides), curricular recapitulation (your work experience) and advice. This step is mainly humanistic and presentational. There are no right/wrong answers.
Expected time: *less than 30 minutes*.

2. **First technical screening**: generally, you will be asked to answer questions related to your experience and knowledge of particular technologies (languages, platforms, services, libraries, tools...) tied to the "job requirements". This is the real first filter and it will show (or evidence) if you really know what you think you know and if you do it in the right way (good practices and patterns).
Expected time: *no more than 1 hour, commonly 30 minutes*.

3. **Second technical screening**: this is a little more "intense" than the previous one. You should expect "code exercises" (like Fibonacci, reversing strings, palindromes...), "define which would be the output of..." (like `console.log()` and `setTimeout()`), `MVC` such as building a small `SPA` with one of JS framework (like a TO-DO list with React), "pair programming". From all the interviews steps, normally this is the definitive but not the last one.
Expected time: *around 1 hour*.

4. **On-site interview**: Great news! If you got to this point, probably you will receive an offer.
Expected time: *most of the companies will have you around 5 hours, however, there is a growing number of enterprises that have adopted the 2.30 hs model*. We do appreciate these last!

  * **Presentation** and pseudo-interview with someone from HR or People Department explaining the process.  

  * Interview with **DevOps Team or Sennior Devs**, Developers or FullStack (here you can expect more conversational questions). Example: Systems or API design, pipelines, CI/CD...

  * Interview with **Product Team**.
  This is out of the grid. After countless interviews there´s no real pattern here since "Product" as some-kind of your second boss, they care about your behavioral and human side. However, you could expect questions related to Agile/SCRUM, Communicational topics, challenges that you had and how you faced them, errors that you committed... They will try to determine if you will be a good organic addition.

  * Interview with **Developers or FullStack** (your co-workers). Here you can expect more technical questions, have to write some code, whiteboard and... Algorithms! From a strictly human POV, you can find 4 types of groups (or particulars):

    - **Egocentric or insecure** (self-centered people are firstly, insecure). They will try to show you how wrong you are and how well-versed they are in opposition. For this group or person, there is no Interview, if not, preserve the status-quo. The more knowledgeable you show, the more reactive they will be. If they feel threatened in their knowledge, they are going to be your first detractors.
    - **Unprepared**. You will see them coming with a crumpled paper, asking for your resume (yes, the one that you sent them previously 2 or 3 times) and jumping to some "JSFiddle/CodePen/JSBIN" exercise coded by other member of the Team and/or copied/pasted from some "interview coding exercises" search result.
    - **High bar**. Big companies with the "Culture of Selectivity", like Google, usually ends in this bucket. They are aware they are building "the Path" so, even when they are not totally sure of what are they looking, they do know they want the best. Here reigns the logic of the less, the better.
    - **Unifiers**. Generally, smart people holding real power inside the Company. They care about the enterprise they represent and try to hire individuals as prepared as them understanding they are betting on the future (your future). Mentors are a great example. They don´t care about mistakes if not how are you reasoning. These are the cases where candidates feel their performance was really bad, however, they receive -indistinctly- an offer.

  * Interview with the **Hiring Manager** (aka, your Boss). One of the greatest abilities of Officers is to delegate.

---

## Red Flags

I always say I´m interviewing the Company (and, in consequence, them) as they do it with me; perhaps, in an even deeper way. You should do the same! Remember that Interviews are a dual process and you should dispel all your doubts.

What are "Red Flags"...?
For me, behaviors that go against my principles, manners or that could affect the daily work relationship or "workspace peace".

1. When they don´t look at your eyes or express tension through their bodies
2. When there is no racial/cultural mixture
3. When those chosen to interview you seem unprepared
4. When they try to show you how good they are or set some kind of "minimum bar"
5. When the technical people commit technical mistakes
6. When they don´t have a clear schedule pre-shared letting you know who are going to interview them, what positions they hold and the proper timeline for each interview
7. When you asked about the Company and all the emphasis is on the technological flank, without meaningful mentions to the **Company Culture and Values**