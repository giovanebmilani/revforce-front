import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnter = () => {
    if (localStorage.getItem("account_id") === null) {
      localStorage.setItem(
        "account_id",
        "60887c35-7056-48d7-8fd3-889d33a25124" // Mocked account_id
      );
    }
    setIsTransitioning(true);
    setTimeout(() => router.navigate({ to: "/revforce/dashboard" }), 700);
  };

  return (
    <main
      className={`flex h-screen w-full transition-opacity duration-500 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-center justify-center w-full md:w-[70%] bg-gray-200">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider">
          REVFORCE
        </h1>
      </div>

      <div className="hidden md:flex items-center justify-center w-[30%] bg-white">
        <Button
          disabled={isTransitioning}
          variant={"pointer"}
          className="w-28 h-16"
          onClick={handleEnter}
        >
          Entrar
        </Button>
      </div>
    </main>
  );
}
