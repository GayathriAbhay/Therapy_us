import { NavLink } from "react-router";
import { Home, MessageCircle, BookHeart, Calendar, Heart } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/talk", icon: MessageCircle, label: "Talk" },
  { to: "/journal", icon: BookHeart, label: "Journal" },
  { to: "/dates", icon: Calendar, label: "Dates" },
  { to: "/heal", icon: Heart, label: "Heal" },
];

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="max-w-lg mx-auto px-6 pb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-lg shadow-purple-200/20 p-2"
        >
          <div className="flex items-center justify-around gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-2xl transition-all duration-300 relative ${
                    isActive
                      ? "bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white shadow-lg shadow-purple-300/30"
                      : "text-[#9e8c9f] hover:text-[#5a4a5e] hover:bg-white/40"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.1, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    </motion.div>
                    <span className="text-[10px] font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] rounded-2xl -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
