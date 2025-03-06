import Link from "next/link";
import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-bold">Hasty Barber</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Agendamento de serviços de barbearia rápido e fácil.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Início
            </Link>
            <Link href="/servicos" className="text-sm text-muted-foreground hover:text-foreground">
              Serviços
            </Link>
            <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground">
              Sobre
            </Link>
            <Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground">
              Contato
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <Link href="/servicos" className="text-sm text-muted-foreground hover:text-foreground">
              Corte de Cabelo
            </Link>
            <Link href="/servicos" className="text-sm text-muted-foreground hover:text-foreground">
              Barba
            </Link>
            <Link href="/servicos" className="text-sm text-muted-foreground hover:text-foreground">
              Tratamentos
            </Link>
            <Link href="/servicos" className="text-sm text-muted-foreground hover:text-foreground">
              Pacotes
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Contato</h3>
            <p className="text-sm text-muted-foreground">
              Rua Exemplo, 123
              <br />
              São Paulo, SP
              <br />
              contato@hastybarber.com.br
              <br />
              (11) 99999-9999
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hasty Barber. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}