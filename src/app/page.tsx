import {
	Header,
	Hero,
	Features,
	BuiltInModules,
	ExtensionShowcase,
	Community,
	Footer,
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
			<main>
				<Hero />
				<SectionDivider />
				<Features />
				<SectionDivider />
				<BuiltInModules />
				<SectionDivider />
				<ExtensionShowcase />
				<SectionDivider />
				<Community />
			</main>
			<Footer />
		</>
	);
}
