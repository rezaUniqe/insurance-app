import Link from "next/link";
import { FormInput, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/toggle-theme";

const Navbar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t flex justify-around items-center">
      <Link href="/" className="flex flex-col items-center text-xs">
        <FormInput className="h-5 w-5 mb-1" />
        <span>forms</span>
      </Link>
      <Link
        href={"/form-submissions"}
        className="flex flex-col items-center text-xs"
      >
        <Phone className="h-5 w-5 mb-1" />
        <span>Submissions</span>
      </Link>
      <div className="flex flex-col items-center text-xs">
        <ThemeToggle />
        <span className="mt-1">Theme</span>
      </div>
    </div>
  );
};

export default Navbar;
