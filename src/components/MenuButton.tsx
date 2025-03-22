import { Link, useMatch } from "@tanstack/react-router";

interface Item {
  title: string;
  url: string;
  icon: React.ComponentType<{ size: number }>;
}

function MenuButton({ item }: { item: Item }) {
  //@ts-ignore
  const isCurrentRoute = useMatch({ from: item.url, shouldThrow: false });
  const isActive = isCurrentRoute?.routeId === item.url;
  return (
    <Link
      className={`flex items-center gap-12 pl-4 pr-4 pt-2 pb-2 rounded-2xl transition-colors text-black ${
        isActive ? "bg-yellow-300" : "hover:bg-yellow-300"
      }`}
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
