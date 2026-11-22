Jonathan Fam — Gameplay, Engine & Tools Programmer

Computer Science Real-Time Interactive Simulation student at the Singapore Institute of Technology, looking for a game programming internship. I build engines, tools and gameplay systems in C++, C# and Unity.

▶ Live site: https://jonathanfam89.github.io/Portfolio/ Email: jonathanfam89@gmail.com · LinkedIn www.linkedin.com/in/jonathan-fam

I led an 8-person team building a C++ 2D engine with hot-reloadable C# scripting and input replay for bug reproduction. I shipped two C/C++ games held at 60 FPS. I built Unity editor and procedural tools that cut designers' content-creation time by 70%.

Case studies
⭐ Flagship	Custom 2D Game Engine	Engine architecture, team leadership Engine and game Repo · Demo build
⏱ Constrained	Original C/C++ Game Performance  · Repo
🛠 Skill proof	Unity Procedural & Editor Tools	Tools programming for designers	Tooling	Repo
1. Flagship — Custom 2D Game Engine (C++)

Tech Lead, team of 8 · C++, C# · Game Engine Architecture module · for about 6 months 

Problem: The problem for this was set in the base of the game engine architecture and 
Constraint: Eight people working in one codebase, a fixed semester deadlines.
What I tested/did: C++/C# scripting with mono so the gameplay can be coded in c#. Input recording and playback so a can be replayed and for the VS ghost system. Game Engine Architecture was done and tested by me
What failed: For the scripting was finding the way to even convert from c# to c++, thinking which recording method would be good for the game like input-based, position based and so on. as for the architecture was which system (like ECS,OOP, or something else) would i use and good for the game.

What I changed: 
C++/C# scripting
For the scripting wise i chose mono instead of .net for the scripting as would be simpler to implement and have added APIs to the game engine so i added a app domain and and creating internal call would be easier than .net's setup of hostfxr a library and get function pointers.

Replay System
It was built choosing to just record they player's position and animation states for every frame and stored in json it was done as my game there was not a lot of moving obstacles, i created a VS ghost mode that is powered by said replay system where you can challenge the player with the best time so the ghost is a playback of the players best run or depending on what they chosen therefore a same path on the same timing in every run. Because the world is in the same state on every frame as it was during recording, the ghost's positions are always valid, and its movement stays consistent with the level.

Game Engine Architecture 
With 0 experience when creating the architecture, my team and i was discuss which system should we used for the game engine itself, it was either ECS or OOP programming i had to research and see which is suited for our engine, with ECS in the long run if my team and i want to create more game objects like in the thousands and maybe if we turn it to a 3d project and can be hard to setup with no experience and for OOP programming is just too much to handle and can be confusing at times, so i came up with another solution a 3rd option which is a normal component system where has a factory which produces the objects and entities and a blueprint to be sent to the factory to be produced, its simpler than ecs and not as confusing as OOP.

2. Constrained — Original C/C++ Games

Programmer · C/C++ · 2 games shipped from concept to release · 6 months

Problem: [Game name] needed [X] entities on screen with enemy AI and physics running every frame.
Constraint: A steady 60 FPS (16.6 ms per frame) on [target hardware], written in plain C/C++ without an engine.
What I tested: [e.g. profiled the frame and found collision checks were the cost; tried a uniform grid against a quadtree.]
What failed: [e.g. brute-force O(n²) collision dropped to [X] FPS at [X] entities; the quadtree's rebuild cost outweighed its gains for fast-moving entities.]
What I changed: [e.g. switched to a uniform spatial grid and kept AI updates in a separate pass.]
Result: Holds a steady 60 FPS with [X] entities on screen (frame time down from [X] ms to [X] ms). I wrote ~800 lines of enemy AI and physics.

3. Skill proof — Unity Procedural & Editor Tools

Tech Lead, team of [X] · Unity, C# · current project

Problem: Designers were building 3D levels and placing [X]+ props per level by hand, which was the team's biggest bottleneck.
Constraint: The tools had to work inside the Unity Editor for non-programmers, and their output had to stay hand-editable after generation.
What I tested: A procedural level-generation system, and a spline tool that places decorations along paths. I sat with the designers to see where their time went. [Add which approaches you prototyped.]
What failed: [e.g. the first generator was fully random, so designers threw away most of its output; props clipped into geometry on tight curves.]
What I changed: [e.g. added designer-set seeds and constraints; added collision-aware spacing along the spline.]
Result: Designers' content-creation time cut by 70%. Manual level-building time cut by [X]%. Hand placement of [X]+ props per level replaced.


About this repo

This repo is the portfolio website itself: plain HTML, CSS and JavaScript, with no build step, hosted on GitHub Pages.

index.html       page layout
css/style.css    styling (colours in :root)
js/data.js       all content: the three case studies, skills, links
js/main.js       rendering + the playable starfield shooter in the hero
assets/          resume PDFs, GIFs, screenshots
