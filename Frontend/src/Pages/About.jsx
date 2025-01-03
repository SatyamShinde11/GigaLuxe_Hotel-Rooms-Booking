import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FaRegUser } from 'react-icons/fa6';
const About = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Business Traveler",
      testimonial: "The hotel was amazing! The staff was friendly, the rooms were comfortable, and the view was breathtaking. I will definitely be back!"
    },
    {
      name: "John D.",
      role: "Vacationer",
      testimonial: "A perfect getaway! The amenities were top-notch, and the service was exceptional. Highly recommend this place for a relaxing vacation."
    },
    {
      name: "Emily R.",
      role: "Conference Attendee",
      testimonial: "I stayed here for a conference, and it was the perfect location! Comfortable rooms, excellent service, and great facilities for business meetings."
    },
    {
      name: "David L.",
      role: "Couple",
      testimonial: "We had a wonderful time! The hotel exceeded our expectations with its romantic ambiance, and the staff made our anniversary special."
    },
    {
      name: "Olivia T.",
      role: "Solo Traveler",
      testimonial: "As a solo traveler, I felt safe and welcomed. The hotel’s location was perfect, and the staff was always available to offer help."
    }
  ];

  return (
    <div className=" md:px-20   md:py-10 bg-white w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-16 items-center font-Poppins overflow-hidden">
      <section className="w-full   rounded-lg mb-10 flex flex-col items-start">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">About Us</h1>

        <p className="text-lg text-gray-700 leading-relaxed j mb-6">
          Welcome to <span className="font-semibold">GigaLuxe</span>, where luxury meets comfort. Since our founding, we’ve been dedicated to providing exceptional hospitality and creating unforgettable experiences for our guests. Whether you’re visiting for business, leisure, or a special occasion, we promise to make every moment of your stay truly remarkable.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-2 ">Our Story</h2>
          <p className="text-gray-700 ">
            Established in 2024, <span className="font-semibold">GigaLuxe</span> started as a boutique hotel in the heart of the city. Over the years, we’ve grown into a premium destination for travelers from around the globe. Our commitment to exceptional service and elegant design has earned us recognition as one of the top luxury hotels in the region.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-around">
          <div className=" mb-4">
            <h2 className="text-2xl font-semibold text-purple-600">Why Choose Us?</h2>
            <p className="text-gray-700">
              At <span className="font-semibold">GigaLuxe</span>, we offer:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-left mt-2">
              <li>Elegant rooms and suites with stunning city views.</li>
              <li>World-class dining with a focus on local and international cuisine.</li>
              <li>State-of-the-art amenities, including a spa, gym, and pool.</li>
              <li>Prime location near major attractions and business hubs.</li>
              <li>Exceptional guest service tailored to your needs.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex gap-5 flex-wrap justify-evenly">

          <div className=" sm:w-1/3   text-center border p-5 rounded-md bg-white">
            <h2 className="text-2xl font-semibold text-purple-600">Our Vision</h2>
            <p className="text-gray-700">
              To be a global leader in luxury hospitality, offering unparalleled experiences while fostering sustainability and community development.
            </p>
          </div>

          <div className=" sm:w-1/3  text-center border p-5 rounded-md bg-white">
            <h2 className="text-2xl font-semibold text-purple-600">Our Values</h2>
            <p className="text-gray-700">
              Hospitality, integrity, innovation, and a commitment to excellence are the core values that define our service.
            </p>
          </div>

        </div>

        <div className="mt-6 w-full ">
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">What Guests Are Saying</h2>
          <p className="text-gray-700 ">
            Don’t just take our word for it. Here’s what our guests have to say:
          </p>
          <div className=" flex h-auto w-[90%] sm:w-full ">

            <Swiper
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              spaceBetween={20}
              navigation={true}
              pagination={{
                clickable: true,
              }}

              autoplay={
                {
                  delay: 1000,
                  disableOnInteraction: false
                }
              }
              loop={true}
              modules={[Pagination, Navigation]}
              className="mySwiper w-80 sm:w-[600px] md:w-full "

            >

              {
                testimonials.map((items, index) => {
                  const { name, role, testimonial } = items
                  return (
                    <SwiperSlide style={{
                      display: "flex"
                    }} >
                      <div className='bg-white w-auto p-6 rounded-lg shadow-lg md:p-5 '>
                        <p className=' text-lg text-gray-600 italic'>
                          " {testimonial} "
                        </p>

                        <div className='mt-4 flex items-center gap-5'>
                          <div className="text-3xl">
                            <FaRegUser />
                          </div>
                          <div>
                            <p className='font-semibold text-gray-800'>{name}</p>
                            <p className='text-sm text-gray-500'>{role}</p>
                          </div>

                        </div>
                      </div>

                    </SwiperSlide>
                  )
                })
              }



            </Swiper>

          </div>
        </div>

      </section>


      <section className="w-full max-w-7xl px-6 py-8  rounded-lg">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We’re here to help! Whether you have questions, need assistance, or
          want to make a booking, reach out to us via the details below or use
          the contact form.
        </p>

        <div className="flex flex-wrap justify-around mb-8">
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-3xl text-purple-600 mb-2" />
            <h2 className="text-lg font-semibold">Phone</h2>
            <p className="text-gray-700">+1 (123) 456-7890</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-3xl text-purple-600 mb-2" />
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-gray-700">support@gigaluxe.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl text-purple-600 mb-2" />
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-gray-700">
              123 Luxury Lane, Downtown City, USA
            </p>
          </div>
        </div>

        <form className="w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>

  )
}

export default About