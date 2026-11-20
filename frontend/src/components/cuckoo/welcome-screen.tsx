import { Link } from "@tanstack/react-router";
import mascot from "@/assets/mascot.png";
import { DemoBar, DemoEntryButtons, Logo } from "@/components/cuckoo/shell";
import { Button } from "@/components/cuckoo/ui";

export function Welcome() {
  return (
    <div className="min-h-screen" data-screen="Karşılama">
      <DemoBar />
      <main className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-12 text-center">
        <Logo size="lg" />
        <h1 className="text-4xl font-extrabold">Cuckoo’ya hoş geldiniz!</h1>
        <p className="text-muted-foreground">
          İzinli araç dış görünüm fotoğrafları için görev oluşturun veya bir
          göreve başvurun.
        </p>
        <img
          src={mascot}
          alt="Zarf taşıyan Cuckoo maskotu"
          width={1024}
          height={1024}
          className="size-56"
        />
        <Button asChild size="lg">
          <Link to="/signup">Başlayın</Link>
        </Button>
        <Link to="/signin" className="text-sm font-semibold text-primary">
          Giriş yap
        </Link>
        <DemoEntryButtons />
      </main>
    </div>
  );
}
