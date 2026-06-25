import {
	Header,
	Hero,
	Features,
	BuiltInModules,
	ExtensionShowcase,
	Community,
	Sponsors,
} from "@/components/sections";

function SectionDivider() {
	return (
		<div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-sand-500/15 to-transparent" />
	);
}

export default function Home() {
	return (
		<>
			<Header />
			<main className="flex-1">
				<Hero />
				<SectionDivider />
				<Features />
				<SectionDivider />
				<BuiltInModules />
				<SectionDivider />
				<ExtensionShowcase />
				<SectionDivider />
				<Community />
				<SectionDivider />
				<Sponsors />
			</main>
		</>
	);
}
