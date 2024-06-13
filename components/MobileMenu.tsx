import React from "react";

interface ItemsProps {
  id: number;
  name: string;
  active?: boolean;
}

interface MobileProps {
  visible?: boolean;
  items: ItemsProps[];
}

const MobileMenu: React.FC<MobileProps> = ({ visible, items }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-gray-950 w-48 absolute rounded-lg border-2 top-8 left-0 py-5 flex-col border-gray-800 flex">
      <div className="flex flex-col gap-4">
        {items?.map((item) => (
          <div
            className="px-3 text-center text-white hover:underline"
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
