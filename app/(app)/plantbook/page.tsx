import React from 'react';
import Search from '@/components/plantbook/Search';

function Community() {
  return (
    <div className="min-h-screen flex flex-col items-center  px-4 pt-28 bg-gray-50">
      <div className="w-full max-w-lg">
        <Search />
      </div>
    </div>
  );
}

export default Community;
