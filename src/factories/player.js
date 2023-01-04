function player(name, board, isComputer) {
  const attack = (x, y) => {
    if (isComputer) {
      const attacks = [];
      while (true) {
        x = Math.floor(Math.random() * 11);
        y = Math.floor(Math.random() * 11);
        if (attacks.includes({ x: x, y: y }) === false) {
          attacks.push({ x: x, y: y });
          break;
        }
      }
    }
    board.receiveAttack(x, y);
  };
  return { name, board, attack };
}
