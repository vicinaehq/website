import {
	Header,
	Hero,
	Features,
	BuiltInModules,
	ExtensionShowcase,
	Community,
	Footer,
} from "@/components/sections";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Features />
				<BuiltInModules />
				<ExtensionShowcase />
				<Community />
			</main>
			<Footer />
		</>
	);
}
