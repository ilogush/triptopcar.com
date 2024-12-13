"use client";

import dynamic from "next/dynamic";
import { Accordion } from "flowbite-react";
import React from "react";

type IQuestion = {
  title: string;
  description: string;
};

const questions: IQuestion[] = [
  {
    title: "What documents are required to rent a car from you?",
    description:
      "To rent a car from us, you'll need your passport, a valid driver’s license from your country, and an\nInternational Driving Permit (IDP). This ensures full compliance with Thai law and gives you peace of mind\nwhile renting.",
  },
  {
    title: "What kind of insurance do you provide with the rental?",
    description:
      "We offer basic insurance coverage with an option to upgrade to full coverage (CDW). Full coverage will\nprotect you from any unexpected costs in case of an accident. We recommend reviewing the insurance terms\nbefore signing the contract to be fully confident in your protection.",
  },
  {
    title: "Can I drive the rental car outside of Phuket?",
    description:
      "Yes, you can drive outside of Phuket in our cars, but we ask that you inform us in advance. In some cases,\nadditional approval may be required.",
  },
  {
    title: "What is the age requirement to rent a car from you?",
    description:
      "We rent cars to individuals aged 21 and older. If you are under 23, additional conditions may apply. The\ndriver must also have held a driver's license for at least one year.",
  },
  {
    title: "Why should I choose your company?",
    description:
      "We pride ourselves on high-quality service, transparent rental conditions, and flexible payment options. We\ndo not require you to leave your passport as a deposit, ensuring your security and comfort. Your peace of\nmind is our priority.",
  },
  {
    title: "Is it difficult to drive on Phuket?",
    description:
      "Driving on Phuket may be unfamiliar due to left-hand driving and heavy scooter traffic. Our cars are fully\nequipped for your comfort, and we provide guidelines on local traffic rules to help you adapt.",
  },
  {
    title: "What are your car rental prices?",
    description:
      "Our prices vary depending on the car model and rental duration, starting from 1200 baht per day. We offer\nflexible discount systems and advantageous terms for long-term rentals. Booking in advance will help you\nsave money.",
  },
  {
    title: "What should I do in case of an accident?",
    description:
      "In the event of an accident, contact us. Our specialists will assist you on-site and provide all necessary\nsupport. With our full insurance coverage, you can be confident that everything will be resolved quickly and\nefficiently.",
  },
  {
    title: "What is your fuel return policy?",
    description:
      "We follow a 'full-to-full' fuel policy. This means you will receive the car with a full tank and must return\nit with a full tank as well. This is convenient and transparent for both parties.",
  },
  {
    title: "Can I rent a car without a credit card?",
    description:
      "Yes, we accept cash or debit card payments. We understand that not everyone has a credit card, so we offer\nseveral payment options for your convenience.",
  },
];

const StillQuestions = () => {
  return (
    <div className="rounded-2xl bg-white py-4 px-6">
      <h3 className="text-[2rem] font-bold">Still have questions?</h3>
      <p className="text-[1rem]">We will gladly answer them</p>

      <div className="faq mt-4">
        <Accordion>
          {questions.map((item, index) => {
            return (
              <Accordion.Panel key={index}>
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.description}</Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(StillQuestions), { ssr: false });
