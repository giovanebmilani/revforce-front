import { Link } from "@tanstack/react-router";

interface Item {
  title: string;
  url: string;
  icon: React.ComponentType<{ size: number }>;
}

function MenuButton({ item }: { item: Item }) {
  return (
    <Link
      className="flex items-center gap-12 pl-4 pr-4 pt-2 pb-2 rounded-2xl transition-colors hover:bg-yellow-300 text-black"
      to={item.url}
    >
      <div>
        <item.icon size={25} />
      </div>
      <span className="text-lg">{item.title}</span>
    </Link>
  );
}

export default MenuButton;
