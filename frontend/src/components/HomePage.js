import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <div>
            <Link to="/" className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2">
              Login
            </Link>
            <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
            <h1 className="text-3xl font-semibold mb-2">
              Welcome to Our Platform
            </h1>
            <p className="text-gray-700 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </p>
            <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Sign Up to Browse Jobs
            </Link>
          </div>

          {/* Photo */}
          <div className="md:w-1/2">
            <img
              src="https://eddie-hernandez.com/wp-content/uploads/2021/03/NT-Professional_Headshot_Seated-Business-Portrait-02.jpg"
              alt="Random Photo"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* What Students Say About Us */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            What Students Say About Us
          </h2>
          <div className="space-y-8 mx-auto" style={{ maxWidth: '800px' }}>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4 text-center md:text-right">
                <p className="text-gray-700 mb-4">
                  "This platform has been a game-changer for my career. The resources
                  and support provided have helped me land my dream job in the tech
                  industry. I can't thank the team enough!"
                </p>
                <p className="font-semibold">
                  John Doe, Software Engineer at Tech Company
                </p>
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="John Doe"
                  className="rounded-lg shadow-md mb-2"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Jane Smith"
                  className="rounded-lg shadow-md mb-2"
                />
              </div>
              <div className="md:w-1/2 mb-4 md:mb-0 md:pl-4 text-center md:text-left order-1 md:order-2">
                <p className="text-gray-700 mb-4">
                  "The job listings are relevant and up-to-date. The community and
                  networking opportunities are invaluable. Highly recommend to all
                  students looking to advance their careers."
                </p>
                <p className="font-semibold">
                  Jane Smith, Product Manager at Startup Inc.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4 text-center md:text-right">
                <p className="text-gray-700 mb-4">
                  "An excellent platform with a wide range of job opportunities and
                  support for students at all stages of their careers."
                </p>
                <p className="font-semibold">
                  Alice Johnson, UX Designer at Creative Agency
                </p>
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Alice Johnson"
                  className="rounded-lg shadow-md mb-2"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                <img
                  src="https://randomuser.me/api/portraits/men/54.jpg"
                  alt="Robert Brown"
                  className="rounded-lg shadow-md mb-2"
                />
              </div>
              <div className="md:w-1/2 mb-4 md:mb-0 md:pl-4 text-center md:text-left order-1 md:order-2">
                <p className="text-gray-700 mb-4">
                  "The resources and guidance provided were instrumental in helping me
                  secure an internship at a top company."
                </p>
                <p className="font-semibold">
                  Robert Brown, Intern at Global Corp
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4 text-center md:text-right">
                <p className="text-gray-700 mb-4">
                  "The platform's user-friendly interface and comprehensive job listings
                  made my job search experience seamless and efficient."
                </p>
                <p className="font-semibold">
                  Emily Davis, Data Analyst at Tech Solutions
                </p>
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <img
                  src="https://randomuser.me/api/portraits/women/72.jpg"
                  alt="Emily Davis"
                  className="rounded-lg shadow-md mb-2"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                <img
                  src="https://randomuser.me/api/portraits/men/62.jpg"
                  alt="Michael Wilson"
                  className="rounded-lg shadow-md mb-2"
                />
              </div>
              <div className="md:w-1/2 mb-4 md:mb-0 md:pl-4 text-center md:text-left order-1 md:order-2">
                <p className="text-gray-700 mb-4">
                  "A fantastic resource for students looking to enter the workforce.
                  The support and guidance provided are top-notch."
                </p>
                <p className="font-semibold">
                  Michael Wilson, Marketing Specialist at Ad Agency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
