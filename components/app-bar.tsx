import { auth } from "@/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/navigation-menu";
import { NotebookPen, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default async function AppBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="my-2 mx-4 flex">
      <Image src="/logo.svg" alt="Zenith Flow Logo" width={32} height={32} className="w-6 h-auto" />
      <Link className="text-xl my-auto ml-3" href="/">
        Zenith Flows
      </Link>
      <NavigationMenu className="ml-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-md">Productivity</NavigationMenuTrigger>
            <NavigationMenuContent className="lg:w-[20vw] md:w-[33vw] sm:w-[67vw] flex">
              <div className="text-muted-foreground flex flex-col items-start justify-center p-4 basis-1/2">
                <NotebookPen className="mb-2 h-6 w-6" />
                <span className="text-sm">
                  Use the various productivity tools available in Zenith Flows to help you stay organized and focused.
                </span>
              </div>
              <div className="flex flex-col justify-around basis-1/2">
                <NavigationMenuLink href="/calendar">Calendar</NavigationMenuLink>
                <NavigationMenuLink href="/todos">Todos</NavigationMenuLink>
                <NavigationMenuLink href="/reminders">Reminders</NavigationMenuLink>
                <NavigationMenuLink href="/notes">Notes</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <Avatar>
            <AvatarImage src={user?.image ?? "/person.svg"} alt="User Avatar" />
            <AvatarFallback>
              <UserRound className="animate-[pulse_900ms_ease-in-out_infinite]" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6">
          {user ? (
            <>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile" className="dropdown-item">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings" className="dropdown-item">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/api/auth/signout" className="dropdown-item">
                  Sign out
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/api/auth/signin" className="dropdown-item">
                Sign in
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
