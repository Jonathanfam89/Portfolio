
const PORTFOLIO = {
  name: "Jonathan Fam",
  initials: "JF",
  role: "CS Student · Aspiring Game Programmer",
  tagline:
    "I build gameplay systems, tools, and engines ",
  /* Project tracks: visitors switch between these above the projects.
     Each has its own resume — drop the PDFs in /assets with these names. */
  tracks: {
    game: { label: "Game Dev", resume: "assets/resume-game.pdf" },
    it: { label: "IT", resume: "assets/resume-it.pdf" },
  },
  email: "Jonathanfam89@gmail.com",
  lookingFor: "Seeking a Game Programming Internship — Summer 2027",

  about: [
    "I'm a undergraduate at <strong>Singapore institute of Technology & Digipen </strong> currently studying in their joint degree program in Computer Science in Real-Time Interactive Simulation",
    "Been ",
    "Outside of code you'll find me playing Riftbound IRL, Grinding Ranks in Deadlock, Might find me Slaying Dragons in D&D by night.",
  ],

  stats: [
    { value: "8+", label: "Games built" },
    { value: "5", label: "Engines used" },
    { value: "C++", label: "Main language" },
  ],

  /* ---------- PROJECTS ----------
     track: "game" or "it" — which tab the project appears under.
     status: "completed" or "ongoing" (leave "" to hide it).
     tags: used for filter buttons.
     image: optional still, e.g. "assets/echo-drift.png" (shown by default).
     gif:   optional gameplay GIF, e.g. "assets/echo-drift.gif" (plays on hover).
     If no image is set, a generated cover is shown instead.            */
  projects: [
    {
      title: "Out of Time ",
      track: "game",
      icon: "🚀",
      summary: "Momentum-based 2D space shooter with a custom physics step and wave-based enemy AI.",
      description:
        "Solo project built in Unity. I wrote a fixed-timestep physics layer for tight, deterministic movement, a data-driven wave spawner using ScriptableObjects, and enemy behaviours driven by a simple utility-AI system. Object pooling keeps allocations at zero during gameplay.",
      highlights: [
        "Fixed-timestep movement with interpolation for smooth rendering",
        "Utility AI: enemies weigh flee / chase / flank each frame",
        "Object pooling → 0 GC allocations in the gameplay loop",
      ],
      tech: ["Unity", "C#", "ScriptableObjects"],
      tags: ["Unity", "Gameplay", "AI"],
      role: "Solo developer",
      status: "ongoing",
      image: "",
      gif: "",
    },
    {
      title: "Mouchine Engine",
      track: "game",
      icon: "⚙️",
      summary: "A C++/OpenGL game engine with a component engine",
      description:
        "Made a Game engine from scratch with c++, cmake and opengl.",
      highlights: [
        "Archetype component with factory and blueprint concept with friendly component storage",
        "Script-able with C++ and C#",
        "Replay system with VS ghost elements",
        "ImGui editor",
      ],
      tech: ["C++", "C#", "OpenGL", "ImGui", "CMake","Mono",],
      tags: ["C++", "Engine", "Graphics"],
      role: "Tech Lead",
      status: "completed",
      image: "assets/MBTW_Pic.png",
      gif: "",
    },
    {
      title: "KermitDaFrog",
      track: "game",
      icon: "🐸",
      summary: "A fast-paced vertical side-scrolling frog shooting game.",
      description:
        "Made with a team of 6 to create game with A game engine given by the SIT/Digipen.i was a programmer who built the OOP enemies and worked on the gamelay elements helping others along the way",
      highlights: [
        "endless : coyote time, jump buffer, variable jump",
        "Custom shader to reveal geometry within light radius",
        "Placed top 10% in 'Innovation' category",
      ],
      tech: ["C++"],
      tags: ["Godot", "Gameplay", "Game Jam", "Graphics"],
      role: "Lead programmer (team of 4)",
      status: "",
      image: "",
      gif: "",
    },
    {
      title: "Dungeon Weaver",
      track: "game",
      icon: "🗝️",
      summary: "Procedural dungeon generator using BSP partitioning and A* pathfinding for enemies.",
      description:
        "A roguelike prototype in Unreal Engine 5. Rooms are generated with binary space partitioning, corridors are connected with a minimum spanning tree, and enemies navigate using a grid-based A* that I implemented in C++ rather than the built-in NavMesh to learn the algorithm.",
      highlights: [
        "BSP + MST level generation, seedable for reproducibility",
        "Custom A* pathfinding in C++ with a binary heap",
        "Blueprint-exposed parameters so designers can tune generation",
      ],
      tech: ["Unreal Engine 5", "C++", "Blueprints"],
      tags: ["Unreal", "C++", "AI", "Procedural"],
      role: "Solo developer",
      status: "completed",
      image: "",
      gif: "",
    },
    {
      title: "Netcode Pong",
      track: "game",
      icon: "🏓",
      summary: "Online multiplayer Pong with client-side prediction and server reconciliation.",
      description:
        "Built to learn multiplayer fundamentals. An authoritative server written in C++ with ENet; clients use input prediction and reconciliation so play feels responsive even at 150 ms of simulated latency.",
      highlights: [
        "Authoritative server with fixed tick rate",
        "Client prediction + server reconciliation",
        "Tested with artificial latency and packet loss",
      ],
      tech: ["C++", "ENet", "SDL2"],
      tags: ["C++", "Networking"],
      role: "Solo developer",
      status: "completed",
      image: "",
      gif: "",
    },
    {
      title: "Ray Tracer in a Weekend",
      track: "game",
      icon: "💡",
      summary: "CPU path tracer with BVH acceleration and multithreaded rendering.",
      description:
        "Followed and extended Peter Shirley's 'Ray Tracing in One Weekend' series. Added a bounding volume hierarchy, multithreaded tile rendering, and OBJ mesh loading — cutting render time of the final scene by ~12×.",
      highlights: [
        "BVH acceleration structure",
        "Multithreaded tile renderer (std::thread)",
        "~12× speed-up over naive implementation",
      ],
      tech: ["C++", "Multithreading"],
      tags: ["C++", "Graphics"],
      role: "Solo developer",
      status: "completed",
      image: "",
      gif: "",
    },
    /* ----- IT projects (examples — replace with your own) ----- */
    {
      title: "Example IT Project",
      track: "it",
      icon: "🖥️",
      summary: "Replace this with an IT project — e.g. a web app, network setup, or automation script.",
      description:
        "Describe what the project does, the problem it solved, and the part you built.",
      highlights: ["What you built", "A measurable result", "Something you learned"],
      tech: ["Python", "SQL"],
      tags: ["Web", "Database"],
      role: "Solo developer",
      status: "completed",
      image: "",
      gif: "",
    },
    {
      title: "Example IT Project 2",
      track: "it",
      icon: "🌐",
      summary: "Another IT project placeholder — duplicate this block for each project.",
      description:
        "Describe what the project does, the problem it solved, and the part you built.",
      highlights: ["What you built", "A measurable result"],
      tech: ["JavaScript", "Node.js"],
      tags: ["Web", "Automation"],
      role: "Team of 3",
      status: "completed",
      image: "",
      gif: "",
    },
  ],

  /* ---------- SKILLS ---------- level: 1–5 */
    skills: {
    hard: [
      {
        group: "Languages",
        items: ["C++", "C#", "Html", "ASM", "JavaScript"],
      },
      {
        group: "Engines & Frameworks",
        items: ["Unity", "Unreal Engine 5", "Godot", "OpenGL", "GLSL"],
      },
      {
        group: "Game Programming",
        items: ["Gameplay Systems", "Game AI & Pathfinding", "Math & Physics", "Rendering & Shaders", "Multiplayer Networking", "Procedural Generation"],
      },
      {
        group: "Tools",
        items: ["Git / GitHub", "Visual Studio", "CMake", "Blender"],
      },
    ],
    soft: [
      "Teamwork & Collaboration",
      "Communication",
      "Problem Solving",
      "Adaptability",
      "Time Management",
      "Taking Feedback",
      "Leadership",
      "Creativity",
    ],
  },

  /* ---------- EXPERIENCE / EDUCATION ---------- */
  timeline: [
    {
      when: "2024 — Present",
      title: "B.Sc. Computer Science in Real-Time Interactive Simulation",
      org: "Singapore Institute of Technology",
      details: "Specialization in Game Development. Relevant modules: Data Structures & Algorithms, Computer Graphics, Calculus, Operating Systems, AI.",
    },
        {
      when: "March 2021 - August 2021",
      title: "Software Engineering Intern",
      org: "Cxrus Solutions Pte Ltd",
      details: "providing it 405solution to clients by designing websites with Angular for the frontend and for the backend built and test functions AWS systems ",
    },
    {
      when: "Apr 2019 — March 2022",
      title: "Student",
      org: "Singapore",
      details: "Did general IT of Full Stack Development with HTML, CSS, Javascript and , ",
    },
    {
      when: "Jan 2026",
      title: "Participant — Global Game Jam",
      org: "Hollow Lantern",
      details: "Lead programmer on a 4-person team; placed top 10% in Innovation.",
    },
  ],

  contactBlurb:
    "I'm currently looking for a game programming internship. If you're hiring, want to collaborate on a jam, or just want to talk games — my inbox is open.",

  /* label shows on hover; icon is the text/emoji shown */
  socials: [
    { label: "GitHub", url: "https://github.com/yourname", icon: "GitHub" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname", icon: "LinkedIn" },
    { label: "Email", url: "Jonthanfam89@gmail.com", icon: "Email" },
  ],
};
