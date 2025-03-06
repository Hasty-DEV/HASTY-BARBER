"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Scissors } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/components/firebase-provider";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const routes = [
    { href: "/", label: "Início" },
    { href: "/servicos", label: "Serviços" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-bold">Hasty Barber</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex gap-2">
            {user ? (
              <>
                <Link href={user.role === 'cliente' ? "/cliente/dashboard" : "/barbeiro/dashboard"}>
                  <Button variant="outline">Minha Conta</Button>
                </Link>
                <Button 
                  onClick={handleLogout}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Entrar</Button>
                </Link>
                <Link href="/cadastro">
                  <Button className="bg-purple-600 hover:bg-purple-700">Cadastrar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === route.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  {user ? (
                    <>
                      <Link 
                        href={user.role === 'cliente' ? "/cliente/dashboard" : "/barbeiro/dashboard"}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button variant="outline" className="w-full">Minha Conta</Button>
                      </Link>
                      <Button 
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">Entrar</Button>
                      </Link>
                      <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">Cadastrar</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}