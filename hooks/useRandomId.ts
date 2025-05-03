import { useState } from 'react';
import { randomId } from '@/utils/misc';

export function useRandomId(staticId?: string) {
  const [id] = useState(randomId());

  return staticId || id;
}
