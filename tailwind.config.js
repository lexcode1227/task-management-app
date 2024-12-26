/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color_primary_1: "#F4CCC8",
        color_primary_2: "#EBA59E",
        color_primary_3: "#E27D73",
        color_primary_4: "#DA584B",
        color_secondary_1: "#C8E1BC",
        color_secondary_2: "#AAD199",
        color_secondary_3: "#8DC275",
        color_secondary_4: "#70B252",
        color_tertiary_1: "#F9EED7",
        color_tertiary_2: "#F2DAAB",
        color_tertiary_3: "#EBC77F",
        color_tertiary_4: "#E5B454",
        color_neutral_1: "#FFFFFF",
        color_neutral_2: "#94979A",
        color_neutral_4: "#2C2F33",
        color_neutral_5: "#222528",
      },
      font: {
        sans: ["sans-serif"],
      },
      fontSize: {
        "display-xL": "64px",
        "display-L": "56px",
        "display-M": "48px",
        "display-S": "32px",
        "display-xS": "24px",
        "body-xL": "20px",
        "body-L": "18px",
        "body-M": "15px",
        "body-S": "13px",
        "2xs": ".625rem",
      },
    },
  },
  plugins: [],
};
