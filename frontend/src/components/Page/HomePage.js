import React from "react";
import { Link } from "react-router-dom";
import isAuth ,{userType} from "../../lib/isAuth";
function HomePage() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-4"></div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
            <h1 className="text-3xl font-semibold mb-2">
              Welcome to Our Platform
            </h1>
            <p className="text-gray-700 mb-4">
              Our mission is to streamline the recruitment process, making it
              more efficient, transparent, and successful for both candidates
              and employers. Find your next star employee with ease. Leverage
              our extensive talent network, utilize our targeted recruitment
              strategies, and benefit from our expert advice on building a
              winning team.
            </p>
            {isAuth ? (
              userType() === "recruiter" ? (
                <Link
                  to="/addjobs"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Jobs
                </Link>
              ) : (
                <Link
                  to="/jobpage"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Browse Jobs
                </Link>
              )
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Login to Browse Jobs
              </Link>
            )}
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
          <div className="space-y-8 mx-auto" style={{ maxWidth: "800px" }}>
            {[
              {
                text: "This platform has been a game-changer for my career. The resources and support provided have helped me land my dream job in the tech industry. I can't thank the team enough!",
                name: "John Doe, Software Engineer at Tech Company",
                imgSrc: "https://randomuser.me/api/portraits/men/32.jpg",
                alt: "John Doe",
                imgFirst: false,
              },
              {
                text: "The job listings are relevant and up-to-date. The community and networking opportunities are invaluable. Highly recommend to all students looking to advance their careers.",
                name: "Jane Smith, Product Manager at Startup Inc.",
                imgSrc: "https://randomuser.me/api/portraits/women/44.jpg",
                alt: "Jane Smith",
                imgFirst: true,
              },
              {
                text: "An excellent platform with a wide range of job opportunities and support for students at all stages of their careers.",
                name: "Alice Johnson, UX Designer at Creative Agency",
                imgSrc: "https://randomuser.me/api/portraits/women/68.jpg",
                alt: "Alice Johnson",
                imgFirst: false,
              },
              {
                text: "The resources and guidance provided were instrumental in helping me secure an internship at a top company.",
                name: "Robert Brown, Intern at Global Corp",
                imgSrc: "https://randomuser.me/api/portraits/men/54.jpg",
                alt: "Robert Brown",
                imgFirst: true,
              },
              {
                text: "The platform's user-friendly interface and comprehensive job listings made my job search experience seamless and efficient.",
                name: "Emily Davis, Data Analyst at Tech Solutions",
                imgSrc: "https://randomuser.me/api/portraits/women/72.jpg",
                alt: "Emily Davis",
                imgFirst: false,
              },
              {
                text: "A fantastic resource for students looking to enter the workforce. The support and guidance provided are top-notch.",
                name: "Michael Wilson, Marketing Specialist at Ad Agency",
                imgSrc: "https://randomuser.me/api/portraits/men/62.jpg",
                alt: "Michael Wilson",
                imgFirst: true,
              },
            ].map((testimonial, index) => (
              <div
                className="flex flex-col md:flex-row items-center"
                key={index}
              >
                {testimonial.imgFirst ? (
                  <>
                    <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                      <img
                        src={testimonial.imgSrc}
                        alt={testimonial.alt}
                        className="rounded-lg shadow-md mb-2"
                      />
                    </div>
                    <div className="md:w-1/2 mb-4 md:mb-0 md:pl-4 text-center md:text-left order-1 md:order-2">
                      <p className="text-gray-700 mb-4">{testimonial.text}</p>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4 text-center md:text-right">
                      <p className="text-gray-700 mb-4">{testimonial.text}</p>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                      <img
                        src={testimonial.imgSrc}
                        alt={testimonial.alt}
                        className="rounded-lg shadow-md mb-2"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
