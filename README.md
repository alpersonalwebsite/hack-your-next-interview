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

Given that several friends and colleagues asked me about my experiences during this process and in view of frequently requests related to `How to Hack Interviews`, I decided to setup this repo with the aim of sharing some recurrent topics, "code exercises/challenges" and experiences (including a few crazy ones as colorful anecdotes) to make easier theirs (and yours) `Job Hunt` and `Interview Process`.

**Important note:** This is an ongoing work among several others... So... There´s no periodicity commitment.


## Brief personal advice

No matter HOW much you like the vacancy and your interviewers, and probably against the "wise general guidance", I strongly recommend you to generate some "friction" or "conflict" with whom would be your co-workers during the `on-site meeting`. Please, `nothing too big` (if you want to obtain the job) nor persistent. You can over-speak **once** and check their reaction. Put particular heed to facial expressions and shoulder movements. *And keep in mind the following:* do it in the middle of the conversation, having enough time to go back to a peaceful and sympathetic state.

Yes, yes... I´m pretty sure you are convinced that I finally went crazy, nonetheless, let me first explain the `why` before you pronounce sentence. 

We, `humans`, are complex and fluctuating beings. Accept it or perish!

That swing (when it's properly well-balanced) constitutes one of the central axes of Evolution: "change".

Sometimes we are happy, other sad...
Sometimes cheerful, sometimes irritable... And, even when this concerns us all equally, from your side, you should carefully reflect: "I will spend at least 8 hours per day with these People. What will be their behavior(s) in adverse situations or just personal "bad days"...?"

Does this start to make sense...?

*Remember:* adversities always come; you cannot prevent them, yet, you can pre-set their scope or be prepared to react properly. 

When you start a new job, probably (and hopefully) the People who have been working there, are going to be "more proficient than you" in several aspects/tasks/situations. This is not strange: they scoped and built the applications, set the stack (workflows and pipelines), know the tricky parts of their environments and tools, even those that have a halo of mystery around them (aka, "we know it works, but we are not sure why").

Regardless how qualified you are, the TEAM is always going to have well-owned advantage (we should all be glad of this conjuncture inasmuch as it protects the whole from "mad managers" casting the legacy remark in sustainability).

In a regular interview process, good screeners will try to expose you to some bitter moments just to see how you handle both, positive and negative human feelings (for example, `frustration`). In fact, several challenges and "blackboard exercises" are not meant to be solved without assistance: *they require you to ask questions and interact with your interviewer to find the proper solution*.

But... When are you going to have the opportunity to test them equally...? 
Know how would they react when things are not going as expected and discomfort manifests in all its fullness.  

Once you have been hired...? 
Once you are sunk in bitterness typing a quickly 2-weeks-notice...? 

That´s too late! 

Fail is part of our human condition, although you must take certain precautions if you want to find a nice Human group, avoid toxic environments and develop a career.


## The Interview Process

I should start stating the obvious: each Company is a unique world, and in consequence, every process is different. Yet, usually you have 4 common steps:

1. **First approach**: you will be talking with an in-house recruiter or People and Culture (ex HR) representative. In small ventures, it could also be the CTO or VP of Engineering. Usually, you are going to be introduced first to the Company (Mission, Core Values and Principles...) and then, to the particular role. After this, you should present yourself, highlight the most transcendental aspects of your last 2 jobs (or positions) and answer behavioral questions. At the end, you should have at least 5 minutes to inquire and dispel any doubt related to the Business. This step is mainly humanistic and presentational.
Expected time: *less than 30 minutes*.

2. **First technical screening**: generally, you will be asked to respond to questions linked to your experience and knowledge of particular technologies (programming languages, platforms, services, libraries, tools...) tied to the "job requirements". This is the real "first technical filter" and it will show (or evidence) if you truly know what you think you know, and if you do it in the right way (good practices and patterns). You will talk (this is a "Phone Screen") with one of the Sr. Software Engineers of your (future?) Team. 
Expected time: *no more than 1 hour, commonly 30 minutes*.

3. **Second technical screening**: this is -certainly- a little more "intense" than the previous ones. You should expect "coding challenges" (like Fibonacci, reversing strings, palindromes...), "define which would be the output of...", exercises such as building a small `SPA` with one JS framework or library (like a TO-DO list with React), among others. You will be interacting with a Principal Engineer or Software Manager. You could share just your screen (working locally or through some "interviewing platform"), or... The screen plus your camera. 
From all the interviews steps, normally this is the definitive but not the last one.
Expected time: *around 1 hour*.

    *Note about challenges that include "camera sharing":* Every time I am part of the "Recruitment Pipeline" (either as IC or Manager) I deliberately ban this practice. Always prefer "take home" activities and, as last resource, "screen sharing". If you want to engage more closely with the candidate, invite her/him to the office or host a video sharing call to talk about expectations, goals... Remember to be empathetic! That Person has a lot on his/her shoulders! Certainly, you don't need to make her/him more vulnerable to prove knowledge nor tenacity.

4. **On-site interview**: For most Managers and Teams I know, this is -primarily- about interaction (behavior); before extending an offer, the Hiring Manager needs to ensure that *"everyone"* is on-board without major objections. If not, she could compromise the wholeness of the Group.

    *Note*: Please "be yourself". People are not pursuing a particular standard or stereotype... We just want to avoid short-term contrition that generally ends in "he/she was not a Cultural fit". We want to resolve if we can relate and have a good time working together. 

    Expected time: usually you will spend 5 hours, but, there is a growing number of ventures adopting the 2.30 hs model.


    * **Reception and Welcome**: the in-house Recruiter who has been guiding you during the process will setup a place for you and remind you the agenda for the day. After each "round", she/he will assure that your basic human needs and comfort are well covered. Sometimes, this person can be accompanied by a representative of People Department (previously known as HR).

      *Note about the "agenda"*: Serious companies (aka, ventures with good protocols and procedures) will attach to the "On-Site invitation" the proper agenda with your Interviewers information (roles, topic to cover, LinkedIn profiles) an other useful data like: dress-code, how to get there, nearby sites of interest, etc.

    * Interview with the **Hiring Manager**:

    * Interview with **DevOps Team, Architect or Sr. DEV**: Developers and/or FullStack applicants, this is usually the "Design System" part of the interview. For example, how to create a `chat app`. Also, everything related to service: `CI/CD`, general stack and infrastructure...

    * Interview with **Product Team**: This is out of the grid and, generally, reserved for senior positions. Always keep in mind that you **co-create** value with others, and, among those others, Product is without doubts the one who represents and maximize value. You will be asked about your previous works, your experience working in cross-functional teams, obstacles and difficulties and how did you overcome them. Likewise, exposure to Agile/SCRUM.  

    * Interview with **Software and/or FullStack Eng.** (your co-workers). Here you can expect more technical questions related to the role, have to write some code, whiteboard challenges and... `Algorithms and Data Structures!` 

    * Interview with a **C-suite executive**:


## Red Flags

I always say I´m interviewing the Company as they do it with me; perhaps, in an even deeper way. You should do the same! Remember that Interviews are a dual process and you should dispel all your doubts.

What are "Red Flags"...?
For me, behaviors that go against my principles, manners or that could affect the daily work relationship or "workspace peace".

1. When they don´t look at your eyes or express tension through their bodies
2. When there is no racial/cultural mixture
3. When those chosen to interview you seem unprepared
4. When they try to show you how good they are or set some kind of "minimum bar"
5. When the technical people commit technical mistakes
6. When they don´t have a clear schedule pre-shared letting you know who are going to interview them, what positions they hold and the proper timeline for each interview
7. When you asked about the Company and all the emphasis is on the technological flank, without meaningful mentions to the **Company Culture and Values**