// @ts-check
import typegen from "eslint-typegen";

// eslint-disable-next-line antfu/no-import-dist
import hyoban from "./dist/index.js";

export default typegen(
	hyoban({
		react: true,
		strict: true,
		typeChecked: true,
	}),
);
