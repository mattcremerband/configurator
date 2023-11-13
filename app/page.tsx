import { Configurator } from "@/components/configurator/configurator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center ">
        <Configurator />
      </div>
    </main>
  )
}
