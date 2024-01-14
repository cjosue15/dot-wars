import { Head } from "$fresh/runtime.ts";
import { Game } from "../islands/Game.tsx";
import { getGrid } from "../shared/db.ts";

export default async function Home() {
  const { tiles } = await getGrid();

  return (
    <>
      <Head>
        <h1>Dot wars</h1>
      </Head>

      <Game initialTiles={tiles} />
    </>
  );
}
