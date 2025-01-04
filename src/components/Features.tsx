import { motion } from "framer-motion";
import { Briefcase, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Professional",
    description:
      "Years of experience in software development, process automation, and customer relationship management.",
  },
  {
    icon: Zap,
    title: "Pragmatic",
    description:
      "Solutions tailored quickly and specifically to the individual needs of our customers, backed by extensive project experience.",
  },
  {
    icon: Users,
    title: "Personal",
    description:
      "We pride ourselves on building lasting relationships with our customers, ensuring reliable and accessible solutions.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-secondary hover:bg-secondary-dark transition-colors duration-300"
            >
              <div className="w-12 h-12 mb-6 rounded-lg bg-accent/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {feature.title}
              </h3>
              <p className="text-text-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;