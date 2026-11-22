
const PORTFOLIO = {
  name: "Jonathan Fam",
  initials: "JF",
  role: "CS Student · Game Programmer/Designer",
  tagline:
    "I build gameplay systems, tools, and engines",
  tracks: {
    game: { label: "Game Dev", resume: "assets/resume-game.pdf" },
    it: { label: "IT", resume: "assets/resume-it.pdf", wip: true },
  },
  photo: "assets/Portrait.jpg",
  email: "Jonathanfam89@gmail.com",
  lookingFor: "Seeking a Game Programming Internship — Summer 2027",

  about: [
    "I'm a undergraduate at <strong>Singapore institute of Technology & Digipen </strong> currently studying in their joint degree program in Computer Science in Real-Time Interactive Simulation",
    "Been in love with games all my life since i was 7, since then i have been dreaming of making a successful game franchise.",
    "Outside of code you'll find me playing Riftbound IRL, Grinding Ranks in Deadlock, Might find me Slaying Dragons in D&D by night.",
    "Just past facts, I was given leadership roles of <strong>General Secretary </strong> for Student Council during my time in ITE College East, and given the role of <strong>HR/Relations</strong> in School of Computing Club during my time in Singapore Polytechnic"
  ],

  stats: [
    { value: "8+", label: "Games built" },
    { value: "5", label: "Engines used" },
    { value: "C++", label: "Main language" }
  ],

 //---------- PROJECTS ----------
  projects: [
    {
      title: "Out of Time",
      track: "game",
      icon: "🚀",
      summary: "Momentum-based 2D space shooter with a custom physics step and wave-based enemy AI.",
      description:
        "Leading a team of 7 to do a unity game with custom tools",
      highlights: [

        "Tools done for now is Spline tool, and a 2d grid level design",
         "Contributed code about 2000 lines of code, help my Game Designer with custom unity tools to improve time efficiency and streamline game production by about 70% ",
      ],
      tech: ["Unity", "C#", "Level Design "],
      tags: ["Unity", "Gameplay", "AI"],
      role: "Tech Lead",
      status: "ongoing",
      image: "",
      gif: "",
      media: [],
    },
    {
      title: "Mouchine Engine",
      track: "game",
      icon: "⚙️",
      summary: "A C++/OpenGL game engine with a component engine",
      description:
        "Led an 8-person team building a 2D game engine from scratch in C++ (CMake, OpenGL), with C# scripting, a replay system and a component system.",
      highlights: [
        "Archetype component with factory and blueprint concept with friendly component storage",
        "Script-able with C++ and C#",
        "Replay system with VS ghost elements",
        "Contributed more than 3000 lines of code from Game Engine Architecture, Scripting and Replay System.",
      ],
      tech: ["C++", "C#", "OpenGL", "ImGui", "CMake","Mono",],
      tags: ["C++", "Engine", "Graphics"],
      role: "Tech Lead",
      status: "completed",
      image: "assets/MBTW_Pic.png",
      gif: "",
      media: ["assets/Gam200.mp4"],
      /* Buttons under the case study. A link with an empty url is hidden. */
      links: [
        { label: "Repo", url: "" },
        { label: "Demo build", url: "" },
      ],
      /* Case study: shown in the pop-up. Copy this block into any other project to give it one.
         Every field is optional; leave one out and its row is skipped. */
      caseStudy: {
        badge: "⭐ Flagship",
        context: "Tech Lead · Team of 8 · C++, C# · Game Engine Architecture module · ~6 months",
        problem:
          "Build a 2D game engine from scratch with no prior engine experience. The core architecture had to be chosen up front, gameplay had to be scriptable in C#, and the game needed a replay system to power a VS ghost mode.",
        constraint: "Eight people working in one codebase, against fixed semester deadlines.",
        tried:
          "I built and tested three systems myself: C#/C++ scripting through Mono, so gameplay could be written in C#; recording and playback, so a run could be replayed and drive the VS ghost; and the engine's core architecture.",
        failed: [
          { title: "Scripting", text: "Working out how to bridge C# and C++ at all, so C# scripts could call into the engine." },
          { title: "Replay", text: "Choosing a recording method that suited the game: input-based, position-based or something else." },
          { title: "Architecture", text: "Choosing between ECS, OOP or something else, for an engine and a team with no engine experience." },
        ],
        changed: [
          {
            title: "C++/C# scripting",
            text:
              "I chose Mono over .NET because it was simpler to embed and to expose engine APIs to. With Mono I create an app domain and register internal calls for the engine's functions; .NET would have meant hosting the runtime through the hostfxr library and fetching function pointers by hand.",
          },
          {
            title: "Replay system",
            text:
              "I record the player's position and animation state every frame and store the run as JSON, which was enough because the levels have few moving obstacles. The replay powers a VS ghost mode: you race a ghost of your best run (or a run you pick), and it follows the same path with the same timing every time. Because the world is in the same state on every frame as it was during recording, the ghost's positions are always valid and its movement stays consistent with the level.",
          },
          {
            title: "Game engine architecture",
            text:
              "With no engine experience, the team debated ECS against OOP. My research showed ECS pays off at scale (thousands of objects, or a later move to 3D) but is hard to set up without experience, while a deep OOP hierarchy gets hard to manage and confusing. So I proposed a third option: a plain component system, where a factory builds entities and their components from blueprints. It's simpler than ECS and easier to follow than OOP.",
          },
        ],
      },
    },
    {
      title: "Kroak'N Load",
      track: "game",
      icon: "🐸",
      summary: "A fast-paced vertical side-scrolling frog shooting game.",
      description:
        "Made with a team of 6 to create game with A game engine given by the SIT/Digipen. i was a programmer who built the OOP enemies and worked on the gamelay elements helping others along the way",
      highlights: [
        "Endless Waves of Enemies",
        "Randomness from the different enemies popping out",
        "about 200 lines of code for the AI enemies and its movements  "
      ],
      tech: ["C++"],
      tags: [ "Gameplay","OOP",""],
      role: "Programmer",
      status: "Completed",
      image: "assets/TKDF_Pic.png",
      gif: "",
      media: ["assets/KermitDaFrog_Trailer.mp4"],
    },
    {
      title: "CatNapped",
      track: "game",
      icon: "",
      summary: "It is a 2d adventure game where you are trying to rescue your pet cat that was catnapped by a rival game",
      description:
        "done with a C game engine provided by the school, its was a physics based game where you are able to swing and pull boxes and shoot enemies as you go  ",
      highlights: [
        "the physics of the rope mechanics from the pulling of boxes and pushing of boxes and the rope swinging mechanics. ",
        "done about 500 lines of code the physics and box movements."
      ],
      tech: ["C++", "Physics","Gameplay"],
      tags: ["Physics", "C++"],
      role: "Programmer",
      status: "completed",
      image: "assets/Catnapped_Front.png",
      gif: "",
      media: ["assets/ByteSized_Trailer.mp4","assets/Cat_Swing.gif","assets/Cat_Pic.png","assets/Cat_Pic_page3"],
    },
    /* ----- IT projects (examples — replace with your own) ----- */
    {
      title: "Optimizing Running Time",
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
      media: [],
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
      media: [],
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
      title: "B.Sc. Computer Science in Real-Time Interactive Simulation Student",
      org: "Singapore Institute of Technology",
      details: "Specialization in Game Development. Did modules of Data Structures & Algorithms, Computer Graphics, Calculus, Operating Systems, AI.",
    },
        {
      when: "March 2021 - August 2021",
      title: "Software Engineering Intern",
      org: "Cxrus Solutions Pte Ltd",
      details: "Providing it solution to clients by designing websites with Angular for the frontend and for the backend built and test functions AWS systems ",
    },
    {
      when: "Apr 2019 — March 2022",
      title: "Diploma In Information Technology Student",
      org: "Singapore Polytechinc ",
      details: "General IT full stack development with HTML, CSS, javascript and Went into specialization for immersive technology where i did AR and VR game develop projects with business modules of human resources, enterprise innovation and finance   ",
    },
    {
      when: "Jan 2017 - May 2019",
      title: "Higher NITEC in Business Information Technology Student",
      org: "Institute of Technology College East  ",
      details: "Learn the Technical hands on side of technology from computer networking, computer hardware to business elements of accounting and entrepreneurship   ",
    },
  ],

  contactBlurb:
    "I'm currently looking for a game programming internship. If you're hiring or just want to talk games — my inbox is open.",

  /* label is the button text and picks its icon (SOCIAL_ICONS in main.js) */
  socials: [
    { label: "GitHub", url: "https://github.com/jonathanfam89" },
    { label: "LinkedIn", url: "https://linkedin.com/in/jonathan-fam" },
  ],
};
