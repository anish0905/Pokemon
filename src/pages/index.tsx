import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
      const data = await res.json();
      const results = data.results.map((pokemon: any, index: number) => {
        const id = index + 1;
        return {
          name: pokemon.name,
          url: pokemon.url,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
      });
      setPokemons(results);
    }
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredPokemons)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Pokemon Explorer</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-3 rounded-lg shadow-sm border border-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {filteredPokemons.map((pokemon) => (
          
          <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
            <div className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform cursor-pointer text-center">
              <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mx-auto" />
              <h2 className="capitalize mt-2 font-semibold text-gray-800">{pokemon.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
