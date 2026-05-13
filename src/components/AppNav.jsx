import { NavLink } from "react-router-dom";

const navItems = [
  { href: "/", label: "Cari Resep" },
  { href: "/saved", label: "Tersimpan" },
];

export function AppNav() {
  return (
    <header className="border-b-2 border-ink bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          className="font-display text-2xl uppercase leading-none text-ink no-underline"
          to="/"
        >
          pantri
        </NavLink>

        <div className="flex gap-2">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                [
                  "border-2 border-ink px-3 py-2 text-sm font-black uppercase text-ink no-underline shadow-brutal-sm",
                  isActive ? "bg-butter" : "bg-white",
                ].join(" ")
              }
              key={item.href}
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
