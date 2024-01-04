import { Level } from './model';

export function RitcherCard(props: Level) {
  const { color, label, description } = props;
  return (
    <li
      className={`flex items-center justify-center gap-6 rounded-lg p-4 text-sm text-black ${color}`}
    >
      <h3 className="font-semibold">{label}</h3>
      <p>{description}</p>
    </li>
  );
}
