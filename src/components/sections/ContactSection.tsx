import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, CheckCircle } from "lucide-react";
import type { ContactSectionProps } from "../../utils/types";

const pageTransition = { type: "spring", stiffness: 300, damping: 30 };
const listVariants = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  hidden: {},
};
const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ContactSection: React.FC<ContactSectionProps> = ({
  PERSONAL_INFO,
  formData,
  setFormData,
  handleSubmit,
  submissionStatus,
}) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
      <Mail className="w-8 h-8" />
      Get In Touch
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...pageTransition, delay: 0.1 }}
          className="bg-gray-900 rounded-lg border border-green-400/30 p-8"
        >
          <h3 className="text-xl font-bold text-green-400 mb-4">
            $ contact --info
          </h3>

          <div className="space-y-4">
            <div>
              <div className="text-gray-500 text-sm mb-1">Email:</div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-green-400 hover:underline"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div>
              <div className="text-gray-500 text-sm mb-1">Location:</div>
              <div className="text-gray-300">{PERSONAL_INFO.location}</div>
            </div>

            <div>
              <div className="text-gray-500 text-sm mb-1">Status:</div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                ></motion.div>
                <span className="text-green-400">
                  Available for opportunities
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={listVariants}
          className="flex gap-4"
        >
          <motion.a
            variants={listItemVariants}
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-900 border border-green-400/30 rounded-lg p-4 hover:border-green-400/50 transition-all text-center hover:shadow-lg hover:shadow-green-400/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <div className="text-sm text-gray-400">GitHub</div>
          </motion.a>

          <motion.a
            variants={listItemVariants}
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-900 border border-green-400/30 rounded-lg p-4 hover:border-green-400/50 transition-all text-center hover:shadow-lg hover:shadow-green-400/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <div className="text-sm text-gray-400">LinkedIn</div>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...pageTransition, delay: 0.2 }}
        className="bg-gray-900 rounded-lg border border-green-400/30 p-8"
      >
        <h3 className="text-xl font-bold text-green-400 mb-6">Send Message</h3>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full bg-gray-800 border border-green-400/30 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-green-400 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full bg-gray-800 border border-green-400/30 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-green-400 transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Message</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full bg-gray-800 border border-green-400/30 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-green-400 transition-colors resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>

          <motion.button
            onClick={handleSubmit}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 rounded transition-colors shadow-lg shadow-green-400/30 hover:shadow-green-400/50"
          >
            Send Message →
          </motion.button>

          <AnimatePresence>
            {submissionStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 p-3 bg-green-500/10 text-green-400 rounded-lg border border-green-400/50"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Message Transmitted. Thank you!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  </div>
);

export default ContactSection;
