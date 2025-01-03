/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "Poppins",
        Sans: "'Open Sans' , Poppins",
        Roboto: "'Roboto',Poppins",
        Ubuntu: "'Ubuntu',Poppins",
      },
    },
  },
  plugins: [],
};
