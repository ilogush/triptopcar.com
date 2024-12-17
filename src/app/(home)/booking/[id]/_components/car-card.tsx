import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface CarCardProps {
  className?: string;
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ className, car }) => {
  return (
    <article className={clsx("bg-white p-5 rounded-lg flex flex-col items-start", className)}>
      <div>
        <header className="grid grid-cols-2 max-md:mx-auto gap-3">
          <h3 className="flex items-center">
            <span className="bg-base-bg-blue mr-4 rounded-sm px-2 py-1.5 text-base">{car.carBodyType}</span>
            <span className="text-lg font-semibold whitespace-nowrap">{car.name}</span>
          </h3>
        </header>
      </div>
      <main className="flex items-start w-full gap-12 max-md:flex-col max-md:items-center max-md:text-center">
        <div className="flex flex-col w-2/3 max-sm:w-full items-start max-md:items-center mt-8">
          <Image src={car.imageUrl} alt={`${car.name} Image`} width={250} height={250} />
        </div>

        <div className="flex flex-col items-start w-full max-sm:w-full -mt-0">
          <div className="grid grid-cols-2 gap-2 max-md:mx-auto">
            <span className="flex items-center gap-1">
              <svg
                width="24"
                height="24"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 9H6C4.34315 9 3 10.3431 3 12V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V12C21 10.3431 19.6569 9 18 9H17.5"
                  stroke="black"
                  strokeWidth="2"
                ></path>
                <path
                  d="M15 7.33333V15.5C15 16.6046 14.1046 17.5 13 17.5C11.8954 17.5 11 16.6046 11 15.5V7.5C11 6.94772 10.5523 6.5 10 6.5H9C8.44772 6.5 8 6.05228 8 5.5H6.5C6.22386 5.5 6 5.27614 6 5C6 4.72386 6.22386 4.5 6.5 4.5H8V4C8 3.44772 8.44772 3 9 3H15.75C16.7165 3 17.5 3.7835 17.5 4.75V4.83333C17.5 5.75381 16.7538 6.5 15.8333 6.5C15.3731 6.5 15 6.8731 15 7.33333Z"
                  stroke="black"
                  strokeWidth="2"
                ></path>
                <rect x="5.5" y="14.5" width="2" height="1" rx="0.5" stroke="black"></rect>
                <rect x="5.5" y="17.5" width="2" height="1" rx="0.5" stroke="black"></rect>
                <rect x="5.5" y="11.5" width="2" height="1" rx="0.5" stroke="black"></rect>
              </svg>{" "}
              Automatic
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5C5 3.89543 5.89543 3 7 3H12C13.1046 3 14 3.89543 14 5V20C14 20.5523 13.5523 21 13 21H5V5Z"
                  stroke="black"
                  strokeWidth="2"
                ></path>
                <rect x="6.5" y="8.5" width="6" height="1" stroke="black"></rect>
                <rect x="2.5" y="20.5" width="14" height="1" rx="0.5" stroke="black"></rect>
                <path
                  d="M15 15H15.9C16.7284 15 17.4 15.6716 17.4 16.5V16.5C17.4 17.3284 18.0716 18 18.9 18H19.2C20.1941 18 21 17.1941 21 16.2V9C21 8.35089 20.7895 7.71929 20.4 7.2L18 4"
                  stroke="black"
                  strokeWidth="2"
                ></path>
                <mask id="path-5-inside-1_870_115" fill="white">
                  <path d="M11 13.5C11 14.3284 9.5 16 9.5 16C9.5 16 8 14.3284 8 13.5C8 12.6716 8.67157 12 9.5 12C10.3284 12 11 12.6716 11 13.5Z"></path>
                </mask>
                <path
                  d="M9.5 16L7.26719 18.0036L9.5 20.4918L11.7328 18.0036L9.5 16ZM8 13.5C8 13.1775 8.06766 12.963 8.0851 12.9099C8.10751 12.8416 8.12013 12.8246 8.09823 12.8672C8.0522 12.9566 7.95806 13.1094 7.81442 13.3091C7.67861 13.498 7.53633 13.6767 7.42467 13.8114C7.37013 13.8772 7.32592 13.9288 7.2974 13.9618C7.28321 13.9781 7.27311 13.9896 7.2678 13.9956C7.26515 13.9986 7.26372 14.0002 7.26358 14.0004C7.26351 14.0005 7.26377 14.0002 7.26437 13.9995C7.26467 13.9992 7.26505 13.9987 7.26552 13.9982C7.26575 13.998 7.26601 13.9977 7.26629 13.9974C7.26643 13.9972 7.26665 13.997 7.26672 13.9969C7.26695 13.9966 7.26719 13.9964 9.5 16C11.7328 18.0036 11.7331 18.0034 11.7333 18.0031C11.7334 18.003 11.7337 18.0027 11.7338 18.0025C11.7342 18.0021 11.7346 18.0016 11.735 18.0012C11.7359 18.0002 11.7368 17.9992 11.7378 17.9981C11.7398 17.9958 11.7423 17.9931 11.745 17.99C11.7506 17.9837 11.7576 17.9759 11.7659 17.9664C11.7826 17.9475 11.8047 17.9223 11.8315 17.8914C11.885 17.8296 11.958 17.7442 12.0441 17.6404C12.2137 17.4358 12.4464 17.1448 12.6856 16.8122C12.9169 16.4905 13.1978 16.0701 13.433 15.6131C13.6183 15.2531 14 14.4576 14 13.5H8ZM9.5 16C11.7328 13.9964 11.733 13.9966 11.7333 13.9969C11.7333 13.997 11.7336 13.9972 11.7337 13.9974C11.734 13.9977 11.7342 13.998 11.7345 13.9982C11.7349 13.9987 11.7353 13.9992 11.7356 13.9995C11.7362 14.0002 11.7365 14.0005 11.7364 14.0004C11.7363 14.0002 11.7348 13.9986 11.7322 13.9956C11.7269 13.9896 11.7168 13.9781 11.7026 13.9618C11.6741 13.9288 11.6299 13.8772 11.5753 13.8114C11.4637 13.6767 11.3214 13.498 11.1856 13.3091C11.0419 13.1094 10.9478 12.9566 10.9018 12.8672C10.8799 12.8246 10.8925 12.8416 10.9149 12.9099C10.9323 12.963 11 13.1775 11 13.5H5C5 14.4576 5.38168 15.2531 5.56698 15.6131C5.8022 16.0701 6.08306 16.4905 6.31442 16.8122C6.55361 17.1448 6.78633 17.4358 6.95592 17.6404C7.04201 17.7442 7.11498 17.8296 7.16849 17.8914C7.19532 17.9223 7.21745 17.9475 7.23411 17.9664C7.24245 17.9759 7.24944 17.9837 7.25498 17.99C7.25775 17.9931 7.26016 17.9958 7.2622 17.9981C7.26321 17.9992 7.26414 18.0002 7.26497 18.0012C7.26539 18.0016 7.26578 18.0021 7.26615 18.0025C7.26634 18.0027 7.2666 18.003 7.26669 18.0031C7.26694 18.0034 7.26719 18.0036 9.5 16ZM11 13.5C11 14.3284 10.3284 15 9.5 15V9C7.01472 9 5 11.0147 5 13.5H11ZM9.5 15C8.67157 15 8 14.3284 8 13.5H14C14 11.0147 11.9853 9 9.5 9V15Z"
                  fill="black"
                  mask="url(#path-5-inside-1_870_115)"
                ></path>
                <rect x="19.5" y="9.5" width="1" height="3" rx="0.5" stroke="black"></rect>
              </svg>{" "}
              Gasoline A95
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.90192 5.70575L9 6.80382L10.0981 2.70575M7 3.33972L12.5 12.866M13.9019 21.2942L15 17.1961L19.0981 18.2942M17 20.6602L11.5 11.134"
                  stroke="black"
                  strokeWidth="2"
                ></path>
                <path d="M3 15L6 12L3 9M2 12H13M21 15L18 12L21 9M22 12H11" stroke="black" strokeWidth="2"></path>
                <path
                  d="M13.9019 2.70575L15 6.80382L19.0981 5.70575M17 3.33972L11.5 12.866M4.90192 18.2942L9 17.1961L10.0981 21.2942M7 20.6602L12.5 11.134"
                  stroke="black"
                  strokeWidth="2"
                ></path>
              </svg>
              Air Condition{" "}
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_872_76)">
                  <path d="M14 19H9C6.79086 19 5 17.2091 5 15V7" stroke="black" strokeWidth="2"></path>
                  <path
                    d="M20 21H18C17.4477 21 17 20.5523 17 20V16.4542C17 15.9201 16.5803 15.4803 16.0468 15.4553L13 15.3125M13 15.3125H10C9.44772 15.3125 9 14.8648 9 14.3125V9C9 8.44772 9.44772 8 10 8H11C12.1046 8 13 8.89543 13 10V15.3125Z"
                    stroke="black"
                    strokeWidth="2"
                  ></path>
                  <circle cx="11" cy="4" r="1" stroke="black" strokeWidth="2"></circle>
                  <path
                    d="M13 10L15.8083 11.6047C16.2616 11.8638 16.7746 12 17.2967 12H20"
                    stroke="black"
                    strokeWidth="2"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_872_76">
                    <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>{" "}
              4
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 14V9.5H7.5V6.5H11M5 14V17.5858C5 17.851 5.10536 18.1054 5.29289 18.2929L6 19L7.70711 20.7071C7.89464 20.8946 8.149 21 8.41421 21H15.5C16.0523 21 16.5 20.5523 16.5 20V16.5C16.5 15.9477 16.9477 15.5 17.5 15.5H19V18H21C21.5523 18 22 17.5523 22 17V9.5C22 8.94772 21.5523 8.5 21 8.5H19V11H17.0884C16.7252 11 16.3906 10.8031 16.2142 10.4856L14.2858 7.01436C14.1094 6.69689 13.7748 6.5 13.4116 6.5H11M5 14H2M11 6.5V4"
                  stroke="black"
                  strokeWidth="2"
                ></path>
                <rect x="1.5" y="9.5" width="1" height="9" rx="0.5" stroke="black"></rect>
                <rect
                  x="7.5"
                  y="3.5"
                  width="1"
                  height="7"
                  rx="0.5"
                  transform="rotate(-90 7.5 3.5)"
                  stroke="black"
                ></rect>
                <rect
                  x="8.5"
                  y="14.5"
                  width="1"
                  height="5"
                  rx="0.5"
                  transform="rotate(-90 8.5 14.5)"
                  stroke="black"
                ></rect>
                <rect
                  x="12.4142"
                  y="9.87874"
                  width="1"
                  height="5"
                  rx="0.5"
                  transform="rotate(45 12.4142 9.87874)"
                  stroke="black"
                ></rect>
                <rect
                  x="13.2426"
                  y="13.7071"
                  width="1"
                  height="5"
                  rx="0.5"
                  transform="rotate(45 13.2426 13.7071)"
                  stroke="black"
                ></rect>
                <rect
                  x="8.5"
                  y="14.5"
                  width="1"
                  height="5"
                  rx="0.5"
                  transform="rotate(-90 8.5 14.5)"
                  stroke="black"
                ></rect>
              </svg>{" "}
              1.5L
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="7.5" y="1.5" width="1" height="5" rx="0.5" stroke="black"></rect>
                <rect x="15.5" y="1.5" width="1" height="5" rx="0.5" stroke="black"></rect>
                <rect x="3" y="4" width="18" height="17" rx="2" stroke="black" strokeWidth="2"></rect>
                <rect x="4.5" y="8.5" width="15" height="1" stroke="black"></rect>
                <rect x="12.5" y="11.5" width="1" height="7" rx="0.5" stroke="black"></rect>
                <rect
                  x="12.9773"
                  y="11.2429"
                  width="1"
                  height="4.62469"
                  rx="0.5"
                  transform="rotate(45 12.9773 11.2429)"
                  stroke="black"
                ></rect>
              </svg>{" "}
              2021
            </span>
          </div>
        </div>

        {/*<RentalIncludes />*/}
      </main>
    </article>
  );
};

export default CarCard;
