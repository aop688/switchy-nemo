import { useState } from 'react';

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export function useRandomId(staticId?: string) {
  const [id] = useState(randomId());

  return staticId || id;
}
