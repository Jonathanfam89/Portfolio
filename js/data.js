/* =====================================================================
   EDIT THIS FILE — all of your portfolio content lives here.
   You shouldn't need to touch index.html or main.js.
   ===================================================================== */

const PORTFOLIO = {
  name: "Your Name",
  initials: "YN",
  role: "CS Student · Aspiring Game Programmer",
  tagline:
    "I build gameplay systems, tools, and engines — and I care about the frame budget as much as the fun.",
  resume: "assets/resume.pdf", // drop your PDF in /assets with this name
  email: "you@example.com",
  lookingFor: "Seeking a Game Programming Internship — Summer 2027",

  about: [
    "I'm a Computer Science undergraduate at <strong>Your University</strong> (expected graduation 2028) focused on gameplay and engine programming.",
    "I enjoy turning designs into responsive, satisfying mechanics — from character controllers and AI behaviour to rendering and tooling. I've shipped games at jams, built a small C++ engine from scratch, and love profiling code until it hits 60 FPS.",
    "Outside of code you'll find me speedrunning, sketching level layouts, or playing way too much Hollow Knight.",
  ],

  stats: [
    { value: "8+", label: "Games built" },
    { value: "4", label: "Game jams" },
    { value: "3", label: "Engines used" },
    { value: "C++", label: "Main language" },
  ],

  /* ---------- PROJECTS ----------
     tags: used for filter buttons.  links: any of repo / play / video.
     image: optional path like "assets/project1.gif" (a GIF of gameplay is ideal).
     If no image is set, a generated cover is shown instead.            */
  projects: [
    {
      title: "Echo Drift",
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
      duration: "6 weeks",
      image: "",
      links: { repo: "https://github.com/yourname/echo-drift", play: "https://yourname.itch.io/echo-drift" },
    },
    {
      title: "Ember Engine",
      icon: "⚙️",
      summary: "A small C++/OpenGL game engine with an ECS, batch renderer, and hot-reloadable scenes.",
      description:
        "Learning project to understand what happens beneath commercial engines. Features an archetype-based Entity Component System, a 2D batch renderer that draws 10k+ sprites per frame, an input/event system, and an ImGui-based editor with scene serialisation to JSON.",
      highlights: [
        "Archetype ECS with cache-friendly component storage",
        "Batch renderer: 10,000+ sprites at 60 FPS",
        "ImGui editor with JSON scene save/load and hot reload",
      ],
      tech: ["C++17", "OpenGL", "GLFW", "ImGui", "CMake"],
      tags: ["C++", "Engine", "Graphics"],
      role: "Solo developer",
      duration: "Ongoing",
      image: "",
      links: { repo: "https://github.com/yourname/ember-engine" },
    },
    {
      title: "Hollow Lantern",
      icon: "🏮",
      summary: "48-hour game jam puzzle-platformer where light reveals hidden platforms.",
      description:
        "Made with a team of 4 for Global Game Jam. I was the lead programmer: I built the player controller (coyote time, jump buffering, variable jump height), the light-reveal shader mechanic, and the level loading pipeline.",
      highlights: [
        "Platformer feel: coyote time, jump buffer, variable jump",
        "Custom shader to reveal geometry within light radius",
        "Placed top 10% in 'Innovation' category",
      ],
      tech: ["Godot", "GDScript", "GLSL"],
      tags: ["Godot", "Gameplay", "Game Jam", "Graphics"],
      role: "Lead programmer (team of 4)",
      duration: "48 hours",
      image: "",
      links: { repo: "https://github.com/yourname/hollow-lantern", play: "https://yourname.itch.io/hollow-lantern" },
    },
    {
      title: "Dungeon Weaver",
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
      duration: "2 months",
      image: "",
      links: { repo: "https://github.com/yourname/dungeon-weaver", video: "https://youtube.com/" },
    },
    {
      title: "Netcode Pong",
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
      duration: "3 weeks",
      image: "",
      links: { repo: "https://github.com/yourname/netcode-pong" },
    },
    {
      title: "Ray Tracer in a Weekend",
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
      duration: "4 weeks",
      image: "",
      links: { repo: "https://github.com/yourname/raytracer" },
    },
  ],

  /* ---------- SKILLS ---------- level: 1–5 */
  skills: [
    {
      group: "Languages",
      items: [
        { name: "C++", level: 4 },
        { name: "C#", level: 4 },
        { name: "Python", level: 3 },
        { name: "GLSL / HLSL", level: 3 },
        { name: "JavaScript", level: 3 },
      ],
    },
    {
      group: "Engines & Frameworks",
      items: [
        { name: "Unity", level: 4 },
        { name: "Unreal Engine 5", level: 3 },
        { name: "Godot", level: 3 },
        { name: "OpenGL", level: 3 },
        { name: "SDL2", level: 3 },
      ],
    },
    {
      group: "Game Programming",
      items: [
        { name: "Gameplay Systems", level: 4 },
        { name: "Game AI / Pathfinding", level: 4 },
        { name: "Physics & Math", level: 3 },
        { name: "Rendering", level: 3 },
        { name: "Networking", level: 2 },
      ],
    },
    {
      group: "Tools",
      items: [
        { name: "Git / GitHub", level: 4 },
        { name: "Visual Studio / Rider", level: 4 },
        { name: "CMake", level: 3 },
        { name: "RenderDoc / Profilers", level: 3 },
        { name: "Perforce", level: 2 },
      ],
    },
  ],

  /* ---------- EXPERIENCE / EDUCATION ---------- */
  timeline: [
    {
      when: "2024 — Present",
      title: "B.Sc. Computer Science",
      org: "Your University",
      details: "Specialisation in Game Development. Relevant modules: Data Structures & Algorithms, Computer Graphics, Linear Algebra, Operating Systems, AI. GPA 3.8 / 4.0.",
    },
    {
      when: "2025 — Present",
      title: "Programming Lead",
      org: "University Game Dev Club",
      details: "Run weekly C++/Unity workshops for 40+ members and organise an internal game jam each semester.",
    },
    {
      when: "Jan 2026",
      title: "Participant — Global Game Jam",
      org: "Hollow Lantern",
      details: "Lead programmer on a 4-person team; placed top 10% in Innovation.",
    },
    {
      when: "Summer 2025",
      title: "Software Engineering Intern",
      org: "Example Company",
      details: "Built internal Python tooling that cut asset processing time by 30%. (Replace with your own experience, or delete this entry.)",
    },
  ],

  contactBlurb:
    "I'm currently looking for a game programming internship. If you're hiring, want to collaborate on a jam, or just want to talk games — my inbox is open.",

  /* label shows on hover; icon is the text/emoji shown */
  socials: [
    { label: "GitHub", url: "https://github.com/yourname", icon: "GitHub" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname", icon: "LinkedIn" },
    { label: "itch.io", url: "https://yourname.itch.io", icon: "itch.io" },
    { label: "Email", url: "mailto:you@example.com", icon: "Email" },
  ],
};
