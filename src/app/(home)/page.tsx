import SearchForm2 from "./_components/search-form2";
import CarCatalog from "./_components/car-catalog";
import Link from "next/link";
import Image from "next/image";
import StillQuestions from "./_components/still-questions";

export default async function HomePage() {
  return (
    <>
      <SearchForm2 />
      <section className="container mx-auto mb-4 mt-8 flex gap-4 min-h-[70vh] max-md:px-4">
        <aside className="basis-1/4 max-xl:basis-1/3 rounded-2xl text-center max-lg:hidden sticky top-5">
          <div className="w-full rounded-2xl bg-white">
            <Image
              src="/banner.jpeg"
              alt="medical insurance"
              width={500}
              height={500}
              className="w-full rounded-t-2xl"
            />
            <div className="relative w-full h-full p-4 flex flex-col items-end">
              <div className="h-full w-full text-justify">
                Medical insurance to Thailand and 21 other countries with
                insurance coverage of USD 100,000 for only USD 300 per year.
                Your reliable protection against accidents and illnesses abroad
              </div>
              <button className="bg-brand-base text-white rounded-md">
                <Link
                  target="_blank"
                  href="https://wa.me/+66659769300"
                  className="w-full h-full px-4 py-2 block"
                >
                  Details
                </Link>
              </button>
            </div>
          </div>
        </aside>
        <main className="flex basis-3/4 max-xl:basis-2/3 flex-col gap-4 h-full max-lg:basis-full">
          <CarCatalog />
          <StillQuestions />
        </main>
      </section>
    </>
  );
}
