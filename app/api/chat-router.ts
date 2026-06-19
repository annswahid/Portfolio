import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

export const chatRouter = createRouter({
  send: publicQuery
    .input(z.object({ message: z.string().min(1).max(2000) }))
    .mutation(async ({ input }) => {
      const userMessage = input.message.toLowerCase();

      // Portfolio-aware responses
      let response: string;

      if (userMessage.includes("project") || userMessage.includes("work")) {
        response =
          "I've worked on 6 featured projects including Nexus Commerce (Next.js e-commerce), AI Conversational Platform, Immersive Portfolio Engine with Three.js, FitTrack Pro fitness app, DataVision Analytics dashboard, and SocialSync Manager. Each showcases different skills from full-stack development to 3D web graphics.";
      } else if (
        userMessage.includes("skill") ||
        userMessage.includes("tech") ||
        userMessage.includes("stack")
      ) {
        response =
          "My tech stack includes React/Next.js, TypeScript, Node.js, Python, Three.js/WebGL, PostgreSQL, Redis, Docker, AWS, and Tailwind CSS. I specialize in building modern web applications with beautiful UI/UX and robust backends.";
      } else if (
        userMessage.includes("contact") ||
        userMessage.includes("hire") ||
        userMessage.includes("email")
      ) {
        response =
          "You can reach me via the contact form on this site, or email me directly at hello@creative.dev. I'm currently available for freelance work and open to new opportunities!";
      } else if (
        userMessage.includes("experience") ||
        userMessage.includes("background")
      ) {
        response =
          "I have over 5 years of experience in full-stack development and UI/UX design. I've completed 50+ projects for 30+ clients, specializing in SaaS platforms, interactive portfolios, and AI-powered applications.";
      } else if (
        userMessage.includes("hello") ||
        userMessage.includes("hi") ||
        userMessage.includes("hey")
      ) {
        response =
          "Hello there! Welcome to my portfolio. Feel free to ask about my projects, skills, experience, or how to get in touch!";
      } else {
        response =
          "Thanks for your message! I'm a creative developer specializing in modern web technologies. Feel free to ask about my projects, technical skills, work experience, or how we can collaborate!";
      }

      return { response };
    }),
});
