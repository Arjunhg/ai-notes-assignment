# AI Notes

A Notion-style note editor with AI chat integration, built with Next.js, TipTap, and Tailwind CSS.

## Features

- 📝 Rich text editing with TipTap
- 🤖 AI chat integration for note assistance
- 🌙 Dark mode support
- 🏷️ Tag management
- 📌 Pin important notes
- 🎨 Note color customization
- 📱 Responsive design
- 🔍 Search functionality
- 📊 List/Grid view toggle

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TipTap](https://tiptap.dev/) - Rich text editor
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Heroicons](https://heroicons.com/) - Icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Arjunhg/ai-notes-assignment.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── chat/           # Chat-related components
│   ├── editor/         # Editor components
│   ├── layout/         # Layout components
│   ├── sidebar/        # Sidebar components
│   └── ui/             # UI components
├── lib/                # Utilities and helpers
│   ├── api/           # API functions
│   └── store/         # Zustand stores
└── types/             # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
