export const siteConfig = {
	name: "Vicinae",
	tagline: "The everything launcher for Linux",
	description:
		"A focused launcher for your desktop — native, fast, extensible.",
	links: {
		github: "https://github.com/vicinaehq/vicinae",
		discord: "https://discord.com/invite/rP4ecD42p7",
		docs: "https://docs.vicinae.com",
		extensions: "https://github.com/vicinaehq/extensions",
	},
};


export const features = [
	{
		title: "Everything at your fingertips",
		description:
			"Apps, files, clipboard, calculator, emoji, and more. One shortcut to access it all.",
		icon: "Sparkles",
	},
	{
		title: "Keyboard-first",
		description:
			"Fast, efficient, no mouse needed. Navigate, filter, and execute with just your keyboard.",
		icon: "Command",
	},
	{
		title: "Extensible",
		description:
			"Can be extended using the Typescript SDK, script commands, or dmenu compatibility mode.",
		icon: "Puzzle",
	},
	{
		title: "Raycast compatibility",
		description:
			"Compatible with many Raycast extensions and script commands",
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

export const platforms = [
	{ name: "X11", icon: "x11" },
	{ name: "Hyprland", icon: "hyprland" },
	{ name: "GNOME", icon: "gnome" },
	{ name: "KDE", icon: "kde" },
	{ name: "Niri", icon: "niri" },
];

export const installCommand = "curl -fsSL https://vicinae.com/install | sh";
