"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

const Header = () => {
  const favoritesCount = useSelector(
    (state: RootState) => state.movies.favorites.length
  );
  const [clientFavoritesCount, setClientFavoritesCount] = useState(0);

  useEffect(() => {
    setClientFavoritesCount(favoritesCount);
  }, [favoritesCount]);

  return (
    <header className="container mx-auto p-4 bg-black text-white">
      <nav className="flex flex-col items-center md:items-start">
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <NavLink href="/" text="Home" additionalClasses="font-bold" />
          <Separator />
          <NavLink
            href="/favorites"
            text={`Favorites (${clientFavoritesCount})`}
          />
        </div>
        <h2 className="mt-4 text-lg">Discover</h2>
      </nav>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  text: string;
  additionalClasses?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  text,
  additionalClasses = "",
}) => (
  <Link href={href} className={`text-xl ${additionalClasses}`}>
    {text}
  </Link>
);

const Separator = () => <span className="mx-2">|</span>;

export default Header;
