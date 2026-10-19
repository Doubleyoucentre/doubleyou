import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    year: "2026",
    title: "AFRICAN STUDENT IMPACT PROGRAM",
    support: "A six-month remote student program for undergraduates across Africa. Applications are closed.",
    color: "bg-green-600",
    gradient: "from-green-600 to-yellow-400 text-[#0E1B2E]",
    link: "/african-student-impact-program",
    external: false,
  },
  {
    year: "February 2021",
    title: "Student of the Future School Tours",
    support: "Supported by Regis and Regis Consult",
    color: "bg-blue-600",
    gradient: "from-blue-500 to-blue-700",
    link:"https://www.instagram.com/p/CUNERAlMyeN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    year: "2021",
    title: "Battle of Brains (pre-pilot) - Taraba, Nigeria",
    support: "Supported by MTN Nigeria and Taraba State Government",
    color: "bg-green-600",
    gradient: "from-green-500 to-green-700",
    link:"https://www.instagram.com/tv/CNSy3avAWJm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="

  },
  {
    year: "2020",
    title: "Double Your Worth Show - Ebonyi, Nigeria",
    support: "Supported by National Youth Service Corps (NYSC) and Ebonyi State Government",
    color: "bg-yellow-500",
    gradient: "from-yellow-400 to-yellow-600 text-black", // light bg needs dark text
    link:"https://www.instagram.com/p/B774Evug3X4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    year: "2019",
    title: "Technologia 2.0 - Taraba, Nigeria",
    support: "Supported by Horlatech Training Institute.",
    color: "bg-blue-600",
    gradient: "from-blue-500 to-blue-700",
    link:"https://www.instagram.com/p/B2mZEHvA64A/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    year: "2019",
    title: "Technologia 1.0 - Lagos, Nigeria",
    support: "Supported by Horlatech Training Institute.",
    color: "bg-green-600",
    gradient: "from-green-500 to-green-700",
    link:"https://www.instagram.com/p/ByQDxpopkCd/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
];


export default function PreviousProjects() {
  return (
    <section id="previous-project" className="flex flex-col lg:flex-row gap-12 px-6 lg:px-20 py-16 bg-white">
      <div className="flex-1">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Previous Projects</h2>
        <div className="relative border-l-2 border-gray-200 pl-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="mb-10 relative"
            >
              <span
                className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full ${project.color} animate-pulse shadow-md`}
              ></span>
              <p className="text-sm text-gray-500 mb-1">{project.year}</p>
              <h3 className="font-semibold text-gray-800">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{project.support}</p>
              <motion.button
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className={`flex items-center text-sm px-4 py-1.5 rounded-lg transition bg-gradient-to-r ${project.gradient} hover:brightness-110 transition`}
                onClick={() => window.open(project.link, project.external === false ? "_self" : "_blank")}
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-start">
        <img
          src="/Picture1.jpg"
          alt="Project Illustration"
          className="w-full max-w-md rounded-xl shadow-md"
        />
      </div>
    </section>
  );
}
