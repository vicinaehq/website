export const siteConfig = {
	name: "Vicinae",
	tagline: "A focused launcher for your desktop",
	description:
		"Native, fast, and extensible. Search, launch, and manage your desktop from one place.",
	links: {
		github: "https://github.com/vicinaehq/vicinae",
		discord: "https://discord.com/invite/rP4ecD42p7",
		docs: "https://docs.vicinae.com",
		extensions: "https://github.com/vicinaehq/extensions",
	},
};

export const features = [
	{
		title: "One keystroke away",
		description:
			"Apps, files, clipboard history, calculator, emoji — all accessible from a single shortcut.",
		icon: "Sparkles",
	},
	{
		title: "Keyboard-first",
		description:
			"Navigate, filter, and act without reaching for the mouse. Every action is a few keystrokes away.",
		icon: "Command",
	},
	{
		title: "Extend with TypeScript",
		description:
			"Build extensions using React and TypeScript. A familiar API that works like building any other app.",
		icon: "Puzzle",
	},
	{
		title: "Raycast compatible",
		description:
			"Run many Raycast extensions and script commands out of the box. Bring your macOS workflow to Linux.",
		icon: "Package",
	},
];

export const builtInModules = [
	{ name: "Applications", icon: "Rocket" },
	{ name: "File Search", icon: "Search" },
	{ name: "Clipboard", icon: "Clipboard" },
	{ name: "Calculator", icon: "Calculator" },
	{ name: "Emoji Picker", icon: "Smile" },
	{ name: "Window Management", icon: "Layout" },
	{ name: "Browser Tabs", icon: "Globe" },
	{ name: "Fonts", icon: "Type" },
	{ name: "Theming", icon: "Paintbrush" },
	{ name: "Power Management", icon: "Power" },
	{ name: "Shortcuts", icon: "Link" },
	{ name: "Scripts", icon: "FileCode" },
];

export const extensionCodeExample = `import { List, ActionPanel, Action } from "@anthropic-ai/vicinae-api";

export default function MyExtension() {
  const items = [
    { id: "1", title: "Hello World", subtitle: "Your first extension" },
    { id: "2", title: "With Actions", subtitle: "Press Enter to open" },
  ];

  return (
    <List>
      {items.map((item) => (
        <List.Item
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url="https://docs.vicinae.com" />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}`;

export const installCommand = "curl -fsSL https://vicinae.com/install | sh";
