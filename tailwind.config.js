export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#FAFAF8",
        butter: "#FFE500",
        danger: "#FF4444",
        mint: "#00C853"
      },
      boxShadow: {
        brutal: "4px 4px 0 #111111",
        "brutal-sm": "2px 2px 0 #111111"
      },
      borderRadius: {
        brutal: "4px"
      },
      fontFamily: {
        display: ["Arial Black", "Arial", "sans-serif"],
        body: ["Arial", "sans-serif"]
      }
    },
  },
  plugins: [],
};
