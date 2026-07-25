"use client";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-336 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="lg:w-32 w-20"
            ></Image>
          </Link>
        </div>

        <Link
          href="/history"
          className="inline-flex  text-xs lg:text-base items-center gap-2 rounded-md border border-input px-4 py-2  transition-colors bg-primary text-white hover:bg-primary/70"
        >
          Riwayat pesanan
        </Link>
      </div>
    </header>
  );
}

export { Header };
