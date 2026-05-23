// lib/data/usernameSuggestions.ts

const prefixes = [
  "blue",
  "tidal",
  "swamp",
  "reef",
  "mud",
  "fog",
  "deep",
  "silent",
  "rapid",
  "storm",
  "dark",
  "fresh",
  "wild",
  "salt",
  "mist",
  "river",
  "marsh",
  "drift",
  "delta",
  "wave",
  "sea",
  "echo",
  "shadow",
  "night",
  "aqua",
];

const animals = [
  "whale",
  "croc",
  "otter",
  "fox",
  "viper",
  "ray",
  "panther",
  "skipper",
  "shark",
  "eel",
  "crab",
  "heron",
  "frog",
  "orca",
  "turtle",
  "stingray",
  "pelican",
  "wolf",
  "cobra",
  "falcon",
  "pike",
  "salmon",
  "lynx",
  "octopus",
];

export function generateUsernameSuggestions(
  count = 6
) {
  const suggestions =
    new Set<string>();

  while (
    suggestions.size < count
  ) {

    const prefix =
      prefixes[
        Math.floor(
          Math.random() *
            prefixes.length
        )
      ];

    const animal =
      animals[
        Math.floor(
          Math.random() *
            animals.length
        )
      ];

    const number =
      Math.floor(
        Math.random() * 90 + 10
      );

    suggestions.add(
      `${prefix}${animal}${number}`
    );
  }

  return Array.from(
    suggestions
  );
}