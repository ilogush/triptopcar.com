"use client";

import dynamic from "next/dynamic";

const StillQuestions = () => {
  return (
    <div className="rounded-2xl bg-white p-3">
      <h3 className="text-[2rem] font-bold">Still have questions?</h3>
      <p className="text-[1rem]">We will gladly answer them</p>

      <div className="faq mt-4 pl-[1.25rem]">
        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            What documents are required to rent a car from you?
          </summary>
          <p className="mt-2 pl-4">
            To rent a car from us, you'll need your passport, a valid driver’s
            license from your country, and an International Driving Permit
            (IDP). This ensures full compliance with Thai law and gives you
            peace of mind while renting.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            What kind of insurance do you provide with the rental?
          </summary>
          <p className="mt-2 pl-4">
            We offer basic insurance coverage with an option to upgrade to full
            coverage (CDW). Full coverage will protect you from any unexpected
            costs in case of an accident. We recommend reviewing the insurance
            terms before signing the contract to be fully confident in your
            protection.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            Can I drive the rental car outside of Phuket?
          </summary>
          <p className="mt-2 pl-4">
            Yes, you can drive outside of Phuket in our cars, but we ask that
            you inform us in advance. In some cases, additional approval may be
            required.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            What is the age requirement to rent a car from you?
          </summary>
          <p className="mt-2 pl-4">
            We rent cars to individuals aged 21 and older. If you are under 23,
            additional conditions may apply. The driver must also have held a
            driver's license for at least one year.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            Why should I choose your company?
          </summary>
          <p className="mt-2 pl-4">
            We pride ourselves on high-quality service, transparent rental
            conditions, and flexible payment options. We do not require you to
            leave your passport as a deposit, ensuring your security and
            comfort. Your peace of mind is our priority.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            Is it difficult to drive on Phuket?
          </summary>
          <p className="mt-2 pl-4">
            Driving on Phuket may be unfamiliar due to left-hand driving and
            heavy scooter traffic. Our cars are fully equipped for your comfort,
            and we provide guidelines on local traffic rules to help you adapt.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            What are your car rental prices?
          </summary>
          <p className="mt-2 pl-4">
            Our prices vary depending on the car model and rental duration,
            starting from 1200 baht per day. We offer flexible discount systems
            and advantageous terms for long-term rentals. Booking in advance
            will help you save money.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            What should I do in case of an accident?
          </summary>
          <p className="mt-2 pl-4">
            In the event of an accident, contact us. Our specialists will assist
            you on-site and provide all necessary support. With our full
            insurance coverage, you can be confident that everything will be
            resolved quickly and efficiently.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            What is your fuel return policy?
          </summary>
          <p className="mt-2 pl-4">
            We follow a 'full-to-full' fuel policy. This means you will receive
            the car with a full tank and must return it with a full tank as
            well. This is convenient and transparent for both parties.
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer text-lg font-medium">
            Can I rent a car without a credit card?
          </summary>
          <p className="mt-2 pl-4">
            Yes, we accept cash or debit card payments. We understand that not
            everyone has a credit card, so we offer several payment options for
            your convenience.
          </p>
        </details>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(StillQuestions), { ssr: false });
