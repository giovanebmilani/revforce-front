import { Link, useMatchRoute } from "@tanstack/react-router";

interface Item {
  title: string;
  url: string; 
  icon: React.ComponentType<{ size: number }>;
}

function MenuButton({ item }: { item: Item }) {
  const matchRoute = useMatchRoute();
  const isRouteOrAncestorActive = matchRoute({
    to: item.url,
    fuzzy: true,
  })
  const isActive = !!isRouteOrAncestorActive;

  return (
    <Link
      className={`flex items-center gap-6 pl-4 pr-4 pt-2 pb-2 rounded-2xl transition-colors text-black ${
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
