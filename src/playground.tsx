import { useState } from 'react';
import type { ChipListType } from '@/types/chip';
import ChipList from '@/components/chip-list';

function Playground() {
  const [chipData] = useState<ChipListType>([
    {
      id: 1,
      label: '전체',
    },
    {
      id: 2,
      label: '아우터',
    },
    {
      id: 3,
      label: '바지',
    },
    {
      id: 4,
      label: '티셔츠',
    },
    {
      id: 5,
      label: '점퍼',
    },
    {
      id: 6,
      label: '원피스',
    },
  ]);

  return (
    <div className="Playground">
      <h1>Playground</h1>
      <ChipList items={chipData} />
    </div>
  );
}

export default Playground;