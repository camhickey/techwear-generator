import { useLoaderData } from '@remix-run/react';
import { sql } from '~/db.server';

export async function loader() {
  const response = await sql`SELECT * FROM urban ORDER BY RANDOM() LIMIT 1`;
  return response[0];
};

type ClothingCardProps = {
  name: string;
  price: number;
  link: string;
  image: string;
}

export default function Page() {
  const data = useLoaderData<ClothingCardProps>();
  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} />
      <p>{data.price}</p>
      <a href={data.link}>Buy</a>
    </div>
  )
}