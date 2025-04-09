import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

interface PokemonDetailProps {
  pokemon: any;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
    console.log(pokemon)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center capitalize mb-4 text-indigo-600">
          {pokemon.name}
        </h1>

        <div className="flex justify-center mb-6">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Types</h2>
            <ul className="list-disc pl-6">
              {pokemon.types.map((typeObj: any, index: number) => (
                <li key={index} className="capitalize">
                  {typeObj.type.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Abilities</h2>
            <ul className="list-disc pl-6">
              {pokemon.abilities.map((abilityObj: any, index: number) => (
                <li key={index} className="capitalize">
                  {abilityObj.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Stats</h2>
          <ul className="list-disc pl-6">
            {pokemon.stats.map((stat: any, index: number) => (
              <li key={index} className="capitalize">
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Moves</h2>
          <ul className="flex flex-wrap gap-2">
            {pokemon.moves.slice(0, 10).map((move: any, index: number) => (
              <li key={index} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded capitalize">
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for pre-rendering
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await res.json();

  const paths = data.results.map((_: any, index: number) => ({
    params: { id: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // fallback true or blocking to support dynamic loading
  };
};

// Fetch data for each individual Pokemon
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
    revalidate: 60, 
  };
};
