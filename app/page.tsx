import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Hasty Barber
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Agende seu horário com os melhores barbeiros da cidade. Rápido, fácil e sem complicações.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Agendar Agora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button variant="outline">Ver Serviços</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
                  alt="Barbearia"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Por que escolher a Hasty Barber?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Oferecemos uma experiência única de barbearia com profissionais qualificados e atendimento personalizado.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Scissors className="h-12 w-12 text-purple-600" />
              <h3 className="text-xl font-bold">Profissionais Qualificados</h3>
              <p className="text-center text-muted-foreground">
                Nossos barbeiros são especialistas com anos de experiência.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Calendar className="h-12 w-12 text-purple-600" />
              <h3 className="text-xl font-bold">Agendamento Fácil</h3>
              <p className="text-center text-muted-foreground">
                Marque seu horário em poucos cliques, sem complicações.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Clock className="h-12 w-12 text-purple-600" />
              <h3 className="text-xl font-bold">Pontualidade</h3>
              <p className="text-center text-muted-foreground">
                Respeitamos seu tempo com atendimento pontual e eficiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                O que nossos clientes dizem
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Veja o que nossos clientes têm a dizer sobre a experiência Hasty Barber.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "Atendimento excelente e profissionais muito qualificados. Recomendo a todos!"
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="rounded-full bg-muted p-1">
                    <div className="h-8 w-8 rounded-full bg-purple-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cliente {i}</p>
                    <p className="text-sm text-muted-foreground">Cliente Fiel</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Pronto para uma nova experiência?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Agende seu horário agora e experimente o melhor serviço de barbearia.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  Agendar Agora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}