import { z } from "zod";

/* --------------------------------
   Common validation helpers
--------------------------------- */

// Checks whether the text contains at least 2 meaningful words
const hasMeaningfulText = (value: string) => {
  const words = value
    .trim()
    .split(/\s+/)
    .filter((word) => word.length >= 2);

  return words.length >= 2;
};

// Detect random / keyboard-style text
const isValidText = (value: string) => {
  const text = value
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  // Empty text
  if (!text) {
    return false;
  }

  // Same character repeated
  // Example: aaaaaaaa
  if (/^(.)\1+$/.test(text)) {
    return false;
  }

  // Common keyboard sequences
  const gibberishPatterns = [
    "asdf",
    "asdfg",
    "asdfgh",
    "qwer",
    "qwert",
    "qwerty",
    "wert",
    "werty",
    "erty",
    "tyui",
    "yui",
    "uiop",
    "zxcv",
    "zxcvb",
    "zxcvbn",
    "xcvb",
    "xcvbn",
    "cvbn",
    "sdfg",
    "dfgh",
    "fghj",
    "ghjk",
    "ghjkl",
    "hjkl",
  ];

  // Reject keyboard patterns
  if (
    gibberishPatterns.some((pattern) =>
      text.includes(pattern)
    )
  ) {
    return false;
  }

  // Text must contain at least one vowel
  if (!/[aeiou]/.test(text)) {
    return false;
  }

  return true;
};


/* --------------------------------
   Issue Schema
--------------------------------- */

export const issueSchema = z.object({

  /* ---------- TITLE ---------- */

  title: z
    .string()
    .trim()
    .min(
      5,
      "Title must be at least 5 characters"
    )
    .max(
      100,
      "Title must not exceed 100 characters"
    )
    .refine(
      hasMeaningfulText,
      "Please enter a meaningful issue title"
    )
    .refine(
      isValidText,
      "Please enter a valid issue title"
    ),


  /* ---------- DESCRIPTION ---------- */

  description: z
    .string()
    .trim()
    .min(
      15,
      "Description must be at least 15 characters"
    )
    .max(
      500,
      "Description must not exceed 500 characters"
    )
    .refine(
      hasMeaningfulText,
      "Please enter a valid description"
    )
    .refine(
      isValidText,
      "Please enter a valid description"
    ),


  /* ---------- CATEGORY ---------- */

  category: z
    .string()
    .min(
      1,
      "Please select a category"
    ),


  /* ---------- LOCATION ---------- */

  location: z
    .string()
    .trim()
    .min(
      3,
      "Please enter a valid location"
    )
    .max(
      100,
      "Location must not exceed 100 characters"
    )
    .refine(
      (value) => /^[a-zA-Z0-9\s,.'-]+$/.test(value),
      "Please enter a valid location"
    )
    .refine(
      isValidText,
      "Please enter a valid location"
    ),


  /* ---------- PRIORITY ---------- */

  priority: z
    .string()
    .min(
      1,
      "Please select a priority"
    ),
});


/* --------------------------------
   Type
--------------------------------- */

export type IssueFormData = z.infer<
  typeof issueSchema
>;