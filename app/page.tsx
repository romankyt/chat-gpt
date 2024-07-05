import { AuthComponent } from "@/components/auth-component";
import { MiddleWareComponent } from "@/components/middleware-component";

export default function Home() {
  return (
    <main className="flex h-screen w-screen ">
      <AuthComponent />
    </main>
  );
}
