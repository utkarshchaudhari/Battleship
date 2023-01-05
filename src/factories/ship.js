export default function ship(length) {
  let hits = 0;

  const hit = () => {
    return hits++;
  };

  const isSunk = () => {
    return hits === length;
  };

  return { length, hit, isSunk };
}
